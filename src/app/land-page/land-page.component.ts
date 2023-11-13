import { Component, OnInit } from '@angular/core';
import { Shared } from '../util/shared';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})
export class LandPageComponent implements OnInit {
  ngOnInit(): void {
    Shared.initializeWebStorage();
    console.log('init - land-page');
  }

}
