import { Card } from './model/card'
import { UserSessionCard } from './model/userSessionCard'
export class CardStruct{
    card: Card
	usCard: UserSessionCard
    isDirty: boolean = false
}