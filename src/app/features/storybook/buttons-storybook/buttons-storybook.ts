import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Button} from "../../../shared/components/buttons";

@Component({
    selector: 'app-buttons-storybook',
    imports: [
        Button
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './buttons-storybook.html',
    styleUrl: './buttons-storybook.scss',
})
export class ButtonsStorybook {

}
