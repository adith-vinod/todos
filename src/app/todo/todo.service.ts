import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { from, Observable, switchMap } from 'rxjs';
import { Todo } from '../models/todo';
import {
  Auth,
  authState,
  getAuth,
  onAuthStateChanged,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private auth = inject(Auth);
  fireStore = inject(Firestore);

  constructor() {}

  helperFn(fn: (todoRef: CollectionReference) => Observable<any>) {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (!user) throw new Error('user not logged in');
        const todoRef = collection(this.fireStore, `users/${user.uid}/todos`);
        return fn(todoRef);
      })
    );
  }

  getTodos(): Observable<any> {
    // return authState(this.auth).pipe(
    //   switchMap((user) => {
    //     if (!user) throw new Error('user not logged in');
    //     const todoRef = collection(this.fireStore, `users/${user.uid}/todos`);
    //     return from(
    //       collectionData(todoRef, {
    //         idField: 'id',
    //       })
    //     );
    //   })
    // );
    return this.helperFn((todosRef) =>
      collectionData(todosRef, { idField: 'id' })
    );
  }

  addTodos(title: string): Observable<any> {
    const todoItem = { title, isComplete: false };
    // return authState(this.auth).pipe(
    //   switchMap((user) => {
    //     if (!user) throw new Error('user not logged in');
    //     const todoRef = collection(this.fireStore, `users/${user.uid}/todos`);
    //     return from(addDoc(todoRef, todoItem));
    //   })
    // );

    return this.helperFn((todoRef) => from(addDoc(todoRef, todoItem)));
  }

  deleteTodo(id: string): Observable<any> {
    // return authState(this.auth).pipe(
    //   switchMap((user) => {
    //     if (!user) throw new Error('user not logged in');
    //     const deleteRef = doc(this.fireStore, `users/${user.uid}/todos/` + id);
    //     return from(deleteDoc(deleteRef));
    //   })
    // );
    return this.helperFn(() => {
      const deleteRef = doc(
        this.fireStore,
        `users/${this.auth.currentUser?.uid}/todos/` + id
      );
      return from(deleteDoc(deleteRef));
    });
  }

  updateTodo(todo: Todo): Observable<any> {
    const { id, title, isComplete } = todo;
    //   return authState(this.auth).pipe(
    //     switchMap((user) => {
    //       if (!user) throw new Error('user not logged in');
    //       const docRef = doc(this.fireStore, `users/${user.uid}/todos/` + id);
    //       return from(setDoc(docRef, { title, isComplete }));
    //     })
    //   );
    // }
    return this.helperFn(() => {
      const docRef = doc(
        this.fireStore,
        `users/${this.auth.currentUser?.uid}/todos/` + id
      );
      return from(setDoc(docRef, { title, isComplete }));
    });
  }
}
