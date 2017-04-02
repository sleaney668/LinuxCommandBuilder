import {Directive,  ElementRef, Renderer, Component, EventEmitter, Input, Output} from 'angular2/core';
import {AppComponent} from './app.component';
import {DataComponent} from './data.component';
import {OptionComponent} from './data.component';

// Import config
import {Config} from './config.service';

// Import services
import {CHMODService} from './chmod.service';
import {OptionBuilderService} from './optionBuilder.service';

@Component({
	selector: 'subsection',
	templateUrl: 'app/html/subsection.component.html',
	directives: [DataComponent, OptionComponent],
	inputs: ['showSubsection','linuxCategories','subSections','searchResult'],
	outputs:['subCategoryItemOutput']
})

export class SubsectionComponent{

	modifyCount = 0;
	subSections = [];
	searchArr = [];
	searchText;
	tmpSearchText;
	optionValues;

	subCategoryItemOutput = new EventEmitter();
 
	onSubCategorySelect(subCategoryItemData:string, category:string) {	
		if(this.modifyCount == 1){
			subCategoryItemData = subCategoryItemData + ".";
		}

		if((category == "Modify" || category == "View") && this.modifyCount == 0){
			this.loadSubSection(category, subCategoryItemData);

			// Changing data in div
			document.getElementById('container-c1-header').innerHTML = "Step 1.1 - Select (sub) option";
			document.getElementById('modify-back-button').style.visibility = "visible";
			var subsectionTextEntry = <HTMLInputElement>document.getElementsByClassName("subsection-text-entry")[0];
			subsectionTextEntry.placeholder='Select (sub) option...';

			this.modifyCount++;

			// Disable all other subsections
			this.toggleListItemDisabled(true);
		} 
		
		this.subCategoryItemOutput.emit(subCategoryItemData);
		
		document.getElementsByClassName('Copy-To-Clipboard')[0].classList.remove('Copy-To-Clipboard-Click');

		this.resetDataComponent(subCategoryItemData);
	}

		// Loads child sub section of category selected
	loadSubSection(category, subCategoryItemData){
		var newCategory = subCategoryItemData.toLowerCase();
		this.subSections = [];

		if(category == "Modify"){
			switch (newCategory) {
				case "file":
					this.initialiseSubSection(Config.modifyFileSubSearch.split('.'));
					break;
	            case "directory":
	              	this.initialiseSubSection(Config.modifyDirectorySubSearch.split('.'));
	              	break;
	            case "user":
	              	this.initialiseSubSection(Config.modifyUserSubSearch.split('.'));
	              	break;
	            case "group":
	              	this.initialiseSubSection(Config.modifyGroupSubSearch.split('.'));
	              	break;
	            case "link":
	              	this.initialiseSubSection(Config.modifyLinkSubSearch.split('.'));
	              	break;
	            case "main":
					this.initialiseSubSection(Config.modifySearch.split('.'));
					break;
	            default:
	              	return null;
	        }
	    }

	    if(category == "View"){
	    	switch (newCategory) {
				case "file":
					this.initialiseSubSection(Config.viewFileSubSearch.split('.'));
					break;
	            case "directory":
	              	this.initialiseSubSection(Config.viewDirectorySubSearch.split('.'));
	              	break;
	            case "group":
	              	this.initialiseSubSection(Config.viewGroupSubSearch.split('.'));
	              	break;
	            case "processes":
	              	this.initialiseSubSection(Config.viewProcessesSubSearch.split('.'));
	              	break;
	            case "main":
					this.initialiseSubSection(Config.viewSearch.split('.'));
					break;
	            default:
	              	return null;
	        }
	    }

	}

	// Initialises subsection based on category selected
	initialiseSubSection(subSectionArr){
		// Construct the sub section read from the json object stored
        for(var i in subSectionArr){
        	this.subSections.push(subSectionArr[i].toString());
        }
	}

	reSearch(event: Event){	
		this.searchArr[0] = event;
		document.getElementById(`searchInput`).innerHTML = this.searchArr.toString();
		document.getElementById('Search-Input-Div').style.visibility = "visible";

		// id search box grows over 34 characters (combined 40 characters)
		var combinedLength = document.getElementById(`searchResult`).innerHTML.length + document.getElementById(`searchInput`).innerHTML.length;
		if(combinedLength >= 40){
			// update max length to searchInput Length
			document.getElementById(document.getElementsByClassName('subsection-text-entry')[0].id).setAttribute("maxlength", document.getElementById(`searchInput`).innerHTML.length.toString());
			
		}

		document.getElementsByClassName('Copy-To-Clipboard')[0].classList.remove('Copy-To-Clipboard-Click');
	}

	copyToClipboard(){
		document.getElementsByClassName('Copy-To-Clipboard')[0].classList.add('Copy-To-Clipboard-Click');

  		var aux = document.createElement("input");
  		aux.setAttribute("value", document.getElementById('searchResult').innerHTML + " " + document.getElementById('searchInput').innerHTML);
  		document.body.appendChild(aux);
  		aux.select();
 		
 		document.execCommand("copy");
 		document.body.removeChild(aux);
	}

