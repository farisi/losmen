import Room from "Frontend/generated/net/myapp/application/data/entity/Room";
import Transaction from "Frontend/generated/net/myapp/application/data/entity/Transaction";
import { roomStore, transactionStore } from "Frontend/stores/app-store";
import { makeAutoObservable } from "mobx";


class CheckOutStore {

    selectedRoom: Room | null = null;

    constructor() {
        makeAutoObservable(
          this,
          {
          },
          { autoBind: true }
        );
    }

    async searchRoom(room: Room){
        await transactionStore.getBookedRoom(room);
    }

    setSelectedRoom(room: Room){
        this.selectedRoom=room;
    }
}

export const checkOutStore = new CheckOutStore();