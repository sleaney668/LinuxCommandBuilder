import {Component, EventEmitter, Input, Output} from 'angular2/core';

@Component({
	selector: 'subsection',
	templateUrl: 'app/html/subsection.component.html',
	inputs: ['showSubsection','linuxCategories','subSections'],
	outputs:['subCategoryItemOutput']
})

export class SubsectionComponent{

	subCategoryItemOutput = new EventEmitter();

	onSubCategorySelect(subCategoryItemData:string) {
		this.subCategoryItemOutput.emit(subCategoryItemData);
	}
}