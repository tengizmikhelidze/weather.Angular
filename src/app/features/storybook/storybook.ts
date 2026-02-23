import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-storybook',
    imports: [
        RouterOutlet
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './storybook.html',
    styleUrl: './storybook.scss',
})
export class Storybook {

}
