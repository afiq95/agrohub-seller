import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import * as KEYCONSTANT from "./local-storage.keys";
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: "root"
})
export class LocalStorageProviderService {
  constructor(public storage: Storage) {}

  async setToken(item) {
    return await this.storage.set(KEYCONSTANT.USERTOKEN, item);
  }

  async getToken() {
    var local = await this.storage.get(KEYCONSTANT.USERTOKEN);
    if (local) return local;
    else return null;
  }

  async getFavItems() {
    var local = await this.storage.get(KEYCONSTANT.FAVOURITEITEMS);
    if (local) return local;
    else return [];
  }

  async getUserName() {
    var local = await this.storage.get(KEYCONSTANT.USERNAME);
    if (local) return local;
    else return "";
  }

  async getContactId() {
    var local = await this.storage.get(KEYCONSTANT.CONTACTID);
    if (local) return local;
    else return null;
  }

  async getUserId() {
    var local = await this.storage.get(KEYCONSTANT.USERID);
    if (local) return local;
    else return null;
  }

  async setUserId(item) {
    return await this.storage.set(KEYCONSTANT.USERID, item);
  }

  async setUserName(item) {
    return await this.storage.set(KEYCONSTANT.USERNAME, item);
  }

  async setContactId(item) {
    return await this.storage.set(KEYCONSTANT.CONTACTID, item);
  }

  async setFavItems(item) {
    return await this.storage.set(KEYCONSTANT.FAVOURITEITEMS, item);
  }

  async addFavItem(id, grade) {
    var favs = await this.getFavItems();
    if (favs) {
      var found = favs.findIndex(x => {
        return x.id == id && x.grade == grade;
      });
      if (found < 0) {
        favs.push({ id: id, grade: grade });
        await this.setFavItems(favs);
      }
    } else await this.setFavItems([{ id: id, grade: grade }]);
  }

  async removeFavItem(id: any, grade: any) {
    var favs = await this.getFavItems();
    var found = favs.findIndex(x => {
      return x.id == id && x.grade == grade;
    });

    favs.splice(found, 1);
    await this.setFavItems(favs);
  }

  async clearData() {
    await this.storage.clear();
  }

  /*
    CART STORAGE
  */

  async addToCart(item) {
    let currentCart = await this.getFromCart();
    item.id = Guid.create().toString();
    var any = currentCart.findIndex(x => {
      return x.farmProduceId == item.farmProduceId && x.grade == item.grade;
    });
    if (any > -1) {
      currentCart[any].order = parseInt(currentCart[any].order) + parseInt(item.order);
      return await this.setCart(currentCart);
    } else {
      currentCart.push(item);
      return await this.storage.set(KEYCONSTANT.CART, currentCart);
    }
  }

  async setCart(item) {
    return await this.storage.set(KEYCONSTANT.CART, item);
  }

  async getFromCart(): Promise<any[]> {
    let data = await this.storage.get(KEYCONSTANT.CART);
    if (!data) return [];
    else return data;
  }
  async deleteFromCart(item) {
    let currentCart = await this.getFromCart();
    currentCart.splice(currentCart.findIndex(x => x.id == item.id), 1);
    await this.storage.set(KEYCONSTANT.CART, currentCart);
    return currentCart;
  }

  async GetNotifications() {
    var local = await this.storage.get(KEYCONSTANT.NOTIFICATIONS);
    if (local) return local;
    else return [];
  }

  async addNewNotification(item) {
    var current = await this.GetNotifications();
    current.push(item);
    await this.setNotification(current);
  }

  async setNotification(item) {
    return await this.storage.set(KEYCONSTANT.NOTIFICATIONS, item);
  }
}

export const USERTOKEN = "userToken";
export const USERINFO = "userInfo";
export const USERID = "userId";
export const CONTACTID = "contactId";
export const USERNAME = "userName";
export const FAVOURITEITEMS = "favItems";
