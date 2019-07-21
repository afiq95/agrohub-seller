import { Injectable } from "@angular/core";
import Axios, { AxiosInstance } from "axios";

import { environment } from "../../environments/environment";
import { LocalStorageProviderService } from "./local-storage-provider.service";
@Injectable({
  providedIn: "root"
})
export class ApiProviderService {
  private _axiosInstance: AxiosInstance;
  private baseUrl = environment.SERVER_URL;

  private async initAxios() {
    var res = await this.storage.getToken();
    this._axiosInstance = Axios.create({
      baseURL: this.baseUrl,
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + res
      }
    });
  }
  constructor(public storage: LocalStorageProviderService) {}

  async login(username: String, password: String) {
    await this.initAxios();
    return await Axios.create({ baseURL: this.baseUrl }).post("/api/users/authenticate", {
      UserName: username,
      Password: password
    });
  }

  async getItemsList() {
    await this.initAxios();
    return await this._axiosInstance.get("/api/items");
  }

  async getUnits() {
    await this.initAxios();
    return await this._axiosInstance.get("/api/items/units");
  }

  async getFarmProduces() {
    await this.initAxios();
    return await this._axiosInstance.get("/api/items/");
  }


  async registerUser(item: Object) {
    await this.initAxios();
    return await this._axiosInstance.post("/api/Users/register", item);
  }

  async getSellingProducts() {
    await this.initAxios();
    return await this._axiosInstance.get("/api/Supplies/");
  }

  async postAds(item) {
    await this.initAxios();
    return this._axiosInstance.post("/api/Supplies", item);
  }

  async postNewFcmToken(item) {
    await this.initAxios();
    return this._axiosInstance.post("/api/fcmusertokens", item);
  }

  async refreshFcmToken(item) {
    await this.initAxios();
    return this._axiosInstance.post("/api/refresh", item);
  }


  async getContactByUsername(username: string) {
    await this.initAxios();
    return await this._axiosInstance.get("/api/contacts/byusername/" + username);
  }

  async getSellingItems(id: string) {
    await this.initAxios();
    return this._axiosInstance.get("/api/supplies/" + id);
  }

  async getChatSession() {
    await this.initAxios();
    return await this._axiosInstance.get(
      "/api/chatsessions/byuserid/" + (await this.storage.getUserId())
    );
  }

  async getChatMessages(sessId) {
    await this.initAxios();
    return await this._axiosInstance.get("/api/chatsessions/chatmessages/" + sessId);
  }

  async getItemList() {
    await this.initAxios();
    return await this._axiosInstance.get("/api/items");
  }

  async getItemDetails() {
    await this.initAxios();
    return await this._axiosInstance.get("/api/itemDetails");
  }

  async getItemsPricing() {
    await this.initAxios();
    return await this._axiosInstance.get("/api/pricing/latest");
  }

  async getFarmProduce(id) {
    await this.initAxios();
    return await this._axiosInstance.get("/api/items/" + id);
  }

  async getTypeOfProduce() {
    await this.initAxios();
    return await this._axiosInstance.get("/api/itemgroups");
  }

  async getTypeOfProduceById(id) {
    await this.initAxios();
    return await this._axiosInstance.get("/api/itemgroups/" + id);
  }

  async getSuppliesList() {
    await this.initAxios();
    return await this._axiosInstance.get("/api/supplies");
  }

  async getUserContact(id: string) {
    await this.initAxios();
    return await this._axiosInstance.get("/api/contacts/" + id);
  }

  async getUserInfo(id: string) {
    await this.initAxios();
    return await this._axiosInstance.get("/api/Farms/bycontact/" + id);
  }

  async getOrderHistory(id: string) {
    await this.initAxios();
    return await this._axiosInstance.get("/api/Orders/getbyuserid/" + id);
  }

  async getOrderById(id: string) {
    await this.initAxios();
    return await this._axiosInstance.get("/api/Orders/" + id);
  }

  async updateUserInfo(item) {
    await this.initAxios();
    await this._axiosInstance.put("/api/contacts/" + item.contact.id, item.contact);
    await this._axiosInstance.put("/api/Farms/" + item.id, item);
    return;
  }

  async postUserInfo(item) {
    await this.initAxios();
    if (item.contact) {
      await this._axiosInstance.put("/api/contacts/" + item.contact.id, item.contact);
      item.contact = null;
    }
    await this._axiosInstance.post("/api/Farms/", item);
    return;
  }

  async postOrder(item) {
    await this.initAxios();
    return this._axiosInstance.post("/api/Orders", item);
  }

  async getPriceHistory(id: string, grade: string) {
    await this.initAxios();
    return await this._axiosInstance.get("/api/pricing/itemhistory/" + id + "/" + grade);
  }
}
