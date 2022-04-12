import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../models/Note';
import { NoteService } from '../services/notes.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private noteService:NoteService) { console.log("Hello")
    console.log("iNSIDE ID "+data.noteId); }
    note:Note;
  ngOnInit(): void {
    console.log(this.data)
    this.noteService.getNoteById(this.data.noteId).subscribe((result)=>{
      console.log(result);
      this.note=result;
    });
  }

}
