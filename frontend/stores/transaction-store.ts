import { RoomEndpoint } from "Frontend/generated/endpoints";
import Room from "Frontend/generated/net/myapp/application/data/entity/Room";
import { makeAutoObservable, observable } from "mobx";


export class TransactionStore {

    rooms : Room[] = [];

    constructor(){
        makeAutoObservable(this,{initFromServer: false,rooms:observable.shallow},{autoBind:true})
        this.initFromServer();
    }

    async initFromServer(){
        const data = await RoomEndpoint.vacantRoom();
        this.rooms = data
    }
}