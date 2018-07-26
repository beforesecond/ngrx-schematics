import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { <%= classify(name) %>Effects } from './effects';
import { <%= classify(name) %>Reducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('<%= classify(name) %>', <%= classify(name) %>Reducer),
    EffectsModule.forFeature([<%= classify(name) %>Effects])
  ],
  declarations: [],
  providers: [<%= classify(name) %>Effects]
})
export class <%= classify(name) %>Module { }
