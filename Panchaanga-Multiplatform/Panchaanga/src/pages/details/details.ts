import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PanchaangaService } from '../../services/Panchaanga.service';
import { PanchaangaDay } from '../../services/Panchaanga.service';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})

export class DetailsPage {

    SelectedDate : Object;
    Details : Object;
    Keys : Array<Object>;
    PanchaangaDays : Array<string>;
    MonthNamesList : Array<string>;

    constructor(public navCtrl: NavController,public navParams : NavParams,public panchaangaService : PanchaangaService) {
        this.SelectedDate = this.navParams.get('selectedDate');
        this.Details = this.panchaangaService.getPanchaangaDetails(this.SelectedDate);
        if(this.Details==null)
        {
            this.Details = [];
            this.Details["Alert"] = "No information found";
        }
        delete (this.Details as PanchaangaDay).MarkedDay;
        this.Keys = Object.keys(this.Details);
        this.PanchaangaDays = ["Shradhdhaabhava","Prathipaada","Dwiteeya","Trutheeya","Chaturthi","Panchami",
        "Shashti","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwaadashi","Trayodashi","Chaturdashi","Poornima","Amavaasya"];
        this.MonthNamesList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    }

    getValueofKey(key:string)
    {
        var day = this.Details as PanchaangaDay;
        switch(key){
            case "Thithi":
                if(day.Paksha==="Krishna" && day.Thithi===15)
                    return this.PanchaangaDays[16];
                else
                    return this.PanchaangaDays[day.Thithi];
            case "Month":
                return this.MonthNamesList[day.Month-1];
            default:
                return day[key];

        }
    }

    getNameofKey(key : string)
    {
        switch(key){
            case "Date" : return "Gregorian Date";
            case "Month" : return "Gregorian Month";
            case "Year" : return "Gregorian Year";
            case "Shalivahana_Gatha_Shake" : return "Shaalivaahana Gatha Shaka";
            case "Siddhantha" : return "Panchaanga Siddhantha";
            case "Samvatsara" : return "Samvatsara";
            case "Aayana" : return "Aayana";
            case "Ruthu" : return "Ruthu";
            case "Maasa" : return "Maasa";
            case "Paksha" : return "Paksha";
            case "Vaara" : return "Vaara";
            case "Thithi" : return "Thithi";
            case "Thithi_End" : return "Thithi End";
            case "Nakshtra" : return "Nakshatra";
            case "Nakshatra_End" : return "Nakshatra End";
            case "Yoga" : return "Yoga";
            case "Yoga_End" : return "Yoga End";
            case "Karana" : return "Karana";
            case "Karana_End" : return "Karana End";
            case "Shraadhdha_Thithi" : return "Shraadhdha Thithi";
            case "Alert" : return "Alert";
        }
    }

}