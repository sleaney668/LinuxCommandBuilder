import {Injectable} from 'angular2/core';
import {Config} from './config.service';

@Injectable()
export class JSONService{

    categoriesIndexList: string;
    subCategoryIndexList: string;
    childCategoryIndexList: string;
    jsonObject;
    linuxObject;

    binaryArr = [4,2,1];
    myArr = [[0,0,0],
             [0,0,0],
             [0,0,0]];


    public getLinuxCategories(search){
        this.jsonObject = Config.dataObject;
        let linuxArray = this.jsonObject.linuxCategories;
        let jsonSearchInput = search.split('.');

        if(linuxArray != null){       
          this.categoriesIndexList = Config.categoriesSearch.toLowerCase();
          this.subCategoryIndexList = this.populateCategoriesIndexList(jsonSearchInput[0]);
          this.childCategoryIndexList = this.populateChildCategoriesIndexList(jsonSearchInput[1]);

          let categoriesIndexArray = this.categoriesIndexList.split('.');
          let subCategoryIndexArray = this.subCategoryIndexList.split('.');

          var childCategoryIndex = -1;
          if(this.childCategoryIndexList != null){
            let childCategoryIndexArray = this.childCategoryIndexList.split('.');
            childCategoryIndex = childCategoryIndexArray.indexOf(jsonSearchInput[2]);
          }

          var categoriesIndex = categoriesIndexArray.indexOf(jsonSearchInput[0]);
          var subCategoryIndex = subCategoryIndexArray.indexOf(jsonSearchInput[1]);

          this.linuxObject = "";
          if(childCategoryIndex >= 0)
            this.linuxObject = linuxArray[categoriesIndex][subCategoryIndex][childCategoryIndex];
          else
            this.linuxObject = linuxArray[categoriesIndex][subCategoryIndex];
    
          console.log(this.linuxObject);
        }

    }

    private populateCategoriesIndexList(jsonSearch){
        switch (jsonSearch) {
            case "add":
              return Config.addSearch.toLowerCase();
            case "delete":
              return Config.deleteSearch.toLowerCase();
            case "modify":
              return Config.modifySearch.toLowerCase();
            case "view":
              return Config.viewSearch.toLowerCase();
            case "locate":
              return Config.locateSearch.toLowerCase();
            case "copy":
              return Config.copySearch.toLowerCase();
            default:
              return null;
          }
    }

    private populateChildCategoriesIndexList(jsonSearch){
      switch (jsonSearch) {
        case "file":
          return Config.modifyFileSubSearch.toLowerCase();
        case "directory":
          return Config.modifyDirectorySubSearch.toLowerCase();
        case "user":
          return Config.modifyUserSubSearch.toLowerCase();
        case "permissions":
          return Config.modifyPermissionsSubSearch.toLowerCase();
        case "ownership":
          return Config.modifyOwnershipSubSearch.toLowerCase();
        default:
          return null;
        }
    }

    chmodBuilder(event: Event){

      this.eventRendering(event);
      this.binaryTranslation();

      console.log("User:  " + this.myArr[0][0] + " " + this.myArr[0][1] + " " + this.myArr[0][2]);
      console.log("Group: " + this.myArr[1][0] + " " + this.myArr[1][1] + " " + this.myArr[1][2]);
      console.log("Other: " + this.myArr[2][0] + " " + this.myArr[2][1] + " " + this.myArr[2][2]);
    }

    eventRendering(event: Event){

      this.myArr[0][0] = document.getElementById('checkbox-0.0').checked == true ? 1 : 0;
      this.myArr[0][1] = document.getElementById('checkbox-0.1').checked == true ? 1 : 0;
      this.myArr[0][2] = document.getElementById('checkbox-0.2').checked == true ? 1 : 0;

      this.myArr[1][0] = document.getElementById('checkbox-1.0').checked == true ? 1 : 0;
      this.myArr[1][1] = document.getElementById('checkbox-1.1').checked == true ? 1 : 0;
      this.myArr[1][2] = document.getElementById('checkbox-1.2').checked == true ? 1 : 0;

      this.myArr[2][0] = document.getElementById('checkbox-2.0').checked == true ? 1 : 0;
      this.myArr[2][1] = document.getElementById('checkbox-2.1').checked == true ? 1 : 0;
      this.myArr[2][2] = document.getElementById('checkbox-2.2').checked == true ? 1 : 0;
    }

    binaryTranslation(){
      // r  w  x
      // 4  2  1 

      var userTotal  = (this.myArr[0][0] == 1 ? this.binaryArr[0] : 0) + 
                       (this.myArr[0][1] == 1 ? this.binaryArr[1] : 0) + 
                       (this.myArr[0][2] == 1 ? this.binaryArr[2] : 0);

      var groupTotal  = (this.myArr[1][0] == 1 ? this.binaryArr[0] : 0) + 
                        (this.myArr[1][1] == 1 ? this.binaryArr[1] : 0) + 
                        (this.myArr[1][2] == 1 ? this.binaryArr[2] : 0);

      var otherTotal  = (this.myArr[2][0] == 1 ? this.binaryArr[0] : 0) + 
                        (this.myArr[2][1] == 1 ? this.binaryArr[1] : 0) + 
                        (this.myArr[2][2] == 1 ? this.binaryArr[2] : 0);

      alert("Command: " + userTotal + groupTotal + otherTotal);

    }
}