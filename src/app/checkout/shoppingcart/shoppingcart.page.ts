import { Component, OnInit, SimpleChanges, Input } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { Router } from "@angular/router";
import { ModalController, LoadingController, Events, AlertController } from "@ionic/angular";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";

@Component({
  selector: "app-shoppingcart",
  templateUrl: "./shoppingcart.page.html",
  styleUrls: ["./shoppingcart.page.scss"]
})
export class ShoppingcartPage implements OnInit {
  @Input() items: any[];
  @Input() totalPrice = 0;
  wholesale: any[];
  total: any[];
  totals: any[];
  posts = "";
  loadingState: boolean;

  constructor(
    public router: Router,
    private api: ApiProviderService,
    public modalController: ModalController,
    public alertController: AlertController,
    private storage: LocalStorageProviderService,
    private loading: LoadingController,
    public event: Events
  ) {
    // this.item = this.router.getCurrentNavigation().extras.state.itemDetail;
  }

  async ngOnInit() {
    this.loadingState = true;
    var l = await this.loading.create({
      animated: true,
      backdropDismiss: false,
      spinner: "circles",
      showBackdrop: true,
      mode: "ios"
    });
    await l.present();
    this.items = await this.storage.getFromCart();
    console.log(this.items);
    this.items.forEach(element => {
      this.totalPrice += parseInt(element.order) * element.wholeSale;
    });
    await l.dismiss();
    this.loadingState = false;
  }

  async goToPay() {
    this.router.navigate(["/payment"], {
      state: {
        totalPay: this.totalPrice,
        details: this.items
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.totalPrice = 0;
    this.items.forEach(element => {
      this.totalPrice += parseInt(element.order) * element.wholeSale;
    });
  }

  addMore(index) {
    this.items[index].order++;
    this.totalPrice = 0;
    this.items.forEach(element => {
      this.totalPrice += parseInt(element.order) * element.wholeSale;
    });
    this.storage.setCart(this.items);
  }

  removeItem(index) {
    this.items[index].order--;
    this.totalPrice = 0;
    this.items.forEach(element => {
      this.totalPrice += parseInt(element.order) * element.wholeSale;
    });
    this.storage.setCart(this.items);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async removeFromCart(index) {
    var alert = await this.alertController.create({
      backdropDismiss: true,
      subHeader: "Anda pasti untuk buang " + this.items[index].name + " dari troli?",
      header: "Amaran",
      buttons: [
        {
          text: "Ya",
          handler: async () => {
            this.items = await this.storage.deleteFromCart(this.items[index]);
            this.totalPrice = 0;
            this.items.forEach(element => {
              this.totalPrice += parseInt(element.order) * element.wholeSale;
            });
            this.event.publish("cartChanges");
          },
          role: "confirm"
        },
        {
          text: "Tidak",
          role: "cancel"
        }
      ]
    });
    await alert.present();
  }
}
