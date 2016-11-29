import { forEach } from 'c:/Users/sdidier/node2/survey3/node_modules/@angular/router/src/utils/collection'
import { SessionService } from './../../../core/service/session.service'
import { SessionCardService } from '../../../core/service/session-card.service'
import { CardService } from './../../../core/service/card.service'
import { Session } from './../../../core/model/session'
import { Card } from './../../../core/model/card'
import { SessionCard } from './../../../core/model/sessionCard'
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-cards-man',
  templateUrl: './cards-man.component.html',
  styleUrls: ['./cards-man.component.css']
})
export class CardsManComponent implements OnInit {
  cardService: CardService
  sessionCardService: SessionCardService
  sessionService: SessionService

  session: Session = new Session
  sessionSubscription: any
  cardsSubscription: any
  sessionCardsJoin: SessionCard[]

  messageCanOnlyEditOne: string = ''
  cards: Card[] = []
  sessionCards: Card[] = []
  selectedSessionCards: Card[]
  selectedCards: Card[]

  constructor(cardService: CardService, sessionCardService: SessionCardService, sessionService: SessionService) {
    this.cardService = cardService
    this.sessionService = sessionService
    this.sessionCardService = sessionCardService
  }

  ngOnInit() {
    this.sessionSubscription = this.sessionService.sessionObservable.subscribe(session => this.session = session)
    this.cardsSubscription = this.cardService.getCache().subscribe(cards => {
    this.cards = cards
      if (this.session.id) {
        this.sessionCardService.findBySessionId(this.session.id)
          .then(data => {
            this.sessionCardsJoin = data
            data.forEach(sessionCard => { this.sessionCards.push(this.cards.find(card => card.id === sessionCard.cardId)) })
          })
      }
    })
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe()
    this.cardsSubscription.unsubscribe()
  }

  editCard() {
    let card = this.selectedCards[0]
    this.cardService.cardSubject.next(card)
    this.messageCanOnlyEditOne = 'Can only edit one card at a time, first selected card will be edited instead'
    setTimeout(this.messageCanOnlyEditOne = '', 5000)
  }

  deleteCard() {
    this.selectedCards.forEach(card => {
      this.cardService.delete(card.id)
      this.cards.splice(this.cards.indexOf(card, 0), 1)
      this.sessionCards.splice(this.sessionCards.indexOf(card, 0), 1)
      this.sessionCardsJoin.splice(this.sessionCardsJoin.indexOf(this.sessionCardsJoin.find(sessionCard => sessionCard.cardId === card.id), 0), 1)
    })
  }

  saveCardsToSession() {
    let count = 0
    this.selectedCards.forEach(card => {
      let cardId = card.id
      if (!this.sessionCards.find(sCard => sCard.id === cardId)) {
        let sessionCard = new SessionCard
        sessionCard.cardId = cardId
        sessionCard.sessionId = this.session.id
        this.sessionCardService.create(sessionCard).then((sessionCardSaved) => {
          this.sessionCardsJoin.push(sessionCardSaved)
          let card = this.cards.find(card => card.id === sessionCardSaved.cardId)
          this.sessionCards.push(card)
        })
      }
    })
  }

  deleteCardsFromSession() {
    this.selectedSessionCards.forEach(card => {
      let sessionCard = this.sessionCardsJoin.find(sessionCard => sessionCard.cardId === card.id)
      this.sessionCardService.delete(sessionCard.id)
        .then(() => {
          this.sessionCards.splice(this.sessionCards.indexOf(this.sessionCards.find(card => card.id === sessionCard.cardId), 0), 1)
          this.sessionCardsJoin.splice(this.sessionCardsJoin.indexOf(sessionCard, 0), 1)
        })
    })
  }

}
