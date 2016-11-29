import { StrongComponent } from './strong/strong.component'
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap'
import { FormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component'
import { TopSumComponent } from './top-sum/top-sum.component'
import { TopCritComponent } from './top-crit/top-crit.component'
import { CriticalComponent } from './critical/critical.component'
import { SurveyRoutingModule } from './survey.routing'
import { RoutingModule } from './../app.routing'
import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SurveyComponent } from './survey.component'
import { RegisterComponent } from './register/register.component'

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

