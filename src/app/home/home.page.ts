import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "../providers/api-provider.service";
import { Router } from "@angular/router";
import { LocalStorageProviderService } from "../providers/local-storage-provider.service";
import { PopoverController, Events, AlertController } from "@ionic/angular";
import { SearchResultPage } from "../popovers/search-result/search-result.page";
import { LoadingService } from "../providers/loading.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  items: any[];
  itemInCart: any;
  jualan: any[] = [];
  jualanInit: any = null;
  beliOpen = false;
  favs: any[] = [];
  searchResult: any[] = [];
  popover: any = null;
  constructor(
    public api: ApiProviderService,
    public router: Router,
    public storage: LocalStorageProviderService,
    public popoverController: PopoverController,
    public event: Events,
    public loadProvider: LoadingService,
    public alertController: AlertController
  ) {}

  async ngOnInit() {
    this.loadProvider.CreateAndPresent();
    var contactId = await this.storage.getContactId();
    this.event.publish("changeMenu", false);
    var temp = (await this.api.getUserInfo(contactId)).data;
    if (!temp.isFound) {
      console.log(temp);
      const alert = await this.alertController.create({
        header: "Maklumat Tidak Lengkap",
        message: "Maklumat pengguna anda tidak lengkap. Tekan okay untuk kemaskini",
        buttons: [
          {
            text: "Okay",
            handler: () => {
              this.router.navigate(["/edit-profile"], {
                replaceUrl: true
              });
            }
          }
        ],
        backdropDismiss: false,
        keyboardClose: true
      });
      alert.present();
    }
    this.items = (await this.api.getTypeOfProduce()).data;
    this.favs = await this.storage.getFavItems();
    this.itemInCart = (await this.storage.getFromCart()).length;

    this.jualan = (await this.api.getSuppliesList()).data.filter(x => {
      return x.status == "Pending" && x.supplierId == contactId;
    });

    this.jualan = this.jualan.reverse();
    this.jualanInit = this.jualan[0];
    if (this.jualan.length > 1) {
      this.jualan = this.jualan.splice(1, 3);
    } else {
      this.jualan = [];
    }

    this.loadProvider.DismissLoad();
  }

  async viewVarieties(item) {
    this.router.navigate(["/varietieslist"], {
      state: {
        varietyId: item,
        isFav: false
      },
      replaceUrl: true
    });
  }

  async viewFavs() {
    this.router.navigate(["/varietieslist"], {
      state: {
        isFav: true
      },
      replaceUrl: true
    });
  }

  goToCart() {
    this.router.navigate(["/shoppingcart"]);
  }

  openBeli() {
    this.beliOpen = true;
  }

  closeBeli() {
    this.beliOpen = false;
  }

  openSupplyDetail(item) {
    this.router.navigate(["/supplies-detail"], {
      state: {
        id: item.id
      }
    });
  }

  goSearch() {
    this.router.navigate(["/search-result"]);
  }
}
