import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { VisitReport } from 'src/app/models/VisitReport';

@Component({
  selector: 'visit-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @Input() reportData: VisitReport;
  @Output('buttonClick') buttonClickEvent = new EventEmitter<string>();

  constructor (
    private snackbar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void { }

  downloadReport() {
    var element = document.getElementById("report");
    html2canvas(element).then((canvas) => {
      var imgData = canvas.toDataURL("image/png");
      let doc = new jspdf();
      doc.addImage(imgData, 0, 0, 208, 250);
      doc.save("REPORT_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss') + ".pdf");
    });
    this.snackbar.open("Report downloading will start soon !","",{duration: 3000});
    this.emitButtonClickEvent('download');
  }

  emitButtonClickEvent(action: string) {
    this.buttonClickEvent.emit(action);
  }

}
