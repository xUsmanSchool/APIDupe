import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApithirdService, ISearch } from 'src/app/services/apithird.service';
import { IActor, ApiService, IDirector, IMovie } from 'src/app/services/api.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;
  focus8;
  focus9;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  dirId: number;
  actorId: number;
  movieId: number;
  foundDirEditIndex: number;
  foundActorEditIndex: number;
  foundMovieEditIndex: number;
  toPipe: string;

  AMalert =  false;
  ACalert =  false;
  ADalert =  false;

  actorList: IActor[] = [];
  directorList: IDirector[] = [];
  movieList: IMovie[] = [];

  alertEmpty = false;
  moviePostSuccess = false;
  actorPostSuccess = false;
  directorPostSuccess = false;

  postMovie: any = {
    name: "",
    releaseYear: "",
    length: "",
    rating: "",
    director: {
      directorID: "",
      name: "",
      firstName: ""
    }
  };

  editMovie: any = {
    name: "",
    releaseYear: "",
    genre: "",
    length: "",
    rating: ""
  };

  postActor: any = {
    name: "",
    firstName: "",
    age: "",
    dateOfBirth: "",
    placeOfBirth: "",
    imageUrl: ""
  };

  editActor: any = {
    name: "",
    firstName: "",
    age: "",
    dateOfBirth: "",
    placeOfBirth: "",
    imageUrl: ""
  };

  postDirector: any = {
    name: "",
    firstName: ""
  };

  editDirector: any = {
    name: "",
    firstName: ""
  };

  constructor(public auth: AuthService, public api: ApiService) {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    console.log("start GET");
    this.GetActors();
    this.GetDirectors();
    this.GetMovies();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  GetMovies() {
    this.api.GetAllMovies().subscribe(a => {
      this.movieList = a;
      a.forEach(element => {
        console.log("Movie: " + element.name)
      });
    });
  }

  GetActors() {
    this.api.GetAllActors().subscribe(a => {
      this.actorList = a;
      a.forEach(element => {
        console.log("Actor: " + element.firstName + " " + element.name )
      });
    });
  }

  GetDirectors() {
    this.api.GetAllDirectors().subscribe(a => {
      this.directorList = a;
      a.forEach(element => {
        console.log("Director: " + element.firstName + " " + element.name )
      });
    });
  }

  SetDirectorForMovie(id, name, firstname){
    this.postMovie.director.directorID = id;
    this.postMovie.director.name = name;
    this.postMovie.director.firstName = firstname;
  }

  AddMovie(name, year, length, rating){
    if (name != "" && year != "" && length != "" && rating != "" && this.postMovie.director.name != "" && this.postMovie.director.firstName != "") {
        this.AMalert = false;
        console.log("Adding movie " + name + year + length + rating
      + this.postMovie.director.directorID + this.postMovie.director.name);
      console.log("Director in movie: " + 
        this.postMovie.director.directorID +
        this.postMovie.director.name +
        this.postMovie.director.firstName
      );
      this.postMovie.name = name;
      this.postMovie.releaseYear = year;
      this.postMovie.length = length;
      this.postMovie.rating = rating;
      this.api.PostMovie(this.postMovie).subscribe(res => {
        this.movieList.push(res);
        //add success here
        console.log("success!");
        this.postMovie.name = "";
        this.postMovie.releaseYear = "";
        this.postMovie.length = "";
        this.postMovie.rating = "";
        this.postMovie.director.directorID = "";
        this.postMovie.director.name = "";
        this.postMovie.director.firstName = "";
        }), err => {
            console.log("Error Occured " + err);
        };
    } else {
      console.log("a field is empty")
      this.AMalert = true;
    }
    
  }

  AddActor(name, firstName, age, date, place, imageurl){
    if (name != "" && firstName != "" && age != "" && date != "" && place != "" && imageurl != "") {
      this.ACalert = false;
      console.log("Adding actor " + name + " " + firstName + " " + age + " " + date + " " + place + " " + imageurl);
      this.postActor.name = name;
      this.postActor.firstName = firstName;
      this.postActor.age = age;
      this.postActor.placeOfBirth = place;
      this.postActor.dateOfBirth = date;
      this.postActor.imageUrl = imageurl;
      this.api.PostActor(this.postActor).subscribe(res => {
        this.actorList.push(res);
        console.log("success!");
        this.postActor.name = "";
        this.postActor.firstName = "";
        this.postActor.age = "";
        this.postActor.placeOfBirth = "";
        this.postActor.dateOfBirth = "";
        this.postActor.imageUrl = "";
      }), err => {
          console.log("Error Occured " + err);
      };
    } else {
      console.log("EMPTY");
      console.log(name + " " + firstName + " " + age + " " + date + " " + place + " " + imageurl)
      this.ACalert = true;
    }
    
  }

  AddDirector(name, firstname){
    if (name != "" && firstname != "") {
      this.ADalert = false;
      console.log("Adding director " + firstname + name);
      this.postDirector.name = name;
      this.postDirector.firstName = firstname;
      this.api.PostDirector(this.postDirector).subscribe(res => {
        this.directorList.push(res);
        //add success here
        console.log("success!")
        this.directorPostSuccess = true;
        this.RemoveAllAlerts();
        this.postDirector.firstName = "";
        this.postDirector.name = "";
        }), err => {
            console.log("Error Occured " + err);
        };
    } else {
      this.ADalert = true;
    }
  }

  async RemoveAllAlerts(){
    setTimeout(() => {}, 1000);
    this.moviePostSuccess = false;
    this.actorPostSuccess = false;
    this.directorPostSuccess = false;
  }

  EditMovie(){
    console.log("editing " + this.movieId + " to: " + this.editMovie.name);
    this.api.UpdateActor(this.movieId, this.editMovie).subscribe(res => {
      this.movieList[this.foundMovieEditIndex].name = this.editMovie.name;
      this.movieList[this.foundMovieEditIndex].releaseYear = this.editMovie.releaseYear;
      this.movieList[this.foundMovieEditIndex].length = this.editMovie.length;
      this.movieList[this.foundMovieEditIndex].rating = this.editMovie.rating;
    });
    this.editMovie.name = "";
    this.editMovie.releaseYear = "";
    this.editMovie.length = "";
    this.editMovie.rating = "";
  }

  EditActor(){
    console.log("editing " + this.actorId + " to: " + this.editActor.firstName + " " + this.editActor.name);
    this.api.UpdateActor(this.actorId, this.editActor).subscribe(res => {
      this.actorList[this.foundActorEditIndex].firstName = this.editActor.firstName;
      this.actorList[this.foundActorEditIndex].name = this.editActor.name;
      this.actorList[this.foundActorEditIndex].age = this.editActor.age;
      this.actorList[this.foundActorEditIndex].dateOfBirth = this.editActor.dateOfBirth;
      this.actorList[this.foundActorEditIndex].placeOfBirth = this.editActor.placeOfBirth;
      this.actorList[this.foundActorEditIndex].imageUrl = this.editActor.imageUrl;
    });
    this.editActor.name = "";
    this.editActor.firstName = "";
    this.editActor.age = "";
    this.editActor.dateOfBirth = "";
    this.editActor.placeOfBirth = "";
    this.editActor.imageUrl = "";
  }

  EditDirector(){
    console.log("editing " + this.dirId + " to: " + this.editDirector.firstName + " " + this.editDirector.name)
    this.api.UpdateDirector(this.dirId ,this.editDirector).subscribe(res => {
      this.directorList[this.foundDirEditIndex].firstName = this.editDirector.firstName;
      this.directorList[this.foundDirEditIndex].name = this.editDirector.name;
    });
    this.editDirector.name = "";
    this.editDirector.firstName = "";
  }

  FindEditMovie(id){
    console.log(id);
    for (let i = 0; i < this.movieList.length; i++) {
      if (this.movieList[i].id == id) {
        console.log("found: " + this.movieList[i].name);
        this.editMovie.name = this.movieList[i].name;
        this.editMovie.releaseYear = this.movieList[i].releaseYear;
        this.editMovie.length = this.movieList[i].length;
        this.editMovie.rating = this.movieList[i].rating;
        this.movieId = this.movieList[i].id;
        this.foundMovieEditIndex = i;
      }
    }
  }

  FindEditActor(id){
    console.log(id);
    for (let i = 0; i < this.actorList.length; i++) {
      if (this.actorList[i].id == id) {
        console.log("found: " + this.actorList[i].firstName + " " + this.actorList[i].name);
        this.editActor.name = this.actorList[i].name;
        this.editActor.firstName = this.actorList[i].firstName;
        this.editActor.age = this.actorList[i].age;
        this.editActor.dateOfBirth = this.actorList[i].dateOfBirth.toString().substring(5,7)+"/"+this.actorList[i].dateOfBirth.toString().substring(8,10)+"/"+this.actorList[i].dateOfBirth.toString().substring(0,4);
        this.editActor.placeOfBirth = this.actorList[i].placeOfBirth;
        this.editActor.imageUrl = this.actorList[i].imageUrl;
        this.actorId = this.actorList[i].id;
        this.foundActorEditIndex = i;
      }
    }
  }

  FindEditDirector(id){
    console.log(id);
    for (let i = 0; i < this.directorList.length; i++) {
      if (this.directorList[i].directorID == id) {
        console.log("found: " + this.directorList[i].firstName + " " + this.directorList[i].name);
        this.editDirector.name = this.directorList[i].name;
        this.editDirector.firstName = this.directorList[i].firstName;
        this.dirId = this.directorList[i].directorID;
        this.foundDirEditIndex = i;
      }
    }
  }


  //DELETE
  RemoveMovie(){
    console.log("Removing: " + this.movieId);
    this.api.DeleteMovie(this.movieId).subscribe(res => {
      this.movieList.splice(this.foundMovieEditIndex)
    }), err => {
        console.log("Error Occured " + err);
    };
    this.editMovie.name = "";
    this.editMovie.releaseYear = "";
    this.editMovie.length = "";
    this.editMovie.rating = "";
    this.editMovie.director.directorID = "";
    this.editMovie.director.name = "";
    this.editMovie.director.firstName = "";
  }

  RemoveActor(){
    console.log("Removing: " + this.actorId);
    this.api.DeleteDirector(this.actorId).subscribe(res => {
      this.actorList.splice(this.foundActorEditIndex)
      }), err => {
          console.log("Error Occured " + err);
      };
      this.editActor.name = "";
      this.editActor.firstName = "";
      this.editActor.age = "";
      this.editActor.dateOfBirth = "";
      this.editActor.placeOfBirth = "";
      this.editActor.imageUrl = "";
  }

  RemoveDirector(){
    console.log("Removing: " + this.dirId);
    this.api.DeleteDirector(this.dirId).subscribe(res => {
      this.directorList.splice(this.foundDirEditIndex)
      }), err => {
          console.log("Error Occured " + err);
      };
      this.editDirector.name = "";
      this.editDirector.firstName = "";
  }
}
