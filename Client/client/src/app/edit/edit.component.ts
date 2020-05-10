import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiService, IActor } from '../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  actorList: IActor[] = [];
  selectedActorEdit: IActor;
  selectedActorDelete: IActor;
  emptyActor: any = {
    name: "",
    firstName: "",
    age: "",
    dateOfBirth: "",
    placeOfBirth: "",
  };
  postActor: any = {
    name: "",
    firstName: "",
    age: "",
    dateOfBirth: "",
    placeOfBirth: "",
  };

  constructor(private service: ApiService) {
    
  }

  ngOnInit(): void {
    this.GetActors();
  }

  GetActors() {
    this.service.GetAllActors().subscribe(a => this.actorList = a);
  }

  AddActor(){
    console.log("add");
    this.service.PostActor(this.postActor).subscribe(res => {
      this.actorList.push(res);
      alert("Actor added successfully !! ")
      }), err => {
          console.log("Error Occured " + err);
      };
  }

  RemoveActor(){
    console.log(this.selectedActorDelete);
    this.service.DeleteActor(this.selectedActorDelete).subscribe(res => {
      this.actorList.push(res);
      alert("Actor deleted successfully !!")
      }), err => {
          console.log("Error Occured " + err);
      };
  }
}
