import 'rxjs/add/operator/publishReplay'

import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { environment } from './../../../environments/environment'
import { Card } from './../model/card'
import { GenericEndpoints } from './generic-endpoints'

@Injectable()
export class CardService extends GenericEndpoints<Card> {

  cardSubject = new Subject<Card>()
  cardObservable = this.cardSubject.asObservable()

  cardsObservable

  public cards: Card[]
  card: Card

  constructor(public http: Http) {
    super(http, 'card')
  }

  findCards(): Observable<Card[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName, this.options)
      .map(response => response.json()._embedded.card as Card[])
      .catch(this.handleError)
  }

  getCache() {
    if (!this.cardsObservable) {
      this.cardsObservable = this.http.get(environment.apiBaseUrl + this.modelName, this.options)
        .map(response => (response.json()._embedded.card)).publishReplay(1).refCount()
    }
    return this.cardsObservable
  }

  findByIdIn(ids: number[]): Observable<Card[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByIdIn?ids=' + JSON.stringify(ids).replace('[', '').replace(']', ''))
      .map(response => response.json()._embedded.card as Card[])
      .catch(this.handleError)
  }

}
