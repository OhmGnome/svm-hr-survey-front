import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { forkJoin } from 'rxjs/observable/forkJoin'

import { Auth } from './../../core/model/auth'
import { Card } from './../../core/model/card'
import { CardStruct } from './../../core/model/cardStruct'
import { Session } from './../../core/model/session'
import { User } from './../../core/model/user'
import { UserSession } from './../../core/model/userSession'
import { UserSessionCard } from './../../core/model/userSessionCard'
import { AuthService } from './../../core/service/auth.service'
import { CardService } from './../../core/service/card.service'
import { SessionCardService } from './../../core/service/session-card.service'
import { SessionService } from './../../core/service/session.service'
import { UserSessionCardService } from './../../core/service/user-session-card.service'
import { UserSessionService } from './../../core/service/user-session.service'
import { UserService } from './../../core/service/user.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cards: Card[] = []
  userSessionCards: UserSessionCard[] = []
  USCsTemp: UserSessionCard[] = []
  cardStructs: CardStruct[] = []

  auth: Auth = new Auth
  user: User = new User
  sessions: Session[] = []
  selectedSession: Session = new Session
  loggedInMessage = ''
  joinMessage = ''
  form: FormGroup

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
    private userSessionService: UserSessionService,
    private userSessionCardService: UserSessionCardService,
    private cardService: CardService,
    private sessionCardService: SessionCardService) { }

  ngOnInit() {
    this.sessionService.findByIsActive(true).take(1).subscribe(sessions => this.sessions = sessions || [])
  }

  login() {
    if (this.user.username) {
      this.userService.findByUsername(this.user.username)
        .catch(() => this.setLoginMessageError())
        .take(1).subscribe(users => {
          if (users.length > 0)
            (this.checkUserExists(users[0]))
        })
    } else if (this.user.email) {
      this.userService.findByEmail(this.user.email)
        .catch(() => this.setLoginMessageError())
        .take(1).subscribe(users => {
          if (users.length > 0)
            (this.checkUserExists(users[0]))
        })
    }
  }

  checkUserExists(user: User): void {
    if (user) {
      this.user = user
      this.userService.user = user
      this.loggedInMessage = 'Welcome ' + user.username + ' please join a session >>'
    } else {
      this.loggedInMessage = 'user not found, please sign up or provide a valid username of email'
      setTimeout(this.loggedInMessage = '', 8000)
    }
  }

  setLoginMessageError(): Observable<any> {
    this.loggedInMessage = 'a network error occurred'
    setTimeout(this.loggedInMessage = '', 8000)
    return Observable.throw('404 or !update => save ')
  }

  selectSession(session) {
    this.selectedSession = session
  }

  join() {
    this.authService.findBySessionId(this.selectedSession.id).take(1).subscribe((auths) => {
      if (auths.length > 0) {
        let auth = auths[0]
        if (auth.password === this.auth.password
          || (!!auth && !auth.password && (this.auth.password === '' || this.auth.password === undefined))) {
          let userSession = new UserSession
          userSession.sessionId = this.selectedSession.id
          userSession.userId = this.user.id
          this.userSessionService.findByUserIdAndSessionId(this.user.id, this.selectedSession.id)
            .take(1).subscribe(uSessions => {
              if (uSessions.length > 0) {
                this.joinSession(uSessions[0])
              } else {
                this.userSessionService.create(userSession)
                  .take(1).subscribe(userSession => this.joinSession(userSession))
              }
              // console.log('else')
            })
        } else {
          this.joinMessage = 'Incorrect Password'
          setTimeout(this.joinMessage = '', 8000)
        }
      }
    })
  }

  joinSession(us: UserSession): void {
    this.userSessionCardService.userSession = us
    this.userSessionCardService.setLocalStorage("userSession", JSON.stringify(us))
    this.userSessionCardService.findByUserSessionId(us.id)
      .catch(() => this.setJoinMessageError())
      .take(1)
      .subscribe(userSessionCards => {
        if (userSessionCards.length > 0) {
          this.userSessionCards = userSessionCards
          let cardIds: number[] = []
          userSessionCards.forEach(userSessionCard => cardIds.push(userSessionCard.cardId))
          this.cardService.findByIdIn(cardIds).take(1).subscribe(cards => {
            this.cards = cards
            this.makeSession()
          })
        } else {
          this.joinUserSession(us)
            .take(1)
            .subscribe(() => {
              console.log('====then===')
              this.userSessionCardService.batchSave(this.userSessionCards)
                .take(1).subscribe(userSessionCards => {
                  this.userSessionCards = userSessionCards,
                    this.makeSession()
                })
            })
        }
      })
  }

  joinUserSession = (us) => {
    let cardIds: number[] = []
    return forkJoin(
      this.sessionCardService.findBySessionId(us.sessionId),
      this.cardService.findByIdIn(cardIds)
    )
      .map(([sessionCards, cards]) => {
        this.cards = cards
        this.userSessionCards = []
        sessionCards.forEach(sessionCard => {
          cardIds.push(sessionCard.cardId)
          let userSessionCard: UserSessionCard = new UserSessionCard
          userSessionCard.userSessionId = us.id
          userSessionCard.cardId = sessionCard.cardId
          this.userSessionCards.push(userSessionCard)
        })
      })
  }

  setJoinMessageError(): Observable<any> {
    this.joinMessage = 'error: this session has no cards'
    setTimeout(this.joinMessage = '', 8000)
    return Observable.throw('404 or !update => save ')
  }

  makeSession() {
    this.userSessionCards.forEach(usCard => {
      let card = this.cards.find(card => card.id === usCard.cardId)
      let cardStruct = new CardStruct
      cardStruct.card = card
      cardStruct.usCard = usCard
      this.cardStructs.push(cardStruct)
    })
    this.userSessionCardService.cards = this.cardStructs
    this.userSessionCardService.cardsIndex = 0
    let progress: string = '/critical'
    this.userSessionCardService.progressSubj.next(progress)
    this.userSessionCardService.setLocalStorage("progress", progress)
    this.router.navigate(['/survey' + progress])
  }

  register() {
    this.router.navigate(['/survey/register'])
  }

}