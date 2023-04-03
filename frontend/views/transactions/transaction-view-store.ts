import Transaction from "Frontend/generated/net/myapp/application/data/entity/Transaction";
import { transactionStore } from "Frontend/stores/app-store";
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

    async save(transaction: Transaction){
      await transactionStore.saveTransaction(transaction)
    }
}

export const transViewStore = new TransactionIndexStore();