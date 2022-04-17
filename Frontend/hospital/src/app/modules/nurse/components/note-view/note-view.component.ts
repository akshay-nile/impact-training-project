import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/models/Note';
import { NoteService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private noteService: NoteService) {
  }
  note=new Note();
  ngOnInit(): void {
    this.noteService.getNoteById(this.data.noteId).subscribe((result) => {
      this.note = result;
    });
  }

}
