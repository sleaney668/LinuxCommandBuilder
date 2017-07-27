import { Component, EventEmitter, Input, Output, Renderer, ElementRef } from '@angular/core';

import {AppComponent} from './../app.component';

// Import config
import {ConfigService} from './../config.service';

// Import services
import {ChmodService} from './../chmod.service';
import {OptionBuilderService} from './../option-builder.service';

@Component({
	selector: 'subsection',
	templateUrl: './subsection.component.html',
	inputs: ['showSubsection','linuxCategories','subSections','searchResult'],
	outputs:['subCategoryItemOutput']
})

export class SubsectionComponent{

	modifyCount = 0;
	subSections = [];
	searchArr = [];
	optionValues;

	subCategoryItemOutput = new EventEmitter();
 
	onSubCategorySelect(subCategoryItemData:string, category:string) {	

		// Hide the data div with the exiting searchResult content
		this.hideDataHtml();
	
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
		} else {
			var subsectionTextEntry = <HTMLInputElement>document.getElementsByClassName("subsection-text-entry")[0];
			subsectionTextEntry.disabled = false;
		}
		
		this.subCategoryItemOutput.emit(subCategoryItemData);
		
		document.getElementsByClassName('Copy-To-Clipboard')[0].classList.remove('Copy-To-Clipboard-Click');

