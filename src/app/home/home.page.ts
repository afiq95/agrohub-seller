import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "../providers/api-provider.service";
import { Router } from "@angular/router";
import { LocalStorageProviderService } from "../providers/local-storage-provider.service";
import { PopoverController, Events } from "@ionic/angular";
import { SearchResultPage } from "../popovers/search-result/search-result.page";

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
    public event: Events
  ) {}

  async ngOnInit() {
    this.event.publish("changeMenu", false);
    this.items = (await this.api.getTypeOfProduce()).data;
    this.favs = await this.storage.getFavItems();
    this.itemInCart = (await this.storage.getFromCart()).length;
    var contactId = await this.storage.getContactId();

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
