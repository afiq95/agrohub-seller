import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage {
  userInfo: any = null;
  segment: any = "Maklumat";
  belian: any;
  constructor(
    private api: ApiProviderService,
    private storage: LocalStorageProviderService,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    var contactId = await this.storage.getContactId();
    this.userInfo = (await this.api.getUserContact(contactId)).data;
    this.belian = (await this.api.getSuppliesList()).data.filter(x => {
      return x.supplierId == contactId;
    });
    this.belian = this.belian.reverse();
    console.log(this.belian);
  }

  openSupplyDetail(item) {
    this.router.navigate(["/supplies-detail"], {
      state: {
        id: item.id
      }
    });
  }
}
