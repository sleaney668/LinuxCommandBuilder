import {Component, EventEmitter, Input, Output} from 'angular2/core';

@Component({
	selector: 'list',
	templateUrl: 'app/html/list.component.html',
	inputs: ['linuxCategories'],
	outputs: ['listItemOutput']
})

export class ListComponent{

	listItemOutput = new EventEmitter();

	onBulletSelect(listItemData:string) {
		this.listItemOutput.emit(listItemData);
	}
}