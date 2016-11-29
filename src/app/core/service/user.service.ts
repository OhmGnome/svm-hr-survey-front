import { GenericEndpoints } from './generic-endpoints'
import { environment } from './../../../environments/environment'
import { User } from './../model/user'
import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'
import { Subject } from 'rxjs/Subject'

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

  findUsers(): Promise<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model)
      .toPromise()
      .then(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

  getCache() {
    if (!this.usersObservable) {
      this.usersObservable = this.http.get(environment.apiBaseUrl + this.model, { headers: this.headers })
        .map(response => (response.json()._embedded.user as User[])).publishReplay(1).refCount()
    }
    return this.usersObservable
  }

  setUser(id): Promise<User> {
    return this.findById(id).then(data => this.user = data) //here
  }


  findByUsername(username: string): Promise<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUsername?username=' + username, { headers: this.headers })
      .toPromise()
      .then(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

  findByUsernameLike(username: string): Promise<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUsernameLike?username=' + username)
      .toPromise()
      .then(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

  findByEmail(email: string): Promise<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByEmail?email=' + email)
      .toPromise()
      .then(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

  findByEmailLike(email: string): Promise<User[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByEmailLike?email=' + email)
      .toPromise()
      .then(response => response.json()._embedded.user as User[])
      .catch(this.handleError)
  }

}
