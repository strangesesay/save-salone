import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../shared/footer/footer";
import { Navbar } from "../../shared/navbar/navbar";

@Component({
  standalone: true,
  selector: 'app-public-layout',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './public-layout.html',
  styleUrls: ['./public-layout.scss'],
})
export class PublicLayout {}
