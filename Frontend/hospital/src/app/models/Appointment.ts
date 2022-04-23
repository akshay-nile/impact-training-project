export class Appointment {
    appointmentId: number;
    title: string;
    description: string;
    date: Date;
    time: string;
    patientId: string;
    employeeId: string;
    status: string;
    editHistory: string;
    editedBy: number;
    isDataCollectionAppointment: boolean;
    dataCollectionStatus: boolean;
}