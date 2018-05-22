import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap'

import { RoutingModule } from '../app.routing'
import { AdminComponent } from './admin.component'
import { AdminRoutingModule } from './admin.routing'
import { CardFormComponent } from './card-manager-view/card-form/card-form.component'
import { CardManagerViewComponent } from './card-manager-view/card-manager-view.component'
import { CardsManComponent } from './card-manager-view/cards-man/cards-man.component'
import { HeaderManComponent } from './header-man/header-man.component'
import { SessionFormComponent } from './session-manager-view/session-form/session-form.component'
import { SessionManagerViewComponent } from './session-manager-view/session-manager-view.component'
import { SessionsManComponent } from './session-manager-view/sessions-man/sessions-man.component'
import { UserFormComponent } from './user-manager-view/user-form/user-form.component'
import { UserManagerViewComponent } from './user-manager-view/user-manager-view.component'
import { UsersManComponent } from './user-manager-view/users-man/users-man.component'

@NgModule({
  declarations: [
    AdminComponent,
    UserManagerViewComponent,
    CardManagerViewComponent,
    SessionManagerViewComponent,
    CardFormComponent,
    UserFormComponent,
    SessionFormComponent,
    UsersManComponent,
    SessionsManComponent,
    CardsManComponent,
    HeaderManComponent
  ],
  imports: [
    RoutingModule,
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AlertModule
  ],
  providers: []
})
export class AdminModule { }
