import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ask-reason',
  templateUrl: './ask-reason.component.html',
  styleUrls: ['./ask-reason.component.css']
})
export class AskReasonComponent {
  
  @Input() type: string;
  @Output('reason') reasonEvent = new EventEmitter<string>();

  reasonText = '';

  constructor() { }

  emitReasonEvent(reason: string) {
    this.reasonEvent.emit(reason);
    this.reasonText = '';
  }
}
