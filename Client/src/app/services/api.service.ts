import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  APIUrl: string = "cloud-api-eindproject.appspot.com";

  GetAllActors() {
    return this.http.get<[IActor]>(`https://${this.APIUrl}/actors`);
  }

  GetAllMovies() {
    return this.http.get<[IMovie]>(`https://${this.APIUrl}/movies`);
  }

  GetAllMoviesWithSort(sort,dir) {
    return this.http.get<[IMovie]>(`https://${this.APIUrl}/movies?sort=${sort}&dir=${dir}`);
  }

  GetAllDirectors() {
    return this.http.get<[IDirector]>(`https://${this.APIUrl}/directors`);
  }

  PostMovie(movieBody){
    var body = {
      name: movieBody.name,
      releaseYear: movieBody.releaseYear,
      length: movieBody.length,
      rating: movieBody.rating,
      directorId: movieBody.director.directorID,
      director: {
        directorID: movieBody.director.directorID,
        name: movieBody.director.name,
        firstName: movieBody.director.firstName,
      }
    }
    return this.http.post<IMovie>(`https://${this.APIUrl}/movies`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  PostMovieNoDir(movieBody){
    var body = {
      name: movieBody.name,
      releaseYear: movieBody.releaseYear,
      length: movieBody.length,
      rating: movieBody.rating
    }
    return this.http.post<IMovie>(`https://${this.APIUrl}/movies`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  PostActor(actorBody){
    var body = {
      name: actorBody.name,
      firstName: actorBody.firstName,
      age: actorBody.age,
      dateOfBirth: actorBody.dateOfBirth,
      placeOfBirth: actorBody.placeOfBirth,
      imageUrl: actorBody.imageUrl,
    }
    return this.http.post<IActor>(`https://${this.APIUrl}/actors`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  PostDirector(dirBody){
    var body = {
      name: dirBody.name,
      firstName: dirBody.firstName
    }
    return this.http.post<IDirector>(`https://${this.APIUrl}/directors`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  UpdateDirector(dirId,dirBody){
    var body = {
      directorID: dirId,
      name: dirBody.name,
      firstName: dirBody.firstName
    }
    return this.http.put<IDirector>(`https://${this.APIUrl}/directors/${dirId}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  UpdateActor(actorId, actorBody){
    var body = {
      id: actorId,
      name: actorBody.name,
      firstName: actorBody.firstName,
      age: actorBody.age,
      dateOfBirth: actorBody.dateOfBirth,
      placeOfBirth: actorBody.placeOfBirth,
      imageUrl: actorBody.imageUrl,
       
    }
    return this.http.put<IActor>(`https://${this.APIUrl}/actors/${actorId}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  DeleteMovie(id){
    return this.http.delete<IMovie>(`https://${this.APIUrl}/movies/${id}`);
  }

  DeleteActor(id){
    return this.http.delete<IActor>(`https://${this.APIUrl}/actors/${id}`);
  }

  DeleteDirector(id){
    return this.http.delete<IDirector>(`https://${this.APIUrl}/directors/${id}`);
  }
}

export interface IActor {
  id: number;
  name: string;
  firstName: string;
  age: number;
  dateOfBirth: Date;
  placeOfBirth: string;
  imageUrl: string;
  movieActors?: any;
}

export interface IMovie {
  id: number;
  name: string;
  releaseYear: number;
  length: number;
  rating: number;
  director: IDirector;
}

export interface IDirector {
  directorID: number;
  name: string;
  firstName: string;
}
