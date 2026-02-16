import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Header} from "../header/header";

@Component({
  selector: 'app-home',
    imports: [
        Header
    ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}

