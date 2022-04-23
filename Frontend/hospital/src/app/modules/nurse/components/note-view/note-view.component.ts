import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {

  constructor(
    private dialogRef: MatDialogRef<NoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}
