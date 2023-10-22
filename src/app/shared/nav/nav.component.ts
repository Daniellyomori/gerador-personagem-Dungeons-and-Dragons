import {  AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import * as M from 'materialize-css';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements AfterViewInit{
  @ViewChild('mobile') sideNav? : ElementRef;

  title = 'DandD-character-generator-app';

  ngAfterViewInit(): void {
    let $sideNav = $('#mobile-demo');
    M.Sidenav.init($sideNav);
  }
}
