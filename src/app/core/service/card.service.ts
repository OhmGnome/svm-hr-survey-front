import { GenericEndpoints } from './generic-endpoints'
import { environment } from './../../../environments/environment'
import { Card } from './../model/card'
import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'
import { Subject } from 'rxjs/Subject'

import 'rxjs/add/operator/publishReplay'

@Injectable()
export class CardService extends GenericEndpoints<Card> {

  cardSubject = new Subject<Card>()
  cardObservable = this.cardSubject.asObservable()

  cardsObservable

  public cards: Card[]
  card: Card

  constructor(public http: Http) {
    super(http, new Card)
  }

  findCards(): Promise<Card[]> {
    return this.http.get(environment.apiBaseUrl + this.model, { headers: this.headers })
      .toPromise()
      .then(response => response.json()._embedded.card as Card[])
      .catch(this.handleError)
  }

  getCache() {
    if (!this.cardsObservable) {
      this.cardsObservable = this.http.get(environment.apiBaseUrl + this.model, { headers: this.headers })
        .map(response => (response.json()._embedded.card)).publishReplay(1).refCount()
    }
    return this.cardsObservable
  }

  findByIdIn(ids: number[]): Promise<Card[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByIdIn?ids=' + JSON.stringify(ids).replace('[', '').replace(']', ''))
      .toPromise()
      .then(response => response.json()._embedded.card as Card[])
      .catch(this.handleError)
  }

}
