import { Component, OnInit } from '@angular/core';
import { ApiService, IMovie } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})
export class TableviewComponent implements OnInit {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
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

  movieList: IMovie[] = [];

  sort: string = "releaseYear";
  dir: string = "asc";

  constructor(public auth: AuthService, public api: ApiService) { }

  ngOnInit(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    console.log("start GET");
    this.Reload();
  }

  //GET
  GetMoviesWithSort() {
    this.api.GetAllMoviesWithSort(this.sort, this.dir).subscribe(a => {
      this.movieList = a;
      a.forEach(element => {
        console.log("Movie: " + element.name)
      });
    });
  }

  SortAsc(){
    this.dir = "asc";
    this.Reload();
  }

  SortDesc(){
    this.dir = "desc"
    this.Reload();
  }

  SortRelease(){
    this.sort = "releaseYear";
    this.Reload();
  }

  SortName(){
    this.sort = "name";
    this.Reload();
  }

  Reload(){
    this.GetMoviesWithSort();
  }

  //DELETE
  RemoveMovie(id){
    console.log("Removing: " + id);
    this.api.DeleteMovie(id).subscribe(res => {
      for (let i = 0; i < this.movieList.length; i++) {
        if (this.movieList[i].id == id) {
          this.movieList.splice(i);
        }
      }
    }), err => {
        console.log("Error Occured " + err);
    };
  }
}
