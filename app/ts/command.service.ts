import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Command} from './command';


@Injectable()
export class CommandService{

	private command;
	private url = `dataObject.json`;

	public data;
    public loading: boolean;
    public search:string;
    public linuxCommand: string;

	constructor(private _http: Http){
		//this.search = `add.directory`;
		//this.data = this._http.get(this.url).map(res => res.json()).subscribe();
		//console.log(this.data)
	}

	// getCommand(): Observable<Command>{

	// 	this._http.get(this.url)
	// 		.map(res => res.json());
	// 		//.catch(this.handleError);
	// }

	public getResult(search: string){
		
		console.log(search);
		var searchTerms = search.split(`.`);

		this._http.request(this.url).subscribe((res: Response) => {

			this.data = res.json();
			console.log(this.data);

			for (var term in searchTerms) {
				console.log(searchTerms[term]);

				this.data = this.parseSearchTerm(searchTerms[term], this.data);

				console.log(this.data);


			}

			// console.log(this.data.add);
			// this.data = this.data.add
			// console.log(this.data.directory);
  		});
	}


	private parseSearchTerm(searchTerm: string, data){

		if(searchTerm == `add`){
			return data.add;
		} else if (searchTerm == `directory`) {
			return data.directory;
		}
	}

	// private extractData(res: Response) {
 //    	let body = res.json();
 //    	return body.data || { };
	// }

 //    private handleError (error: any) {
 //    	// In a real world app, we might use a remote logging infrastructure
	//     // We'd also dig deeper into the error to get a better message
	//     let errMsg = (error.message) ? error.message : 
	//     	error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	//     console.error(errMsg); // log to console instead
	//     return Observable.throw(errMsg);
	// }

	// this._http.request(this.url).((res: Response) => {
 	//           	//console.log(res.json()); 
 	//               this.data = res.json();
  	//               this.loading = false;
  	//               console.log(this.data);
  	//       		console.log(this.loading);     
  	// });

}