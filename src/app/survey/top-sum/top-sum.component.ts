import { forEach } from 'c:/Users/sdidier/node2/survey3/node_modules/@angular/router/src/utils/collection'
import { CardCount } from './../../core/cardCount'
import { UserSession } from '../../core/model/userSession'
import { UserSessionService } from './../../core/service/user-session.service'
import { LocalStore } from './../../core/localStore'
import { CardService } from './../../core/service/card.service'
import { UserSessionCard } from './../../core/model/userSessionCard'
import { AuthService } from '../../core/service/auth.service'
import { Router } from '@angular/router'
import { CardStruct } from './../../core/cardStruct'
import { UserSessionCardService } from '../../core/service/user-session-card.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-top-sum',
  templateUrl: './top-sum.component.html',
  styleUrls: ['./top-sum.component.css']
})
export class TopSumComponent implements OnInit {
  cardCounts: CardCount[] = []

  constructor(private router: Router,
    private service: UserSessionCardService,
    private userSessionservice: UserSessionService,
    private cardService: CardService) { }

  ngOnInit() {
    let usCards: UserSessionCard[] = []
    LocalStore.getCards(this.service, this.cardService).then(() => {
      this.userSessionservice.findBySessionId(this.service.userSession.sessionId)
        .then(userSessions => {
          let numUserSessions = userSessions.length
          let userSessionIds: number[] = []
          userSessions.forEach(userSession => userSessionIds.push(userSession.id))
          this.service.findByUserSessionIdIn(userSessionIds)
            .then(usCards => {
              this.service.cards.forEach(cardStruct => {
                let isMoreCriticalCount: number = 0
                let isTop15Count: number = 0
                let isGreenCount: number = 0
                let cloneUsCards = usCards.filter(usCard => usCard.cardId === cardStruct.card.id)
                cloneUsCards.forEach(clone => {
                  if (clone.isMoreCritical) isMoreCriticalCount += 1
                  if (clone.isTop15) isTop15Count += 1
                  if (clone.isGreen) isGreenCount += 1
                })
                let cardCount = new CardCount
                cardCount.card = cardStruct.card
                cardCount.isRed = isGreenCount <= numUserSessions / 2
                cardCount.isMoreCritical = isMoreCriticalCount
                cardCount.isTop15 = isTop15Count
                cardCount.isGreen = isGreenCount
                this.cardCounts.push(cardCount)
              })
              this.sort(this.cardCounts, 'isTop15')
              this.sort(this.cardCounts, 'isGreen')
            })
        })
    })
  }

  sort(array: any[], prop1: string): void {
    array.sort(function (a, b) {
      if (a[prop1] < b[prop1]) {
        return 1
      }
      if (a[prop1] > b[prop1]) {
        return -1
      }
      return 0
    })
    array.sort()
  }
}