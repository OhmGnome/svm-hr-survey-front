import { GenericEndpoints } from './generic-endpoints'
import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'
import { UserSession } from './../model/userSession'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class UserSessionService extends GenericEndpoints<UserSession> {

  userSession: UserSession

  constructor(public http: Http) {
    super(http, new UserSession)
  }

  setUserSession(id): Promise<UserSession> {
    return this.findById(id).then(data => this.userSession = data)
  }

  findByUserId(id): Promise<UserSession[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUserId?id=' + id)
      .toPromise()
      .then(response => response.json()._embedded.userSession as UserSession[])
      .catch(this.handleError)
  }

  findBySessionId(id): Promise<UserSession[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findBySessionId?id=' + id)
      .toPromise()
      .then(response => response.json()._embedded.userSession as UserSession[])
      .catch(this.handleError)
  }

  findByUserIdAndSessionId(userId: number, sessionId: number): Promise<UserSession[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUserIdAndSessionId?userId=' + userId + '&sessionId=' + sessionId)
      .toPromise()
      .then(response => response.json()._embedded.userSession as UserSession[])
      .catch(this.handleError)
  }
}
