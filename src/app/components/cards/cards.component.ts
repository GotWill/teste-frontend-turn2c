import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDogService } from 'src/app/api-dog.service';
import { SharedDataService } from 'src/app/shared-data.service';
import { Dogs } from 'src/types/Dogs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() selectedBreedId: string = '';
  dogBreeds: Dogs[] = [];
  currentPage: number = 1;

  constructor(
    private dogApiService: ApiDogService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = Math.max(1, +params['page'] || 1);
      this.selectedBreedId = params['breed_ids'] || '';
      this.updateDogList();
    });

    this.sharedDataService.selectedBreedId$.subscribe(selectedBreedId => {
      this.selectedBreedId = selectedBreedId;
      this.updateDogList();
    });
  }

  updateDogList(): void {
    this.dogApiService.getDogBreeds(this.currentPage, this.selectedBreedId).subscribe(
      (data: any) => {
        this.dogBreeds = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < 21) {
      this.currentPage++;
      this.updateQueryParamAndNavigate();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateQueryParamAndNavigate();
    }
  }
  
  updateQueryParamAndNavigate(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage, breed_ids: this.selectedBreedId },
      queryParamsHandling: 'merge'
    });
  }
}

