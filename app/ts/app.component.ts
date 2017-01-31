import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

// Import config
import {Config} from './config.service';

// Import components
import {ListComponent} from './list.component';
import {SubsectionComponent} from './subsection.component';

// Import services
import {JSONService} from './json.service';
import {CHMODService} from './chmod.service';

// Import interfaces
import {Command} from './command';

@Component({
    selector: 'my-app',
    templateUrl: 'app/html/app.component.html',
    directives: [ListComponent, SubsectionComponent, CORE_DIRECTIVES],
    providers: [JSONService, CHMODService]
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
            case "misc":
              	this.initialiseSubSection(Config.miscSearch.split('.'));
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

	onSubCategorySelect(subCategoryData){
		if(this.searchString.split('.')[0] == "modify" && subCategoryData[subCategoryData.length-1] != '.'){
			// Modify level 2, just append the search string
			this.appendSearchString(subCategoryData, 2);
			this.tmpSubSectionId = "";
		} else if(this.searchString.split('.')[0] == "modify" && subCategoryData[subCategoryData.length-1] == '.'){
			// Append level 3 contains a full stop at the end
			this.appendSearchString(subCategoryData, 3);
			this.performFullSearch(subCategoryData);
		} else {
			this.appendSearchString(subCategoryData, 2);
			this.performFullSearch(subCategoryData);
		}
	}

	performFullSearch(subCategoryData){	
		console.log(subCategoryData);
		if(subCategoryData == " Permissions."){
			this.setupStepThreeChmod();
		}

		// Call to search over the JSON stored in the config based on the appended search string
		this._jsonService.getLinuxCategories(this.searchString);

		// Call to update the search result
		this.populateSearchResult(this._jsonService.linuxObject);

		if(subCategoryData[subCategoryData.length-1] == '.')
			subCategoryData = subCategoryData.substr(0, subCategoryData.length-1);

		// Making first step visible
		this.setDivVisibility('Search-Result-Div', true);

		if(this.categoryChangeFlag){
			this.categoryChangeFlag = false;
			this.subSectionId = "subsection-" + this.showSubsection + "-" + subCategoryData + "-Data";
			document.getElementById(this.subSectionId).classList.add('li-hover');
			document.getElementById("subsection-" + this.showSubsection + "-text-entry").removeAttribute('disabled'); 
		} else {
			if(this.tmpSubSectionId != ""){
				document.getElementById(this.tmpSubSectionId).classList.remove('li-hover');
			}	
			if(this.subSectionId == "") {
				this.subSectionId = "subsection-" + this.showSubsection + "-" + subCategoryData + "-Data";
				document.getElementById(this.subSectionId).classList.add('li-hover');
				document.getElementById("subsection-" + this.showSubsection + "-text-entry").removeAttribute('disabled'); 
			} else {					
				this.subSectionId = "subsection-" + this.showSubsection + "-" + subCategoryData + "-Data";
				document.getElementById(this.subSectionId).classList.add('li-hover');
			}
		}
		this.tmpSubSectionId = this.subSectionId;
	}

	// Updates the search string based on user entry
	appendSearchString(searchItem, appendLevel){

		if(appendLevel == 1) {
			this.searchArr.splice(0, this.searchArr.length);
			this.searchString = "";
		} else {
			this.searchArr.splice(appendLevel, 1);
		}

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

	setupStepThreeChmod(){
		document.getElementById("Search-Option-Div").style.display = "block";
		document.getElementById("Search-Option-Div-searchTag").innerHTML= "2";
		document.getElementById("Search-Input-Div-searchTag").innerHTML = "3";
	}

	constructor(private _jsonService: JSONService, private _chmodService: CHMODService){}
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
