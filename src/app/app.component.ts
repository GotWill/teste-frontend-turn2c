import { Component } from '@angular/core';
import { ApiDogService } from './api-dog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste-angular';

  constructor(private dogService: ApiDogService){
      
  }
}