		this.resetDataComponent(subCategoryItemData);
	}

	hideDataHtml(){
		var searchResultText = document.getElementById("searchResult").innerText;
		var dataDiv = searchResultText + "-data";
		if(document.getElementById(dataDiv) != null){
			if(document.getElementById(dataDiv).style.display == "block"){
				document.getElementById(dataDiv).style.display = "none";
			}
		}
	}

	// Loads child sub section of category selected
	loadSubSection(category, subCategoryItemData){
		var newCategory = subCategoryItemData.toLowerCase();
		this.subSections = [];

		if(category == "Modify"){
			switch (newCategory) {
				case "file":
					this.initialiseSubSection(ConfigService.modifyFileSubSearch.split('.'));
					break;
	            case "directory":
	              	this.initialiseSubSection(ConfigService.modifyDirectorySubSearch.split('.'));
	              	break;
	            case "user":
	              	this.initialiseSubSection(ConfigService.modifyUserSubSearch.split('.'));
	              	break;
	            case "group":
	              	this.initialiseSubSection(ConfigService.modifyGroupSubSearch.split('.'));
	              	break;
	            case "link":
	              	this.initialiseSubSection(ConfigService.modifyLinkSubSearch.split('.'));
	              	break;
	            case "main":
					this.initialiseSubSection(ConfigService.modifySearch.split('.'));
					break;
	            default:
	              	return null;
	        }
	    }

	    if(category == "View"){
	    	switch (newCategory) {
				case "file":
					this.initialiseSubSection(ConfigService.viewFileSubSearch.split('.'));
					break;
	            case "directory":
	              	this.initialiseSubSection(ConfigService.viewDirectorySubSearch.split('.'));
	              	break;
	            case "user":
	              	this.initialiseSubSection(ConfigService.viewUserSubSearch.split('.'));
	              	break;
	            case "group":
	              	this.initialiseSubSection(ConfigService.viewGroupSubSearch.split('.'));
	              	break;
	            case "processes":
	              	this.initialiseSubSection(ConfigService.viewProcessesSubSearch.split('.'));
	              	break;
	            case "main":
					this.initialiseSubSection(ConfigService.viewSearch.split('.'));
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
		if(event != null){
			this.searchArr[0] = event;
			this.searchTagIncrementationAndValidation(event);
		}

		if(document.getElementById('grep-tag').style.display == "block"){
			document.getElementById(`searchInput`).innerHTML = document.getElementById('grep-tag').innerText + " " + this.searchArr.toString();
			document.getElementById(`Search-Input-Div-searchTag`).innerHTML = "3";
		} else {
			document.getElementById(`searchInput`).innerHTML = this.searchArr.toString();
		}

		// id search box grows over 34 characters (combined 40 characters)
		var combinedLength = document.getElementById(`searchResult`).innerHTML.length + document.getElementById(`searchInput`).innerHTML.length;
		if(combinedLength >= 40){
			// update max length to searchInput Length
			document.getElementById(document.getElementsByClassName('subsection-text-entry')[0].id).setAttribute("maxlength", document.getElementById(`searchInput`).innerHTML.length.toString());	
		}

		document.getElementsByClassName('Copy-To-Clipboard')[0].classList.remove('Copy-To-Clipboard-Click');
	}

	searchTagIncrementationAndValidation(event){
		var searchInputLength = event.length;	
		var searchInputDiv = document.getElementById('Search-Input-Div');
		var searchInputTag = document.getElementById('Search-Input-Div-searchTag');
		
		var optionSearchTag = document.getElementById('Search-Option-Div-searchTag');
		var optionSearchDiv = document.getElementById('Search-Option-Div');

		if(searchInputLength == 0){
			searchInputDiv.style.display = "none";

			if(optionSearchDiv.style.display == "none" && optionSearchTag.innerHTML == "+"){
				optionSearchDiv.style.display = "block";
				optionSearchTag.innerHTML = "+";
			}

		} else {
			// If text is entered, and options are displayed and they havent been initialised with a value
			if(optionSearchDiv.style.display == "block" && optionSearchTag.innerHTML == "+"){
				// Show the input div
				searchInputDiv.style.display = "block";
				// Hide the option div
				optionSearchDiv.style.display = "none";
			}
			// If text is entered, and options are displayed and they have been initialised with a value
			else if(optionSearchDiv.style.display == "block" && optionSearchTag.innerHTML != "+"){
				// Show the input div
				searchInputDiv.style.display = "block";
				searchInputTag.innerHTML = "3";
			} else {
				// Show the input div
				searchInputDiv.style.display = "block";
				searchInputTag.innerHTML = "2";
			}
		}
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
			document.getElementById('data-div-h4').innerHTML = ConfigService.commandDict[document.getElementById('searchResult').innerHTML] + ` | `;
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
 
			if(document.getElementById(dataDiv) != null){
				document.getElementById(dataDiv).style.display = "none";
			}
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

		var subsectionTextEntry = <HTMLInputElement>document.getElementsByClassName("subsection-text-entry")[0];
		//subsectionTextEntry.value = "";
		subsectionTextEntry.placeholder='Select option...';

		this.modifyCount--;

		// Enable all other subsections
		this.toggleListItemDisabled(false);
		this.validateTextEntry(true, 'Select option...');
	}

	toggleListItemDisabled(diabledFlag){
		var listGroupItem = 'list-group-item-';

		var linuxCategoriesArr = ConfigService.categoriesSearch.split('.');
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
		(<HTMLFormElement>document.getElementById('subsection-form')).reset();
		
		var subsectionTextEntry = <HTMLInputElement>document.getElementsByClassName("subsection-text-entry")[0];
		
		// Remove this from the output
		document.getElementById('Search-Input-Div').style.display = "none";

		// Change the information here
		this.onSearchResultChange();
	}

	inputChanged(event: Event){
		this._chmodService.chmodBuilder(event);
	}

	loadOptionBuilder(){
		var searchResult = document.getElementById('searchResult').innerHTML;
		document.getElementById('option-builder-search-result').innerHTML = searchResult;

		var tailOption = document.getElementById('option-builder-tail');
		var dropDownOption = document.getElementById('option-builder-drop-down');
		var rightModalDiv = document.getElementById('option-modal-container-div-right');
		var leftModalDiv = document.getElementById('option-modal-container-div-left');
		var optionModalDialog = document.getElementById('option-modal-dialog');
		
		var width = "width:30%";
		if(searchResult == "tail"){
			tailOption.style.display = "inline";
			dropDownOption.style.display = "none";
			rightModalDiv.style.display = "none";
			leftModalDiv.style.paddingRight = "0px";
			leftModalDiv.style.width = "90%";

		} else {
			tailOption.style.display = "none";
			dropDownOption.style.display = "inline";
			rightModalDiv.style.display = "inline";
			leftModalDiv.style.paddingRight = "50px";
			leftModalDiv.style.width = "";
			//leftModalDiv.style.paddingLeft = "0%";
			
			width = "width:65%";
			if(searchResult == "ps"){
				width = "width:50%";
			} 

			this.populateOptions(searchResult);
		}

		optionModalDialog.setAttribute("style",width);
	}

	populateOptions(searchResult){
        this.optionValues = ConfigService.optionValues;
        let optionResults = this.optionValues[searchResult];

        var dropDown = document.getElementById('option-builder-drop-down'); 

		for (var i in optionResults) {
			var dropDownOption = '<option class="'+optionResults[i]+'" value="'+optionResults[i]+'">'+optionResults[i]+'</option>';
			dropDown.innerHTML += dropDownOption;
		}

		this.populateOptionInfo();
	}

	truncateOptions(){
		var searchResult = document.getElementById('searchResult').innerHTML;
		if(searchResult != "tail"){
			document.getElementById("option-builder-drop-down").innerHTML = "";
			document.getElementById(searchResult+"-option-data").style.display = "none";
		}
	}

	onOptionAddition(){

		var searchOption = document.getElementById('searchOption');
		document.getElementById("Search-Option-Div-searchTag").innerHTML = "2";

		if(document.getElementById('searchResult').innerHTML == "tail"){

			// Updating text entry placeholder
			var placeholderText = "Enter filename...";
			var tailTextEntryValue = (<HTMLInputElement>document.getElementById('tail-option-text-entry')).value;
			
			if(tailTextEntryValue == ""){
				document.getElementById("Search-Option-Div-searchTag").innerHTML = "+";
				searchOption.innerHTML = "option";

			} else {
				searchOption.innerHTML = "-" + (<HTMLInputElement>document.getElementById('tail-option-text-entry')).value;

				// Updating text entry placeholder
				var placeholderText = "Enter filename...";
				this.validateTextEntry(false, placeholderText);
		 	}

		} else {

			var optionDropDownList = document.getElementById('option-builder-drop-down') as HTMLSelectElement;
			var dropDownItem = optionDropDownList.options[optionDropDownList.selectedIndex].value;

			searchOption.innerHTML = dropDownItem;

			// Only show grep for selected grep options 
			// Decide what to do with viewing a log file
			if(document.getElementById('searchResult').innerHTML == "lsof"){			
				
				var placeholderText = "";
				switch (dropDownItem) {
					case "-i":
						placeholderText = "";
						break;
					case "-i:":
						placeholderText = "Enter port or port range...";
						break;
					case "-u":
						placeholderText = "Enter username...";
						break;
					case "-p":
						placeholderText = "Enter process ID...";
						break;
					case "+d":
						placeholderText = "Enter directory path...";
						break;
					case "-t":
						placeholderText = "Enter filename...";
						break;									
					default:
						placeholderText = "Enter text...";
						break;
				} 

				this.validateTextEntry(false, placeholderText);

			} else {

				// Show Grep
				document.getElementById('Search-Grep-Div').style.display = "block";

				/*
				* 1. Perform search for dropDownItem
				*/
				this._optionBuilderService.search(dropDownItem);

				// Updating text entry placeholder
				var placeholderText = "Add grep...";
				var subsectionTextEntry = <HTMLInputElement>document.getElementsByClassName("subsection-text-entry")[0];
				subsectionTextEntry.placeholder = placeholderText;

			}

			this.truncateOptions();
		} 
	}

	populateOptionInfo(){	
		var searchOption = document.getElementById('searchResult').innerHTML;
		document.getElementById(searchOption+'-option-data').style.display = "block";
	}

	loadGrep(){
		// Load grep into input
		document.getElementById('grep-tag').style.display = "block";
		document.getElementsByClassName('subsection-text-entry')[0].classList.add('tags-input-grep-indent');
		document.getElementById('Search-Grep-Div').style.display = "none";

		// Enable the tag input here
		this.validateTextEntry(false, "Enter text...");
	}

	onDeleteTagSelect(tagId){
		document.getElementById(tagId).style.display = "none";
		document.getElementsByClassName('subsection-text-entry')[0].classList.remove('tags-input-grep-indent');
		
		// Clear this text box
		(<HTMLFormElement>document.getElementById('subsection-form')).reset();
		document.getElementById('Search-Grep-Div').style.display = "block";
		document.getElementById('Search-Input-Div').style.display = "none";

		this.validateTextEntry(true, "Add grep...");
	}

	validateTextEntry(textEntryFlag, textEntryPlaceholder){
		var subsectionTextEntry = <HTMLInputElement>document.getElementsByClassName("subsection-text-entry")[0];
		var opactiy = "1";
		if(textEntryFlag){
			opactiy = "0.7";
		}
		subsectionTextEntry.disabled = textEntryFlag;
		subsectionTextEntry.placeholder = textEntryPlaceholder;
		subsectionTextEntry.style.opacity = opactiy;
	}

	updateTailInputOption(event){
		var searchInputValue = "tail -" + event;
		var searchInputDiv = document.getElementById("option-builder-search-result");
		searchInputDiv.innerHTML = searchInputValue;
	}

	updateTailCheckedOption(event: Event){	
		var tailInputValue = (<HTMLInputElement>document.getElementById("tail-option-text-entry")).value;
		if(event){
			tailInputValue += "f";
		} else {
			tailInputValue = tailInputValue.replace("f","");
		}

		(<HTMLInputElement>document.getElementById('tail-option-text-entry')).value = tailInputValue;
		
		this.updateTailInputOption(tailInputValue);
	}

	constructor(private _chmodService: ChmodService, private _optionBuilderService: OptionBuilderService){}
	ngOnInit(){
	}

}