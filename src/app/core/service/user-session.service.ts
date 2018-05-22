import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { environment } from './../../../environments/environment'
import { UserSession } from './../model/userSession'
import { GenericEndpoints } from './generic-endpoints'

@Injectable()
export class UserSessionService extends GenericEndpoints<UserSession> {

  userSession: UserSession

  constructor(public http: Http) {
    super(http, new UserSession)
  }

  setUserSession(id): Observable<UserSession> {
    return this.findById(id).map(data => this.userSession = data)
  }

  findByUserId(id): Observable<UserSession[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUserId?id=' + id)
      .map(response => response.json()._embedded.userSession as UserSession[])
      .catch(this.handleError)
  }

  findBySessionId(id): Observable<UserSession[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findBySessionId?id=' + id)
      .map(response => response.json()._embedded.userSession as UserSession[])
      .catch(this.handleError)
  }

  findByUserIdAndSessionId(userId: number, sessionId: number): Observable<UserSession[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUserIdAndSessionId?userId=' + userId + '&sessionId=' + sessionId)
      .map(response => response.json()._embedded.userSession as UserSession[])
      .catch(this.handleError)
  }
}
  