import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataComponent} from './../data/data.component';
import {OptionComponent} from './../data/data.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DataComponent, OptionComponent]
})
export class SubsectionModule { }
