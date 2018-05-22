import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CriticalComponent } from './critical/critical.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { StrongComponent } from './strong/strong.component'
import { SurveyComponent } from './survey.component'
import { TopCritComponent } from './top-crit/top-crit.component'
import { TopSumComponent } from './top-sum/top-sum.component'


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: '/survey',
        pathMatch: 'full'
      },
      {
        path: 'survey',
        component: SurveyComponent,
        children: [
          {
            path: '',
            component: LoginComponent,
          },
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'register',
            component: RegisterComponent,
          },
          {
            path: 'critical',
            component: CriticalComponent,
          },
          {
            path: 'topCrit',
            component: TopCritComponent,
          },
          {
            path: 'strong',
            component: StrongComponent,
          },
          {
            path: 'topSum',
            component: TopSumComponent,
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SurveyRoutingModule { }