	onSearchResultClick(){
		if(!document.getElementById('alert-info-id').hasAttribute('hidden')){
			document.getElementById('alert-info-id').setAttribute('hidden','hidden');

			document.getElementById('searchResult').classList.remove('searchResultSelected');
			document.getElementsByClassName('searchTag')[0].classList.remove('searchTagSelected');
		}else{
			document.getElementById('searchResult').classList.add('searchResultSelected');
			document.getElementsByClassName('searchTag')[0].classList.add('searchTagSelected');

			// Populate the info box from detail stored in config or even perform a google search
			document.getElementById('alert-info-id').removeAttribute('hidden');

			// We want to take in a keyword and render new html from another component
			document.getElementById('data-div-h4').innerHTML = Config.commandDict[document.getElementById('searchResult').innerHTML] + ` | `;
			document.getElementById('data-div-h4-href').innerHTML = document.getElementById('searchResult').innerHTML;

			var dataDiv = document.getElementById('searchResult').innerHTML + '-data';
			document.getElementById(dataDiv).style.display = "block";
		}
	}

	onSearchResultChange(){
		// We want to take in a keyword and render new html from another component
		document.getElementById('alert-info-id').setAttribute('hidden','hidden');

		var dataDiv = document.getElementById('searchResult').innerHTML;
		if(dataDiv != null || dataDiv != ""){
			dataDiv = dataDiv + '-data';
			if(document.getElementById(dataDiv) != null)
				document.getElementById(dataDiv).style.display = "none";
		}
	}

	onHrefClick(){
		// Google search for search result 
 		window.open('https://www.google.com/?#q=' + document.getElementById('searchResult').innerHTML + " linux command");
	}

	onBackButtonSelect(){
		var mainSection = document.getElementById('container-c1-header').parentElement.parentElement.parentElement.parentElement.id;
		mainSection = mainSection.substring(mainSection.indexOf('-')+1, mainSection.lastIndexOf('-'));
		this.loadSubSection(mainSection,'main');
        
		// Changing data in div
		document.getElementById('container-c1-header').innerHTML = "Step 1 - Select option";
		document.getElementById('modify-back-button').style.visibility = "hidden";

		// document.getElementById("Search-Result-Div").style.visibility = "hidden";
		// document.getElementById("Search-Option-Div").style.visibility = "hidden";
		// document.getElementById("Search-Input-Div").style.visibility = "hidden";

		var subsectionTextEntry = <HTMLInputElement>document.getElementsByClassName("subsection-text-entry")[0];
		subsectionTextEntry.value = "";
		subsectionTextEntry.placeholder='Select option...';
		// subsectionTextEntry.disabled = true;
		// subsectionTextEntry.style.opacity = '0.7';

		this.modifyCount--;

		// Enable all other subsections
		this.toggleListItemDisabled(false);
	}

	toggleListItemDisabled(diabledFlag){
		var listGroupItem = 'list-group-item-';

		var linuxCategoriesArr = Config.categoriesSearch.split('.');
		//linuxCategoriesArr.splice(linuxCategoriesArr.indexOf(`Modify`),1);

	    for(var i in linuxCategoriesArr){
	    	var listGroupItemCategory = listGroupItem + linuxCategoriesArr[i];
	    	if(diabledFlag){
	    		document.getElementById(listGroupItemCategory).classList.add('list-group-disabled');    	
	    	} else {
	    		document.getElementById(listGroupItemCategory).classList.remove('list-group-disabled'); 
	    	}   	
	     }
	}

	resetDataComponent(category){

		// Clear this text box
		document.getElementById('subsection-form').reset();

		// Remove this from the output
		document.getElementById('Search-Input-Div').style.visibility = "hidden";

		// Change the information here
		this.onSearchResultChange();
	}

	inputChanged(event: Event){
		this._chmodService.chmodBuilder(event);
	}

	loadOptionBuilder(){
		//alert("HERE");
		var searchResult = document.getElementById('searchResult').innerHTML;
		document.getElementById('option-builder-search-result').innerHTML = searchResult;

		this.populateOptions(searchResult);
	}

	populateOptions(searchResult){
        this.optionValues = Config.optionValues;
        let optionResults = this.optionValues[searchResult];

        var dropDown = document.getElementById('option-builder-drop-down'); 

		for (var i in optionResults) {
			var dropDownOption = '<option class="'+optionResults[i]+'" value="'+optionResults[i]+'">-'+optionResults[i]+'</option>';
			dropDown.innerHTML += dropDownOption;

		  	console.log(optionResults[i]); //"aa", bb", "cc"
		  }

		this.populateOptionInfo(document.getElementById('searchOption'));
	}

	onOptionSelection(){

		var optionDropDownList = document.getElementById('option-builder-drop-down') as HTMLSelectElement;
		var dropDownItem = optionDropDownList.options[optionDropDownList.selectedIndex].value;

		var searchOption = document.getElementById('searchOption');
		searchOption.innerHTML = '-'+dropDownItem;
		document.getElementById("Search-Option-Div-searchTag").innerHTML= "2";

		// Show Grep
		document.getElementById('Search-Grep-Div').style.display = "block";

		/*
		* 1. Perform search for dropDownItem
		*/
		this._optionBuilderService.search(dropDownItem);
	}


	populateOptionInfo(searchOption){
		
		// option-modal-container-div-right-title
		// option-modal-container-div-right
		document.getElementById('ps-option-data').style.display = "block";

		//document.getElementById('option-modal-container-div-right-title').innerHTML = "Options for " + searchOption;

		//document.getElementById('option-modal-container-div-right').innerHTML += document.getElementById(dataDiv).innerHTML;

	}


	constructor(private _chmodService: CHMODService, private _optionBuilderService: OptionBuilderService){}
	ngOnInit(){
	}

}

