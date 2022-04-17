import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { NoteViewComponent } from '../note-view/note-view.component';
import { Note } from '../models/Note';
import { NoteService } from '../services/notes.service';
import { DatePipe } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router,
    private dialog: MatDialog, private noteService: NoteService) {

  }

  ngOnInit(): void {
    this.getAllNotes();

    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  editNote() {

  }
  viewNote(id: any) {
    console.log(id);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    

    const dialogRef = this.dialog.open(NoteViewComponent, {
      width: '50%',data: {noteId: id}
    },);
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.notes.push(result);
      }
      console.log(this.notes)
    });

  }

  getAllNotes() {

    this.noteService.getNotes().subscribe(
      (result) => {
        console.log(result)
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
        result.employeeId=1;
        this.noteService.addNote(result).subscribe(
          (result) => {
            console.log(result);
            if (result) {
              this.getAllNotes();
            }
          }
        );
      }
      console.log(this.notes)
    });
  }
  logout(){
    this.router.navigate(['/login']);
    console.log("Logout Method");
  }

}
