import { vacantRoom } from "Frontend/generated/RoomEndpoint";
import Room from "Frontend/generated/net/myapp/application/data/entity/Room";
import RoomModel from "Frontend/generated/net/myapp/application/data/entity/RoomModel";
import RoomStatus from "Frontend/generated/net/myapp/application/data/entity/RoomStatus";
import Transaction from "Frontend/generated/net/myapp/application/data/entity/Transaction";
import { roomStore, transactionStore } from "Frontend/stores/app-store";
import { makeAutoObservable, observable } from "mobx";


class CheckOutStore {

    selectedRoom: Room | null = null;

    constructor() {

        makeAutoObservable(
          this,
          {
            initFromServer:true,
            selectedRoom: observable.ref
          },
          { autoBind: true }
        );
        this.initFromServer();
    }

    async searchRoom(room: Room){
        if(room.id !== undefined) {
            transactionStore.getBookedRoom(room);
            this.setSelectedRoom(room);
        }
    }

    initFromServer(){
        this.selectedRoom = RoomModel.createEmptyValue();
    }

    setSelectedRoom(room: Room){
        this.selectedRoom=room;
    }

    async simpan(tr :Transaction){
        await transactionStore.checkOutRoom(tr);
    }

    cancel(){
        this.selectedRoom = null;
    }

    editNew(){
        this.selectedRoom = RoomModel.createEmptyValue();
    }
}

export const checkOutStore = new CheckOutStore();