import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class Reports {
  private apiUrl = "http://localhost:5000/reports";

  constructor(private http: HttpClient) {}
  getAllReports() {
    return this.http.get(this.apiUrl);
  }
  createReport(report: any) {
    return this.http.post(this.apiUrl, report);
  }
  deleteReport(reportId: string) {
    return this.http.delete(`${this.apiUrl}/${reportId}`);
  }
  updateReportStatus(reportId: string, status: string, adminNotes: string) {
  return this.http.put(`${this.apiUrl}/${reportId}`, {
    status: status,
    adminNotes: adminNotes
  });
}
}
