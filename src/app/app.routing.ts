import { LoginAdminComponent } from './core/login-admin/login-admin.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

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

