import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dev-tools-studio';
  tempData: any;

  constructor(private httpClient: HttpClient) {
    const url = `${environment.baseUrl}/user`;

    this.httpClient.get(url).subscribe({
      next: (response) => {
        this.tempData = response;
      },
      error: (error) => {
        console.log('error :: ', error);
      },
    });
  }
}
