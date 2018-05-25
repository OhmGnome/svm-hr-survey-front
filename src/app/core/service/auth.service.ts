import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { environment } from './../../../environments/environment'
import { Auth } from './../model/auth'
import { GenericEndpoints } from './generic-endpoints'

@Injectable()
export class AuthService extends GenericEndpoints<Auth>{

  isLoggedIn: boolean = false
  redirectUrl: string

  constructor(public http: Http) {
    super(http, 'auth')
  }

  findByUserId(id: number): Observable<Auth[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findByUserId?id=' + id, this.options)
    .catch(this.handleError)  
    .map(response => response.json()._embedded.auth as Auth[])
  }

  login(id: number, password: string) {
    return this.findByUserId(id)
    .map(auths => {
      let auth = auths[0]
      if (auth)
        if (auth.role === "admin")
          if (auth.password === password)
            this.isLoggedIn = true
          else this.isLoggedIn = false
        else this.isLoggedIn = false
      else this.isLoggedIn = false
    })
  }

  logout(): void {
    this.isLoggedIn = false
  }

  findBySessionId(id): Observable<Auth[]> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findBySessionId?id=' + id, this.options)
    .catch(this.handleError)  
    .map(response => response.json()._embedded.auth as Auth[])
  }
}
