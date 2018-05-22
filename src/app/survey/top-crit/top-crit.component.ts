import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { UserSessionCardService } from '../../core/service/user-session-card.service'
import { LocalStore } from './../../core/localStore'
import { CardStruct } from './../../core/model/cardStruct'
import { CardService } from './../../core/service/card.service'

@Component({
  selector: 'app-top-crit',
  templateUrl: './top-crit.component.html',
  styleUrls: ['./top-crit.component.css']
})
export class TopCritComponent implements OnInit {

  cards: CardStruct[] = []
  selectedCount = 0

  constructor(
    private router: Router,
    private usCardService: UserSessionCardService,
    private cardService: CardService) { }

  ngOnInit() {
    LocalStore.getCards(this.usCardService, this.cardService).then(() =>
      this.usCardService.cards.forEach(cardStruct => {
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
      if (this.selectedCount < 15) {
        cardStruct.usCard.isTop15 = true
        this.selectedCount += 1
        this.usCardService.update(cardStruct.usCard)
          .catch(() => {
            cardStruct.usCard.isTop15 = false
            this.selectedCount -= 1
            return Observable.throw('usCardService.update error')
          })
      } else {
        this.navProgress()
      }
    } else {
      cardStruct.usCard.isTop15 = false
      this.selectedCount -= 1
      this.usCardService.update(cardStruct.usCard)
        .catch(() => {
          cardStruct.usCard.isTop15 = true
          this.selectedCount += 1
          return Observable.throw('usCardService.update error')
        })
    }
  }

  navProgress() {
    let progress = '/strong'
    this.usCardService.setLocalStorage("progress", progress)
    this.usCardService.progressSubj.next(progress)
    this.router.navigate(['/survey' + progress])
  }

}
