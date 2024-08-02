import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  @Input() message: string = '';
  @Input() confirmCallback: () => void = () => {};
  @Input() cancelCallback: () => void = () => {};

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    if (this.confirmCallback) {
      this.confirmCallback();
    }
    this.activeModal.close();
  }

  cancel() {
    if (this.cancelCallback) {
      this.cancelCallback();
    }
    this.activeModal.dismiss();
  }
}
