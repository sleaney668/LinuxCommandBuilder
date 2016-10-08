import {Injectable} from 'angular2/core';
import {Component} from 'angular2/core';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class JSONService{
	public  url = `dataObject.json`;
	public data: Object;
    public loading: boolean;

	public getJson(http: Http){
		this.http.request(this.url)
			.subscribe((res: Response) => {
            	//console.log(res.json()); 
                this.data = res.json();
                this.loading = false;

                console.log(this.data);
        		console.log(this.loading);     
        });
	}
}