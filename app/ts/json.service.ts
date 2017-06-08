import {Injectable} from 'angular2/core';
import {Config} from './config.service';

@Injectable()
export class JSONService{

    categoriesIndexList: string;
    subCategoryIndexList: string;
    childCategoryIndexList: string;
    jsonObject;
    linuxObject;

    public getLinuxCategories(search){
        this.jsonObject = Config.dataObject;
        let linuxArray = this.jsonObject.linuxCategories;
        let jsonSearchInput = search.split('.');

        if(linuxArray != null){       
          this.categoriesIndexList = Config.categoriesSearch.toLowerCase();
          this.subCategoryIndexList = this.populateCategoriesIndexList(jsonSearchInput[0]);
          if(jsonSearchInput[0] == "modify" || jsonSearchInput[0] == "view"){
            this.childCategoryIndexList = this.populateChildCategoriesIndexList(jsonSearchInput[0], jsonSearchInput[1]);
          }

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
            case "misc":
              return Config.miscSearch.toLowerCase();
            default:
              return null;
          }
    }

    private populateChildCategoriesIndexList(jsonSearch, jsonChildSearch){      
      if(jsonSearch == "modify"){
        switch (jsonChildSearch) {
          case "file":
            return Config.modifyFileSubSearch.toLowerCase();
          case "directory":
            return Config.modifyDirectorySubSearch.toLowerCase();
          case "user":
            return Config.modifyUserSubSearch.toLowerCase();
          case "group":
            return Config.modifyGroupSubSearch.toLowerCase();
          case "link":
            return Config.modifyLinkSubSearch.toLowerCase();
          default:
            return null;
          }
      }

      if(jsonSearch == "view"){
        switch (jsonChildSearch) {
          case "file":
            return Config.viewFileSubSearch.toLowerCase();
          case "directory":
            return Config.viewDirectorySubSearch.toLowerCase();
          case "user":
            return Config.viewUserSubSearch.toLowerCase();
          case "group":
            return Config.viewGroupSubSearch.toLowerCase();
          case "processes":
            return Config.viewProcessesSubSearch.toLowerCase();
          default:
            return null;
          }
      }
    }
}













