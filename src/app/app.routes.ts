import { Routes } from '@angular/router';
import { YunukiPageComponent } from './yunuki/yunuki-page/yunuki-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateYunukiComponent } from './yunuki/create-yunuki/create-yunuki.component';
import { CemeteryComponent } from './yunuki/cemetery/cemetery.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'create', component: CreateYunukiComponent, canActivate: [authGuard]
  },
  {
    path: 'yunuki', component: YunukiPageComponent, canActivate: [authGuard]
  },
  {
    path: 'cemetery', component: CemeteryComponent, canActivate: [authGuard]
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  },
];
