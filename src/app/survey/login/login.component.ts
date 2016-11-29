import { CardStruct } from './../../core/cardStruct'
import { SessionCardService } from './../../core/service/session-card.service'
import { forEach } from 'c:/Users/sdidier/node2/survey3/node_modules/@angular/router/src/utils/collection'
import { Card } from './../../core/model/card'
import { SessionCard } from './../../core/model/sessionCard'
import { CardService } from './../../core/service/card.service'
import { UserSessionCard } from './../../core/model/userSessionCard'
import { UserSessionCardService } from './../../core/service/user-session-card.service'
import { UserSessionService } from './../../core/service/user-session.service'
import { UserSession } from './../../core/model/userSession'
import { Session } from './../../core/model/session'
import { SessionService } from './../../core/service/session.service'
import { AuthService } from './../../core/service/auth.service'
import { Router } from '@angular/router'
import { Auth } from './../../core/model/auth'
import { User } from './../../core/model/user'
import { UserService } from './../../core/service/user.service'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userService: UserService
  authService: AuthService
  sessionService: SessionService
  userSessionService: UserSessionService
  userSessionCardService: UserSessionCardService
  cardService: CardService
  sessionCardService: SessionCardService
  router: Router
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

  constructor(userService: UserService, authService: AuthService, router: Router, sessionService: SessionService,
    userSessionService: UserSessionService, userSessionCardService: UserSessionCardService, cardService: CardService,
    sessionCardService: SessionCardService) {
    this.userService = userService
    this.authService = authService
    this.sessionService = sessionService
    this.userSessionService = userSessionService
    this.userSessionCardService = userSessionCardService
    this.cardService = cardService
    this.sessionCardService = sessionCardService
    this.router = router
  }

  ngOnInit() {
    this.sessionService.findByIsActive(true).then(sessions => this.sessions = sessions || [])
  }

  login() {
    if (this.user.username) {
      this.userService.findByUsername(this.user.username)
        .then(users => {
          if (users.length > 0)
            (this.checkUserExists(users[0]))
        })
        .catch(() => this.setLoginMessageError())
    } else if (this.user.email) {
      this.userService.findByEmail(this.user.email)
        .then(users => {
          if (users.length > 0)
            (this.checkUserExists(users[0]))
        })
        .catch(() => this.setLoginMessageError())
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

  setLoginMessageError(): Promise<any> {
    this.loggedInMessage = 'a network error occurred'
    setTimeout(this.loggedInMessage = '', 8000)
    return Promise.reject('404 or !update => save ')
  }

  selectSession(session) {
    this.selectedSession = session
  }

  join() {
    this.authService.findBySessionId(this.selectedSession.id).then((auths) => {
      if (auths.length > 0) {
        let auth = auths[0]
        if (auth.password === this.auth.password
          || (!!auth && !auth.password && (this.auth.password === '' || this.auth.password === undefined))) {
          let userSession = new UserSession
          userSession.sessionId = this.selectedSession.id
          userSession.userId = this.user.id
          this.userSessionService.findByUserIdAndSessionId(this.user.id, this.selectedSession.id)
            .then(uSessions => {
              if (uSessions.length > 0) {
                this.joinSession(uSessions[0])
              } else {
                this.userSessionService.create(userSession)
                  .then(userSession => this.joinSession(userSession))
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
    this.userSessionCardService.findByUserSessionId(us.id).then(userSessionCards => {
      if (userSessionCards.length > 0) {
        this.userSessionCards = userSessionCards
        let cardIds: number[] = []
        userSessionCards.forEach(userSessionCard => cardIds.push(userSessionCard.cardId))
        this.cardService.findByIdIn(cardIds).then(cards => {
          this.cards = cards
          this.makeSession()
        })
      } else {
        this.joinUserSession(us).then(() => (console.log('====then==='),
          this.userSessionCardService.batchSave(this.userSessionCards)))
          .then(userSessionCards => (this.userSessionCards = userSessionCards,
            this.makeSession()))
      }
    }).catch(() => this.setJoinMessageError())
  }

  async joinUserSession(us) {
    let cardIds: number[] = []
    try {
      await this.sessionCardService.findBySessionId(us.sessionId).then(sessionCards => {
        this.userSessionCards = []
        sessionCards.forEach(sessionCard => {
          cardIds.push(sessionCard.cardId)
          let userSessionCard: UserSessionCard = new UserSessionCard
          userSessionCard.userSessionId = us.id
          userSessionCard.cardId = sessionCard.cardId
          this.userSessionCards.push(userSessionCard)
        })
      })
      await this.cardService.findByIdIn(cardIds).then(cards => {
        this.cards = cards
      })
    } catch (e) {
      console.log(e)
    }
  }

  setJoinMessageError(): Promise<any> {
    this.joinMessage = 'error: this session has no cards'
    setTimeout(this.joinMessage = '', 8000)
    return Promise.reject('404 or !update => save ')
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