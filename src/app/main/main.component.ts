import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  divheight: number;

  constructor() { }

  ngOnInit() {
    this.divheight =window.innerHeight
  }

}
