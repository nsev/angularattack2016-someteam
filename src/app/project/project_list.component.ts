import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'rh-project-list',
  templateUrl: '/app/project/project_list.component.html',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class ProjectListComponent implements OnInit{ 

  auth : any;
  user : any;
  projects : any;
  langs: any[];
  frames: any[];
  loading : any = {
    langs : false,
    frames: false,
    projects: false,
    user: false
  };

  constructor(public af : AngularFire){
    this.loading.projects = true;
    this.af.list("/projects").subscribe((projects)=>{
      this.projects = projects;
      this.loading.projects = false;
    });

    this.af.auth.subscribe((auth:any) => {
      this.auth = auth;
      if(auth != null){
        this.subscribeToUser(this.auth.uid);      
      }
    });

    this.subscribeToAvailableLangs();
    this.subscribeToAvailableFrames();
  }

  subscribeToUser(uid){
    this.loading.user = true;
    this.af.database.object('/users/' + uid).subscribe((user:any)=>{
      this.user = user;
      this.loading.user = false;
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

  ngOnInit(){
    console.debug("Init called for ProjectListComponent");
  }

  //TODO pipe this....
  filteredProjects(projects){
    if(this.auth == null){
      return projects;
    }
    return projects.filter((project)=>{
      let ok = false;
      let tLangs = this.enabledFilters(this.user.langs);
      let tFrames = this.enabledFilters(this.user.frames);
      if(tLangs != null && project.langs != null){
        for (var i = 0; i < tLangs.length; ++i) {
          if(project.langs[tLangs[i].$key] === tLangs[i].$value){
            ok = true; 
            break;
          }
        }
      }
      if(!ok && tFrames != null && project.frames != null){
        for (var i = 0; i < tFrames.length; ++i) {
          if(project.frames[tFrames[i].$key] === tFrames[i].$value){
            ok = true; 
            break;
          }
        }
      }

      return ok;
    });
  }

  //TODO fix this... is ugly and then some
  enabledFilters(obj){
    let arr = this.objToArray(obj);
    if(this.auth == null){
      return arr;
    }
    return arr.filter((filter)=>{
      return filter.value === true;
    }).map((enabledFilter)=>{
      let result;
      let found = false;
      if(this.langs != null){
        for (var i = 0; i < this.langs.length; ++i) {
          if(this.langs[i].$key === enabledFilter.key){
            found = true;
            result = this.langs[i];
            break;
          }
        }
      }
      if(!found && this.frames != null){
        for (var i = 0; i < this.frames.length; ++i) {
          if(this.frames[i].$key === enabledFilter.key){
            found = true;
            result = this.frames[i];
            break;
          }
        }
      }
      
      return result;
    });
  }

  //TODO should be a pipe....
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
}