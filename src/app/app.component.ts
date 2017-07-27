import {Component, OnInit} from '@angular/core';

// Import services
import {ConfigService} from './config.service';
import {JsonService} from './json.service';
import {ChmodService} from './chmod.service';

// Import components
import {ListComponent} from './list/list.component';
import {SubsectionComponent} from './subsection/subsection.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

	private tmplistItemData: string;
	public showSubsection: string;
	public searchResult: string;
	public data;
    public searchString: string;
    public searchArr = [];

	mainHeading = ConfigService.MAIN_HEADING;
	linuxCategories = [];
	subSections = [];
	subSectionId = "";
	tmpSubSectionId = "";
	textEntryPlaceholder = "Enter text..."
	
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
				this.initialiseSubSection(ConfigService.addSearch.split('.'));
				break;
            case "delete":
              	this.initialiseSubSection(ConfigService.deleteSearch.split('.'));
              	break;
            case "modify":
              	this.initialiseSubSection(ConfigService.modifySearch.split('.'));
              	break;
            case "view":
              	this.initialiseSubSection(ConfigService.viewSearch.split('.'));
              	break;
            case "locate":
              	this.initialiseSubSection(ConfigService.locateSearch.split('.'));
              	break;
            case "copy":
              	this.initialiseSubSection(ConfigService.copySearch.split('.'));
              	break;
            /*
            case "misc":
              	this.initialiseSubSection(ConfigService.miscSearch.split('.'));
              	break;
            */
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
		// If non 2 step process then change to 2 step
		if((this.searchString.split('.')[0] == "modify" || this.searchString.split('.')[0] == "view") && subCategoryData[subCategoryData.length-1] != '.'){
			// Modify level 2, just append the search string
			this.appendSearchString(subCategoryData, 2);
			this.tmpSubSectionId = "";
		} else if((this.searchString.split('.')[0] == "modify" || this.searchString.split('.')[0] == "view") && subCategoryData[subCategoryData.length-1] == '.'){
			// Append level 3 contains a full stop at the end
			this.appendSearchString(subCategoryData, 3);
			this.performFullSearch(subCategoryData);
		} else {
			this.appendSearchString(subCategoryData, 2);
			this.performFullSearch(subCategoryData);
		}
	}

	performFullSearch(subCategoryData){
		// Method here to decide what step to show
		this.setupStepTwo(subCategoryData);
		this.purgeStepThree(subCategoryData);
	    this.setupStepThree(subCategoryData);

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
		this.validateTextEntry(subCategoryData);
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

	setupStepTwo(subCategoryData){
		this.renderFullSearchTerm(subCategoryData);
		//this.validateTextEntry(subCategoryData);
	}

	validateTextEntry(subCategoryData){
		var subsectionTextEntry = <HTMLInputElement>document.getElementsByClassName("subsection-text-entry")[0];

		var placeholderText = this.textEntryPlaceholder;
		var opactiy = "1";
		var trimmedSubCategoryData = subCategoryData.trim();

		if (ConfigService.disabledSearchTerms.includes(trimmedSubCategoryData)){

			if(trimmedSubCategoryData == "User" 
				|| trimmedSubCategoryData == "Group" 
				|| trimmedSubCategoryData == ("Group ID")){
				// If applied for code to do nothing

			} else {
				opactiy = "0.7";
				subsectionTextEntry.disabled = true;
			}

		} else if (subCategoryData.includes("Current running processes") || subCategoryData.includes("Open file processes")){
			placeholderText = 'Add option...';
			opactiy = "0.7";
			subsectionTextEntry.disabled = true;
		} else if (subCategoryData.includes("Log file")){
			placeholderText = 'Add option or enter filename...';
			subsectionTextEntry.disabled = false;
		}

		subsectionTextEntry.placeholder = placeholderText;
		subsectionTextEntry.style.opacity = opactiy;
	}

	setupStepThreeChmod(){
		document.getElementById("Search-CHMOD-Div").style.display = "block";
		document.getElementById("Search-CHMOD-Div-searchTag").innerHTML= "2";
		document.getElementById("Search-Input-Div-searchTag").innerHTML = "3";
	}

	setupStepThreeOptionBuilder(){
		document.getElementById("Search-Option-Div").style.display = "block";
		document.getElementById("Search-Option-Div-searchTag").innerHTML= "+";
		//document.getElementById("Search-Input-Div-searchTag").innerHTML = "2";
	}

	setupStepThree(subCategoryData){
		// Here we need to decide what to do
		// if permissions then add chmod with tag
		// if optionCat then set up with cat, search if contains in options array in config

	    if(subCategoryData.includes("Permissions")){
			this.setupStepThreeChmod();
		} 

		if(subCategoryData.includes("Current running processes") 
			|| subCategoryData.includes("Open file processes")
			|| subCategoryData.includes("Log file")){
			this.setupStepThreeOptionBuilder();
		}

		// Do we need the grep builder button?
	}

	purgeStepThree(subCategoryData){
		var chmodDiv = document.getElementById("Search-CHMOD-Div");
		// If CHMOD step is there, then remove it
		if(chmodDiv.style.display == "block"){
			chmodDiv.style.display = "none";
		}

		var optionDiv = document.getElementById('Search-Option-Div');
		var grepDiv = document.getElementById('Search-Grep-Div');	
		var grepTag = document.getElementById('grep-tag');	

		if(subCategoryData.includes("Current running processes") 
			|| subCategoryData.includes("Open file processes") 
			|| subCategoryData.includes("Log file")){
			document.getElementById('searchOption').innerHTML = "option";
			if(optionDiv.style.display == "block"){
				document.getElementById('searchOption').innerHTML = "option";
			} 
		} else {
			optionDiv.style.display = "none";
		}

		if(grepDiv.style.display = "block"){
			grepDiv.style.display = "none";
		}

		if(grepTag.style.display == "block"){
			document.getElementById('grep-tag').style.display = "none";
			document.getElementsByClassName('subsection-text-entry')[0].classList.remove('tags-input-grep-indent');
			(<HTMLFormElement>document.getElementById('subsection-form')).reset();
		}
	}

	renderFullSearchTerm(searchTerm){
		var stepTwoLabel = "";
		var renderedSearchTerm = ConfigService.searchTermRender[this.categoryChange + " >" + searchTerm];
		if(renderedSearchTerm == null){
			renderedSearchTerm = 'text...';
		} else if (renderedSearchTerm[0] == renderedSearchTerm[0].toUpperCase()){
			stepTwoLabel = renderedSearchTerm;
		} else {
			stepTwoLabel = 'Enter ' + renderedSearchTerm;
		}
		document.getElementById(`container-c2-header`).innerHTML = 'Step 2 - ' + stepTwoLabel;
		this.textEntryPlaceholder = stepTwoLabel;
	}

	constructor(private _jsonService: JsonService, private _chmodService: ChmodService){}
	ngOnInit(){
		// Construct the linuxCategories read from the json object stored
        let linuxCategoriesArr = ConfigService.categoriesSearch.split('.');
        for(var i in linuxCategoriesArr){
        	this.linuxCategories.push(linuxCategoriesArr[i].toString());
        }

		this.tmplistItemData = "minimise";
		this.searchResult = "NaN";
	}

}