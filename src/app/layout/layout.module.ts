import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from './home/hero/hero.component';
import { LoginComponent } from './login/login.component';
import { ServiceComponent } from './home/service/service.component';
import { AboutComponent } from './home/about/about.component';
import { PrimengListModule } from '../primeng-list.module';
import { ContactComponent } from './home/contact/contact.component';
import { FaqComponent } from './home/faq/faq.component';
import { GalleryComponent } from './home/gallery/gallery.component';
import { SurveyComponent } from './survey/survey.component';
import { OrderComponent } from './order/order.component';
import { OrderInfoComponent } from './order/order-info/order-info.component';
import { UserInfoComponent } from './order/user-info/user-info.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    LoginComponent,
    ServiceComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    GalleryComponent,
    SurveyComponent,
    OrderComponent,
    OrderInfoComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengListModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
