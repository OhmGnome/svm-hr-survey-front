import { Router } from '@angular/router'
import { UserService } from '../service/user.service'
import { Auth } from './../model/auth'
import { User } from './../model/user'
import { AuthService } from './../service/auth.service'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

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

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.user.username) {
      this.userService.findByUsername(this.user.username)
        .then(users => {
          if (users.length > 0)
            (this.checkUserExists(users[0]))
        })
        .catch(() => this.setLoginMessageError())
    } else if (this.user.email) {
      this.userService.findByEmail(this.user.email)
        .then(users => {
          if (users.length > 0)
            (this.checkUserExists(users[0]))
        })
        .catch(() => this.setLoginMessageError())
    }
  }


  checkUserExists(user: User): void {
    if (user) {
      this.user = user
      this.userService.user = user
      this.loggedInMessage = 'Welcome ' + user.username
      this.authService.login(user.id, this.auth.password).then(() => {
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

  setLoginMessageError(): void {
    this.loggedInMessage = 'a network error occurred'
    setTimeout(this.loggedInMessage = '', 8000)
  }
}
