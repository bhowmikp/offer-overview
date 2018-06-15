import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  // collection = list
  // document = object
  
  constructor(private afs: AngularFirestore) { }

  addJob(userId, jobId, item) {
    let jobsCollection = this.afs.collection(`users/${userId}/jobs`);
    jobsCollection.doc(String(jobId)).set(item);
  }

  getJobs(userId) {
    return this.afs.collection(`users/${userId}/jobs`, ref => ref.orderBy('jobId', 'desc')).valueChanges();
  }

  deleteJobs(userId, jobNumber) {
    for (let job of jobNumber) {
      this.afs.doc(`users/${userId}/jobs/${job}`).delete();
    }
  }
}
