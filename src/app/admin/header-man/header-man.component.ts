import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { Session } from '../../core/model/session'
import { SessionService } from '../../core/service/session.service'

@Component({
  selector: 'app-header-man',
  templateUrl: './header-man.component.html',
  styleUrls: ['./header-man.component.css']
})
export class HeaderManComponent implements OnInit {
  presentRoute: string
  subscriptions: Subscription[] = new Array<Subscription>()

  session: Session = new Session


  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.subscriptions = [this.sessionService.sessionObservable.subscribe(session => this.session = session)]
    this.presentRoute = '/sessionManagerView'
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
}
