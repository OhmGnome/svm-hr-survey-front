import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class GenericEndpoints<T> {

  public headers = new Headers({ 'Content-Type': 'application/json' })
  private clas: T
  public model: string

  constructor(public http: Http, clas: T) {
    this.clas = clas
    let endpoint = '/'
      + this.clas.constructor.name.toString().charAt(0).toLowerCase()
      + this.constructor.name.toString().slice(1)
    this.model = endpoint.replace('Service', '')
  }

  findById(id): Promise<T> {
    return this.http.get(environment.apiBaseUrl + this.model + '/search/findById?id=' + id)
      .toPromise()
      .then(response => response.json() as T)
      .catch(this.handleError)
  }

  delete(id: number): Promise<void> {
    return this.http.delete(environment.apiBaseUrl + this.model + '/' + id, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError)
  }

  create(model: T): Promise<T> {
    return this.http
      .post(environment.apiBaseUrl + this.model, JSON.stringify(model), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  update(model: T): Promise<T> {
    return this.http
      .put(environment.apiBaseUrl + this.model + '/' + model['id'], JSON.stringify(model), { headers: this.headers })
      .toPromise()
      .then(() => model)
      .catch(this.handleError)
  }

  public handleError(error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }

}