import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { AuthService } from '../../core/service/auth.service'
import { Auth } from './../../core/model/auth'
import { User } from './../../core/model/user'
import { UserService } from './../../core/service/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  auth: Auth = new Auth
  user: User = new User
  message = ''
  form: FormGroup

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.userService.create(this.user).take(1).subscribe(user => {
      this.auth.userId = user.id
      this.user = user
      this.authService.create(this.auth)
        .catch(response => {
          if (response.code === 404) {
            this.message = 'Network Error'
          } else {
            this.message = 'Error could not register'
          }
          setTimeout(this.message = '', 8000)
          return Observable.throw(this.message)
        })
        .take(1)
        .subscribe(() => {
          this.userService.user = this.user
          this.router.navigate(['/survey/login'])
        })
    })
  }

}
