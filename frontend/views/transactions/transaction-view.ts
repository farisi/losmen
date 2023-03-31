import { customElement } from "lit/decorators.js";
import { View } from "../view";
import { html } from 'lit';
import { roomStore } from "Frontend/stores/app-store";

import '@vaadin/text-field';
import '@vaadin/combo-box';

@customElement('transaction-view')
export class TransactionView extends View {

    connectedCallback(): void {
        super.connectedCallback();
        this.autorun(() => {
          this.classList.add(
            'flex',
            'flex-col',
            'p-m',
            'gap-s'
          );
        });
    }

    render() {
        return html `
         <h3>List Transaksi</h3>
         

        <vaadin-text-field label="Nama"
            ></vaadin-text-field>

        <vaadin-text-field label="No Identitas"
            ></vaadin-text-field>

            <vaadin-combo-box
                label="Ruangan"
                item-label-path="name"
                item-value-path="id"
                .items="${roomStore.rooms}"
            ></vaadin-combo-box>

        <div class="flex gap-s">
        <vaadin-button theme="primary" >Check In</vaadin-button>
        <vaadin-button theme="error" >Delete</vaadin-button>
        <vaadin-button theme="tertiary" >Cancel</vaadin-button>
      </div>
        `;
    }
}