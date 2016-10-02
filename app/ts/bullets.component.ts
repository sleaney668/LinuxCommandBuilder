import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {Bullets} from 'bullets';

@Component({
	selector: 'bullets',
	templateUrl: 'app/html/bullets.component.html',
	inputs: ['bullets'],
	outputs: ['bulletOutput']
})

export class BulletComponent{

	bulletOutput = new EventEmitter();

	onBulletSelect(bulletName:string) {
		this.bulletOutput.emit(bulletName);
	}

}