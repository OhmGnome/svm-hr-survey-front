import { AuthGuard } from './core/service/auth-guard.service'
import { AuthService } from './core/service/auth.service'
import { AdminModule } from './admin/admin.module'
import { SurveyModule } from './survey/survey.module'
import { RoutingModule } from './app.routing'
import { UserSessionCardService } from './core/service/user-session-card.service'
import { UserSessionService } from './core/service/user-session.service'
import { UserService } from './core/service/user.service'
import { SessionService } from './core/service/session.service'
import { SessionCardService } from './core/service/session-card.service'
import { CardService } from './core/service/card.service'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { LoginAdminComponent } from './core/login-admin/login-admin.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginAdminComponent,
  ],
  imports: [
    FormsModule,
    HttpModule,
    AlertModule,
    AdminModule,
    SurveyModule,
    RoutingModule,
    BrowserModule
  ],
  providers: [
    CardService,
    SessionService, 
    UserService,
    UserSessionService,
    UserSessionCardService,
    SessionCardService,
    AuthService,
    AuthGuard 
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
