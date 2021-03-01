import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public readonly logoAngular: string = 'https://angular.io/assets/images/logos/angular/angular.svg';
  public readonly logoDirectus: string = 'https://user-images.githubusercontent.com/522079/89687381-23943700-d8ce-11ea-9a4d-ae3eae136423.png';
  public readonly logoNestJs: string = 'https://camo.githubusercontent.com/5f54c0817521724a2deae8dedf0c280a589fd0aa9bffd7f19fa6254bb52e996a/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f2d736d616c6c2e737667';

  constructor() { }

  ngOnInit(): void {
  }

}
