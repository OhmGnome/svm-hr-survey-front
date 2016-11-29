import { AuthGuard } from './../core/service/auth-guard.service'
import { SessionManagerViewComponent } from './session-manager-view/session-manager-view.component'
import { UserManagerViewComponent } from './user-manager-view/user-manager-view.component'
import { CardManagerViewComponent } from './card-manager-view/card-manager-view.component'
import { AdminComponent } from './admin.component'

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'


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


