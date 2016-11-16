import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {AppComponent} from './app.component';

// Import config
import {Config} from './config.service';

@Component({
	selector: 'subsection',
	templateUrl: 'app/html/subsection.component.html',
	inputs: ['showSubsection','linuxCategories','subSections','searchResult'],
	outputs:['subCategoryItemOutput','categoryItemOutput']
})

export class SubsectionComponent{

	modifyCount = 0;
	subSections = [];
	searchArr = [];
	searchText;
	tmpSearchText;

	categoryItemOutput = new EventEmitter();
	subCategoryItemOutput = new EventEmitter();

	onSubCategorySelect(subCategoryItemData:string, category:string) {
		
		if(category == "Modify" && this.modifyCount == 0){
			this.loadSubSection(subCategoryItemData);
			this.modifyCount++;
		}

		this.subCategoryItemOutput.emit(subCategoryItemData);

		document.getElementsByClassName('Copy-To-Clipboard')[0].classList.remove('Copy-To-Clipboard-Click');
	}

		// Loads child sub section of category selected
	loadSubSection(category){
		var newCategory = category.toLowerCase();
		this.subSections = [];

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
            case "permissions":
              	this.initialiseSubSection(Config.modifyPermissionsSubSearch.split('.'));
              	break;
            case "ownership":
              	this.initialiseSubSection(Config.modifyOwnershipSubSearch.split('.'));
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

	reSearch(event: Event){	
		this.searchArr[0] = event;
		document.getElementById(`searchInput`).innerHTML = this.searchArr.toString();

		document.getElementById('Search-Input-Div').style.visibility = "visible";

		// id search box grows over 34 characters (combined 37 characters)
		var combinedLength = document.getElementById(`searchResult`).innerHTML.length + document.getElementById(`searchInput`).innerHTML.length
		if(combinedLength >= 37){
			document.getElementById('Search-Input-Div').style.paddingTop = "45px";
		} else {
			document.getElementById('Search-Input-Div').style.paddingTop = "";
		}

		document.getElementsByClassName('Copy-To-Clipboard')[0].classList.remove('Copy-To-Clipboard-Click');
	}

	copyToClipboard(){
		//alert(document.getElementById('searchResult').innerHTML + document.getElementById('searchInput').innerHTML);
		//Copy-To-Clipboard

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
		}else{
			// Populate the info box from detail stored in config or even perform a google search

			document.getElementById('alert-info-id').removeAttribute('hidden');
		}
	}

	onHrefClick(){
		// Google search for search result 
 		window.open('https://www.google.com/?#q='+document.getElementById('searchResult').innerHTML + " linux command");
	}

}

