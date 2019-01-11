import { SERVER_URL } from "../config/WebService";
import ApiSauce from "../services/ApiSauce";

class DataHelper {
  store = undefined;

  getStore() {
    return this.store;
  }

  setStore(store) {
    this.store = store;
  }

  getImageFullPath = (imageKey: String) => {
    return `${SERVER_URL}/util/image?key=${imageKey}`;
  };
}

export default new DataHelper();
