import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";
import { Router } from "@angular/router";
import * as _ from "lodash";
import * as moment from "moment";

@Component({
  selector: "app-new-supply",
  templateUrl: "./new-supply.page.html",
  styleUrls: ["./new-supply.page.scss"]
})
export class NewSupplyPage implements OnInit {
  jenisHasil: any[];
  jenisHasilSelect = null;
  varieties: any[] = [];
  units: any[];
  gredHasil: any[];
  gradeVarieties: any[];
  public myForm: FormGroup;
  public dateTime;
  public finalItem: any;

  constructor(
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private api: ApiProviderService,
    private storage: LocalStorageProviderService,
    private router: Router
  ) {
    var temp = new Date();
    var date = new Date(temp.valueOf());
    date.setDate(date.getDate() + 2);
    this.dateTime = date.toISOString();
    console.log(this.dateTime);
    console.log(moment(new Date()).toISOString(true));

    this.myForm = this.formBuilder.group({
      Kuantiti: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(1)
        ])
      ],
      Jenis: ["", Validators.required],
      Varieti: new FormControl({ value: "", disabled: true }, Validators.required),
      Unit: new FormControl({ value: "", disabled: true }),
      Harga: ["", Validators.required],
      HargaKoop: new FormControl({ value: "", disabled: true }),
      Tarikh: ["", Validators.required],
      Grade: ["", Validators.required],
      Remarks: ["", Validators.required],
      noRef: ["", Validators.required]
    });
  }

  async ngOnInit() {
    let latest = await this.api.getItemsPricing();
    this.jenisHasil = _.map(_.groupBy(latest.data.prices, "itemGroupId"), function(a) {
      return { key: a[0].itemGroup.name, value: a };
    });

    this.myForm.controls["Jenis"].valueChanges.subscribe(x => {
      var grouped = _.groupBy(x.value, "name");
      this.varieties = _.map(grouped, function(o) {
        return { name: o[0].name, value: o };
      });
      console.log(this.varieties);
      this.myForm.controls["Varieti"].enable();
    });

    this.myForm.controls["Varieti"].valueChanges.subscribe(x => {
      this.gradeVarieties = x.value;
    });

    this.myForm.controls["Grade"].valueChanges.subscribe(x => {
      console.log(x);
      this.myForm.controls["HargaKoop"].patchValue(x.farm);
      this.myForm.controls["Unit"].patchValue(x.unit);
      this.myForm.controls["HargaKoop"].enable();
      this.myForm.controls["Unit"].enable();
      this.finalItem = x;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async onClick() {
    console.log("valid:" + this.myForm.valid);
    if (this.myForm.valid) {
      var res = await this.api.getUserContact(await this.storage.getContactId());
      let itemModel = {
        refNo: this.myForm.value.noRef,
        supplierId: res.data.id,
        supplierName: res.data.name,
        dateTime: moment(new Date()).toISOString(true),
        harvestDate: moment(new Date(this.myForm.value.Tarikh)).toISOString(true),
        status: "Pending",
        remarks: this.myForm.value.Remarks,
        createdOn: moment(new Date()).toISOString(true),
        createdBy: await this.storage.getUserName(),
        items: [
          {
            name: this.myForm.value.Varieti.name,
            code: this.finalItem.code,
            category: this.finalItem.itemGroupId,
            quantity: this.myForm.value.Kuantiti,
            unit: this.myForm.value.Unit,
            grade: this.myForm.value.Grade.grade,
            unitAmount: this.finalItem.farm,
            totalAmount: parseInt(this.myForm.value.Harga) * parseInt(this.myForm.value.Kuantiti),
            askingAmount: this.myForm.value.Harga,
            agreedQuantity: 0,
            agreedAmount: 0
          }
        ],
        totalAmount: parseInt(this.myForm.value.Harga) * parseInt(this.myForm.value.Kuantiti)
      };
      await this.api.postAds(itemModel);
      const alert = await this.alertCtrl.create({
        header: "Berjaya",
        message: "Jualan anda akan disemak Koperasi sebelum dipamerkan",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.router.navigate(["/tabs/home"], { replaceUrl: true });
            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: "Perhatian !",
        message: "Sila isi segala maklumat jualan",
        buttons: ["OK"]
      });
      await alert.present();
    }
  }
}
