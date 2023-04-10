import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBook } from '../../app/Models/book.model';
import { doc, getFirestore, deleteDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})

export class Service1Service {


  booksCollection: AngularFirestoreCollection<IBook>;
  booksOB: Observable<IBook[]>;
  //booksDoc:AngularFirestoreDocument<IBook>

  constructor(private afs: AngularFirestore) {
    this.booksCollection = afs.collection<IBook>('bookingMaster', ref => ref.orderBy('date', 'asc'));
    this.booksOB = this.booksCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as IBook;
      const id = a.payload.doc.id;
      return { id, ...data };
    })));

  }

  getbooks() {
    return this.booksOB;
  }

  addbook(books: IBook) {
    this.booksCollection.add(books);
  }

  getUserbyName(books: IBook) {
    return this.booksCollection.doc(books.name);
  }

  getbooksDatabyID(books: IBook) {
    return this.booksCollection.doc(books.id);
  }

  updatebook(books: IBook, bid: any) {
    return this.booksCollection.doc(bid).update(books);
  }

  deleteBook(book: IBook) {
    const db = this.afs.firestore;
    const docRef = doc(db.collection("bookingMaster"), book.id);
    deleteDoc(docRef).then(() => {
      alert("Sucessfully Deleted");
    }).catch(error => {
      alert(error.message);
    });


  }

}
