import { Subject } from 'rxjs/Subject'
import { Card } from './../../../core/model/card'
import { CardService } from './../../../core/service/card.service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  cardService: CardService
  cards: Card[]
  cardsSubscription: any
  cardSubscription: any

  card: Card = new Card
  form: FormGroup

  constructor(cardService: CardService) {
    this.cardService = cardService
  }

  ngOnInit() {
    this.cardSubscription = this.cardService.cardObservable.subscribe(card => this.card = card)
    this.cardsSubscription = this.cardService.getCache().subscribe(cards => this.cards = cards)
  }

  ngOnDestroy() {
    this.cardsSubscription.unsubscribe()
    this.cardSubscription.unsubscribe()
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
