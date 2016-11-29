import { environment } from './../../../environments/environment'
import { GenericEndpoints } from './generic-endpoints'
import { Http, Headers } from '@angular/http'
import { Auth } from './../model/auth'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthService extends GenericEndpoints<Auth>{

  isLoggedIn: boolean = false
  redirectUrl: string

  constructor(public http: Http) {
    super(http, new Auth)
  }

  findByUserId(id: number): Promise<Auth[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findByUserId?id=' + id, this.headers)
      .toPromise()
      .then(response => response.json()._embedded.auth as Auth[])
      .catch(this.handleError)
  }

  login(id: number, password: string) {
    return this.findByUserId(id).then(auths => {
      let auth = auths[0]
      if (auth)
        if (auth.role = "admin")
          if (auth.password = password)
            this.isLoggedIn = true
          else this.isLoggedIn = false
        else this.isLoggedIn = false
      else this.isLoggedIn = false
    })
  }

  logout(): void {
    this.isLoggedIn = false
  }

  findBySessionId(id): Promise<Auth[]> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findBySessionId?id=' + id, this.headers)
      .toPromise()
      .then(response => response.json()._embedded.auth as Auth[])
      .catch(this.handleError)
  }
}
