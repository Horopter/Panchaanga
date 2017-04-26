import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PanchaangaService } from '../../services/Panchaanga.service';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})

export class DetailsPage {

    SelectedDate : Object;
    Details : Object;
    Keys : Array<Object>;
    constructor(public navCtrl: NavController,public navParams : NavParams,public panchaangaService : PanchaangaService) {
        this.SelectedDate = this.navParams.get('selectedDate');
        this.Details = this.panchaangaService.getPanchaangaDetails(this.SelectedDate);
        this.Keys = Object.keys(this.Details);
        console.log(this.Keys);
    }
}