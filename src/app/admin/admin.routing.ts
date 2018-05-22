import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { AuthGuard } from './../core/service/auth-guard.service'
import { AdminComponent } from './admin.component'
import { CardManagerViewComponent } from './card-manager-view/card-manager-view.component'
import { SessionManagerViewComponent } from './session-manager-view/session-manager-view.component'
import { UserManagerViewComponent } from './user-manager-view/user-manager-view.component'


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        canActivate: [AuthGuard],
        component: AdminComponent,
        children: [
          {
            path: '',
            canActivateChild: [AuthGuard],
            children: [
              {
                path: 'sessionManagerView',
                component: SessionManagerViewComponent,
              },
              {
                path: 'userManagerView',
                component: UserManagerViewComponent,
              },
              {
                path: 'cardManagerView',
                component: CardManagerViewComponent,
              }
            ]
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }


