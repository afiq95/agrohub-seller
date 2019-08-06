import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full"
      },
      {
        path: "home",
        children: [
          {
            path: "",
            loadChildren: "../home/home.module#HomePageModule"
          }
        ]
      },
      {
        path: "ladang",
        children: [
          {
            path: "",
            // loadChildren: "../chat/chat.module#ChatPageModule",
            loadChildren: "../ladang/ladang-list/ladang-list.module#LadangListPageModule"
          }
        ]
      },

      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: "../account/profile/profile.module#ProfilePageModule"
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
