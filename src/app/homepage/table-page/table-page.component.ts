import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { JobsService } from '../../core/jobs.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {NgForm} from '@angular/forms';

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
  displayedColumns = ['companyName', 'location', 'salary'];
  dataSource: MatTableDataSource<{}>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() user;

  constructor(private jobsService: JobsService) {
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
    let a = this.jobsService.getJobs(this.user.uid).subscribe(data => {
      let newJobId;

      if (data === undefined || data.length == 0) {
        newJobId = 1;
      } else {
        newJobId = data[0]['jobId'] + 1;
      }

      if (form.value["companyName"] !== "") {
        form.value.jobId = newJobId;
        this.jobsService.addJob(this.user.uid, newJobId, form.value);
        form.reset();
      }

      a.unsubscribe();
    });
  }

  save(value) {
    this.jobsService.addJob(this.user.uid, value["jobId"], value);
  }
}
