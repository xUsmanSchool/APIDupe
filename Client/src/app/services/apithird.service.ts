import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApithirdService {
  APIUrl: string = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com";
  searchRes: ISearch;

  constructor(private http: HttpClient) { }

  SearchByName(movieName){
    console.log("searching for: " + movieName)
    return this.http.get<ISearch>(`${this.APIUrl}/search/${movieName}`,{
      headers: new HttpHeaders({
        'x-rapidapi-key': '631634a3a8mshb285f4b5c410188p19130fjsn0e1e8f3cd673'
      })
    });
  }

  SearchByFilmId(id){
    return this.http.get<IFilm>(`${this.APIUrl}/film/${id}`,{
      headers: new HttpHeaders({
        'x-rapidapi-key': '631634a3a8mshb285f4b5c410188p19130fjsn0e1e8f3cd673'
      })
    });
  }
}

export interface Trailer {
  id: string;
  link: string;
}

export interface Cast {
  actor: string;
  actor_id: string;
  character: string;
}

export interface IFilm {
  id: string;
  title: string;
  year: string;
  length: string;
  rating: string;
  rating_votes: string;
  poster: string;
  plot: string;
  trailer: Trailer;
  cast: Cast[];
  technical_specs: string[][];
}

export interface Title {
  title: string;
  image: string;
  id: string;
}

export interface Name {
  title: string;
  image: string;
  id: string;
}

export interface Company {
  title: string;
  image?: any;
  id: string;
}

export interface ISearch {
  titles: Title[];
  names: Name[];
  companies: Company[];
}
