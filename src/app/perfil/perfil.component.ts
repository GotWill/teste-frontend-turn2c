import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dogs } from 'src/types/Dogs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  selectedFile: File | null = null;
  dogBreeds: Dogs[] = [];
  currentPage: number = 1;
  selectedBreedId: string = '';

  constructor(
    private http: HttpClient,
  ) {

  }

  ngOnInit(): void {
    this.fetchDogImages();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

  enviarImagem() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);


      this.http.post('https://api.thedogapi.com/v1/images/upload', formData, {
        headers: {
          'x-api-key': `${environment.API}`
        }
      }).subscribe(
        (response) => {
          this.fetchDogImages();
          alert('Imagem enviada com sucesso!')
        },
        (error) => {
          alert('Erro ao enviar a imagem. Por favor, tente novamente.')
        }
      );
    }
  }

  fetchDogImages() {
    const apiUrl = 'https://api.thedogapi.com/v1/images/';
    const params = { limit: '10', page: '0' };

    const headers = new HttpHeaders({
      'x-api-key': `${environment.API}`
    });

    this.http.get(apiUrl, { headers, params }).subscribe(
      (response: any) => {
        this.dogBreeds = response.map((dog: any) => dog.url);
      },
      (error) => {
        console.error('Erro ao obter as imagens de cachorro', error);
      }
    );
  }
}
