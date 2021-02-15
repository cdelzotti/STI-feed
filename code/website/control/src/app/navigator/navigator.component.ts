import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EventsService } from '../events.service'

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  navClasses;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private eventService : EventsService
  ) {
    // Define action on URL change
    this.router.events.subscribe( event =>{
      if (event instanceof NavigationEnd) {
        // Handle nav display
        // Retrieve current page to 
        // color the right element in the navbar
        this.cleanNavClasses();
        let currentRoute : string[] = event["url"].split("/");
        let activePage :string;
        if (currentRoute.length > 2) {
          activePage = currentRoute[2];
        } else {
          activePage = currentRoute[1];
        }

        // Color the right item
        document.getElementById("navBar").style.display = '';
        if (activePage == "events") {
          this.navClasses[0].class = "nav_selection"; 
        } else if (activePage == "current"){
          this.navClasses[1].class = "nav_selection";
        } else if (activePage == "history") {
          this.navClasses[2].class = "nav_selection";
        } else {
          // If there is nothing to color, just hide the navbar
          // Typically it happends only on login screen
          document.getElementById("navBar").style.display = 'none';
        }
        // Benevolent side effect :
        // Check if JWT is still valid
        // If not, just redirects to the login page
        if (activePage != "") {
          // Check if logged in
          this.eventService.checkAuth().subscribe(
            response => {},
            error => this.router.navigateByUrl("")
          )
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
