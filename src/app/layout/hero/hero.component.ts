import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
vid = document.getElementById("video-container");
  constructor() { }

  ngOnInit() {
    
// this.vid?.muted = true;
console.log(this.vid);

  }

}
