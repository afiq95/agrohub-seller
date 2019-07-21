import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./providers/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
    canActivate: [AuthGuardService]
  },
  {
    path: "list",
    loadChildren: "./list/list.module#ListPageModule"
  },
  { path: "login", loadChildren: "./account/login/login.module#LoginPageModule" },
  { path: "list", loadChildren: "./items/list/list.module#ListPageModule" },
  { path: "itemslist", loadChildren: "./varieties/itemslist/itemslist.module#ItemslistPageModule" },
  {
    path: "varietieslist",
    loadChildren: "./varieties/varietieslist/varietieslist.module#VarietieslistPageModule"
  },
  {
    path: "varietydetails",
    loadChildren: "./varieties/varietydetails/varietydetails.module#VarietydetailsPageModule"
  },
  {
    path: "shoppingcart",
    loadChildren: "./checkout/shoppingcart/shoppingcart.module#ShoppingcartPageModule"
  },
  { path: "payment", loadChildren: "./checkout/payment/payment.module#PaymentPageModule" },
  { path: "profile", loadChildren: "./account/profile/profile.module#ProfilePageModule" },
  {
    path: "orderdetails",
    loadChildren: "./orders/orderdetails/orderdetails.module#OrderdetailsPageModule"
  },
  {
    path: "edit-profile",
    loadChildren: "./account/edit-profile/edit-profile.module#EditProfilePageModule"
  },
  {
    path: "orders-list",
    loadChildren: "./orders/orders-list/orders-list.module#OrdersListPageModule"
  },
  {
    path: "search-result",
    loadChildren: "./popovers/search-result/search-result.module#SearchResultPageModule"
  },
  {
    path: "notifications-list",
    loadChildren:
      "./notifications/notifications-list/notifications-list.module#NotificationsListPageModule"
  },
  { path: 'ladang-list', loadChildren: './ladang/ladang-list/ladang-list.module#LadangListPageModule' },
  { path: 'supplies-detail', loadChildren: './supplies/supplies-detail/supplies-detail.module#SuppliesDetailPageModule' },
  { path: 'supplies-list', loadChildren: './supplies/supplies-list/supplies-list.module#SuppliesListPageModule' },
  { path: 'new-supply', loadChildren: './supplies/new-supply/new-supply.module#NewSupplyPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
