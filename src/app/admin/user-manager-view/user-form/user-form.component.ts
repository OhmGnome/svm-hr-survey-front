import { UserService } from './../../../core/service/user.service'
import { User } from './../../../core/model/user'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userService: UserService
  users: User[]
  usersSubscription: any
  userSubscription: any

  user: User = new User
  form: FormGroup

  constructor(userService: UserService) {
    this.userService = userService
  }

  ngOnInit() {
    this.userSubscription = this.userService.userObservable.subscribe(user => this.user = user)
    this.usersSubscription = this.userService.getCache().subscribe(users => this.users = users)
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

  save() {
    if (!this.user.id) {
      this.userService.create(this.user)
        .then(data => (this.user = data, this.users.push(data)))
    } else {
      this.userService.update(this.user)
        .then(data => this.user = data)
    }
  }

  clear() {
    this.user = new User
  }

}
