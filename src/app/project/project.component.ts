import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { Project } from './project.class';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'rh-project',
  templateUrl: '/app/project/project.component.html',
  directives: [],
  providers : []
})
export class ProjectComponent implements OnInit{

  auth : any;
  projectsFB : any;
  project : Project;
  langs: any[];
  frames: any[];
  loading : any = {
    langs : false,
    frames: false
  };

  constructor(public af : AngularFire){
    this.af.auth.subscribe((auth) => {
      this.auth = auth;
    });

    this.project = new Project(0, "", "", [], []);

    this.projectsFB = af.database.object('/projects');

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

  updateSelection(event, value, prop){
    if(prop != null && value != null){
      if(this.project[prop][value.$key] != null){
        delete this.project[prop][value.$key];
      }else{
        let key = value.$key;
        let val = value.$value;
        this.project[prop][value.$key] = value.$value;
      }
    }
    console.log(this.project);
  }

  onSubmit(project){
    console.log("Submit called", project);
    let promise = this.af.list('/projects').push(project);

    promise.then((data)=>{
      //this.auth might not be resolved..
      console.log(data.key());
      this.af.list('/users/' + this.auth.uid + '/projects').push(data.key());
    }).catch((error)=>{
      console.error(error)
    });
  }

  ngOnInit(){
    console.log("Init called for ProjectComponent");
  }

}