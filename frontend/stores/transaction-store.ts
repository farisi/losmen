import { RoomEndpoint, TransactionEndpoint } from "Frontend/generated/endpoints";
import Room from "Frontend/generated/net/myapp/application/data/entity/Room";
import Transaction from "Frontend/generated/net/myapp/application/data/entity/Transaction";
import { makeAutoObservable, observable, runInAction } from "mobx";
import { transactionStore, uiStore } from "./app-store";


export class TransactionStore {

    rooms : Room[] = [];
    occupied: Room[] = [];
    transactions : Transaction[] = [];
    transaction: Transaction|null = null;

    constructor(){
        makeAutoObservable(
            this,
            {initFromServer: true,
                rooms:observable.shallow,
                occupied:observable.shallow,
                transaction:observable.ref 
            },
            {autoBind:true}
        )
        this.initFromServer();
    }

    async initFromServer(){
        const data = await RoomEndpoint.vacantRoom();
        const dataOccopied  = await RoomEndpoint.occupiedRoom();

        runInAction(() => {
            this.rooms = data
            this.occupied = dataOccopied;
        });
    }

    async saveTransaction(transaction: Transaction){
        try {
            const saved = await TransactionEndpoint.save(transaction)
            if(saved){
                this.saveLocal(saved);
                uiStore.showSuccess("Berhasil menyimpan transaksi!")
            }
            else {
                uiStore.showError("Gagal menyimpan transaksi!")
            }
        }
        catch(e){
            uiStore.showError("terjadi kesalahan ");
        }
    }

    async getBookedRoom(rm : Room){
        const t = await TransactionEndpoint.getRoomBooked(rm.id);
        this.transaction = t;
    }

    async deleteTransaction(tran : Transaction){
        if(!tran.id) return;
        try {
            await transactionStore.deleteTransaction(tran);
            this.deleteLocal(tran);
        }
        catch(e){
            uiStore.showError("terjadi kesalahan!");
        }
    }

    private saveLocal(saved: Transaction){
        const tranExists = this.transactions.some(t=>t.id === saved.id);
        if(tranExists){
            this.transactions = this.transactions.map((existing)=>{
                if(existing.id === saved.id){
                    return saved
                }
                else {
                    return existing;
                }
            });

        }
        else {
            this.transactions.push(saved);
        }
    }

    private deleteLocal(tran: Transaction) {
        this.transactions = this.transactions.filter((c) => c.id !== tran.id);
    }
}