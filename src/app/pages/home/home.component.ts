import { Component, OnInit } from '@angular/core';
import * as chartData from '../../shared/data/chart/chart';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexLegend,
  ApexMarkers,
  ApexYAxis,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  markers: ApexMarkers
  yaxis: ApexYAxis
  grid: ApexGrid;
  fill: ApexFill;
  legend: ApexLegend
  tooltip: ApexTooltip
  colors: any
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public chartOptions: Partial<ChartOptions> | any;

  public greeting!: string;
  public time: any;
  public today = new Date();
  public currentHour = this.today.getHours();
  public m = this.today.getMinutes();
  public ampm = this.currentHour >= 12 ? 'PM' : 'AM';
  public date!: { year: number, month: number };

  constructor() {
    this.chartOptions = chartData.currentSales;
    //this.chartOptions = chartData.marketValue;
  }

  ngOnInit(): void {
    if (this.currentHour >= 0 && this.currentHour < 4) {
      this.greeting = 'Good Night'
    } else if (this.currentHour >= 4 && this.currentHour < 12) {
      this.greeting = 'Good Morning'
    } else if (this.currentHour >= 12 && this.currentHour < 16) {
      this.greeting = 'Good Afternoon'
    } else {
      this.greeting = 'Good Evening'
    }
    this.startTime();
  }

  startTime() {
    this.currentHour = this.currentHour % 12;
    this.currentHour = this.currentHour ? this.currentHour : 12;
    this.m = this.checkTime(this.m);
    this.time = this.currentHour + ":" + this.m + ' ' + this.ampm;
  }

  checkTime(i: any) {
    if (i < 10) { i = "0" + i }  // add zero in front of numbers < 10
    return i;
  }
}
