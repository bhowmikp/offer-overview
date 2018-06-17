import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { JobsService } from '../../../core/jobs.service';

@Component({
  selector: 'app-row-add-form',
  templateUrl: './row-add-form.component.html',
  styleUrls: ['./row-add-form.component.css']
})
export class RowAddFormComponent implements OnInit {

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

  constructor(private jobsService: JobsService, private _formBuilder: FormBuilder) { }

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

  onSubmit(form){
    let formData = this.parse_forms(form);
    let jobsData = this.jobsService.getJobs(this.user.uid).subscribe(data => {
      let newJobId;

      if (data === undefined || data.length == 0) {
        newJobId = 1;
      } else {
        newJobId = data[0]['jobId'] + 1;
      }

      let finalData = {};
      let key;

      finalData["jobId"] = newJobId;

      for (let element of formData) {
        key = Object.keys(element);
        finalData[key] = element[key];
      }

      this.jobsService.addJob(this.user.uid, newJobId, finalData);

      jobsData.unsubscribe();
    });
  }

  private parse_forms(forms) {
    let data = [];
    for (let form of forms) {
      data.push(form.value);
    }
    return data;
  }
}
