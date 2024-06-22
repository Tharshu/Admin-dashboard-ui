import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { ProductsComponent } from './pages/dashboard/products/products.component';
import { SettingComponent } from './pages/dashboard/setting/setting.component';
import { OrdersComponent } from './pages/dashboard/orders/orders.component';
import { NewProductComponent } from './pages/dashboard/new-product/new-product.component';

export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', canActivate:[authGuard], component: DashboardComponent },
          { path: 'orders', component: OrdersComponent},
          { path: 'products', component: ProductsComponent},
          { path: 'new-product', component: NewProductComponent},
          { path: 'settings', component: SettingComponent},

        ]
      },
      
    { path: '', component: LayoutComponent,
        children: [
            // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            // {path: 'dashboard', canActivate:[authGuard], component: DashboardComponent},
            {path: 'login', canActivate:[guestGuard], component: LoginComponent},
            {path: 'register', canActivate:[guestGuard], component: RegisterComponent},
        ]

    }
];
