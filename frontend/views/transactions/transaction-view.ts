import { customElement, state } from "lit/decorators.js";
import { View } from "../view";
import { html } from 'lit';
import { roomStore, transactionStore } from "Frontend/stores/app-store";
import type { SelectItem } from '@vaadin/select';

import '@vaadin/text-field';
import '@vaadin/combo-box';
import '@vaadin/select';
import CardType from "Frontend/generated/net/myapp/application/data/entity/CardType";
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import TransactionModel from "Frontend/generated/net/myapp/application/data/entity/TransactionModel";
import { Binder, field } from "@hilla/form";
import {transViewStore} from "Frontend/views/transactions/transaction-view-store";
import '@vaadin/date-time-picker';


@customElement('transaction-view')
export class TransactionView extends View {
  
  binder = new Binder(this,TransactionModel)

  @state()
  items:SelectItem[] = [];

  @state()
  identities = [
    {label:'KTP',value:'KTP'}
  ]

  private responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    { minWidth: '20em', columns: 3 },
  ];

    connectedCallback(): void {
        super.connectedCallback();
        this.autorun(() => {
          this.classList.add(
            'border-box',
            'flex',
            'flex-col',
            'p-m',
            'gap-m',
            'h-full'
          );
        });
    }

    render() {
      const {model} = this.binder
      const cardtipes = Object.keys(CardType);
        return html `
          <h3>List Transaksi</h3>
          <vaadin-form-layout class="flex flex-col">
            <vaadin-text-field ${field(model.name)} label="Nama"></vaadin-text-field>
            <vaadin-radio-group theme="vertical" ${field(model.tipe)} label="Ruangan">
                  ${cardtipes.map((value) =>{
                    return html `
                      <vaadin-radio-button value="${value}" label="${value}"></vaadin-radio-button>
                    `
                  })}
            </vaadin-radio-group>
            <vaadin-text-field  label="No Identitas" ${field(model.carid)}></vaadin-text-field>
            <vaadin-select label="Kamar" .items="${this.items}" ${field(model.room.id)}></vaadin-select>
            <vaadin-date-time-picker label="Cek In Pada" ${field(model.check_in_at)}></vaadin-date-time-picker>
          </vaadin-form-layout>
          
        <div class="flex gap-s m-m ">
              <vaadin-button theme="primary" @click=${this.save} >Check In</vaadin-button>
              <vaadin-button theme="error" >Delete</vaadin-button>
              <vaadin-button theme="tertiary" >Cancel</vaadin-button>
        </div>
        `;
    }

    async save(){
      console.log('tombol save ditekan');
        await this.binder.submitTo(transViewStore.save);
        this.binder.clear();
    }

  async firstUpdated() {
    const people =  transactionStore.rooms;
    this.items = people.map((person) => ({
      label: `${person.number} ${person.name}`,
      value: `${person.id}`,
    }));
  }

}