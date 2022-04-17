import { Appointment } from "./Appointment";
import { Diagnosis } from "./Diagnosis";
import { Employee } from "./Employee";
import { Medication } from "./Medication";
import { Patient } from "./Patient";
import { Procedure } from "./Procedure";
import { Vitals } from "./Vitals";

export class VisitReport{
    patient:Patient;
    physician:Employee;
    appointment:Appointment;
    vitals:Vitals;
    procedures:Procedure[];
    medications:Medication[];
    diagnosis:Diagnosis[];
}
