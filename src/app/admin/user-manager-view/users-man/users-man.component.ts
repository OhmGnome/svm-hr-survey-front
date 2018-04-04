
import { forEach } from 'c:/Users/sdidier/node2/survey3/node_modules/@angular/router/src/utils/collection'
import { SessionService } from './../../../core/service/session.service'
import { UserSessionService } from '../../../core/service/user-session.service'
import { UserService } from './../../../core/service/user.service'
import { Session } from './../../../core/model/session'
import { User } from './../../../core/model/user'
import { UserSession } from './../../../core/model/userSession'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-users-man',
  templateUrl: './users-man.component.html',
  styleUrls: ['./users-man.component.css']
})
export class UsersManComponent implements OnInit {
  userService: UserService
  userSessionService: UserSessionService
  sessionService: SessionService
  subscriptions: Subscription[] = new Array<Subscription>()

  session: Session = new Session
  userSessionsJoin: UserSession[]

  messageCanOnlyEditOne: string = ''
  users: User[] = []
  userSessions: User[] = []
  selectedUserSessions: User[]
  selectedUsers: User[]

  constructor(userService: UserService, userSessionService: UserSessionService, sessionService: SessionService) {
    this.userService = userService
    this.sessionService = sessionService
    this.userSessionService = userSessionService
  }

  ngOnInit() {
    this.subscriptions = [
      this.userService.getCache().subscribe(users => this.users = users),
      this.sessionService.sessionObservable.subscribe(session => this.session = session)
    ]
    if (this.session.id) this.userSessionService.findBySessionId(this.session.id).then(data => {
      this.userSessionsJoin = data
      data.forEach(userSession => { this.userSessions.push(this.users.find(user => user.id === userSession.userId)) })
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(scribe => scribe.unsubscribe())
  }

  editUser() {
    let user = this.selectedUsers[0]
    this.userService.userSubject.next(user)
    this.messageCanOnlyEditOne = 'Can only edit one user at a time, first selected user will be edited instead'
    setTimeout(this.messageCanOnlyEditOne = '', 5000)
  }

  deleteUser() {
    this.selectedUsers.forEach(user => {
      this.userService.delete(user.id)
      this.users.splice(this.users.indexOf(user, 0), 1)
      this.userSessions.splice(this.userSessions.indexOf(user, 0), 1)
      this.userSessionsJoin.splice(this.userSessionsJoin.indexOf(this.userSessionsJoin.find(userSession => userSession.userId === user.id, 0), 1))
    })
  }

  saveUsersToSession() {
    this.selectedUsers.forEach(user => {
      if (!this.userSessions.find(sUser => sUser.id === user.id)) {
        let userSession = new UserSession
        userSession.userId = user.id
        userSession.sessionId = this.session.id
        this.userSessionService.create(userSession).then((userSessionSaved) => {
          this.userSessionsJoin.push(userSessionSaved)
          let user = this.users.find(user => user.id === userSessionSaved.userId)
          this.userSessions.push(user)
        })
      }
    })
  }

  deleteUsersFromSession() {
    this.selectedUserSessions.forEach(user => {
      let userSession = this.userSessionsJoin.find(userSession => userSession.userId === user.id)
      this.userSessionService.delete(userSession.id)
        .then(() => {
          this.userSessions.splice(this.userSessions.indexOf(this.userSessions.find(user => user.id === userSession.userId), 0), 1)
          this.userSessionsJoin.splice(this.userSessionsJoin.indexOf(userSession, 0), 1)
        })
    })
  }

}
