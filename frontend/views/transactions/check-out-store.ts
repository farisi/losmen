import Room from "Frontend/generated/net/myapp/application/data/entity/Room";
import Transaction from "Frontend/generated/net/myapp/application/data/entity/Transaction";
import { roomStore } from "Frontend/stores/app-store";
import { makeAutoObservable } from "mobx";


class CheckOutStore {
    constructor() {
        makeAutoObservable(
          this,
          {
          },
          { autoBind: true }
        );
    }

    async searchRoom(room: Room){
        roomStore.searchRoom(room)
        console.log(room.id);
    }
}

export const checkOutStore = new CheckOutStore();