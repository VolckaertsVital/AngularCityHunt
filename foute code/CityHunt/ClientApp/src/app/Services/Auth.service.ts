import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
//import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})

export class authService {


  teamId: number;

  baseUrl = "https://localhost:44313/api";
  helper = new JwtHelperService();
  decodeToken: any;

  constructor(private http: HttpClient,
//private alertService: AlertService
) { }

  get TeamId(): number {
    return this.teamId;
  }
  set TeamId(value: number){
    this.teamId = value;
  }


  ngOnInit() {}

  postLogin(user: IUser) {
    return this.http.post<IUser>(this.baseUrl + "/users/login", user);
  }

  postTeam(team: object) {
    return this.http.post(this.baseUrl + "/team", team);
  }
  getTeam() {
    return this.http.get<ITeam>(this.baseUrl + "/team");
  }

  PostRegister(user: IRegister) {
    return this.http.post<IRegister>(this.baseUrl + "/users", user);

  }

  postQuestion(question: IQuestion) {
    return this.http.post<IQuestion>(this.baseUrl + "/vragen", question);
  }

  loggedIn() {
    const token = localStorage.getItem('idToken');
    return !this.helper.isTokenExpired(token);
    
  }
  
  logout() {
    localStorage.removeItem('idToken');
    localStorage.clear();
    //this.alertService.warning('User logged out!');

  }

}

export interface IUser{
  Email: string,
  Passwoord: string
}

export interface ITeam {
  
  TeamNaam: string
}

export interface IRegister{
  naam: string,
  achternaam:string,
  email: string,
  username: string,
  passwoord: string,
  teamId : number
}

export interface IQuestion {
  Title: string,
  JuisteAntwoord: string,
  Antwoord1: string,
  Antwoord2: string,
  Antwoord3: string,
  Lat: string,
  Long: string,
  Hint: string,
  Points: number,
  TeamId: number
}
