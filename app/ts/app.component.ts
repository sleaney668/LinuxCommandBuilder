import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

// Import config
import {Config} from './config.service';

// Import components
import {ListComponent} from './list.component';
import {SubsectionComponent} from './subsection.component';

// Import services
import {JSONService} from './json.service';

// Import interfaces
import {Command} from './command';

@Component({
    selector: 'my-app',
    templateUrl: 'app/html/app.component.html',
    directives: [ListComponent, SubsectionComponent, CORE_DIRECTIVES],
    providers: [JSONService]
})

export class AppComponent implements OnInit {

	public listItemName:string;
	private tmplistItemData:string;
	public showSubsection:string;

	public data;

    public search: string;
    public command:Command;

	mainHeading = Config.MAIN_HEADING;

	linuxCategories = [];
	subSections = [];

	onBulletSelect(listItemData){
		this.appendSearchString(listItemData, 1);
		console.log(this.search);

		this.loadSubSection(listItemData);

		if(listItemData == this.tmplistItemData){
			this.tmplistItemData = "minimise";
			this.showSubsection = "minimise";
		} else {
			this.tmplistItemData = listItemData;
			this.showSubsection = listItemData;
		}
	
		var listItem = document.getElementById(`subsection-${listItemData}`);
		var subListItem = document.getElementById(`subsection-${listItemData}-Data`);

		listItem.appendChild(subListItem);	
	}

	onSubCategorySelect(subCategoryData){
		console.log(subCategoryData);
		alert(subCategoryData);
	}

	loadSubSection(category){
		var newCategory = category.toLowerCase();
		this.subSections = [];

		switch (newCategory) {
			case "add":
				this.initialiseSubSection(Config.addSearch.split('.'));
				break;
            case "delete":
              	this.initialiseSubSection(Config.deleteSearch.split('.'));
              	break;
            case "modify":
              	this.initialiseSubSection(Config.modifySearch.split('.'));
              	break;
            case "view":
              	this.initialiseSubSection(Config.viewSearch.split('.'));
              	break;
            case "locate":
              	this.initialiseSubSection(Config.locateSearch.split('.'));
              	break;
            case "copy":
              	this.initialiseSubSection(Config.copySearch.split('.'));
              	break;
            default:
              	return null;
          }
	}

	initialiseSubSection(subSectionArr){
		// Construct the sub section read from the json object stored
        for(var i in subSectionArr){
        	this.subSections.push(subSectionArr[i].toString());
        }
	}

	appendSearchString(searchItem, appendLevel){
		if(searchItem.indexOf(searchItem) >= 0 && appendLevel>1){
			this.search = this.search + searchItem.toLowerCase() + `.`;
		} else {
			this.search = searchItem.toLowerCase() + `.`;
		}
	}

	constructor(private _jsonService: JSONService){}
	ngOnInit(){

		// Construct the linuxCategories read from the json object stored
        let linuxCategoriesArr = Config.categoriesSearch.split('.');
        for(var i in linuxCategoriesArr){
        	this.linuxCategories.push(linuxCategoriesArr[i].toString());
        }

		this.tmplistItemData = "minimise";


		// Use this service for searching over the json (add.directory) etc
		// this.search = "add.file";
		// this._jsonService.getLinuxCategories(this.search);

	}

}
