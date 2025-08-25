import { Routes } from '@angular/router';
import { YunukiPageComponent } from './yunuki-page/yunuki-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateYunukiComponent } from './create-yunuki/create-yunuki.component';
import { CemeteryComponent } from './cemetery/cemetery.component';

export const routes: Routes = [
  {
    path: 'yunuki', component: YunukiPageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'create', component: CreateYunukiComponent
  },
  {
    path: 'cemetery', component: CemeteryComponent
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  },
];
