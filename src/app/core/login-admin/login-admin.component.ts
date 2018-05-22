import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { UserService } from '../service/user.service'
import { Auth } from './../model/auth'
import { User } from './../model/user'
import { AuthService } from './../service/auth.service'

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  auth: Auth = new Auth
  user: User = new User
  loggedInMessage = ''
  form: FormGroup

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.user.username) {
      this.userService.findByUsername(this.user.username)
        .catch(() => this.setLoginMessageError())
        .take(1).subscribe(users => {
          if (users.length > 0)
            (this.checkUserExists(users[0]))
        })
    } else if (this.user.email) {
      this.userService.findByEmail(this.user.email)
        .catch(() => this.setLoginMessageError())
        .take(1).subscribe(users => {
          if (users.length > 0)
            (this.checkUserExists(users[0]))
        })

    }
  }


  checkUserExists(user: User): void {
    if (user) {
      this.user = user
      this.userService.user = user
      this.loggedInMessage = 'Welcome ' + user.username
      this.authService.login(user.id, this.auth.password).take(1).subscribe(() => {
        if (this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin/sessionManagerView'
          this.router.navigate([redirect])
        }
      })
    } else {
      this.loggedInMessage = 'user not found, please sign up or provide a valid username of email'
      setTimeout(this.loggedInMessage = '', 8000)
    }
  }

  setLoginMessageError = (): Observable<any> => {
    this.loggedInMessage = 'a network error occurred'
    setTimeout(this.loggedInMessage = '', 8000)
    return Observable.throw('a network error occurred')
  }
}
