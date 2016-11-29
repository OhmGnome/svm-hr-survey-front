import { AuthService } from '../../core/service/auth.service'
import { Auth } from './../../core/model/auth'
import { User } from './../../core/model/user'
import { UserService } from './../../core/service/user.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userService: UserService
  authService: AuthService
  router: Router

  auth: Auth = new Auth
  user: User = new User
  message = ''
  form: FormGroup

  constructor(userService: UserService, authService: AuthService, router: Router) {
    this.userService = userService
    this.authService = authService
    this.router = router
  }

  ngOnInit() {
  }

  register() {
    this.userService.create(this.user).then(user => {
      this.auth.userId = user.id
      this.user = user
      this.authService.create(this.auth).then(() => {
        this.userService.user = this.user
        this.router.navigate(['/survey/login'])
      })
    }).catch(response => {
      if (response.code === 404) {
        this.message = 'Network Error'
      } else {
        this.message = 'Error could not register'
      }
      setTimeout(this.message = '', 8000)
    })
  }

}
