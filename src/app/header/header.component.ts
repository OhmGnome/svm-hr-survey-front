import { LocalStore } from './../core/localStore'
import { CardStruct } from './../core/cardStruct'
import { UserSession } from './../core/model/userSession'
import { SessionCardService } from './../core/service/session-card.service'
import { Router } from '@angular/router'
import { CardService } from './../core/service/card.service'
import { UserSessionCardService } from './../core/service/user-session-card.service'
import { AuthService } from '../core/service/auth.service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  subscriptions: Subscription[] = new Array<Subscription>()
  service: UserSessionCardService
  router: Router
  cardService: CardService

  presentRoute: string
  isLoggedIn: boolean
  progress: string

  constructor(router: Router, service: UserSessionCardService, cardService: CardService,
  private authService: AuthService) {
    this.service = service
    this.router = router
    this.cardService = cardService
  }

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


