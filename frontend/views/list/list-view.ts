import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import { customElement } from 'lit/decorators';
import { View } from '../view';
import { html } from 'lit';
import './contact-form'
import { uiStore } from 'Frontend/stores/app-store';
import '@vaadin/notification';
import { listViewStore } from './list-view-store';


@customElement('list-view')
export class ListView extends View {

  connectedCallback(): void {
    super.connectedCallback();
    this.autorun(() => {
      this.classList.add(
        'box-border',
        'flex',
        'flex-col',
        'p-m',
        'gap-s',
        'w-full',
        'h-full'
      );
      if (listViewStore.selectedContact) {
        this.classList.add("editing");
      } else {
        this.classList.remove("editing");
      }
    });
  }
  render() {
    return html`
          <div class="toolbar flex gap-s">
            <vaadin-text-field placeholder="Filter by name" 
                clear-button-visible
                .value=${listViewStore.filterText}
                @input=${this.updateFilter}
                ></vaadin-text-field>
            <vaadin-button @click=${listViewStore.editNew}>Add Contact</vaadin-button>
          </div>
          <div class="content flex gap-m h-full">
            <vaadin-grid class="grid h-full" .items=${listViewStore.filteredContacts}
            .selectedItems=${[listViewStore.selectedContact]}
            @active-item-changed=${this.handleGridSelection}>
              <vaadin-grid-column path="firstName" auto-width> </vaadin-grid-column>
              <vaadin-grid-column path="lastName" auto-width> </vaadin-grid-column>
              <vaadin-grid-column path="email" auto-width> </vaadin-grid-column>
              <vaadin-grid-column path="status.name" header="Status" auto-width></vaadin-grid-column>
              <vaadin-grid-column path="company.name" header="Company" auto-width></vaadin-grid-column>
            </vaadin-grid>
            <contact-form class="flex flex-col gap-s" ?hidden=${!listViewStore.selectedContact}></contact-form>
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
    listViewStore.updateFilter(e.target.value);
  }

  // vaadin-grid fires a null-event when initialized. Ignore it.
  firstSelectionEvent = true;
  handleGridSelection(e: CustomEvent) {
    if (this.firstSelectionEvent) {
      this.firstSelectionEvent = false;
      return;
    }
    listViewStore.setSelectedContact(e.detail.value);
  }
}