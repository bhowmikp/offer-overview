import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface JobsFormat {
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
export class TablePageComponent implements OnInit {
  // collection = list
  // document = object
  count: number = 0;
  @Input() user;

  jobsCollection : AngularFirestoreCollection<JobsFormat>;
  jobs: Observable<JobsFormat[]>;

  constructor(public auth: AuthService, public afs: AngularFirestore) { }

  ngOnInit() {
    this.jobsCollection = this.afs.collection<JobsFormat>(`users/${this.user.uid}/jobs`);
    this.jobs = this.jobsCollection.valueChanges();
    this.jobs.subscribe(val => {console.log(val);});
  }

  addJob() {
    let id = this.count;
    var item: JobsFormat = {
      jobId: id,
      companyName: "Google",
      location: "NY",
      salary: 5000
    };
    this.count++;
    this.jobsCollection.doc(String(id)).set(item);
  }

  deleteJob() {
    let jobNumber = [0];

    for (let job of jobNumber) {
      this.afs.doc(`users/${this.user.uid}/jobs/${job}`).delete();
    }
  }

}
