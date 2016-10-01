import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Config} from './config.service';

import {BulletComponent} from './bullets.component';
import {Bullets} from './bullets';

import {SubsectionComponent} from './subsection.component';


@Component({
    selector: 'my-app',
    templateUrl: 'app/html/app.component.html',
    directives: [BulletComponent, SubsectionComponent, CORE_DIRECTIVES]
})

export class AppComponent {
	mainHeading = Config.MAIN_HEADING;
	bullets:Array<Bullets>;

	constructor(){
		this.bullets = [
			new Bullets("Add"),
			new Bullets("Delete"),
			new Bullets("Modify"),
			new Bullets("View"),
			new Bullets("Locate/Find"),
			new Bullets("Copy")
		]
	}
}
