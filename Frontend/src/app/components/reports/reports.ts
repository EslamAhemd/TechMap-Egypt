import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Reports } from "../../services/reports";

@Component({
  imports: [CommonModule, FormsModule],
  selector: "app-reports",
  styleUrl: "./reports.css",
  templateUrl: "./reports.html",
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];

  reportData = {
    reportedByUserId: "",
    targetType: "Company",
    targetId: "",
    reportType: "",
    description: "",
  };

  constructor(
    private reportsService: Reports,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.reportsService.getAllReports().subscribe({
      next: (response: any) => {
        console.log("REPORTS RESPONSE:", response);
        this.reports = response.data;
        this.cdr.detectChanges();
        console.log("REPORTS ARRAY:", this.reports);
      },

      error: (error) => {
        console.error("Error loading reports:", error);
      },
    });
  }

  addReport() {
    this.reportsService.createReport(this.reportData).subscribe({
      next: (response: any) => {
        console.log("Report added:", response);
        this.reports.push(response.data);
      },

      error: (error) => {
        console.error("Error adding report:", error);
      },
    });
  }
  deleteReport(reportId: string) {
  this.reportsService.deleteReport(reportId).subscribe({
    next: (response: any) => {
      console.log("Report deleted:", response);

      this.reports = this.reports.filter(
        report => report._id !== reportId
      );

      this.cdr.detectChanges();
    },

    error: (error) => {
      console.error("Error deleting report:", error);
    }
  });
}
updateReportStatus(reportId: string, status: string, adminNotes: string) {
  this.reportsService.updateReportStatus(
    reportId,
    status,
    adminNotes
  ).subscribe({
    next: (response: any) => {
      console.log("Report updated:", response);

      const updatedReport = response.data;

      this.reports = this.reports.map(report =>
        report._id === reportId ? updatedReport : report
      );

      this.cdr.detectChanges();
    },

    error: (error) => {
      console.error("Error updating report:", error);
    }
  });
}
}
