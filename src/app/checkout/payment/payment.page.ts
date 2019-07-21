import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";
import { AlertController, ModalController, Events } from "@ionic/angular";
import * as moment from "moment";
@Component({
  selector: "app-payment",
  templateUrl: "./payment.page.html",
  styleUrls: ["./payment.page.scss"]
})
export class PaymentPage implements OnInit {
  item: any[];
  detail: any[];
  userInfo: any;
  id: string = "";
  public myForm: FormGroup;
  public dateTime;
  public finalPay: any[];
  transactionMode = "";

  constructor(
    public router: Router,
    private api: ApiProviderService,
    public storage: LocalStorageProviderService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public event: Events
  ) {
    this.item = this.router.getCurrentNavigation().extras.state.totalPay;
    this.detail = this.router.getCurrentNavigation().extras.state.details;
    var temp = new Date();
    var date = new Date(temp.valueOf());
    date.setDate(date.getDate() + 1);
    this.dateTime = date.toISOString();

    this.myForm = this.formBuilder.group({
      Address: ["", Validators.required],
      Remarks: ["", Validators.required],
      JenisBayaran: ["", Validators.required],
      RefNo: ["", Validators.required],
      DeliveryDate: ["", Validators.required]
    });
  }

  async ngOnInit() {
    this.id = await this.storage.getContactId();
    this.userInfo = (await this.api.getUserContact(this.id)).data;
    this.myForm.controls["Address"].patchValue(
      this.userInfo.defaultDeliveryAddress.street1 +
        "," +
        this.userInfo.defaultDeliveryAddress.street2 +
        "," +
        this.userInfo.defaultDeliveryAddress.postcode +
        "," +
        this.userInfo.defaultDeliveryAddress.city +
        "," +
        this.userInfo.defaultDeliveryAddress.state
    );
    this.myForm.controls["JenisBayaran"].valueChanges.subscribe(x => {
      this.transactionMode = x;
    });
  }

  async confirmPay() {
    if (this.myForm.valid) {
      var res = await this.api.getUserContact(await this.storage.getContactId());
      let itemModel = {
        refNo: this.myForm.value.RefNo,
        customerId: res.data.id,
        customerName: res.data.name,
        orderDate: moment(new Date()).toISOString(true),
        deliveryDate: moment(new Date(this.myForm.value.DeliveryDate)).toISOString(true),
        status: "New",
        remarks: this.myForm.value.Remarks,
        createdOn: moment(new Date()).toISOString(true),
        createdBy: await this.storage.getUserName(),
        items: [],
        deliveryAddresses: [
          {
            street1: res.data.street1,
            street2: res.data.street2,
            postcode: res.data.postcode,
            city: res.data.city,
            state: res.data.state
          }
        ],
        totalAmount: this.item
      };

      this.detail.forEach(det => {
        itemModel.items.push({
          name: det.name,
          code: det.code,
          category: det.itemGroupId,
          quantity: parseInt(det.order),
          unit: det.unit,
          grade: det.grade,
          unitAmount: parseInt(det.farm),
          totalAmount: parseInt(det.order) * parseInt(det.wholeSale)
        });
      });
      await this.api.postOrder(itemModel);
      const alert = await this.alertCtrl.create({
        header: "Berjaya!",
        message: "Pesanan Berjaya!",
        buttons: [
          {
            text: "Ok",
            handler: async () => {
              await this.storage.setCart([]);
              setTimeout(() => {
                this.event.publish("cartChanges");
                this.router.navigate(["/home"], { replaceUrl: true });
              }, 150);
            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: "Perhatian!",
        message: "Sila isi segala maklumat jualan",
        buttons: ["OK"]
      });
      await alert.present();
    }
  }
}
