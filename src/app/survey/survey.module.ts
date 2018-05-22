import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap'

import { RoutingModule } from './../app.routing'
import { CriticalComponent } from './critical/critical.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { StrongComponent } from './strong/strong.component'
import { SurveyComponent } from './survey.component'
import { SurveyRoutingModule } from './survey.routing'
import { TopCritComponent } from './top-crit/top-crit.component'
import { TopSumComponent } from './top-sum/top-sum.component'

@NgModule({
  declarations: [
    SurveyComponent,
    CriticalComponent,
    TopCritComponent,
    StrongComponent,
    TopSumComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RoutingModule,
    SurveyRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AlertModule
  ],
  providers: []
})
export class SurveyModule { }

