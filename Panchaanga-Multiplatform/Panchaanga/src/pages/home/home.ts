import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { PanchaangaService } from '../../services/Panchaanga.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  SanskrutamYear : string;
  PanchaangaService : PanchaangaService;
  DayNamesList : Array<string>;
  GridLayout : Array<Array<Object>>;
  DaysList : Array<Object>;
  Grid : Array<Array<Object>>;
  CurrentDate : Date;
  SelectedDate : Date;
  MonthNamesList : Array<string>;
  RequestedMonth : number;
  RequestedYear : number;
  disabledForward : boolean;
  disabledBack : boolean;

  constructor(public navCtrl: NavController,private panchaangaService : PanchaangaService,private navParams: NavParams) {
    this.PanchaangaService = panchaangaService;
    this.SanskrutamYear = this.PanchaangaService.getCurrentSanskrutamYear();
    this.DayNamesList = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    this.MonthNamesList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    this.GridLayout = [];
    this.CurrentDate = new Date();
    this.disabledBack = false;
    this.disabledForward = false;
    this.RequestedMonth = this.CurrentDate.getMonth()+1;
    this.RequestedYear = this.CurrentDate.getFullYear();
    this.renderCalendar(this.RequestedMonth,this.RequestedYear);
  }
            renderCalendar(month : number, year: number)
            {
              this.getDatesForGregorianMonth(month, year);
              this.getGrid();
            }

            getDatesForGregorianMonth(month : number, year : number) : void
            {
                this.DaysList =  this.PanchaangaService.getDatesForGregorianMonthYear(month,year);
            }

            getGrid()
            {
              this.Grid = [];
              this.Grid[0] = [];
              this.Grid[0].push(this.DaysList[0]);
              var i = 1;
              for(var j=0;j<5;)
              { 
                  while(this.DaysList[i] && this.DaysList[i][5] && this.DaysList[i][5]!==0 && i<this.DaysList.length)
                  {
                    this.Grid[j].push(this.DaysList[i]);
                    i++;
                  }
                  if(!this.Grid[j+1]) this.Grid[j+1] = [];
                    this.Grid[j+1].push(this.DaysList[i++]);
                  j++;
              }
              for(var k =0; k<5;k++)
              {
                var len = this.Grid[k].length;
                for(var i=0;i < 7-len;i++)
                {
                  if(k<4)
                    this.Grid[k].unshift(null);
                  else 
                    this.Grid[k].push(null);
                }
              }
            }

            displayDate(day : Object)
            {
                if(day === null || day === undefined)
                    return "";
                else
                  return day[0].toString();
            }

            nextMonth()
            {
              if(this.RequestedMonth==12)
              {
                this.RequestedMonth = 1;
                this.RequestedYear = this.RequestedYear + 1;
              }
              else{
                this.RequestedMonth = this.RequestedMonth + 1;
              }
              this.watchButtons();
              this.renderCalendar(this.RequestedMonth,this.RequestedYear);
            }

            prevMonth()
            {
                if(this.RequestedMonth == 1)
                {
                    this.RequestedMonth = 12;
                    this.RequestedYear = this.RequestedYear - 1;
                }
                else{
                  this.RequestedMonth = this.RequestedMonth - 1;
                }
                this.watchButtons();
                this.renderCalendar(this.RequestedMonth,this.RequestedYear);
            }

            watchButtons()
            {
                if(this.RequestedMonth == 3 && this.RequestedYear == 2017)
                {
                  this.disabledBack = true;
                }
                else{
                  this.disabledBack = false;
                }
                if(this.RequestedMonth == 3 && this.RequestedYear == 2018)
                {
                    this.disabledForward = true;
                }
                else
                {
                    this.disabledForward = false;
                }                
            }
            onSelectDate(date : Date)
            {    this.navCtrl.push(DetailsPage, {
                    selectedDate: date 
                     });
            }
}
