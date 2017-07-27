import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SubsectionComponent } from './subsection/subsection.component';
import { ListComponent } from './list/list.component';
import { DataComponent } from './data/data.component';
import { OptionComponent } from './option/option.component';

// Import services
import {ConfigService} from './config.service';
import {JsonService} from './json.service';
import {ChmodService} from './chmod.service';
import {OptionBuilderService} from './option-builder.service';

@NgModule({
  declarations: [
    AppComponent,
    SubsectionComponent,
    ListComponent,
    DataComponent,
    OptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [JsonService, ChmodService, OptionBuilderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
