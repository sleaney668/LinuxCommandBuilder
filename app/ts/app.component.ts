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

	public listItemName: string;
	private tmplistItemData: string;
	public showSubsection: string;
	public searchResult: string;
	public data;
    public searchString: string;
    public searchArr = [];
    public command:Command;

	mainHeading = Config.MAIN_HEADING;
	linuxCategories = [];
	subSections = [];
	subSectionId = "";
	tmpSubSectionId = "";
	
	categoryChange = "";
	categoryChangeFlag: boolean;

	onBulletSelect(listItemData){
		// Call to append the search string at level 1
		this.appendSearchString(listItemData, 1);

		// Call to load subsection on category selection
		this.loadSubSection(listItemData);

		if(this.categoryChange != "")
			this.categoryChangeFlag = true;
			this.categoryChange = "";

		if(listItemData == this.tmplistItemData){
			this.tmplistItemData = "minimise";
			this.showSubsection = "minimise";
		} else {
			this.tmplistItemData = listItemData;
			this.showSubsection = listItemData;
			this.categoryChange = listItemData;
		}
	
		var listItem = document.getElementById(`subsection-${listItemData}`);
		var subListItem = document.getElementById(`subsection-${listItemData}-Data`);
		listItem.appendChild(subListItem);	
	}

	// Loads child sub section of category selected
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

	// Initialises subsection based on category selected
	initialiseSubSection(subSectionArr){
		// Construct the sub section read from the json object stored
        for(var i in subSectionArr){
        	this.subSections.push(subSectionArr[i].toString());
        }
	}

	onSubCategorySelect(subCategoryData, category){
		// Call to append the search string at level 2
		if(this.searchString.split('.')[0] == "modify" && this.searchString.split('.').length >= 2){
			this.appendSearchString(subCategoryData, 3);
		} else {
			this.appendSearchString(subCategoryData, 2);
		}

		// Call to search over the JSON stored in the config based on the appended search string
		this._jsonService.getLinuxCategories(this.searchString);

		// Call to update the search result
		this.populateSearchResult(this._jsonService.linuxObject);

		var id = "subsection-" + this.showSubsection + "-" + subCategoryData + "-Data";
		alert(id);
		//document.getElementById(id).classList.add('li-hover');

		// Making first step visible
		this.setDivVisibility('Search-Result-Div', true);

		if(this.categoryChangeFlag){
			this.categoryChangeFlag = false;
			this.subSectionId = "subsection-" + this.showSubsection + "-" + subCategoryData + "-Data";
			document.getElementById("subsection-" + this.showSubsection + "-text-entry").removeAttribute('disabled'); 
		}else{
			if(this.subSectionId == "") {
				this.subSectionId = "subsection-" + this.showSubsection + "-" + subCategoryData + "-Data";
				document.getElementById("subsection-" + this.showSubsection + "-text-entry").removeAttribute('disabled'); 
			}else{
				document.getElementById(this.subSectionId).classList.remove('li-hover');				
				this.subSectionId = "subsection-" + this.showSubsection + "-" + subCategoryData + "-Data";	
				this.tmpSubSectionId = this.subSectionId;
			}	
		}
	}

	// Updates the search string based on user entry
	appendSearchString(searchItem, appendLevel){
		// If append level is 1 (If main category)
		if(appendLevel==1)
			this.searchArr = [];
			this.searchString = "";

		this.searchArr[appendLevel-1] = searchItem.toLowerCase();
		this.searchString = this.searchArr.join('.');
	}

	// Updates the search result based on the user entry.
	populateSearchResult(searchResultDetail){
		document.getElementById(`searchResult`).innerHTML = searchResultDetail;
	}

	setDivVisibility(divId, visibility){
		if(visibility)
			document.getElementById(divId).style.visibility = "visible";	
		else
			document.getElementById(divId).style.visibility = "hidden";	
	}

	constructor(private _jsonService: JSONService){}
	ngOnInit(){
		// Construct the linuxCategories read from the json object stored
        let linuxCategoriesArr = Config.categoriesSearch.split('.');
        for(var i in linuxCategoriesArr){
        	this.linuxCategories.push(linuxCategoriesArr[i].toString());
        }

		this.tmplistItemData = "minimise";
		this.searchResult = "NaN";
	}

}
