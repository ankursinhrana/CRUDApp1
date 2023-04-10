import { Component } from '@angular/core';
import { IBook } from '../../Models/book.model';
import { Service1Service } from '../../Services/service1.service';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  book: IBook = { id: '', name: '', date: '', stime: '', etime: '' };
  books: any;
  isAddclicked = true;
  isEditclicked = false;
  isnameExist = false;
  bookid: any;
  gName: any;
  gDate: any;
  gEtime: any;
  gStime: any;

  frameworkComponents: any;
  rowDataClicked1: any = [];
  rowDataClicked2: any = [];
  rowData: any = [];

  constructor(private s1: Service1Service, private afs: AngularFirestore) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit() {
    this.s1.getbooks().subscribe(res => {
      this.books = res;
      this.rowData = res;
    });
  }

  onSubmit(form: NgForm) {
    if (form.value.stime < form.value.etime) {
      this.afs.collection(`bookingMaster`, ref => ref.where('name', "==", form.value.name)).snapshotChanges().subscribe(res => {
        if (res.length == 0) {
          this.s1.addbook(form.value);
          form.reset();
          this.isnameExist = false;
        }
        else {
          this.isnameExist = true;
        }
      });
    } else {
      alert("select valid time");
    }

  }

  onSubmitEditData(form: NgForm) {
    if (form.value.stime < form.value.etime) {
      if (confirm('Are you sure to Edit this record ?') == true) {
        this.s1.updatebook(form.value, this.bookid);
        form.reset();
        this.isAddclicked = true;
        this.isEditclicked = false;
      } else {

      }
    } else {
      alert("select valid time");
    }
  }

  onBtnEdit(e: any) {
    this.bookid = e.rowData.id;
    this.isAddclicked = false;
    this.isEditclicked = true;
    this.s1.getbooksDatabyID(e.rowData).ref.get().then(response => {
      this.gName = response.data()?.name;
      this.gDate = response.data()?.date;
      this.gStime = response.data()?.stime;
      this.gEtime = response.data()?.etime;
    }).catch(function (error) {
      alert(error.message);
    });
  }

  onBtnDelete(e: any) {
    this.rowDataClicked2 = e.rowData;
    if (confirm('Are you sure to delete this record ?') == true) {
      this.s1.deleteBook(e.rowData);
    }
  }


  columnDefs = [
    {
      headerName: 'Name', field: 'name', sortable: true,
      filter: true,
      resizable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: 'Date', field: 'date', sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      headerName: 'Start-Time', field: 'stime', sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      headerName: 'End-Time', field: 'etime', sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      headerName: 'Edit',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnEdit.bind(this),
        label: 'Edit',
      },
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 90,
      flex: 1,

    },
    {
      headerName: 'Delete',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnDelete.bind(this),
        label: 'Delete',
      },
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 110,
      flex: 1,
    },
  ];
}
