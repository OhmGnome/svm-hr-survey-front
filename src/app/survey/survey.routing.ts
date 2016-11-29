import { LoginAdminComponent } from './../core/login-admin/login-admin.component'
import { TopSumComponent } from './top-sum/top-sum.component'
import { StrongComponent } from './strong/strong.component'
import { TopCritComponent } from './top-crit/top-crit.component'
import { RegisterComponent } from './register/register.component'
import { CriticalComponent } from './critical/critical.component'
import { LoginComponent } from './login/login.component'
import { SurveyComponent } from './survey.component'

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'


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

