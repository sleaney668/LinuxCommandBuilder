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

	public showSubsection:string;
	public bulletName:string;
	private tmpBulletName:string;

	mainHeading = Config.MAIN_HEADING;

	bullets:Array<Bullets>;

	onBulletSelect(bulletData){

		if(bulletData == this.tmpBulletName){

			this.tmpBulletName = "minimise";
			this.showSubsection = "minimise";
		} else {
			this.tmpBulletName = bulletData;
			this.showSubsection = bulletData;
		}
		
		var bulletPoint = document.getElementById(`subsection-${bulletData}`);
		var subSectionBullet = document.getElementById(`subsection-${bulletData}-Data`);
		bulletPoint.appendChild(subSectionBullet);	
	}

	constructor(){

		this.bullets = [
			new Bullets("Add"),
			new Bullets("Delete"),
			new Bullets("Modify"),
			new Bullets("View"),
			new Bullets("Locate/Find"),
			new Bullets("Copy")
		]

		this.tmpBulletName = "minimise";
	}
}
