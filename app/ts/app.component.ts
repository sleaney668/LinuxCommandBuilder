import {Component} from 'angular2/core';
import {Config} from './config.service';

import {PlaylistComponent} from './playlist.component';
import {BulletComponent} from './bullets.component';

import {Video} from './video';
import {Bullets} from './bullets';

@Component({
    selector: 'my-app',
    templateUrl: 'app/html/app.component.html',
    directives: [PlaylistComponent, BulletComponent]
})

export class AppComponent {
	mainHeading = Config.MAIN_HEADING;

	videos:Array<Video>;
	bullets:Array<Bullets>;

	constructor(){
		this.videos = [
			new Video(1, "Angular 2 demo 1", "f8qBeaGe2S4", "explanation 1"),
			new Video(2, "Angular 2 demo 2", "bKWDKmHvF78", "explanation 2")
		]

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
