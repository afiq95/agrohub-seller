import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { Router } from "@angular/router";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";

@Component({
  selector: "app-supplies-list",
  templateUrl: "./supplies-list.page.html",
  styleUrls: ["./supplies-list.page.scss"]
})
export class SuppliesListPage implements OnInit {
  jualan: any[] = [];
  state: any[];
  title: any = "";

  customPopoverOptions: any = {};
  constructor(
    private api: ApiProviderService,
    private storage: LocalStorageProviderService,
    private router: Router
  ) {}

  async ngOnInit() {
    var tempState = this.router.getCurrentNavigation().extras.state;
    if (tempState == null) this.state = ["pending"];
    else this.state = tempState.rule;
    await this.SetItems();
    this.getTitle();
  }

  async SetItems() {
    var temp = (await this.api.getSuppliesList()).data;
    var contactId = await this.storage.getContactId();
    temp = temp.filter(x => {
      return x.supplierId == contactId;
    });
    temp = temp.reverse();
    this.jualan = temp.filter(x => {
      return this.state.some(y => {
        return y.toLowerCase() == x.status.toLowerCase();
      });
    });
  }

  async changeRule(item) {
    this.state = item.detail.value;
    await this.SetItems();
    this.getTitle();
  }

  getTitle() {
    if (this.state[0].toLowerCase() == "pending") this.title = "Dalam Proses";
    else if (
      this.state[0].toLowerCase() == "cancelled" ||
      this.state[0].toLowerCase() == "rejected"
    )
      this.title = "Dibatalkan";
    else if (this.state[0].toLowerCase() == "expired") this.title = "Luput";
    else if (this.state[0].toLowerCase() == "accepted") this.title = "Diterima";
    else if (this.state[0].toLowerCase() == "completed") this.title = "Selesai";
  }

  openSupplyDetail(item) {
    this.router.navigate(["/supplies-detail"], {
      state: {
        id: item.id
      }
    });
  }
}
