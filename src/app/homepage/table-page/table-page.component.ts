import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { JobsService } from '../../core/jobs.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

/*
* All the entries in the database
*/
export interface JobData {
  jobId: number;
  companyName: string;
  positionTitle: string;
  location: string;
  jobTenure: number;
  salary: number;
  signingBonus: number;
  tax: number;
  livingCost: number;
  prestige: number;
  happiness: number;
  notes: string;
}


@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'select', 'companyName', 'positionTitle', 'location',
    'jobTenure', 'salary', 'signingBonus', 'tax',
    'livingCost', 'prestige', 'happiness', 'notes'
  ];
  dataSource: MatTableDataSource<{}>;

  selection = new SelectionModel<{}>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() user;

  constructor(private jobsService: JobsService, private snackBar: MatSnackBar) {
  }

  ngOnInit() { }

  /*
  * Creates table to sort and have different pages
  */
  ngAfterViewInit() {
    this.jobsService.getJobs(this.user.uid).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /*
  * Filter the table
  */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /*
  * Update cell in the table. Validate the row containing the cell before added
  * to database
  */
  save(value) {
    if (value['jobTenure'] === '' || value['jobTenure'] < 1) {
      value['jobTenure'] = 12;
    }

    if (value['salary'] === '' || value['salary'] < 0) {
      value['salary'] = 0;
    }

    if (value['signingBonus'] === '' || value['signingBonus'] < 0) {
      value['signingBonus'] = 0;
    }

    if (value['tax'] === '' || value['tax'] < 0) {
      value['tax'] = 0;
    }

    if (value['livingCost'] === '' || value['livingCost'] < 0) {
      value['livingCost'] = 0;
    }

    if (value['prestige'] === '' || value['prestige'] < 1 || value['prestige'] > 10) {
      value['prestige'] = 5;
    }

    if (value['happiness'] === '' || value['happiness'] < 1 || value['happiness'] > 10) {
      value['happiness'] = 5;
    }

    this.openSnackBar('Information Updated', 'Alright');

    this.jobsService.addJob(this.user.uid, value['jobId'], value);
  }

  /*
  * Deleted selected entries
  */
  deleteUsers() {
    const jobIdDelete = [];
    for (const job of this.selection['selected']) {
      jobIdDelete.push(job['jobId']);
    }
    this.jobsService.deleteJobs(this.user.uid, jobIdDelete);
    this.selection.clear();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /*
  * Given a number assign a color from red to yellow to green to it
  */
  getColor(color) {
    const value = parseInt(color.value, 10);

    if (value === 1) {
      return '#FF7700';
    } else if (value === 2) {
      return '#FF9900';
    } else if (value === 3) {
      return '#FFBB00';
    } else if (value === 4) {
      return '#FFDD00';
    } else if (value === 5) {
      return '#FFFF00';
    } else if (value === 6) {
      return '#DDFF00';
    } else if (value === 7) {
      return '#BBFF00';
    } else if (value === 8) {
      return '#99FF00';
    } else if (value === 9) {
      return '#77FF00';
    } else if (value === 10) {
      return '#55FF00';
    } else if (value < 1) {
      return '#FF0000';
    } else if (value > 10) {
      return '00FF00';
    }
  }

  /*
  * Opens notification with the message and action for 2 seconds
  */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
