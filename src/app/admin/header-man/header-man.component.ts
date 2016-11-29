import { Session } from '../../core/model/session'
import { SessionService } from '../../core/service/session.service'
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-header-man',
  templateUrl: './header-man.component.html',
  styleUrls: ['./header-man.component.css']
})
export class HeaderManComponent implements OnInit {
  sessionService: SessionService
  presentRoute: string
  sessionSubscription

  session: Session = new Session


  constructor(sessionService: SessionService) {
    this.sessionService = sessionService
  }

  ngOnInit() {
    this.sessionSubscription = this.sessionService.sessionObservable.subscribe(session => this.session = session)
    this.presentRoute = '/sessionManagerView'
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe()
  }

  currentRoute(route: string) {
    this.presentRoute = route
  }

  isActive = function (route: string) {
    return route === this.presentRoute
  }
}
