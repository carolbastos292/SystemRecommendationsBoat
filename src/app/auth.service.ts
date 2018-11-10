import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { DashboardComponent } from './dashboard/dashboard.component';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  configUrl = 'http://127.0.0.1:5000/createUser/';
  configGetUrl = 'http://127.0.0.1:5000/getUser/';
  fetchedUser = [];

  constructor(private firebaseAuth: AngularFireAuth, private http: HttpClient, private Dashboard: DashboardComponent) {
  	this.user = this.firebaseAuth.authState;
  }

  signup(email:string, password:string){
  	this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then( value => [
  			console.log('Success', value),
        this.createInternalUser(value.user.uid)
  		]).catch(err => [
  			console.log('Erro ao criar usuario', err.message)
  		]);
  }

  login(email:string, password:string){
  	this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then( value => [
  			console.log(value.user.uid),
        this.getUser(value.user.uid),
        console.log(this.fetchedUser)
  		]).catch(err => [
  			console.log('Erro Login', err.message)
  		]);
  }

  logout(){
  	this.firebaseAuth.auth.signOut();
  }

  createInternalUser(uid: string){
    this.http.get(this.configUrl + uid).subscribe(
        (response: any[]) => console.log(response), 
        (error) => console.log (error)
      );
  }

  getUser(uid: string){
     this.http.get(this.configGetUrl + '\'' + uid + '\'').subscribe(
          (response: any[]) => this.Dashboard.getRecommendations(response[0]),
          (error) => console.log(error)
      );
  }
}
