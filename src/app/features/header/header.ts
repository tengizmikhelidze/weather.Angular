import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Units} from "../../shared/components/menus/units/units";

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
    Units
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
