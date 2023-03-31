import { makeAutoObservable, observable } from "mobx";

class TransactionIndexStore {

    constructor() {
        makeAutoObservable(
          this,
          {
            
          },
          { autoBind: true }
        );
    }
}

export const transViewStore = new TransactionIndexStore();