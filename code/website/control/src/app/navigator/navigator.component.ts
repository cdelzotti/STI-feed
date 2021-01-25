import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) {
  }

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
    this.router.events.subscribe( event =>{
      let activePage : string = event["url"].split("/")[1];
      if (activePage == "") {
        this.navClasses[0].class = "nav_selection"; 
      } else if (activePage == "messages"){
        this.navClasses[1].class = "nav_selection";
      } else {
        this.navClasses[2].class = "nav_selection";
      }
    })
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
