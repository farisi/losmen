import { html } from "lit";
import { View } from "../view";
import { customElement } from "lit/decorators.js";
import { uiStore } from "Frontend/stores/app-store";
import './room-add'
import { roomIndexStore } from "./room-index-store";

@customElement('room-index')
export class RoomIndex extends View {

    connectedCallback(): void {
        super.connectedCallback();
        this.classList.add('border-box', 'flex', 'flex-col', 'p-m', 'gap-m', 'h-full');
    }

    protected render() {
        return html`
            <div class="toolbar flex gap-s">
            <vaadin-text-field placeholder="Filter by name" 
                clear-button-visible
                .value=${roomIndexStore.filterText}
                @input=${this.updateFilter}></vaadin-text-field>
          </div>
          <div class="content flex gap-m h-full">
            <vaadin-grid class="grid h-full" 
                    .items=${roomIndexStore.filteredContacts}
                    .selectedItems=${[roomIndexStore.selectedContact]}
                    @active-item-changed=${this.handleGridSelection}
                >
                <vaadin-grid-column path="name" header="Jenis Kamar" auto-width> </vaadin-grid-column>
                <vaadin-grid-column path="number" header="Nomor Kamar" auto-width> </vaadin-grid-column>
                <vaadin-grid-column path="floor" header="lantai" auto-width> </vaadin-grid-column>
                <vaadin-grid-column path="status" header="Status" auto-width></vaadin-grid-column>
            </vaadin-grid>
            <room-add class="flex flex-col gap-s"></room-add>
          </div>

          <vaadin-notification
                theme=${uiStore.message.error ? 'error' : 'contrast'}
                position="bottom-start"
                .opened=${uiStore.message.open}
                    .renderer=${(root: HTMLElement) =>
                        (root.textContent = uiStore.message.text)}>
            </vaadin-notification>
        `;
    }

    updateFilter(e: { target: HTMLInputElement }) {
        roomIndexStore.updateFilter(e.target.value);
    }

    // vaadin-grid fires a null-event when initialized. Ignore it.
    firstSelectionEvent = true;

    handleGridSelection(e: CustomEvent) {
        if (this.firstSelectionEvent) {
            this.firstSelectionEvent = false;
            return;
        }
        roomIndexStore.setSelectedContact(e.detail.value);
    }
}
