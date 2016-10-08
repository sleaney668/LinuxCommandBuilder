import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Config} from './config.service';

import {BulletComponent} from './bullets.component';
import {Bullets} from './bullets';

import {SubsectionComponent} from './subsection.component';

import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {CommandService} from './command.service';
import {Command} from './command';

@Component({
    selector: 'my-app',
    templateUrl: 'app/html/app.component.html',
    directives: [BulletComponent, SubsectionComponent, CORE_DIRECTIVES],
    providers: [CommandService, HTTP_PROVIDERS]

})

export class AppComponent implements OnInit {

	public bulletName:string;
	private tmpBulletName:string;
	public showSubsection:string;

    private search: string;
    public command:Command;


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

	constructor(private _commandService: CommandService){}

	ngOnInit(){
		this.search = "add.directory";

		this.bullets = [
			new Bullets("Add"),
			new Bullets("Delete"),
			new Bullets("Modify"),
			new Bullets("View"),
			new Bullets("Locate/Find"),
			new Bullets("Copy")
		];

		this.tmpBulletName = "minimise";

		//this._commandService.getCommand().subscribe(command => {this.command = command});	

		this._commandService.getResult(this.search);
	}

}
