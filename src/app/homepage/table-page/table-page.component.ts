import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { JobsService } from '../../core/jobs.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
// import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import {MatStepperModule} from '@angular/material/stepper';


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
  displayedColumns = ['select', 'companyName', 'location', 'salary'];
  dataSource: MatTableDataSource<{}>;

  selection = new SelectionModel<{}>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // form
  isLinear = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  eighthFormGroup: FormGroup;
  ninthFormGroup: FormGroup;
  tenthFormGroup: FormGroup;
  eleventhFormGroup: FormGroup;

  isOptional: boolean = true;
  notOptional: boolean = false;

  @Input() user;

  constructor(private jobsService: JobsService, private snackBar: MatSnackBar, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      companyName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      positionTitle: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      location: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      jobTenure: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      salary: ['', Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      signingBonus: ['', Validators.required]
    });
    this.seventhFormGroup = this._formBuilder.group({
      tax: ['', Validators.required]
    });
    this.eighthFormGroup = this._formBuilder.group({
      livingCost: ['', Validators.required]
    });
    this.ninthFormGroup = this._formBuilder.group({
      prestige: ['', Validators.required]
    });
    this.tenthFormGroup = this._formBuilder.group({
      happiness: ['', Validators.required]
    });
    this.eleventhFormGroup = this._formBuilder.group({
      notes: ['', Validators.required]
    });
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
    let formData = this.parse_forms(form);
    let jobsData = this.jobsService.getJobs(this.user.uid).subscribe(data => {
      let newJobId;

      if (data === undefined || data.length == 0) {
        newJobId = 1;
      } else {
        newJobId = data[0]['jobId'] + 1;
      }

      if (formData["companyName"] !== "" && formData["companyName"] !== null) {
        let finalData = {};
        let key;

        finalData["jobId"] = newJobId;

        for (let element of formData) {
          key = Object.keys(element);
          finalData[key] = element[key];
        }

        this.jobsService.addJob(this.user.uid, newJobId, finalData);
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

  private parse_forms(forms) {
    let data = [];
    for (let form of forms) {
      data.push(form.value);
    }
    return data;
  }

}
