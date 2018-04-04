import { UserService } from './../../../core/service/user.service'
import { User } from './../../../core/model/user'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userService: UserService
  users: User[]
  subscriptions: Subscription[] = new Array<Subscription>()

  user: User = new User
  form: FormGroup

  constructor(userService: UserService) {
    this.userService = userService
  }

  ngOnInit() {
    this.subscriptions = [
      this.userService.userObservable.subscribe(user => this.user = user),
      this.userService.getCache().subscribe(users => this.users = users)
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(scribe => scribe.unsubscribe())
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
