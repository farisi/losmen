import { ConfirmDialogOpenedChangedEvent } from '@vaadin/confirm-dialog';
import Room from 'Frontend/generated/net/myapp/application/data/entity/Room';
import RoomModel from 'Frontend/generated/net/myapp/application/data/entity/RoomModel';
import { crmStore, roomStore } from 'Frontend/stores/app-store';
import { makeAutoObservable, observable } from 'mobx';

class RoomIndexStore {

  filterText = '';
  selectedContact: Room | null = null;
  dialogOpened:  Boolean = false;
  status = '';

  constructor() {
    makeAutoObservable(
      this,
      {
        selectedContact: observable.ref,
      },
      { autoBind: true }
    );
  }

  setSelectedContact(room: Room) {
    this.selectedContact = room;
  }
  updateFilter(filterText: string) {
    this.filterText = filterText;
  }

  get filteredContacts() {
    const filter = new RegExp(this.filterText, 'i');
    const contacts = roomStore.rooms;
    return contacts.filter((contact) =>
      filter.test(`${contact.name}`) || filter.test(`${contact.status}`)
    );
  }

  editNew() {
    this.selectedContact = RoomModel.createEmptyValue();
  }

  cancelEdit() {
    this.selectedContact = null;
  }

  openDialog(){
    if (this.selectedContact) {
      this.dialogOpened=true;
    }
  }

  closeDialog(){
    this.dialogOpened=false;
  }

  openedChanged(e: ConfirmDialogOpenedChangedEvent) {
    this.dialogOpened = e.detail.value;
    if (this.dialogOpened) {
      this.status = '';
    }
  }

  async save(room: Room) {
    await roomStore.saveRoom(room)
    this.cancelEdit()
  }

  async delete() {
    if (this.selectedContact) {
      await roomStore.deleteRoom(this.selectedContact); 
      this.cancelEdit()
    }
  }
}

export const roomIndexStore = new RoomIndexStore();