import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {SubsectionComponent} from './subsection.component';

// Import services
import {CHMODService} from './chmod.service';

@Component({
	selector: 'data',
	templateUrl: 'app/html/data.component.html'
})

export class DataComponent{
	
	inputChanged(event: Event){
		this._chmodService.chmodBuilder(event);
	}

	constructor(private _chmodService: CHMODService){}
	ngOnInit(){
	}
}