import { customElement } from "lit/decorators.js";
import { View } from "../view";
import { html } from "lit";

@customElement('check-out')
export class CheckOut extends View {
    
    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        
        return html `
            <div class="gap-s p-m">
                <searching-out class="flex flex-col gap-s"></searching-out>
            </div>
        `
    }
}