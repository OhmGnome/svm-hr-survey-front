import { Card } from './card'
import { UserSessionCard } from './userSessionCard'

export class CardStruct {
    card: Card
    usCard: UserSessionCard
    isDirty: boolean = false
}