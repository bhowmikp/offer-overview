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

  isOptional = true;
  notOptional = false;

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

  onSubmit(form) {
    const formData = this.parse_forms(form);
    const finalData = this.parse_form_to_object(formData);

    const jobsData = this.jobsService.getJobs(this.user.uid).subscribe(data => {
      let newJobId;

      if (data === undefined || data.length === 0) {
        newJobId = 1;
      } else {
        newJobId = parseInt(data[0]['jobId'], 10) + 1;
      }

      finalData['jobId'] = newJobId;

      this.jobsService.addJob(this.user.uid, newJobId, finalData);

      jobsData.unsubscribe();
    });
  }

  private parse_forms(forms) {
    const data = [];
    for (const form of forms) {
      data.push(form.value);
    }
    return data;
  }

  private parse_form_to_object(formData) {
    let key;
    let value;
    const finalData = {};

    for (const element of formData) {
      key = Object.keys(element)[0];
      value = Object.values(element)[0];

      // set defaults
      if (key === 'jobTenure' && (value === '' || value < 1)) {
        finalData[key] = 12;
      } else if (key === 'salary' && (value === '' || value < 0)) {
        finalData[key] = 0;
      } else if (key === 'signingBonus' && (value === '' || value < 0)) {
        finalData[key] = 0;
      } else if (key === 'tax' && (value === '' || value < 0)) {
        finalData[key] = 0;
      } else if (key === 'livingCost' && (value === '' || value < 0)) {
        finalData[key] = 0;
      } else if (key === 'prestige' && (value === '' || value < 1 || value > 10)) {
        finalData[key] = 5;
      } else if (key === 'happiness' && (value === '' || value < 1 || value > 10)) {
        finalData[key] = 5;
      } else {
        finalData[key] = value;
      }
    }
    console.log(finalData);
    return finalData;
  }
}
