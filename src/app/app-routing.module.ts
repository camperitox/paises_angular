import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { BaseComponent } from './layouts/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        redirectTo:'/menu',
        pathMatch: 'full'
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'detalle',
        component: DetalleComponent,
      }
    ]
  },
  {
    path:'**',
    redirectTo:'menu'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
