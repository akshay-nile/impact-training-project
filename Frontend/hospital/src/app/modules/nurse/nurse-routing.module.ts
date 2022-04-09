import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sampleTime } from 'rxjs';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'notes-dialog', component: NoteDialogComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
