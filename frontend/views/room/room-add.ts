import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { View } from "../view";
import RoomModel from 'Frontend/generated/net/myapp/application/data/entity/RoomModel';
import { Binder, field } from "@hilla/form";
import { roomIndexStore } from "./room-index-store";

import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/text-field';
import '@vaadin/radio-group';
import '@vaadin/confirm-dialog';
import RoomStatus from "Frontend/generated/net/myapp/application/data/entity/StatusModel"
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';



@customElement('room-add')
export class RoomAdd extends View {

    protected binder = new Binder(this,RoomModel)
    protected status : RoomStatus[] = [];
    protected statusMessage : String = "";
    
    constructor(){
        super();
        this.autorun(()=>{
            if(roomIndexStore.selectedContact){
                this.binder.read(roomIndexStore.selectedContact)
            }
            else {
                this.binder.clear();
            }
        })

    }

    render() {
        const {model} = this.binder
        return html `
        <vaadin-dialog
            header-title="${`Anda ingin menghapus data ?`}"
            .opened="${roomIndexStore.dialogOpened}"
            @opened-changed="${roomIndexStore.openedChanged}"
            ${dialogRenderer(() => html`Are you sure you want to delete this user permanently?`, [])}
            ${dialogFooterRenderer(
            () => html`
                <vaadin-button theme="primary error" @click="${async ()=>{
                    roomIndexStore.closeDialog();
                    roomIndexStore.delete();
                }}" style="margin-right: auto;">
                Delete
                </vaadin-button>
                <vaadin-button theme="tertiary" @click="${roomIndexStore.closeDialog}">Cancel</vaadin-button>
            `,
            []
            )}
        ></vaadin-dialog>

        <vaadin-text-field label="Nama"
            ${field(model.name)}></vaadin-text-field>
        <vaadin-text-field label="Nomor"
            ${field(model.number)}></vaadin-text-field>
        <vaadin-text-field label="Lantai"
            ${field(model.floor)}></vaadin-text-field>
      
      <div class="flex gap-s">
        <vaadin-button theme="primary" @click=${this.save}>${this.binder.value.id ? 'Perbaharui':'Tambah'}</vaadin-button>
        <vaadin-button theme="error"  @click=${roomIndexStore.openDialog} >Delete</vaadin-button>
        <vaadin-button theme="tertiary" @click=${roomIndexStore.cancelEdit}>Cancel</vaadin-button>
      </div>
        `;
    }

    async save(){
        await this.binder.submitTo(roomIndexStore.save);
        this.binder.clear();
    }
}