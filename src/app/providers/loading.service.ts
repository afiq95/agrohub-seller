import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  loading: HTMLIonLoadingElement;
  constructor(public loadingController: LoadingController) {}

  async createLoad() {
    this.loading = await this.loadingController.create({
      spinner: "circles",
      backdropDismiss: false
    });
  }

  async CreateAndPresent() {
    await this.createLoad();
    await this.PresentLoad();
  }

  async PresentLoad() {
    this.loading.present();
  }

  async DismissLoad() {
    await this.loading.dismiss();
    this.loading = await this.loadingController.create({
      spinner: "circles",
      backdropDismiss: false
    });
  }
}
