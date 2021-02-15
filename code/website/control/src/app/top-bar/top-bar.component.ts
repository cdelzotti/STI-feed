import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
    selector:'top-bar_component',
    templateUrl : './top-bar.component.html',
    styleUrls : ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{
    
    constructor(
        private router: Router, 
        private route: ActivatedRoute
    ){}

    loggedIn : boolean;
    

    ngOnInit(){
        // Define if user is connected or not
        this.router.events.subscribe( event =>{
            if (event instanceof NavigationEnd) {
                if (localStorage.getItem("jwt")) {
                    this.loggedIn = true
                } else {
                    this.loggedIn = false;
                }
            }
        });
    }


    logOut():void{
        // Disconnect user
        localStorage.removeItem("jwt");
        // Redirects to login page
        this.router.navigateByUrl("");
    }
}