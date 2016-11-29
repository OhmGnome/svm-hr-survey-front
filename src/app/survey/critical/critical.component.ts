import { CardService } from './../../core/service/card.service'
import { LocalStore } from './../../core/localStore'
import { AuthService } from '../../core/service/auth.service'
import { CardStruct } from './../../core/cardStruct'
import { UserSessionCard } from './../../core/model/userSessionCard'
import { UserSessionCardService } from './../../core/service/user-session-card.service'
import { Card } from './../../core/model/card'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-critical',
    templateUrl: './critical.component.html',
    styleUrls: ['./critical.component.css']
})
export class CriticalComponent implements OnInit {
    router: Router
    service: UserSessionCardService
    currentCardSubscription

    cardStruct: CardStruct
    currentCard: number


    constructor(router: Router, service: UserSessionCardService, private cardService: CardService) {
        this.router = router
        this.service = service
    }

    ngOnInit() {
        this.currentCard = 0
        this.cardStruct = new CardStruct
        this.cardStruct.card = new Card
        this.cardStruct.usCard = new UserSessionCard
        console.log('init ')
        LocalStore.getCards(this.service, this.cardService).then((result) => {
            console.log('then ')
            console.log(this.service.cards)
            this.currentCard = this.service.cardsIndex || 0
            this.cardStruct = this.service.cards[this.currentCard]
        })
    }

    moreCrit() {
        this.cardStruct.usCard.isMoreCritical = true
        this.cardStruct.isDirty = true
    }

    lessCrit() {
        this.cardStruct.usCard.isMoreCritical = false
        this.cardStruct.isDirty = true
    }

    prevCard() {
        this.currentCard -= 1
        if (this.currentCard < 0) this.currentCard = 0
        this.navCard()
    }

    nextCard() {
        this.currentCard += 1
        if (this.currentCard === this.service.cards.length) {
            for (let i = 0; i < this.service.cards.length - 1; i++) {
                if (!this.service.cards[i].isDirty) {
                    this.currentCard = i
                    return this.navCard()
                }
            }
            this.currentCard -= 1
            return this.navProgress()
        } else {
            this.navCard()
        }
    }

    navCard() {
        this.service.update(this.cardStruct.usCard).then(() => {
            this.service.cardsIndex = this.currentCard
            this.cardStruct = this.service.cards[this.currentCard]
        })
    }

    navProgress() {
        this.service.cards.forEach(cardStruct => cardStruct.isDirty = false)
        let progress = '/topCrit'
        this.service.setLocalStorage("progress", progress)
        this.service.progressSubj.next(progress)
        this.router.navigate(['/survey' + progress])
    }

    navForceProgress() {
        let progress = '/topCrit'
        this.service.setLocalStorage("progress", progress)
        this.service.progressSubj.next(progress)
        this.router.navigate(['/survey' + progress])
    }
}
