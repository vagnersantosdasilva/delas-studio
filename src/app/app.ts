import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Home } from "./pages/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'delas-estudio';
}
