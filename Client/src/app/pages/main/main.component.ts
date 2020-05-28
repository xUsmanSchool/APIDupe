import { Component, OnInit, OnDestroy } from '@angular/core';
import noUiSlider from "nouislider";
import { AuthService } from 'src/app/services/auth.service';
import { ApithirdService, ISearch, IFilm } from 'src/app/services/apithird.service';
import { isEmpty } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;

  searchResList: ISearch;
  film: IFilm;
  movieToSearch: string = "";

  alertEmpty = false;

  constructor(public auth: AuthService, public thirdApi: ApithirdService, public api: ApiService) {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  LoadModal(id){
    this.thirdApi.SearchByFilmId(id).subscribe(res => {
      this.film = res;
      console.log(res);
    }

    )
  }

  AddMovie(){
    var body = {
      name: this.film.title,
      releaseYear: this.film.year,
      length: this.film.length,
      rating: this.film.rating
    }
    
    this.api.PostMovieNoDir(body).subscribe(res => {
      //add success here
      console.log("success!");
    }), err => {
      console.log("Error Occured " + err);
  };
  }

  SearchMovie(){
    if (this.movieToSearch != "") {
      console.log("serching for movie..." + this.movieToSearch);
      console.log("not empty");
      this.alertEmpty = false;
      this.thirdApi.SearchByName(this.movieToSearch).subscribe(res => {
        this.searchResList = res;
        this.searchResList.titles.forEach(element => {
          console.log(element.title)
        });
      });
    } else {
      console.log("empty!");
      this.alertEmpty = true;
    }
  }
}
