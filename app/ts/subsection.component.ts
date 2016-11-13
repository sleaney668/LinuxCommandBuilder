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

		document.getElementById('Search-Input-Div').style.visibility = "visible";

		// id search box grows over 34 characters (combined 37 characters)
		var combinedLength = document.getElementById(`searchResult`).innerHTML.length + document.getElementById(`searchInput`).innerHTML.length
		if(combinedLength >= 37){
			document.getElementById('Search-Input-Div').style.paddingTop = "45px";
		} else {
			document.getElementById('Search-Input-Div').style.paddingTop = "";
		}
	}

	copyToClipboard(){
		alert(document.getElementById('searchResult').innerHTML + document.getElementById('searchInput').innerHTML);

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
}

