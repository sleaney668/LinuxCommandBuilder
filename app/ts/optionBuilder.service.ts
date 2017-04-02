import {Injectable} from 'angular2/core';
import {Config} from './config.service';

@Injectable()
export class OptionBuilderService{

	public search(dropDownItem){
		//alert('IN OPTION BUILDER SEARCH...' + dropDownItem);

		//alert('HERE >> ' + Config.optionDescriptions[dropDownItem]);
    }
}