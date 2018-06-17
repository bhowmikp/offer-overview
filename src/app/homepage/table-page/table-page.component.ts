import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { JobsService } from '../../core/jobs.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';


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
export class TablePageComponent {
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

  constructor(private jobsService: JobsService) {
  }

  ngOnInit() { }

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

  save(value) {
    if (value["jobTenure"] == "" || value["jobTenure"] < 1) {
      value["jobTenure"] = 12;
    }

    if (value["signingBonus"] == "" || value["signingBonus"] < 0) {
      value["signingBonus"] = 0;
    }

    if (value["tax"] == "" || value["tax"] < 0) {
      value["tax"] = 0;
    }

    if (value["livingCost"] == "" || value["livingCost"] < 0) {
      value["livingCost"] = 0;
    }

    if (value["prestige"] == "" || value["prestige"] < 0 || value["prestige"] >10) {
      value["prestige"] = 5;
    }

    if (value["happiness"] == "" || value["happiness"] < 0 || value["happiness"] > 10) {
      console.log(value["happiness"]);
      value["happiness"] = 5;
    }

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

  getColor(value) {
    if (value.value == 1) {
      return "#FF7700";
    } else if (value.value == 2){
      return "#FF9900";
    } else if (value.value == 3){
      return "#FFBB00";
    } else if (value.value == 4){
      return "#FFDD00";
    } else if (value.value == 5){
      return "#FFFF00";
    } else if (value.value == 6){
      return "#DDFF00";
    } else if (value.value == 7){
      return "#BBFF00";
    } else if (value.value == 8){
      return "#99FF00";
    } else if (value.value == 9){
      return "#77FF00";
    } else if (value.value == 10){
      return "#55FF00";
    } else if (value.value < 1){
      return "#FF0000";
    } else if (value.value > 10){
      return "00FF00";
    }
  }

}
