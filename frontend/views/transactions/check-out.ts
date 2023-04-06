import { customElement } from "lit/decorators.js";
import { View } from "../view";
import { html } from "lit";
import './checking-out'
import { transViewStore } from "./transaction-view-store";
import { transactionStore } from "Frontend/stores/app-store";

@customElement('check-out')
export class CheckOut extends View {
    
    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        
        return html `
            <div class="gap-s p-m">
                <searching-out class="flex  gap-s" ?hidden=${transactionStore.transaction}></searching-out>
                <checking-out class="flex flex-col p-m gap-s" ?hidden=${!transactionStore.transaction}></checking-out>
            </div>
        `
    }
}