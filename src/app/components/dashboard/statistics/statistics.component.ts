import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import { ViewerResponse } from '../../../class/viewer';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../class/notification';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  productViewers: ViewerResponse[];
  blogViewers: ViewerResponse[];
  notifications: Notification[];
  notification: Notification;
  chart = [];
  backgroundColor = [
    'rgba(0, 178, 117, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)'
  ];
  borderColor = [
    'rgba(0, 178, 117,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];
  barOptions = {
    scales: {
      xAxes: [{
        gridLines: {
          offsetGridLines: true
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  lineOptions= {
    scales: {
        yAxes: [{
            stacked: true
        }]
    }
};
  constructor(private notificationService: NotificationService, private statisticsService: StatisticsService) {

  }

  ngOnInit() {
    this.statisticsService.GetProductViews().subscribe((results) => {
      this.productViewers = <ViewerResponse[]>results.json();
      let chartname = document.getElementById("productChart");
      let productlineChart = document.getElementById("productlineChart");
      let country = this.productViewers.map(res => res.Country);
      let ip = this.productViewers.map(res => res.IpAddress);
      let names = this.productViewers.map(res => res.Name);
      let distinctNames = names.filter((x, i, a) => x && a.indexOf(x) === i);
      let alldates = this.productViewers.map(res => new Date(Number(res.DateCreated.toString().substring(6, res.DateCreated.toString().length - 2).split('+')[0])).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
      let data = [];
      let dataLine = [];
      distinctNames.forEach((name) => {
        var count = names.filter(res => res == name).length;
        data.push(count);
      });
      let productDates = [];
      alldates.forEach((res) => {   
          if(productDates.indexOf(res)===-1){
            productDates.push(res); 
             let count = alldates.filter(date => date === res).length;
             dataLine.push(count);            
          } 
      });     
          
      this.chart = new Chart(chartname, {
        type: 'bar',
        data: {
          labels: distinctNames,
          datasets: [{
            label: 'Number of product views',
            data: data,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1
          }]
        },
        options: this.barOptions
      });

      this.chart = new Chart(productlineChart, {
        type: 'line',
        data: {
          labels: productDates,
          datasets: [{
            label: 'Total product views',
            data: dataLine, 
            backgroundColor: ['rgba(0, 178, 117,0.2)'],
            borderColor: ['rgba(0, 178, 117,1)'],   
            borderWidth: 1
          }]
        },
        options: this.lineOptions
      });

    });
    this.statisticsService.GetBlogViews().subscribe((results) => {
      this.blogViewers = <ViewerResponse[]>results.json();
      let chartname = document.getElementById("blogChart");
      let country = this.blogViewers.map(res => res.Country);
      let ip = this.blogViewers.map(res => res.IpAddress);
      let names = this.blogViewers.map(res => res.Name);
      let distinctNames = names.filter((x, i, a) => x && a.indexOf(x) === i);
      let data = []
      distinctNames.forEach((name) => {
        var count = names.filter(res => res == name).length;
        data.push(count);
      });

      this.chart = new Chart(chartname, {
        type: 'bar',
        data: {
          labels: distinctNames,
          datasets: [{
            label: 'Number of blog views',
            data: data,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1
          }]
        },
        options: this.barOptions
      });
    });



    this.statisticsService.GetBlogViews().subscribe((results) => {
      this.blogViewers = <ViewerResponse[]>results.json();
    });
    this.notificationService.GetAllNotifications().subscribe((notifications) => {
      this.notifications = <Notification[]>notifications.json();
    });

  }
}
