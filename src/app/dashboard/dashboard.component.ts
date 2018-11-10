import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  configUrl = 'http://127.0.0.1:5000/predictions/';
  fetchedboat = [];

  constructor( private http:  HttpClient) { }

  ngOnInit() {
   
  }
    getRecommendations(uid) {
      this.http.get(this.configUrl + uid).subscribe(
          (response: any[]) => console.log(this.configUrl + uid, response),
          (error) => console.log(error)
      );
    }
}
