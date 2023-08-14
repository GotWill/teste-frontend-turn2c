import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDogService {

  private baseUrl = 'https://api.thedogapi.com/v1';
  private apiKey = `${environment.API}`

  constructor(private http: HttpClient) { }




  getDogBreeds(page?: number, selectedBreed?: string): Observable<any> {
    const url = `${this.baseUrl}/breeds`;
    let params = new HttpParams().set('limit', '8').set('page', page!);

    if (selectedBreed) {
      params = params.set('breed_ids', selectedBreed); // Usar breed_ids
    }

    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    return this.http.get(url, { headers, params });
  }



}
