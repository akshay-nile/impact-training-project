import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/notes.service';
import { NoteViewComponent } from '../note-view/note-view.component';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from 'src/app/services/utility.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  user: any;
  allEmployees = []

  notes = [];
  sentNotes = [];
  receivedNotes = [];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private noteService: NoteService,
    private utilityService: UtilityService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.getAllNotes();
    this.getAllEmployees();
  }

  getSentToNameByEmail(note: any): string {
    let emp = this.allEmployees.find(e => e.employeeId === note.employeeId);
    if (emp) return "From: " + emp.title + '. ' + emp.firstName + ' ' + emp.lastName;
    emp = this.allEmployees.find(e => e.email === note.sendTo);
    if (emp) return "To: " + emp.title + '. ' + emp.firstName + ' ' + emp.lastName;
    return "";
  }

  getAllEmployees() {
    this.utilityService.getAllEmployees().subscribe(res => {
      this.allEmployees = res.filter(e => e.employeeId !== this.user.employeeId && e.role !== 'ADMIN');
    });
  }

  viewNote(note: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NoteViewComponent, {
      width: '50%', data: { note: note, nameToOrFrom: this.getSentToNameByEmail(note)}
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
        this.sentNotes = this.notes.filter(n => n.employeeId === this.user.employeeId);
        this.receivedNotes = this.notes.filter(n => n.sendTo === this.user.email);
      } else alert("Notes Not Available !");
    });
  }

  getNoteColor(status) {
    return {
      "bg-secondary": status === 'CLOSED',
      "bg-success": status === 'ACTIVE'
    }
  }

  changeStatus(id: any) {
    this.noteService.getNoteById(id).subscribe((result) => {
      result.status = 'CLOSED';
      this.notes.find((n) => n.noteId === id).status = 'CLOSED';
      this.noteService.updateNote(result).subscribe();
    });
    this.snackbar.open("Note thread is closed successfully !", "", { duration: 3000 });
  }

  showNoteDialog(replyTo?: string) {
    let employees = replyTo ? this.allEmployees.filter(e => e.employeeId === replyTo) : this.allEmployees;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '50%', data: { user: this.user, employees: employees }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.noteService.addNote(result).subscribe(res => this.getAllNotes());
      }
    });
  }

}

