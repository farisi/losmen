import { customElement, state } from "lit/decorators.js";
import { View } from "../view";
import { html } from "lit";
import { SelectItem } from "@vaadin/select";
import RoomModel from "Frontend/generated/net/myapp/application/data/entity/RoomModel";
import { Binder, field } from "@hilla/form";
import { checkOutStore } from "./check-out-store";
import { transactionStore } from "Frontend/stores/app-store";

import '@vaadin/select'
import { runInAction } from "mobx";

@customElement('searching-out')
export class SearchOut extends View {

    @state()
    items:SelectItem[] = [];

    binder = new Binder(this,RoomModel);

    constructor(){
        super();
        runInAction(() => {
            if(checkOutStore.selectedRoom){
                this.binder.read(checkOutStore.selectedRoom)
            }
            else {
                this.binder.reset();
            }
        })
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.classList.add('flex');
        console.log("connect searching out")
    }

    disconnectedCallback(){
        super.disconnectedCallback();
        console.log('disconnect searching out');
    }

    adoptedCallback(){
        console.log('adopted searching out')
    }
    
    attributeChangedCallback(){
        console.log(" attribute change searching out")
    }

    render(){
        const {model} = this.binder
        return html `
            <div class="vaadin-select m-m">
                <div class="vaadin-button-container" style="display:'inline-flex'">
                    <label for="room" style="display:block">Kamar</label>
                    <select id="room" class="select input" ${field(model.id)} @change="${this.carikamar}" style="width:50rem">
                        <option value="0">Silahkan Pilih Kamar</option>
                        ${transactionStore.occupied.map((tr)=> html`<option value="${tr.id}">${tr.number + ' ' + tr.name}</option>`)}
                    </select>
                </div>
            </div>        `
    }

    // async firstUpdated() {
    //     const rooms =  transactionStore.occupied;
    //     this.items = rooms.map((room) => ({
    //       label: `${room.number} ${room.name}`,
    //       value: `${room.id}`,
    //     }));
    //     this.items.unshift({label:'Silahkan pilih kamar',value:"0"});
    // }
    
    async carikamar(){
        this.binder.submitTo(checkOutStore.searchRoom) 
    }
}