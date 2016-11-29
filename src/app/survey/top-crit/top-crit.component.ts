import { LocalStore } from './../../core/localStore'
import { CardService } from './../../core/service/card.service'
import { UserSessionCard } from './../../core/model/userSessionCard'
import { AuthService } from '../../core/service/auth.service'
import { Router } from '@angular/router'
import { CardStruct } from './../../core/cardStruct'
import { UserSessionCardService } from '../../core/service/user-session-card.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-top-crit',
  templateUrl: './top-crit.component.html',
  styleUrls: ['./top-crit.component.css']
})
export class TopCritComponent implements OnInit {
  service: UserSessionCardService
  router: Router

  cards: CardStruct[] = []
  selectedCount: number = 0

  constructor(router: Router, service: UserSessionCardService, private cardService: CardService) {
    this.router = router
    this.service = service
  }

  ngOnInit() {
    LocalStore.getCards(this.service , this.cardService).then(() =>
    this.service.cards.forEach(cardStruct => {
      if (cardStruct.usCard.isMoreCritical === true) {
        this.cards.push(cardStruct)
      }
      if (cardStruct.usCard.isTop15 === true) {
        this.selectedCount += 1
      }
    })
    )
  }

  selectCard(cardStruct: CardStruct) {
    if (!cardStruct.usCard.isTop15) {
      if (this.selectedCount < 16) {
        cardStruct.usCard.isTop15 = true
        this.selectedCount += 1
        this.service.update(cardStruct.usCard)
          .catch(() => {cardStruct.usCard.isTop15 = false
          this.selectedCount -= 1
        })
      } else {
        this.navProgress()
      }
    } else {
      cardStruct.usCard.isTop15 = false
      this.selectedCount -= 1
      this.service.update(cardStruct.usCard)
        .catch(() => {cardStruct.usCard.isTop15 = true
        this.selectedCount += 1
      })
    }
  }

  navProgress() {
    let progress = '/strong'
    this.service.setLocalStorage("progress", progress)
    this.service.progressSubj.next(progress)
    this.router.navigate(['/survey' + progress])
  }

}
