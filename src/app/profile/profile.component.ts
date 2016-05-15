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
    frames: false,
    user: false,
    projects: false
  };

  //viewmodel
  vm: any = {
    langs: {},
    frames: {}
  };

  constructor(public af : AngularFire, public router : Router){
    this.af.auth.subscribe((auth:any) => {
      this.auth = auth;

      //these two could be merged...
      this.subscribeToUser(this.auth.uid);
      this.subscribeToOwnProjects(this.auth.uid);      
    });

    this.subscribeToAvailableLangs();
    this.subscribeToAvailableFrames();
  }

  subscribeToUser(uid){
    this.loading.user = true;
    this.af.database.object('/users/' + uid).subscribe((user:any)=>{
      this.user = user;
      this.vm.langs = this.user.langs || {};
      this.vm.frames = this.user.frames || {};
      this.loading.user = false;
    });
  }

  subscribeToOwnProjects(uid){
      //get the current users projects
      this.loading.projects = true;

      this.af.database.list('/users/' + uid + "/projects").subscribe((data:any)=>{
        let tempProjects = [];
        //loop through the projects for their keys
        data.forEach((projectSmall)=>{
          //query project data based on the saved keys in the users data and store it in the array
          this.af.database.object('/projects/' + projectSmall.$key).subscribe((project:any)=>{
            if(project != null){
              project.key = projectSmall.$key;
              tempProjects.push(project);
            }
          });        
        })
        this.loading.projects = false;
        this.ownProjects = tempProjects;
      });

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

  deleteProject(key){
    let promise = this.af.database.list('/users/' + this.auth.uid + "/projects/" + key).remove();
    // let promise = this.af.database.object('/projects/' + key).remove();
    promise.then(()=>{
      this.af.database.object('/projects/' + key).remove();
    }).catch((error)=>{
      console.error(error);
    });
  }

  updateSelection(event, value, prop){
    let key = value.$key;
    if(this.user[prop] == null){
      this.user[prop] = {};
    }
    
    if(this.user[prop][key] != null){
      this.user[prop][key] = !this.user[prop][key];
    }else{
      this.user[prop][key] = true;
    }

  }

  saveReviewPreferences(){
    console.debug("Saving preferences for frames and langs");
    if(this.auth != null && this.auth.uid != null){
      if(this.user.langs != null){
        this.af.database.object('/users/' + this.auth.uid + "/langs").set(this.user.langs);
      }
      if(this.user.frames != null){
        this.af.database.object('/users/' + this.auth.uid + "/frames").set(this.user.frames);
      }
    }
  }

  ngOnInit(){ 
    console.debug("Init called for ProfileComponent");
  }
}