import { Component, OnInit } from '@angular/core';
import { authService, IQuestion } from '../Services/Auth.service';
import { Router } from '@angular/router';
//import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamname: string = "";

  result: object;
  teamId: number;
  

  constructor(public router: Router, private authservice: authService,
    //private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getTeams()
  }

  submit() {
    var team =
    {
      
      TeamNaam: this.teamname
    }
    console.log(team);
    this.authservice.postTeam(team).subscribe(data => {
      //console.log(data);
      this.result = data;
      console.log(this.result);
      this.teamId = this.result.teamId;
      console.log(this.teamId);
      this.authservice.TeamId = this.teamId;
      
      //this.alertService.success('this is a success alert');
      if (data) {
        this.router.navigate(['/questions']);
      }

      
    }, err => {
      console.log(err);

    });
    
  }

  getTeams() {
    this.authservice.getTeam().subscribe(data => {
      console.log(data);

    }, err => {
      console.log(err);
    });
  }

}
