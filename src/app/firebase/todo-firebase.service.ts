import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoFirebaseService {
  firestore = inject(Firestore);
  todosCollection = collection(this.firestore, 'todos');

  constructor() {}

  getTodos(){
    return collectionData(this.todosCollection,{
      idField:'id'
    })
  }
}
