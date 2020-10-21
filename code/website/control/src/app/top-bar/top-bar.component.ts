import { Component, OnInit } from '@angular/core'

@Component({
    selector:'top-bar_component',
    templateUrl : './top-bar.component.html',
    styleUrls : ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{
    
    constructor(){}
    
    ngOnInit(){

    }

    logIn():void{
        window.alert("Not implemented yet :)")
    }
}