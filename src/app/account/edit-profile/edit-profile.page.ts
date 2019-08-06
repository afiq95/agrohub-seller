import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"]
})
export class EditProfilePage implements OnInit {
  negeri = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perlis",
    "Pulau Penang",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "W.P Kuala Lumpur",
    "W.P Labuan",
    "W.P Putrajaya"
  ];
  userInfo: any = {
    contact: {
      name: "",
      mobileNo: "",
      street1: "",
      street2: "",
      postcode: "",
      city: "",
      email: "",
      state: "",
      id: "",
      defaultDeliveryAddress: {
        street1: "",
        street2: "",
        postcode: "",
        city: "",
        state: ""
      }
    },
    name: "",
    street1: "",
    street2: "",
    postcode: "",
    city: "",
    contactId: ""
  };
  isFarmFound: boolean = false;
  public isLoading = true;
  contactId: string = "";
  contacts: any;
  farms: any;
  constructor(
    private alertCtrl: AlertController,
    public router: Router,
    private api: ApiProviderService,
    private localStorage: LocalStorageProviderService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.contactId = await this.localStorage.getContactId();
    var res = await this.api.getUserInfo(this.contactId);
    if (res.data.isFound) {
      this.userInfo = res.data.farms[0];
      this.isLoading = false;
      this.isFarmFound = true;
    } else {
      this.contacts = (await this.api.getUserContact(this.contactId)).data;
      this.userInfo.contact = this.contacts;
      this.userInfo.contactId = this.contactId;
      this.isLoading = false;
    }
  }

  async edit() {
    if (this.isFarmFound) {
      await this.api.updateUserInfo(this.userInfo);
      var alert = await this.alertCtrl.create({
        header: "Berjaya",
        message: "Maklumat anda telah dikemasini",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.router.navigate(["/tabs/profile"], { replaceUrl: true });
            }
          }
        ]
      });
      alert.present();
    } else {
      await this.api.postUserInfo(this.userInfo);
      var alert = await this.alertCtrl.create({
        header: "Berjaya",
        message: "Maklumat anda telah dikemasini",
        buttons: [
          {
            text: "OK",
            handler: () => {
              setTimeout(() => {
                this.router.navigate(["/tabs/profile"], { replaceUrl: true });
              }, 500);
            }
          }
        ]
      });
      alert.present();
    }
  }
}
