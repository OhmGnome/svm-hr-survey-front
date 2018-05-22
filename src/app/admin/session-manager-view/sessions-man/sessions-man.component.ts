import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { Session } from './../../../core/model/session'
import { SessionService } from './../../../core/service/session.service'

@Component({
  selector: 'app-sessions-man',
  templateUrl: './sessions-man.component.html',
  styleUrls: ['./sessions-man.component.css']
})
export class SessionsManComponent implements OnInit {
  subscriptions: Subscription[] = new Array<Subscription>()

  messageCanOnlyEditOne: string = ''
  sessions: Session[] = []
  selectedSessions: Session[]

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.subscriptions = [this.sessionService.getCache().subscribe(data => this.sessions = data)]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(scribe => scribe.unsubscribe())
  }

  editSession() {
    let session = this.selectedSessions[0]
    this.sessionService.sessionSubject.next(session)
    this.messageCanOnlyEditOne = 'Can only edit one session at a time, first selected session will be edited instead'
    setTimeout(this.messageCanOnlyEditOne = '', 5000)
  }

  deleteSession(sessions: Session[]) {
    this.selectedSessions.forEach(session => this.sessionService.delete(session.id))
    this.selectedSessions.forEach(session => this.sessions.splice(this.sessions.indexOf(session, 0), 1))
  }
}
