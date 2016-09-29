import {Component} from 'angular2/core';
import {Bullets} from 'bullets';

@Component({
	selector: 'bullets',
	templateUrl: 'app/html/bullets.component.html',
	inputs: ['bullets']
})

export class BulletComponent{
	
	onBulletSelect(bullet:Bullets) {
		console.log(JSON.stringify(bullet));
	}

}