import { GenericEndpoints } from './generic-endpoints'
import { environment } from './../../../environments/environment'
import { SessionsManComponent } from './../../admin/session-manager-view/sessions-man/sessions-man.component'
import { Session } from './../model/session'
import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class SessionService extends GenericEndpoints<Session> {

  session: Session
  sessions: Session[]

  sessionSubject
  sessionObservable

  sessionsObservable

  constructor(public http: Http) {
    super(http, new Session)
    this.sessionSubject = new Subject<Session>()
    this.sessionObservable = this.sessionSubject.asObservable().publishReplay(1).refCount()
  }

  findSessions(): Promise<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.model)
      .toPromise()
      .then(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  getCache() {
    if (!this.sessionsObservable) {
      this.sessionsObservable = this.http.get(environment.apiBaseUrl + this.model, { headers: this.headers })
        .map(response => (response.json()._embedded.session)).publishReplay(1).refCount()
    }
    return this.sessionsObservable
  }

  setSession(id): Promise<Session> {
    return this.findById(id).then(data => this.session = data)
  }

  findByStartDateAfter(date): Promise<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByStartDateAfter?date=' + date)
      .toPromise()
      .then(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByStartDateBefore(date): Promise<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByStartDateBefore?date=' + date)
      .toPromise()
      .then(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByStartDateBetween(start, end): Promise<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByStartDateBetween?start=' + start + '&end=' + end)
      .toPromise()
      .then(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByLocationLike(location: string): Promise<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByLocationLike?id=' + location)
      .toPromise()
      .then(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByIsActive(isActive: boolean): Promise<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByIsActive?isActive=' + isActive)
      .toPromise()
      .then(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByLocationLikeAndIsActive(location: string, isActive: boolean): Promise<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByLocationLikeAndIsActive?location=' + location + '&isActive=' + isActive)
      .toPromise()
      .then(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

}
