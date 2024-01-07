import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FaqComponent } from './home/faq/faq.component';
import { SurveyComponent } from './survey/survey.component';
import { OrderComponent } from './order/order.component';
import { OrderInfoComponent } from './order/order-info/order-info.component';
import { UserInfoComponent } from './order/user-info/user-info.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'faq',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: FaqComponent,
      },
    ],
  },
  {
    path: 'survey',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SurveyComponent,
      },
    ],
  },
  {
    path: 'order',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OrderComponent,
        children: [{
          path: '',
          redirectTo: 'userinfo',
          pathMatch: 'full'
        },
        {
          path: 'orderinfo',
          component: OrderInfoComponent
        },
        {
          path: 'userinfo',
          component: UserInfoComponent
        },
        ],
      },
    ],
  },
  {
    path: 'order',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OrderComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
