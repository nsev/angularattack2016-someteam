import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, NgForm, FORM_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'rh-profile',
  templateUrl: '/app/profile/profile.component.html',
  providers: [],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ProfileComponent implements OnInit{ 

  ownProjects : any[] = [];
  auth : any;
  user : any;
  items: Observable<any[]>;
  langs: any[];
  frames: any[];
  loading : any = {
    langs : false,
    frames: false
  };

  constructor(public af : AngularFire, public router : Router){
    this.af.auth.subscribe((auth:any) => {
      this.auth = auth;

      //get the current users projects
      this.af.database.list('/users/' + this.auth.uid + "/projects").subscribe((data:any)=>{
        //loop through the projects for their keys
        data.forEach((projectSmall)=>{
          //query project data based on the saved keys in the users data and store it in the array
          this.af.database.object('/projects/' + projectSmall.$key).subscribe((project:any)=>{
            this.ownProjects.push(project);

          });        
        })
      });

    });
    this.subscribeToAvailableLangs();
    this.subscribeToAvailableFrames();
  }

  subscribeToAvailableLangs(){
    this.loading.langs = true;
    this.af.list('/availableLanguages').subscribe((langs : any) => {
      this.langs = langs;
      this.loading.langs = false;

    });
  }

  subscribeToAvailableFrames(){
    this.loading.frames = true;
    this.af.list('/availableFrameworks').subscribe((frames : any) => {
      this.frames = frames;
      this.loading.frames = false;
    });
  }

  addProject(){
    this.router.navigate(['projects/new'])
  }

  //should be a pipe....
  objToArray(obj){
    let arr = [];
    for (var i in obj) {
      if(obj.hasOwnProperty(i)){
        arr.push({
          key: i, 
          value: obj[i]
       });
      }
    }
    return arr;
  }

  ngOnInit(){ 
    console.debug("Init called for ProfileComponent");
    
  }
}