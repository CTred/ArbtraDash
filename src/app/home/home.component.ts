import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  basic_table_data;
 
  constructor() {}

  ngOnInit() {
    this.fetch((data) => {
      this.basic_table_data = data;
    });
  }
  
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `../../assets/data/table.json`);
​
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
​
    req.send();
  }
}
