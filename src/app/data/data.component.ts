import { Component, OnInit } from '@angular/core';

import {SubsectionComponent} from './../subsection/subsection.component';

// Import services
import {ChmodService} from './../chmod.service';

@Component({
	selector: 'data',
	templateUrl: './data.component.html',
})
export class DataComponent{
	constructor(){}
	ngOnInit(){}
}

@Component({
	selector: 'options',
	templateUrl: './../option/option.component.html',
})
export class OptionComponent{
	constructor(){}
	ngOnInit(){}
}