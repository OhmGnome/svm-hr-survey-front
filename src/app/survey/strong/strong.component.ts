import { CardService } from './../../core/service/card.service'
import { LocalStore } from './../../core/localStore'
import { UserSessionCard } from './../../core/model/userSessionCard'
import { AuthService } from '../../core/service/auth.service'
import { Router } from '@angular/router'
import { CardStruct } from './../../core/cardStruct'
import { UserSessionCardService } from '../../core/service/user-session-card.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-strong',
  templateUrl: './strong.component.html',
  styleUrls: ['./strong.component.css']
})
export class StrongComponent implements OnInit {
  service: UserSessionCardService
  router: Router

  cards: CardStruct[] = []
  selectedCount: number = 0
  message = ''

  constructor(router: Router, service: UserSessionCardService, private cardService: CardService) {
    this.router = router
    this.service = service
  }

  ngOnInit() {
    LocalStore.getCards(this.service, this.cardService).then(() =>
      this.service.cards.forEach(cardStruct => {
        if (cardStruct.usCard.isTop15 === true) {
          this.cards.push(cardStruct)
        }
      })
    )
  }

  navProgress() {
    let isComplete: boolean = true
    this.cards.forEach(cardStruct => { if (cardStruct.isDirty === false) isComplete = false })
    if (isComplete) {
      this.cards.forEach(cardStruct => (this.service.update(cardStruct.usCard),
        cardStruct.isDirty = false))
      let progress = '/topSum'
      this.router.navigate(['/survey' + progress])
    } else {
      this.message = 'Please assign polarity to all the issues '
      setTimeout(this.message = '', 8000)
    }
  }
}
