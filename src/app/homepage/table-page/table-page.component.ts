import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import { AuthService } from '../../core/auth.service';
// import { JobsService } from '../../core/jobs.service';
// import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
// import { DataSource } from '@angular/cdk/collections';
// import { Observable } from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

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
  dataSource: MatTableDataSource<JobData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users: JobData[] = [];

  constructor() {
    // Create 100 users
    // const users: JobData[] = [];
    // for (let i = 1; i <= 50; i++) { users.push(createNewUser(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

/** Builds and returns a new User. */
function createNewUser(jobId: number): JobData {
  const companyName = 'Google';
  const location = 'NY';
  const salary = 1;

  return {
    jobId: jobId,
    companyName: companyName,
    location: location,
    salary: salary
  };
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

// export class JobDataSource extends DataSource<any> {
//
//   constructor(private jobsService: JobsService, private userId: String){
//     super();
//   }
//
//   connect() {
//     return this.jobsService.getJobs(this.userId);
//   }
//
//   disconnect() {
//
//   }
// }
