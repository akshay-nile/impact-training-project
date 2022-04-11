import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Note } from 'src/app/models/Note';
import { NoteViewComponent } from '../note-view/note-view.component';
import { NoteService } from 'src/app/services/notes.service';
import { AuthenticationService } from 'src/app/services/Authentication.servic';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  user: number;
  userName: string;

  constructor(private router: Router,
    private dialog: MatDialog,
    private noteService: NoteService,
    private authenticationService: AuthenticationService) {
    this.user = authenticationService.getUserId();
    this.userName = authenticationService.getUserName();
  }

  ngOnInit(): void {
    this.getAllNotes();
  }

  viewNote(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NoteViewComponent, {
      width: '50%', data: { noteId: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.notes.push(result);
      }
    });

  }

  getAllNotes() {
    this.noteService.getNotes().subscribe(
      (result) => {
        this.notes = result
      }
    );
  }

  sendNote() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        result.employeeId = 1;
        this.noteService.addNote(result).subscribe(
          (result) => {
            if (result) {
              this.getAllNotes();
            }
          }
        );
      }
    });
  }
}
