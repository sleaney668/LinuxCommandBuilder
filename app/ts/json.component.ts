import {Component, EventEmitter, Input, Output} from 'angular2/core';

@Component({
	selector: 'json',
	templateUrl: 'app/html/json.component.html',
	inputs: ['linuxCategories'],
	outputs: ['listItemOutput']
})

export class ListComponent{}