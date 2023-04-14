import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { Tab1Page } from './tab1.page';
import { Tab2PageRoutingModule } from '../tab2/tab2-routing.module';
// import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ComponentsModule
    //Importar el componentModule para que funcione 


    // ExploreContainerComponentModule,

  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
