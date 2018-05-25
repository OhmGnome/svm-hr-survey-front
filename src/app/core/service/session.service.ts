import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { environment } from './../../../environments/environment'
import { Session } from './../model/session'
import { GenericEndpoints } from './generic-endpoints'

@Injectable()
export class SessionService extends GenericEndpoints<Session> {

  session: Session
  sessions: Session[]

  sessionSubject
  sessionObservable

  sessionsObservable

  constructor(public http: Http) {
    super(http, 'session')
    this.sessionSubject = new Subject<Session>()
    this.sessionObservable = this.sessionSubject.asObservable().publishReplay(1).refCount()
  }

  findSessions(): Observable<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName)
      .map(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  getCache() {
    if (!this.sessionsObservable) {
      this.sessionsObservable = this.http.get(environment.apiBaseUrl + this.modelName, this.options)
        .map(response => (response.json()._embedded.session)).publishReplay(1).refCount()
    }
    return this.sessionsObservable
  }

  setSession(id): Observable<Session> {
    return this.findById(id).map(data => this.session = data)
  }

  findByStartDateAfter(date): Observable<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByStartDateAfter?date=' + date)
      .map(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByStartDateBefore(date): Observable<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByStartDateBefore?date=' + date)
      .map(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByStartDateBetween(start, end): Observable<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByStartDateBetween?start=' + start + '&end=' + end)
      .map(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByLocationLike(location: string): Observable<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByLocationLike?id=' + location)
      .map(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByIsActive(isActive: boolean): Observable<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByIsActive?isActive=' + isActive)
      .map(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

  findByLocationLikeAndIsActive(location: string, isActive: boolean): Observable<Session[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByLocationLikeAndIsActive?location=' + location + '&isActive=' + isActive)
      .map(response => response.json()._embedded.session as Session[])
      .catch(this.handleError)
  }

}
