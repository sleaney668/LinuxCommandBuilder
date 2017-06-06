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
import {OptionBuilderService} from './optionBuilder.service';

// Import interfaces
import {Command} from './command';

@Component({
    selector: 'my-app',
    templateUrl: 'app/html/app.component.html',
    directives: [ListComponent, SubsectionComponent, CORE_DIRECTIVES],
    providers: [JSONService, CHMODService, OptionBuilderService]
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

		if (Config.disabledSearchTerms.includes(subCategoryData.trim())){
			placeholderText = '';
			opactiy = "0.7";
			subsectionTextEntry.disabled = true;
		} else if(subCategoryData.includes("All processes") || subCategoryData.includes("Specific processes")){
			placeholderText = 'Add option...';
			opactiy = "0.7";
			subsectionTextEntry.disabled = true;
		} 

		subsectionTextEntry.placeholder = placeholderText;
		subsectionTextEntry.style.opacity = opactiy;
	}

	setupStepThreeChmod(){
		//alert("Setting up chmod builder...");
		document.getElementById("Search-CHMOD-Div").style.display = "block";
		document.getElementById("Search-CHMOD-Div-searchTag").innerHTML= "2";
		document.getElementById("Search-Input-Div-searchTag").innerHTML = "3";
	}

	setupStepThreeOptionBuilder(){
		//alert("Setting up option builder...");
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

		if(subCategoryData.includes("All processes") 
			|| subCategoryData.includes("Specific processes")
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

		if(subCategoryData.includes("All processes") || subCategoryData.includes("Specific processes")){
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
			document.getElementById('subsection-form').reset();
		}
	}

	renderFullSearchTerm(searchTerm){

		console.log("listItemName: " + this.listItemName);
		console.log("tmplistItemData: " + this.tmplistItemData);
		console.log("showSubsection: " + this.showSubsection);
		console.log("searchResult: " + this.searchResult);
		console.log("data: " + this.data);
		console.log("searchString: " + this.searchString);
		console.log("searchArr: " + this.searchArr);
		console.log("command: " + this.command);
		console.log("subSectionId: " + this.listItemName);
		console.log("tmpSubSectionId: " + this.listItemName);
		console.log("categoryChange: " + this.categoryChange);


		// alert(searchTerm + " - " + Config.searchTermRender[searchTerm]);
		var stepTwoLabel = 'Enter ' + Config.searchTermRender[searchTerm];
		document.getElementById(`container-c2-header`).innerHTML = 'Step 2 - ' + stepTwoLabel;
		this.textEntryPlaceholder = stepTwoLabel;
		//var subsectionTextEntry = <HTMLInputElement>document.getElementsByClassName("subsection-text-entry")[0];
		//subsectionTextEntry.placeholder = "stepTwoLabel";

	}

	constructor(private _jsonService: JSONService, private _chmodService: CHMODService, private _optionBuilderService: OptionBuilderService){}
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
