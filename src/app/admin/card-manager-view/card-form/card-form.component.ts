import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'

import { Card } from './../../../core/model/card'
import { CardService } from './../../../core/service/card.service'

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  cardService: CardService
  cards: Card[]
  subscriptions: Subscription[] = new Array<Subscription>()

  card: Card = new Card
  form: FormGroup

  constructor(cardService: CardService) {
    this.cardService = cardService
  }

  ngOnInit() {
    this.subscriptions = [
      this.cardService.cardObservable.subscribe(card => this.card = card),
      this.cardService.getCache().subscribe(cards => this.cards = cards)
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(scribe => scribe.unsubscribe())
  }

  save() {
    if (!this.card.id) {
      this.cardService.create(this.card)
        .then(data => (this.card = data,
          this.cards.push(data)))
    } else {
      this.cardService.update(this.card)
    }
  }

  clear() {
    this.card = new Card
  }

}
