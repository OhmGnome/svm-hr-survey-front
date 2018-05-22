import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { environment } from './../../../environments/environment'
import { User } from './../model/user'
import { GenericEndpoints } from './generic-endpoints'

@Injectable()
export class UserService extends GenericEndpoints<User> {

  user: User
  userSubject = new Subject<User>()
  userObservable = this.userSubject.asObservable()

  users: User[]
  usersObservable

  constructor(public http: Http) {
    super(http, new User)
  }

  findUsers(): Observable<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model)
      .map(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

  getCache() {
    if (!this.usersObservable) {
      this.usersObservable = this.http.get(environment.apiBaseUrl + this.model, this.options)
        .map(response => (response.json()._embedded.user as User[])).publishReplay(1).refCount()
    }
    return this.usersObservable
  }

  setUser(id): Observable<User> {
    return this.findById(id).map(data => this.user = data) //here
  }


  findByUsername(username: string): Observable<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUsername?username=' + username, this.options)
      .map(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

  findByUsernameLike(username: string): Observable<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUsernameLike?username=' + username)
      .map(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

  findByEmail(email: string): Observable<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByEmail?email=' + email)
      .map(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

  findByEmailLike(email: string): Observable<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByEmailLike?email=' + email)
      .map(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

}
