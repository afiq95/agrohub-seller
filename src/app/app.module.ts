import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { IonicStorageModule } from "@ionic/storage";
import { LocalStorageProviderService } from "./providers/local-storage-provider.service";
import { ApiProviderService } from "./providers/api-provider.service";
import { SearchResultPageModule } from "./popovers/search-result/search-result.module";
import { AuthGuardService } from "./providers/auth-guard.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: "ios"
    }),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: "__agrobuyer",
      driverOrder: ["indexeddb", "sqlite", "websql"]
    }),
    SearchResultPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalStorageProviderService,
    ApiProviderService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
