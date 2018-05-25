import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { environment } from './../../../environments/environment'

@Injectable()
export class GenericEndpoints<T> {
  public options = new RequestOptions
  public modelName: string

  constructor(public http: Http, modelName: string) {
    this.modelName = modelName
    this.options.headers = new Headers({ 'Content-Type': 'application/json' })
  }

  findById(id): Observable<T> {
    return this.http.get(environment.apiBaseUrl + this.modelName + '/search/findById?id=' + id)
      .map(response => response.json() as T)
      .catch(this.handleError)
  }

  delete(id: number): Observable<void> {
    return this.http.delete(environment.apiBaseUrl + this.modelName + '/' + id, this.options)
      .map(() => null)
      .catch(this.handleError)
  }

  create(model: T): Observable<T> {
    return this.http
      .post(environment.apiBaseUrl + this.modelName, JSON.stringify(model), this.options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  update(model: T): Observable<T> {
    return this.http
      .put(environment.apiBaseUrl + this.modelName + '/' + model['id'], JSON.stringify(model), this.options)
      .map(model => model)
      .catch(this.handleError)
  }

  public handleError(error: any): Observable<any> {
    console.error('An error occurred', error)
    return Observable.throw(error.message || error)
  }

}