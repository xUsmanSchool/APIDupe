import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  APIUrl: string = "localhost:5001";

  GetAllActors() {
    return this.http.get<[IActor]>(`https://localhost:5001/actors`);
  }

  GetAllMovies() {
    return this.http.get<[IMovie]>(`http://${this.APIUrl}/movies`);
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
    return this.http.post<IActor>(`https://localhost:5001/actors`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  DeleteActor(id){
    return this.http.delete<IActor>(`https://localhost:5001/actors/${id}`);
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