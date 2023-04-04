import { customElement, state } from "lit/decorators.js";
import { View } from "../view";
import { html } from "lit";
import { SelectItem } from "@vaadin/select";
import RoomModel from "Frontend/generated/net/myapp/application/data/entity/RoomModel";
import { Binder, field } from "@hilla/form";
import { checkOutStore } from "./check-out-store";
import { transactionStore } from "Frontend/stores/app-store";

import '@vaadin/select'

@customElement('searching-out')
export class SearchOut extends View {

    @state()
    items:SelectItem[] = [];
    binder = new Binder(this,RoomModel);

    connectedCallback(): void {
        super.connectedCallback();
        this.classList.add('flex');
    }
    
    render(){
        const {model} = this.binder
        return html `
            <vaadin-select .items="${this.items}" />
        `
    }

    async firstUpdated() {
        const people =  transactionStore.occupied;
        this.items = people.map((person) => ({
          label: `${person.number} ${person.name}`,
          value: `${person.id}`,
        }));
        this.items.unshift({label:'Silahkan pilih kamar',value:"0"});
      }
    
    async carikamar(){
        this.binder.submitTo(checkOutStore.searchRoom) 
    }
}