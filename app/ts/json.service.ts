import {Injectable} from 'angular2/core';

// Import config
import {Config} from './config.service';

@Injectable()
export class JSONService{

    categoriesIndexList: string;
    subCategoryIndexList: string;
    childCategoryIndexList: string;
    jsonObject;

    public getLinuxCategories(search){

        this.jsonObject = Config.dataObject;
        let linuxArray = this.jsonObject.linuxCategories;
        
        let jsonSearchInput = search.split('.');
        this.categoriesIndexList = Config.categoriesSearch.toLowerCase();
        this.subCategoryIndexList = this.populateCategoriesIndexList(jsonSearchInput[0]);

        console.log(this.categoriesIndexList);
        console.log(this.subCategoryIndexList);

        let categoriesIndexArray = this.categoriesIndexList.split('.');
        let subCategoryIndexArray = this.subCategoryIndexList.split('.');

        var categoriesIndex = categoriesIndexArray.indexOf(jsonSearchInput[0]);
        var subCategoryIndex = subCategoryIndexArray.indexOf(jsonSearchInput[1]);

        let linuxObject = linuxArray[categoriesIndex][subCategoryIndex];
        console.log(linuxObject);

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
}