import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  navClasses;

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe( event =>{
      if (event instanceof NavigationEnd) {
        this.cleanNavClasses();
        let currentRoute : string[] = event["url"].split("/");
        let activePage :string;
        if (currentRoute.length > 2) {
          activePage = currentRoute[2];
        } else {
          activePage = currentRoute[1];
        }
        if (activePage == "") {
          this.navClasses[0].class = "nav_selection"; 
        } else if (activePage == "current"){
          this.navClasses[1].class = "nav_selection";
        } else {
          this.navClasses[2].class = "nav_selection";
        }
      }
    })
  }
  
  ngOnInit(): void {
    this.cleanNavClasses();
  }

  cleanNavClasses() : void{
    this.navClasses = [
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
  }
}
