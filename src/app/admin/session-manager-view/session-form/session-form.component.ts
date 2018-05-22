import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { Auth } from './../../../core/model/auth'
import { Card } from './../../../core/model/card'
import { Session } from './../../../core/model/session'
import { SessionCard } from './../../../core/model/sessionCard'
import { AuthService } from './../../../core/service/auth.service'
import { CardService } from './../../../core/service/card.service'
import { SessionCardService } from './../../../core/service/session-card.service'
import { SessionService } from './../../../core/service/session.service'

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})
export class SessionFormComponent implements OnInit {
  subscriptions: Subscription[] = new Array<Subscription>()

  // date: Date
  cards: Card[]
  auth: Auth = new Auth
  form: FormGroup

  sessions: Session[]
  session: Session = new Session
  // startDate: Date = new Date
  // endDate: Date = new Date
  startSessionwithCards: boolean


  constructor(
    private sessionService: SessionService,
    private sessionCardService: SessionCardService,
    private cardService: CardService,
    private authService: AuthService) { }

  ngOnInit() {
    console.log('ngOnInit')
    this.subscriptions = [
      this.sessionService.getCache().subscribe(sessions => this.sessions = sessions),
      this.sessionService.sessionObservable.subscribe(session => {
        this.session = session
        if (session) {
          try {
            this.authService.findBySessionId(session.id).take(1).subscribe(data => {
              if (data.length > 0)
                this.auth = data[0]
            })
          } catch (e) {
            console.log('error at authService.findBySessionId')
          }
        }
      })
    ]

    this.cardService.findCards().take(1).subscribe(cards => this.cards = cards)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(scribe => scribe.unsubscribe())
  }

  //is explicit expiration date feature wanted?
  save(): Observable<any> {
    // this.session.isActive = true

    // if (!this.session.startDate) this.session.startDate = new Date
    // if (!this.session.endDate) {
    //   let d = new Date
    //   d = new Date(d.getTime() + 604800000) 
    //   this.session.endDate = d
    // }

    if (this.session.isActive) {
      let today = new Date
      let newEndDate = new Date(today.getTime() + 604800000)

      if (!this.session.endDate) {
        this.session.endDate = newEndDate
      } else if (new Date(this.session.endDate).getTime() < today.getTime()) {
        this.session.endDate = newEndDate
      }
    }

    // this.session.isActive = false
    // this.date = new Date
    // this.startDate = new Date(this.session.startDate)
    // this.endDate = new Date(this.session.endDate)

    // console.log('startDate' + this.startDate)
    // console.log('session.startDate' + this.session.startDate)
    // console.log('endDate' + this.endDate)
    // console.log('session.endDate' + this.session.endDate)

    // console.log('Date' + this.date)

    // if (this.startDate.getTime < this.date.getTime) {
    //   if (this.endDate.getTime > this.date.getTime) {
    //     console.log('this.session.isActive = true')
    //     this.session.isActive = true
    //   }
    // }


    if (this.session.id) {
      this.saveOrUpdateAuth(this.session.id)
      return this.sessionService.update(this.session)
    } else {
      this.session.startDate = new Date
      return this.sessionService.create(this.session).take(1).map((session) => {
        this.session = session
        this.sessions.push(session)

        if (this.startSessionwithCards) {
          this.cards.forEach(card => {
            let sessionCard = new SessionCard
            sessionCard.cardId = card.id
            sessionCard.sessionId = session.id
            this.sessionCardService.create(sessionCard)
          })
        }
        this.saveOrUpdateAuth(session.id)
      })
    }
  }

  savePassword(sessionId: number): void {
    this.auth.sessionId = sessionId
    this.authService.findBySessionId(sessionId).take(1).subscribe(data => {
      // console.log(data)
      if (data.length > 0) {
        this.auth.id = data[0].id
        // console.log('update')
        this.authService.update(this.auth)
      } else {
        // console.log('save')
        this.authService.create(this.auth)
      }
    })
  }

  async saveOrUpdateAuth(sessionId: number) {
    try {
      await this.savePassword(sessionId)
    } catch (err) {
    }
  }

  clear() {
    this.session = new Session
  }

  saveAndManage() {
    this.save().take(1).subscribe(() => this.sessionService.sessionSubject.next(this.session))
  }
}
