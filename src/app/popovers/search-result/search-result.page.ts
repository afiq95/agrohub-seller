import { Component, OnInit, Input } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.page.html",
  styleUrls: ["./search-result.page.scss"]
})
export class SearchResultPage implements OnInit {
  @Input("items") items: any[] = [];
  latestPricings: any;
  searchResult: any[];
  constructor(private api: ApiProviderService, private router: Router) {}

  async ngOnInit() {
    this.latestPricings = (await this.api.getItemsPricing()).data;
  }

  search(item) {
    this.searchResult = [];
    this.latestPricings.prices.forEach(x => {
      if (x.name.toLowerCase().search(item.detail.value) > -1) {
        this.searchResult.push(x);
      }
    });

    console.log(this.searchResult);
  }

  async goToDetail(item) {
    this.router.navigate(["/varietydetails"], {
      state: {
        detail: item
      }
    });
  }
}
