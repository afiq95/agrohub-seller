import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-orderdetails",
  templateUrl: "./orderdetails.page.html",
  styleUrls: ["./orderdetails.page.scss"]
})
export class OrderdetailsPage implements OnInit {
  orderDetail: any;
  id: any = "";
  constructor(private api: ApiProviderService, private router: Router) {}

  async ngOnInit() {
    this.id = this.router.getCurrentNavigation().extras.state.id;
    this.orderDetail = (await this.api.getOrderById(this.id)).data;
    console.log(this.orderDetail);
  }
}
