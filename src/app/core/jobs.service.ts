import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  // collection = list
  // document = object

  constructor(private afs: AngularFirestore) { }

  /*
  * Add job info in user
  */
  addJob(userId, jobId, item) {
    const jobsCollection = this.afs.collection(`users/${userId}/jobs`);
    jobsCollection.doc(String(jobId)).set(item);
  }

  /*
  * Get all job info depending on when it was entered
  */
  getJobs(userId) {
    return this.afs.collection(`users/${userId}/jobs`, ref => ref.orderBy('jobId', 'desc')).valueChanges();
  }

  /*
  * Delete jobs from the database
  */
  deleteJobs(userId, jobNumber) {
    for (const job of jobNumber) {
      this.afs.doc(`users/${userId}/jobs/${job}`).delete();
    }
  }
}
