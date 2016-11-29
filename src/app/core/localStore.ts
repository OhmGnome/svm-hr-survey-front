import { CardStruct } from './cardStruct'
import { UserSessionCardService } from './service/user-session-card.service'
import { CardService } from './service/card.service'

export class LocalStore {

    static getCards(service: UserSessionCardService, cardService: CardService): Promise<{}> {
        let promise = new Promise(function (resolve, reject) {
            if (!service.userSession) {
                    // console.log('!service.userSession')
                let userSession = JSON.parse(service.getLocalStorage("userSession"))
                if (userSession) {
                    // console.log('userSession')
                    service.userSession = userSession
                    service.findByUserSessionId(userSession.id).then(userSessionCards => {
                        if (userSessionCards.length > 0) {
                            let cardIds = []
                            let cardStructs = []
                            userSessionCards.forEach(userSessionCard => cardIds.push(userSessionCard.cardId))
                            cardService.findByIdIn(cardIds).then(cards => {
                                userSessionCards.forEach(usCard => {
                                    let card = cards.find(card => card.id === usCard.cardId)
                                    let cardStruct = new CardStruct
                                    cardStruct.card = card
                                    cardStruct.usCard = usCard
                                    cardStructs.push(cardStruct)
                                })
                                service.cards = cardStructs
                                resolve({ result: true })
                            })
                        }
                    })
                }
            } else {
                // console.log('service.userSession')
                resolve({ result: false })
            }
        })
        return promise
    }

    static getProgress(service: UserSessionCardService, cardService: CardService) {
        service.progressSubj.next(service.getLocalStorage("progress"))
    }
}