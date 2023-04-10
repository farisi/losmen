import { customElement, property } from "lit/decorators.js";
import { View } from "../view";
import { html } from "lit";
import '@vaadin/text-field'
import TransactionModel from "Frontend/generated/net/myapp/application/data/entity/TransactionModel";
import { Binder, field } from "@hilla/form";
import { transactionStore } from "Frontend/stores/app-store";
import { checkOutStore } from "./check-out-store";

@customElement('checking-out')
export class CheckingOut extends View {

    binder = new Binder(this,TransactionModel)

    constructor(){
        super();
        this.autorun(()=>{
            if(transactionStore.transaction){
                this.binder.read(transactionStore.transaction)
            }
            else {
                this.binder.clear();
            }
        })
    }
    
    connectedCallback() {
        super.connectedCallback();
        this.classList.add('flex');
    }

    render() {
        const {model} = this.binder;

        return html `
            <vaadin-text-field  label="Nama" ${field(model.name)} readonly></vaadin-text-field>
            <vaadin-text-field  label="No Identitas" ${field(model.carid)} readonly ></vaadin-text-field>
            <vaadin-date-time-picker label="Cek In Pada" ${field(model.check_in_at)} readonly></vaadin-date-time-picker>
            <vaadin-date-time-picker label="Check Out Pada" ${field(model.check_out_at)} ></vaadin-date-time-picker>

            <div class="flex gap-s">
                <vaadin-button theme="primary" @click="${this.simpan}">Save</vaadin-button>
                <vaadin-button theme="tertiary" @click="${this.cancel}">Cancel</vaadin-button>
            </div>
        `
    }

    async simpan(){
        await this.binder.submitTo(checkOutStore.simpan);
    }

    cancel(){
        transactionStore.cancelEdit();
        checkOutStore.cancel();
    }
}