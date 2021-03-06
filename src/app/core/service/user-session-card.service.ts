import { CardStruct } from './../model/cardStruct';

import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { UserSession } from '../model/userSession'
import { environment } from './../../../environments/environment'
import { UserSessionCard } from './../model/userSessionCard'
import { GenericEndpoints } from './generic-endpoints'

@Injectable()
export class UserSessionCardService extends GenericEndpoints<UserSessionCard>  {

  userSession: UserSession
  cards: CardStruct[] = []
  cardsIndex: number

  progressSubj = new Subject<string>()
  progressObs = this.progressSubj.asObservable()

  constructor(public http: Http) {
    super(http, 'userSessionCard')
  }

  findByUserSessionId(id) {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByUserSessionId?id=' + id)
      .map(response => response.json()._embedded.userSessionCard as UserSessionCard[])
      .catch(this.handleError)
  }

  findByUserSessionIdIn(ids: number[]): Observable<UserSessionCard[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByUserSessionIdIn?ids=' + JSON.stringify(ids).replace('[', '').replace(']', ''))
      .map(response => response.json()._embedded.userSessionCard as UserSessionCard[])
      .catch(this.handleError)
  }

  findUserSessionCards(): Observable<UserSessionCard[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + 'Card')
      .map(response => response.json()._embedded.userSessionCard as UserSessionCard[])
      .catch(this.handleError)
  }

  findByCardId(id) {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByCardId?id=' + id)
      .map(response => response.json()._embedded.userSessionCard as UserSessionCard[])
      .catch(this.handleError)
  }

  batchSave(UserSessionCards: UserSessionCard[]): Observable<UserSessionCard[]> {
    return this.http.post(environment.apiBaseUrl + this.modelName + '/batch/save', UserSessionCards)
      .map(response => response.json() as UserSessionCard[])
      .catch(this.handleError)
  }

  getLocalStorage (property) {
    return window.localStorage.getItem(property)
  }

  setLocalStorage (property, value) {
    window.localStorage.setItem(property, value)
  }

}
