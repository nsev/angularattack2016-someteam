import { Injectable, OnInit } from '@angular/core';


@Injectable()
export class FirebaseService {

  private _firebaseUrl : string = "https://reviewhub.firebaseio.com";
  firebaseRef : any;

  constructor(){
    this.firebaseRef = new Firebase(this._firebaseUrl);
    
    this.firebaseRef.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  }
}