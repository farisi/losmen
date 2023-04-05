import { customElement } from "lit/decorators.js";
import { View } from "../view";
import { html } from "lit";
import './checking-out'

@customElement('check-out')
export class CheckOut extends View {
    
    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        
        return html `
            <div class="gap-s p-m">
                <searching-out class="flex  gap-s"></searching-out>
                <checking-out class="flex flex-col p-m gap-s"></checking-out>
            </div>
            
        `
    }
}