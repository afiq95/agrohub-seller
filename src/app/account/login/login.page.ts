import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastController, Events } from "@ionic/angular";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";
import { ApiProviderService } from "src/app/providers/api-provider.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    public apiAgro: ApiProviderService,
    public storage: LocalStorageProviderService,
    private event: Events
  ) {
    this.myForm = this.formBuilder.group({
      Username: ["", Validators.required],
      Password: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.event.publish("changeMenu", true);
  }

  async Login() {
    try {
      var loginResponse = await this.apiAgro.login(
        this.myForm.controls["Username"].value,
        this.myForm.controls["Password"].value
      );
      if (loginResponse.status == 200) {
        await this.storage.setUserName(this.myForm.value.Username);
        await this.storage.setToken(loginResponse.data.token);
        await this.storage.setToken(loginResponse.data.token);
        await this.storage.setUserId(loginResponse.data.userId);
        await this.storage.setContactId(loginResponse.data.contactId);
      }
      this.event.publish("changeMenu", false);
      this.event.publish("login");
      this.router.navigate(["/tabs/home"], { replaceUrl: true });
    } catch (ex) {
      var toast = this.toastController.create({
        message: "Salah login",
        duration: 2000
      });
      toast.then(res => {
        res.present();
      });
    }
  }
}
