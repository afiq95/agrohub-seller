import { Injectable } from "@angular/core";
import { LocalStorageProviderService } from "./local-storage-provider.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService {
  constructor(private storage: LocalStorageProviderService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    var token = await this.storage.getToken();
    if (!token) {
      this.router.navigateByUrl("/login");
      return false;
    } else return true;
  }
}
