import {Injectable} from '@angular/core';

import {ConfigService} from './config.service';

@Injectable()
export class ChmodService{

	visualArr = ['r','w','x'];
    binaryArr = [4,2,1];
    myArr = [[0,0,0],
             [0,0,0],
             [0,0,0]];


	chmodBuilder(event: Event){
		this.eventRendering(event);
      	this.binaryTranslation();
      	this.visualTranslation();

      	console.log("User:  " + this.myArr[0][0] + " " + this.myArr[0][1] + " " + this.myArr[0][2]);
      	console.log("Group: " + this.myArr[1][0] + " " + this.myArr[1][1] + " " + this.myArr[1][2]);
      	console.log("Other: " + this.myArr[2][0] + " " + this.myArr[2][1] + " " + this.myArr[2][2]);

    }

    eventRendering(event: Event){
      	this.myArr[0][0] = (<HTMLInputElement>document.getElementById('checkbox-0.0')).checked == true ? 1 : 0;
      	this.myArr[0][1] = (<HTMLInputElement>document.getElementById('checkbox-0.1')).checked == true ? 1 : 0;
      	this.myArr[0][2] = (<HTMLInputElement>document.getElementById('checkbox-0.2')).checked == true ? 1 : 0;

      	this.myArr[1][0] = (<HTMLInputElement>document.getElementById('checkbox-1.0')).checked == true ? 1 : 0;
      	this.myArr[1][1] = (<HTMLInputElement>document.getElementById('checkbox-1.1')).checked == true ? 1 : 0;
      	this.myArr[1][2] = (<HTMLInputElement>document.getElementById('checkbox-1.2')).checked == true ? 1 : 0;

      	this.myArr[2][0] = (<HTMLInputElement>document.getElementById('checkbox-2.0')).checked == true ? 1 : 0;
      	this.myArr[2][1] = (<HTMLInputElement>document.getElementById('checkbox-2.1')).checked == true ? 1 : 0;
      	this.myArr[2][2] = (<HTMLInputElement>document.getElementById('checkbox-2.2')).checked == true ? 1 : 0;
    }

    binaryTranslation(){
      	// r  w  x
      	// 4  2  1 
      	var userTotal  = 	(this.myArr[0][0] == 1 ? this.binaryArr[0] : 0) + 
                       		(this.myArr[0][1] == 1 ? this.binaryArr[1] : 0) + 
                       		(this.myArr[0][2] == 1 ? this.binaryArr[2] : 0);

      	var groupTotal  = (this.myArr[1][0] == 1 ? this.binaryArr[0] : 0) + 
                        	(this.myArr[1][1] == 1 ? this.binaryArr[1] : 0) + 
                        	(this.myArr[1][2] == 1 ? this.binaryArr[2] : 0);

      	var otherTotal  = (this.myArr[2][0] == 1 ? this.binaryArr[0] : 0) + 
                        	(this.myArr[2][1] == 1 ? this.binaryArr[1] : 0) + 
                        	(this.myArr[2][2] == 1 ? this.binaryArr[2] : 0);
                          
        document.getElementById('searchChmodOption').innerHTML = '' + userTotal + groupTotal + otherTotal + '';
        document.getElementById('Command').innerHTML = '' + userTotal + groupTotal + otherTotal + '';
      	console.log("Command: " + userTotal + groupTotal + otherTotal);

    }

    visualTranslation(){
      	var userTotal  = 	(this.myArr[0][0] == 1 ? this.visualArr[0] : '-') + 
                       		(this.myArr[0][1] == 1 ? this.visualArr[1] : '-') + 
                       		(this.myArr[0][2] == 1 ? this.visualArr[2] : '-');

      	var groupTotal  = (this.myArr[1][0] == 1 ? this.visualArr[0] : '-') + 
                        	(this.myArr[1][1] == 1 ? this.visualArr[1] : '-') + 
                        	(this.myArr[1][2] == 1 ? this.visualArr[2] : '-');

      	var otherTotal  = (this.myArr[2][0] == 1 ? this.visualArr[0] : '-') + 
                        	(this.myArr[2][1] == 1 ? this.visualArr[1] : '-') + 
                        	(this.myArr[2][2] == 1 ? this.visualArr[2] : '-');

        document.getElementById('Visualise').innerHTML = '-' + userTotal + groupTotal + otherTotal + '';
      	console.log("Visualise: " + userTotal + groupTotal + otherTotal);
    }

}
