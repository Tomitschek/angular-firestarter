import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { Rack, Pump } from './rack.model';

@Injectable({
  providedIn: 'root'
})
export class RackService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * Creates a new rack for the current user
   */
  async createRack(data: Rack) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      pumps: [{ description: 'Hello!', label: 'yellow' }]
    });
  }

  /**
   * Get all boards owned by current user
   */
  getUserRacks() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Rack>('boards', ref =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
      // map(boards => boards.sort((a, b) => a.priority - b.priority))
    );
  }

  /**
   * Run a batch write to change the priority of each rack for sorting
   */
  sortRacks(racks: Rack[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = racks.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * Delete rack
   */
  deleteRack(rackId: string) {
    return this.db
      .collection('boards')
      .doc(rackId)
      .delete();
  }

  /**
   * Updates the tasks on rack
   */
  updatePumps(rackId: string, pumps: Pump[]) {
    return this.db
      .collection('boards')
      .doc(rackId)
      .update({ pumps });
  }

  /**
   * Remove a specifc pump from the rack
   */
  removePump(rackId: string, pump: Pump) {
    return this.db
      .collection('boards')
      .doc(rackId)
      .update({
        pumps: firebase.firestore.FieldValue.arrayRemove(pump)
      });
  }


}
