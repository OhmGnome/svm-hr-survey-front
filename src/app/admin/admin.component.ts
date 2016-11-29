import { CardService } from './../core/service/card.service'
import { SessionService } from './../core/service/session.service'
import { UserService } from './../core/service/user.service'
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  // selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userService: UserService
  cardService: CardService
  sessionService: SessionService

  constructor(userService: UserService, cardService: CardService, sessionService: SessionService) {
    this.userService = userService
    this.cardService = cardService
    this.sessionService = sessionService
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.userService.userObservable = null
    // this.userService.usersObservable = null
    // this.userService.userSubject.unsubscribe

    // this.cardService.cardObservable = null
    // this.cardService.cardsObservable = null
    // this.cardService.cardSubject.unsubscribe

    // this.sessionService.sessionObservable = null
    // this.sessionService.sessionsObservable = null
    // this.sessionService.sessionSubject.unsubscribe
  }

}
