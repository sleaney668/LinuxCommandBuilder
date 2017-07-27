import {Injectable} from '@angular/core';

import {ConfigService} from './config.service';

@Injectable()
export class JsonService{

    categoriesIndexList: string;
    subCategoryIndexList: string;
    childCategoryIndexList: string;
    jsonObject;
    linuxObject;

    public getLinuxCategories(search){
        this.jsonObject = ConfigService.dataObject;
        let linuxArray = this.jsonObject.linuxCategories;
        let jsonSearchInput = search.split('.');

        if(linuxArray != null){       
          this.categoriesIndexList = ConfigService.categoriesSearch.toLowerCase();
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
              return ConfigService.addSearch.toLowerCase();
            case "delete":
              return ConfigService.deleteSearch.toLowerCase();
            case "modify":
              return ConfigService.modifySearch.toLowerCase();
            case "view":
              return ConfigService.viewSearch.toLowerCase();
            case "locate":
              return ConfigService.locateSearch.toLowerCase();
            case "copy":
              return ConfigService.copySearch.toLowerCase();
            /*
            case "misc":
              return ConfigService.miscSearch.toLowerCase();
            */
            default:
              return null;
          }
    }

    private populateChildCategoriesIndexList(jsonSearch, jsonChildSearch){      
      if(jsonSearch == "modify"){
        switch (jsonChildSearch) {
          case "file":
            return ConfigService.modifyFileSubSearch.toLowerCase();
          case "directory":
            return ConfigService.modifyDirectorySubSearch.toLowerCase();
          case "user":
            return ConfigService.modifyUserSubSearch.toLowerCase();
          case "group":
            return ConfigService.modifyGroupSubSearch.toLowerCase();
          case "link":
            return ConfigService.modifyLinkSubSearch.toLowerCase();
          default:
            return null;
          }
      }

      if(jsonSearch == "view"){
        switch (jsonChildSearch) {
          case "file":
            return ConfigService.viewFileSubSearch.toLowerCase();
          case "directory":
            return ConfigService.viewDirectorySubSearch.toLowerCase();
          case "user":
            return ConfigService.viewUserSubSearch.toLowerCase();
          case "group":
            return ConfigService.viewGroupSubSearch.toLowerCase();
          case "processes":
            return ConfigService.viewProcessesSubSearch.toLowerCase();
          default:
            return null;
          }
      }
    }
}

