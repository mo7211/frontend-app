import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getApp } from "firebase/app";
import { Building } from "./../../types";
export class BuildingDatabase {
  async getModels(building: Building) {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);

    const urls: string[] = [];

    for (const model of building.models) {
      const fileRef = ref(storageInstance, model.id);
      const fileUrl = await getDownloadURL(fileRef);
      urls.push(fileUrl);
    }

    return urls;
  }
}