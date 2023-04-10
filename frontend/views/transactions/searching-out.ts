import { customElement, state } from "lit/decorators.js";
import { View } from "../view";
import { html } from "lit";
import { SelectItem } from "@vaadin/select";
import RoomModel from "Frontend/generated/net/myapp/application/data/entity/RoomModel";
import { Binder, field } from "@hilla/form";
import { checkOutStore } from "./check-out-store";
import { transactionStore } from "Frontend/stores/app-store";

import '@vaadin/select'
import { selectRenderer } from '@vaadin/select/lit.js';
import { comboBoxRenderer } from '@vaadin/combo-box/lit.js';
import type { ComboBoxLitRenderer } from '@vaadin/combo-box/lit.js';
import '@vaadin/combo-box';
import { ComboBoxValueChangedEvent } from "@vaadin/combo-box";
import { TransactionStore } from "Frontend/stores/transaction-store";
import Room from "Frontend/generated/net/myapp/application/data/entity/Room";

@customElement('searching-out')
export class SearchOut extends View {

    @state()
    items:SelectItem[] = [];

    binder = new Binder(this,RoomModel);

    constructor(){
        super();
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.classList.add('flex');
        console.log("connect searching out")
    }

    render(){
        const {model} = this.binder
        return html `
        <vaadin-combo-box .items=${transactionStore.occupied} item-value-path="id" item-label-path="name"
         ${field(model.id)} @change="${this.carikamar}"
         ${comboBoxRenderer(this.renderer, [])}
         ></vaadin-combo-box>    
            `
    }

    private renderer: ComboBoxLitRenderer<Room> = (person) => html`
    <div style="display: flex;">
      
      <div>
        ${person.number}
        <div style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);">
        ${person.name}
        </div>
      </div>
    </div>
  `;
    
    async carikamar(){
        await this.binder.submitTo(checkOutStore.searchRoom) 
        this.binder.clear();
    }
}