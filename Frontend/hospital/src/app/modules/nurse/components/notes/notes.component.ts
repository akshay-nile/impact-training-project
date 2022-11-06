import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Note } from 'src/app/models/Note';
import { NoteViewComponent } from '../note-view/note-view.component';
import { NoteService } from 'src/app/services/notes.service';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  user: any;

  allEmployeeNames = [];

  constructor(
    private dialog: MatDialog,
    private noteService: NoteService,
    private utilityService: UtilityService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.getAllEmployeeNames();
    this.getAllNotes();
  }

  getSentToNameByEmail(note: any): string {
    let emp = this.allEmployeeNames.find(e => e.employeeId === note.employeeId);
    if (emp) return "From: " + emp.name;
    return "To: " + this.allEmployeeNames.find(e => e.email === note.sendTo)?.name;
  }

  getAllEmployeeNames() {
    this.utilityService.getAllPhysicians().subscribe(res => {
      this.allEmployeeNames = res;
    });
  }

  viewNote(note: Note) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(NoteViewComponent, {
      minWidth: '50%',
      data: { note: note, sendToName: this.getSentToNameByEmail(note) }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.notes.push(result);
      }
    });
  }

  getAllNotes() {
    this.noteService.getNotes().subscribe(res => {
      if (res != null) {
        this.notes = res.filter(n => n.employeeId === this.user.employeeId || n.sendTo === this.user.email);
      } else alert("Notes Not Available !");
    });
  }

  sendNote() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      minWidth: '50%', 
      data: { user: this.user, employeeNames: this.allEmployeeNames }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.noteService.addNote(result).subscribe(res => this.getAllNotes());
      }
    });
  }
}
