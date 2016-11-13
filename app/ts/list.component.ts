import {Component, EventEmitter, Input, Output} from 'angular2/core';

// Import config
import {Config} from './config.service';

@Component({
	selector: 'list',
	templateUrl: 'app/html/list.component.html',
	inputs: ['linuxCategories'],
	outputs: ['listItemOutput']
})

export class ListComponent{

	categories = [];
	listItemOutput = new EventEmitter();

	onBulletSelect(listItemData:string) {
		this.listItemOutput.emit(listItemData);
		this.categories = Config.categoriesSearch.split('.');

		if(document.getElementById('list-group-item-'+listItemData).style.backgroundColor != 'rgb(167, 220, 229)') {
			for (var i in this.categories) {
				document.getElementById('list-group-item-'+this.categories[i]).style.backgroundColor = '';
			}	
			document.getElementById('list-group-item-'+listItemData).style.backgroundColor = '#a7dce5';
		}else {
			document.getElementById('list-group-item-'+listItemData).style.backgroundColor = '';
		}
	}
}