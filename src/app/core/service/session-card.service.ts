import { GenericEndpoints } from './generic-endpoints'
import { environment } from './../../../environments/environment'
import { Card } from './../model/card'
import { SessionCard } from './../model/sessionCard'
import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class SessionCardService extends GenericEndpoints<SessionCard> {
  public sessionCards: SessionCard[]
  public cards: Card[]

  constructor(public http: Http) {
    super(http, new SessionCard)
  }

  findBySessionId(id: number): Promise<SessionCard[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findBySessionId?id=' + id)
      .toPromise()
      .then(response => response.json()._embedded.sessionCard as SessionCard[])
      .catch(this.handleError)
  }

  setSessionCards(id: number): Promise<SessionCard[]> {
    return this.findBySessionId(id).then(data => this.sessionCards = data)
  }

  findByCardId(id: number): Promise<SessionCard[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByCardId?id=' + id)
      .toPromise()
      .then(response => response.json()._embedded.sessionCard as SessionCard[])
      .catch(this.handleError)
  }

}
