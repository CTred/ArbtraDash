import { AuthGuard } from './shared-arbtra/guards/auth.guard';
import { Routes } from '@angular/router';

//Layouts
import { CondensedComponent } from './@pages/layouts';

//Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BlankComponent } from './@pages/layouts/blank/blank.component';

export const AppRoutes: Routes = [
    
  {
    path: 'dashboard',
    component: CondensedComponent,    
    children: [
      {
      path: 'welcome',
      //canActivate: [AuthGuard],
      component: HomeComponent
      },
      {
        path: 'casefiles',
        //canActivate: [AuthGuard],
        loadChildren: './case-files/case-files.module#CaseFilesModule'
      },
      {
        path: 'docregister',
        //canActivate: [AuthGuard],
        loadChildren: './doc-register/doc-register.module#DocRegisterModule'
      },
    ],
  },
  {
    path: 'dashboard',
    component: BlankComponent,
    children: [
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'login', component: LoginComponent
      },
    ]
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full',
    data: {
        breadcrumb: 'Home'
    },
  },
/* TODO */
];
