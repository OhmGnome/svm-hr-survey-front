import { GenericEndpoints } from './generic-endpoints'
import { CardStruct } from './../cardStruct'
import { UserSession } from '../model/userSession'
import { Subject } from 'rxjs/Subject'
import { environment } from './../../../environments/environment'
import { Card } from './../model/card'
import { UserSessionCard } from './../model/userSessionCard'
import { Injectable, OnInit } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class UserSessionCardService extends GenericEndpoints<UserSessionCard>  {

  userSession: UserSession
  cards: CardStruct[] = []
  cardsIndex: number

  progressSubj = new Subject<string>()
  progressObs = this.progressSubj.asObservable()

  constructor(public http: Http) {
    super(http, new UserSessionCard)
  }

  findByUserSessionId(id) {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUserSessionId?id=' + id)
      .toPromise()
      .then(response => response.json()._embedded.userSessionCard as UserSessionCard[])
      .catch(this.handleError)
  }

  findByUserSessionIdIn(ids: number[]): Promise<UserSessionCard[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUserSessionIdIn?ids=' + JSON.stringify(ids).replace('[', '').replace(']', ''))
      .toPromise()
      .then(response => response.json()._embedded.userSessionCard as UserSessionCard[])
      .catch(this.handleError)
  }

  findUserSessionCards(): Promise<UserSessionCard[]> {
    return this.http.get(environment.apiBaseUrl + this.model + 'Card')
      .toPromise()
      .then(response => response.json()._embedded.userSessionCard as UserSessionCard[])
      .catch(this.handleError)
  }

  findByCardId(id) {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByCardId?id=' + id)
      .toPromise()
      .then(response => response.json()._embedded.userSessionCard as UserSessionCard[])
      .catch(this.handleError)
  }

  batchSave(UserSessionCards: UserSessionCard[]): Promise<UserSessionCard[]> {
    return this.http.post(environment.apiBaseUrl + this.model + '/batch/save', UserSessionCards)
      .toPromise()
      .then(response => response.json() as UserSessionCard[])
      .catch(this.handleError)
  }

  getLocalStorage = function (property) {
    return window.localStorage.getItem(property)
  }

  setLocalStorage = function (property, value) {
    window.localStorage.setItem(property, value)
  }

}
