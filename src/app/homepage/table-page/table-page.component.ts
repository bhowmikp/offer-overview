import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { JobsService } from '../../core/jobs.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

export interface JobData {
  jobId: number;
  companyName: string;
  location: string;
  salary: number;
}


@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent {
  displayedColumns = ['select', 'companyName', 'location', 'salary'];
  dataSource: MatTableDataSource<{}>;
  selection = new SelectionModel<{}>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() user;

  constructor(private jobsService: JobsService, private snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
    this.jobsService.getJobs(this.user.uid).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onSubmit(form){
    let jobsData = this.jobsService.getJobs(this.user.uid).subscribe(data => {
      let newJobId;

      if (data === undefined || data.length == 0) {
        newJobId = 1;
      } else {
        newJobId = data[0]['jobId'] + 1;
      }

      if (form.value["companyName"] !== "" && form.value["companyName"] !== null) {
        form.value.jobId = newJobId;
        this.jobsService.addJob(this.user.uid, newJobId, form.value);
        form.reset();
      }

      jobsData.unsubscribe();
    });
  }

  save(value) {
    this.jobsService.addJob(this.user.uid, value["jobId"], value);
  }

  deleteUsers() {
    let jobIdDelete = [];
    for (let job of this.selection['selected']) {
      jobIdDelete.push(job['jobId']);
    }
    this.jobsService.deleteJobs(this.user.uid, jobIdDelete);
    this.selection.clear();
  }

  openSnackBar(form, message: string, action: string) {
    if (form.value["companyName"] === "" || form.value["companyName"] === null) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
