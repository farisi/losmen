import { RoomEndpoint, TransactionEndpoint } from "Frontend/generated/endpoints";
import Room from "Frontend/generated/net/myapp/application/data/entity/Room";
import Transaction from "Frontend/generated/net/myapp/application/data/entity/Transaction";
import { makeAutoObservable, observable, runInAction } from "mobx";
import { transactionStore, uiStore } from "./app-store";
import TransactionModel from "Frontend/generated/net/myapp/application/data/entity/TransactionModel";


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

    editNew() {
        this.transaction = TransactionModel.createEmptyValue();
    }
    cancelEdit(){
        this.transaction=null;
    }

    async checkOutRoom(tr: Transaction){
        try {
            const saved = await TransactionEndpoint.checkout(tr)
            this.transaction=null;
            if(saved){
                this.saveLocal(saved);
                uiStore.showSuccess("Checkout berhasil!")
            }
            else {
                uiStore.showError("Checkout gagal!")
            }
        }
        catch(e){
            uiStore.showError("terjadi kesalahan ");
        }
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
        try {
        const t = await TransactionEndpoint.getRoomBooked(rm.id);
        this.transaction = t;
        }
        catch(e){
            console.log(e);
        }
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