import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";

@Component({
  selector: "app-ladang-list",
  templateUrl: "./ladang-list.page.html",
  styleUrls: ["./ladang-list.page.scss"]
})
export class LadangListPage implements OnInit {
  farms: any;
  constructor(private api: ApiProviderService, private storage: LocalStorageProviderService) {}

  async ngOnInit() {
    this.farms = (await this.api.getUserInfo(await this.storage.getContactId())).data.farms;
  }
}
