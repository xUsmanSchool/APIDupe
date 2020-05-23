import { Component, OnInit } from '@angular/core';
import { ApiService, IDirector } from '../services/api.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {
  directorList: IDirector[] = [];
  selectedDirectorDelete: IDirector;
  selectedDirectorEdit: IDirector;

  postDir: any = {
    name: "",
    firstName: ""
  };

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.GetDirectors();
  }

  GetDirectors() {
    this.service.GetAllDirectors().subscribe(d => this.directorList = d);
  }

  AddDirector(){
    console.log("add dir");
    this.service.PostDirector(this.postDir).subscribe(res => {
      this.directorList.push(res);
      alert("Director added successfully !! ")
      }), err => {
          console.log("Error Occured " + err);
      };
  }

  RemoveDirector(){
    console.log(this.selectedDirectorDelete);
    this.service.DeleteDirector(this.selectedDirectorDelete).subscribe(res => {
      this.directorList.push(res);
      alert("Director deleted successfully!!")
      }), err => {
          console.log("Error Occured " + err);
      };
  }
}
