import { Injectable } from '@angular/core';

// Importing config
import {ConfigService} from './config.service';

@Injectable()
export class OptionBuilderService {
	
	public search(dropDownItem){
		//alert('IN OPTION BUILDER SEARCH...' + dropDownItem);

		//alert('HERE >> ' + Config.optionDescriptions[dropDownItem]);
    }

}
