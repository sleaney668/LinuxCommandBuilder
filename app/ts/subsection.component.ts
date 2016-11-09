import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {AppComponent} from './app.component';

@Component({
	selector: 'subsection',
	templateUrl: 'app/html/subsection.component.html',
	inputs: ['showSubsection','linuxCategories','subSections','searchResult'],
	outputs:['subCategoryItemOutput']
})

export class SubsectionComponent{

	searchArr = [];
	searchText;
	tmpSearchText;

	subCategoryItemOutput = new EventEmitter();

	onSubCategorySelect(subCategoryItemData:string) {
		this.subCategoryItemOutput.emit(subCategoryItemData);
	}

	reSearch(event: Event){	
		this.searchArr[0] = event;
		document.getElementById(`searchInput`).innerHTML = this.searchArr.toString();
	}
}