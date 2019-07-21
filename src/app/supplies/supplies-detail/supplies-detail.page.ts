import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-supplies-detail",
  templateUrl: "./supplies-detail.page.html",
  styleUrls: ["./supplies-detail.page.scss"]
})
export class SuppliesDetailPage implements OnInit {
  detail: any = null;
  id: any = "";
  constructor(private api: ApiProviderService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.router.getCurrentNavigation().extras.state.id;
  }

  async ionViewWillEnter() {
    this.detail = (await this.api.getSellingItems(this.id)).data;
  }
}
