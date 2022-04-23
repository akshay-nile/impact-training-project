import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { NotesComponent } from './components/notes/notes.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'appointment', pathMatch: 'full' },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'visit-report', component: PatientVisitHistoryComponent }
    ]
  },
  { path: 'notes-dialog', component: NoteDialogComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
