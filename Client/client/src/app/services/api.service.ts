import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  APIUrl: string = "localhost:5001";

  GetAllActors() {
    return this.http.get<[IActor]>(`https://${this.APIUrl}/actors`);
  }

  GetAllMovies() {
    return this.http.get<[IMovie]>(`http://${this.APIUrl}/movies`);
  }

  GetAllDirectors() {
    return this.http.get<[IDirector]>(`http://${this.APIUrl}/directors`);
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

  UpdateActor(actorBody){
    var body = {
      name: actorBody.name,
      firstName: actorBody.firstName,
      age: actorBody.age,
      dateOfBirth: actorBody.dateOfBirth,
      placeOfBirth: actorBody.placeOfBirth,
      imageUrl: actorBody.imageUrl,
       
    }
    return this.http.put<IActor>(`https://${this.APIUrl}/actors`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
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
  id?: number;
  name: string;
  releaseYear: number;
  genre?: any;
  length: number;
  rating: number;
  movieActors?: any;
}

export interface IDirector {
  directorID: number;
  name: string;
  firstName: string;
}