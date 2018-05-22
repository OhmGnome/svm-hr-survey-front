import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { AuthService } from '../core/service/auth.service'
import { LocalStore } from './../core/localStore'
import { CardService } from './../core/service/card.service'
import { UserSessionCardService } from './../core/service/user-session-card.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscriptions: Subscription[] = new Array<Subscription>()

  presentRoute: string
  isLoggedIn: boolean
  progress: string

  constructor(
    private router: Router,
    private service: UserSessionCardService,
    private cardService: CardService,
    private authService: AuthService) {}

  ngOnInit() {
    this.subscriptions = [this.service.progressObs.subscribe(data => this.progress = data)]
    
    LocalStore.getProgress(this.service, this.cardService)
    this.isLoggedIn = !!this.service.userSession
    this.presentRoute = '/login'
  }

  ngOnDestroy() {
    this.subscriptions.forEach(scribe => scribe.unsubscribe())
  }

  currentRoute(route: string) {
    this.presentRoute = route
  }

  isActive = function (route: string) {
    return route === this.presentRoute
  }

  surveyRoute(route: string) {
    this.currentRoute(route)
    this.router.navigate(['/survey' + (this.progress || '/login')])
  }

  logout() {
    this.currentRoute('/login')
    this.service.setLocalStorage("userSession", null)
    this.service.setLocalStorage("progress", null)
    this.service.userSession = null
    this.service.cards = []
    this.service.progressSubj.next('/login')
    this.authService.isLoggedIn = false
  }
}


