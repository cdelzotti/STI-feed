import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { EventsService } from '../events.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password : string;
  username : string;
  errorMessage : string;

  constructor(
    private eventsService : EventsService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Check if logged in
    this.eventsService.checkAuth().subscribe(
      response => this.router.navigateByUrl("events/"),
      error => {}
    )
  }

  login(){
    this.errorMessage = undefined;
    localStorage.removeItem("jwt");
    this.eventsService.login(this.username, this.password).subscribe(
      data => {
        // Store JWT
        localStorage.setItem("jwt", data["access_token"]);
        // Refresh headers
        this.eventsService.refreshHeaders();
        // Redirect to other page
        this.router.navigateByUrl("/events");
      },

      error => this.errorMessage = "Identifiants incorrects"
    );
  }
}
