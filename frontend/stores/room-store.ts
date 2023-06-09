import RoomStatus from 'Frontend/generated/net/myapp/application/data/entity/RoomStatus';
import { RoomEndpoint } from 'Frontend/generated/endpoints';
import { makeAutoObservable, observable, runInAction } from 'mobx';

import { uiStore } from './app-store';
import Room from 'Frontend/generated/net/myapp/application/data/entity/Room';



export class RoomStore {
    room: Room | null = null;
    rooms : Room[] = [];
    status: RoomStatus[] = [];
    
    constructor(){
        makeAutoObservable(this,{initFromServer: false,rooms:observable.shallow,status:observable.shallow,room:observable.shallow},{autoBind:true})
        this.initFromServer();
    }

    async initFromServer(){
        const data = await RoomEndpoint.getRooms();
        runInAction(() => {
            this.rooms = data
        });
    }

    async saveRoom(room: Room){
        try {
            const saved = await RoomEndpoint.save(room);
            if(saved){
                this.saveLocal(saved);
                uiStore.showSuccess('Kamar disimpan!');
            }
            else {
                uiStore.showError('Kamar gagal disimpan!');
            }
        }
        catch(e){
            uiStore.showError('Kamar gagal disimpan!');
        }
    }

    private saveLocal(saved: Room){
        const roomExists = this.rooms.some((c)=>c.id === saved.id);
        if(roomExists){
            this.rooms = this.rooms.map((existing)=>{
                if (existing.id === saved.id) {
                    return saved;
                  } else {
                    return existing;
                  }
            })
        }
        else {
            this.rooms.push(saved);
        }
    }

    async  searchRoom(saved: Room) {
        const d = await RoomEndpoint.getRoom(saved.id);
        this.room = d;
    }

    async deleteRoom(room: Room){
        if(!room.id){
            return;
        }

        try {
            await RoomEndpoint.deleteRoom(room.id);
            this.deleteLocal(room);
            uiStore.showSuccess('Kamar berhasil dihapus.');
        }
        catch(e){
            uiStore.showError('Failed to delete room.');
        }
    }

    async deleteLocal(room: Room){
        this.rooms = this.rooms.filter((c)=>c.id !== room.id); 
    }
}