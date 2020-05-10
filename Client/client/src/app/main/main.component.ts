import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { ApiService, IActor } from '../services/api.service';
import { SlideshowModule } from 'ng-simple-slideshow';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  actorList: IActor[] = [];
  imageUrls: string[] = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.GetActors();
  }

  GetActors() {
    this.service.GetAllActors().subscribe(a => this.actorList = a);
  }
}
