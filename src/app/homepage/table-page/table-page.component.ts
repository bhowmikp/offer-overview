import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { JobsService } from '../../core/jobs.service';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {

  JobDetails = {
    jobId: 0,
    companyName: '',
    location: '',
    salary: 0
  }

  displayedColumns = ['Company Name', 'Location', 'Salary'];

  count: number = 0;
  @Input() user;

  constructor(private jobsService: JobsService,
              public auth: AuthService,
              public afs: AngularFirestore) { }

  ngOnInit() {
    let dataSoruce = new JobDataSource(this.jobsService, this.user.uid);
  }

  addJob() {
    let id = this.count;
    let item = {
      jobId: id,
      companyName: "Google",
      location: "NY",
      salary: 5000
    };
    this.count++;
    this.jobsService.addJob(this.user.uid, id, item);
  }

}

export class JobDataSource extends DataSource<any> {

  constructor(private jobsService: JobsService, private userId: String){
    super();
  }

  connect() {
    return this.jobsService.getJobs(this.userId);
  }

  disconnect() {

  }
}
