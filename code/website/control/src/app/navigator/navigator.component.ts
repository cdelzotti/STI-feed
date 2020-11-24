import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  constructor() { }

  navClasses = [
    {
      name : "events",
      class : ""
    },
    {
      name : "messages",
      class : ""
    },
    {
      name : "history",
      class : ""
    }
  ]
  
  ngOnInit(): void {
    this.navClasses[0].class = "nav_selection"
  }


  refreshNavSelection(name:string){
    for (const item in this.navClasses) {
      if (this.navClasses[item].name == name) {
        this.navClasses[item].class="nav_selection";
      } else {
        this.navClasses[item].class=""
      }
    }
  }
}
