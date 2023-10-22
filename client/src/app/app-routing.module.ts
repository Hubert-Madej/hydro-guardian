import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginContainerComponent } from './auth/containers/login-container/login-container.component'

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginContainerComponent,
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
