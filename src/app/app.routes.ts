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
import { CurrenciesComponent } from './pages/dashboard/currencies/currencies.component';
import { RegionsComponent } from './pages/dashboard/regions/regions.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { ReasonsComponent } from './pages/dashboard/reasons/reasons.component';
import { InventoryComponent } from './pages/dashboard/inventory/inventory.component';
import { DiscountComponent } from './pages/dashboard/discount/discount.component';

export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', canActivate:[authGuard], component: DashboardComponent },
          { path: 'orders', component: OrdersComponent},
          { path: 'products', component: ProductsComponent},
          { path: 'products/new-product', component: NewProductComponent},
          { path: 'settings', component: SettingComponent,
            // children: [
            //   { path: 'profile', component: ProfileComponent },
            //   { path: 'currencies', component: CurrenciesComponent},
            //   { path: 'regions', component: RegionsComponent},
            //   { path: 'profile', component: ProfileComponent},
            //   { path: 'reasons', component: ReasonsComponent}
            // ]
          },
          { path: 'settings/profile', component: ProfileComponent },
          { path: 'settings/currencies', component: CurrenciesComponent },
          { path: 'settings/regions', component: RegionsComponent },
          { path: 'settings/reasons', component: ReasonsComponent },
          { path: 'products/inventory', component: InventoryComponent},
          { path: 'settings/discounts', component: DiscountComponent},

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
