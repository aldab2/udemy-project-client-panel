import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { CleintService } from 'src/app/services/cleint.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 

  constructor(private clientService :CleintService) { }

  ngOnInit(): void {
   
  }

}
