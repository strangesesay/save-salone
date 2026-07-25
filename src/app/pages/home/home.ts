import { Component } from '@angular/core';
import { Hero } from "../../shared/hero/hero";
import { Statistics } from "../../shared/statistics/statistics";

@Component({
  selector: 'app-home',
  imports: [Hero, Statistics],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
