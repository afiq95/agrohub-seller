import { Component, OnInit, ViewChild } from "@angular/core";

import { Platform, IonMenu, Events } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ApiProviderService } from "./providers/api-provider.service";
import { LocalStorageProviderService } from "./providers/local-storage-provider.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  @ViewChild("menu") menu: IonMenu;
  public appPages = [
    {
      title: "Utama",
      url: "/home",
      icon: "home"
    },
    {
      title: "Pesanan"
    },
    {
      title: "Ladang",
      url: "/ladang-list",
      icon: "business"
    },
    {
      title: "Mesej",
      url: "/chat",
      icon: "mail"
    },
    {
      title: "Notifikasi",
      url: "/notifications-list",
      icon: "information-circle"
    }
  ];
  disableMenu = false;
  userInfo: any;
  openPesanan = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private api: ApiProviderService,
    private storage: LocalStorageProviderService,
    private router: Router,
    private event: Events
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.event.subscribe("changeMenu", item => {
      console.log(item);
      this.disableMenu = item;
    });
  }

  async ngOnInit() {
    this.userInfo = (await this.api.getUserContact(await this.storage.getContactId())).data;
  }

  goToBekalan(item) {
    this.openPesanan = false;
    this.router.navigate(["/supplies-list"], {
      state: {
        rule: item
      }
    });
  }

  async logout() {
    this.storage.clearData();
    this.disableMenu = true;
    this.router.navigate(["/login"], {
      replaceUrl: true
    });
  }
}
