import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private selectedBreedIdSubject = new BehaviorSubject<string>('');
  selectedBreedId$ = this.selectedBreedIdSubject.asObservable();

  setSelectedBreedId(breedId: string) {
    this.selectedBreedIdSubject.next(breedId);
  }
}
