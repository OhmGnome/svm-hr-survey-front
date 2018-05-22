import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { environment } from './../../../environments/environment'
import { Card } from './../model/card'
import { SessionCard } from './../model/sessionCard'
import { GenericEndpoints } from './generic-endpoints'

@Injectable()
export class SessionCardService extends GenericEndpoints<SessionCard> {
  public sessionCards: SessionCard[]
  public cards: Card[]

  constructor(public http: Http) {
    super(http, new SessionCard)
  }

  findBySessionId(id: number): Observable<SessionCard[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findBySessionId?id=' + id)
      .map(response => response.json()._embedded.sessionCard as SessionCard[])
      .catch(this.handleError)
  }

  setSessionCards(id: number): Observable<SessionCard[]> {
    return this.findBySessionId(id).map(data => this.sessionCards = data)
  }

  findByCardId(id: number): Observable<SessionCard[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByCardId?id=' + id)
      .map(response => response.json()._embedded.sessionCard as SessionCard[])
      .catch(this.handleError)
  }

}
