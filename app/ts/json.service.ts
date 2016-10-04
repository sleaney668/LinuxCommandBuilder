import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable, Directive} from 'angular2/core';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class JSONService{
	private url = `dataObject.json`;

	constructor(private http: Http){
	}

	getJson(){
		console.log(this.http.request(this.url).map(res => res.json()));
	}

}