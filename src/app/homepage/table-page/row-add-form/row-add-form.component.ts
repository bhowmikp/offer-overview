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
    let finalData = this.parse_form_to_object(formData);

    let jobsData = this.jobsService.getJobs(this.user.uid).subscribe(data => {
      let newJobId;

      if (data === undefined || data.length == 0) {
        newJobId = 1;
      } else {
        newJobId = parseInt(data[0]['jobId'], 10) + 1;
      }


      finalData["jobId"] = newJobId;

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

  private parse_form_to_object(formData) {
    let key;
    let finalData = {};

    for (let element of formData) {
      key = Object.keys(element);

      // set defaults
      if (key == "jobTenure" && element[key] == "") {
        finalData[key] = 12;
      } else if (key == "signingBonus" && element[key] == "") {
        finalData[key] = 0;
      } else if (key == "tax" && element[key] == "") {
        finalData[key] = 0;
      } else if (key == "livingCost" && element[key] == "") {
        finalData[key] = 0;
      } else if (key == "prestige" && element[key] == "") {
        finalData[key] = 5;
      } else if (key == "happiness" && element[key] == "") {
        finalData[key] = 5;
      } else {
        finalData[key] = element[key];
      }
    }
    
    return finalData;
  }
}
