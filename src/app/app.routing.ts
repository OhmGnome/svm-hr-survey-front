import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { LoginAdminComponent } from './core/login-admin/login-admin.component'

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login-admin',
        component: LoginAdminComponent,
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }

