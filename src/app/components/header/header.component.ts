import { Component } from '@angular/core';
import { ApiDogService } from 'src/app/api-dog.service';
import { SharedDataService } from 'src/app/shared-data.service';
import { Dogs } from 'src/types/Dogs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  breeds: Dogs[] = [];
  selectedBreedId: string = '';

  constructor(
    private dogApiService: ApiDogService,
    private sharedDataService: SharedDataService
    ) { }

  ngOnInit(): void {
    this.dogApiService.getDogBreeds().subscribe(
      (data: any) => {
        this.breeds = data.map((breed: any) => {
          return { id: breed.id, breed_group: breed.breed_group };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onBreedSelect(event: any): void {
    const selectedValue = event.target.value;
    this.sharedDataService.setSelectedBreedId(selectedValue);
  }
}
