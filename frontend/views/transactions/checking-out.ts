import { customElement, property } from "lit/decorators.js";
import { View } from "../view";
import { html } from "lit";
import '@vaadin/text-field'
import TransactionModel from "Frontend/generated/net/myapp/application/data/entity/TransactionModel";
import { Binder } from "@hilla/form";
import { transactionStore } from "Frontend/stores/app-store";

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
        return html`
            <vaadin-text-field  label="Nama" ${model.name} readonly></vaadin-text-field>
            <vaadin-text-field  label="No Identitas" ${model.carid} readonly></vaadin-text-field>
            <vaadin-date-time-picker label="Cek In Pada" ${model.check_in_at} readonly></vaadin-date-time-picker>

            <div class="flex gap-s">
                <vaadin-button theme="primary">Save</vaadin-button>
                <vaadin-button theme="error">Delete</vaadin-button>
                <vaadin-button theme="tertiary">Cancel</vaadin-button>
            </div>
        `
    }
}