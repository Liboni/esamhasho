import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import { Viewer } from '../../../class/viewer';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../class/notification';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  productViewers: Viewer[];
  blogViewers: Viewer[];
  notifications: Notification[];
  notification: Notification;
  constructor(private notificationService: NotificationService, private statisticsService: StatisticsService) {

  }

  ngOnInit() {
    this.statisticsService.GetProductViews().subscribe((results) => {
      this.productViewers = <Viewer[]>results.json();
      let chartname = document.getElementById("productChart");    
      let product = this.productViewers.map(res => res.DataId);
      let id = this.productViewers.map(res => res.ViewId);
      let alldates = this.productViewers.map(res => res.DateCreated.toString().substring(6, res.DateCreated.toString().length-2))
      let productDates = []
      alldates.forEach((res) => {
          let dateInMilliseconds = res.split('+')
          let jsdate = new Date(Number(dateInMilliseconds[0]))
          jsdate.setHours(jsdate.getHours() + Number(dateInMilliseconds[1])/100);
          productDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
      
      })
   
    });
    this.statisticsService.GetBlogViews().subscribe((results) => {
      this.blogViewers = <Viewer[]>results.json();    
    });
    this.notificationService.GetAllNotifications().subscribe((notifications) => {
      this.notifications = <Notification[]>notifications.json();
    });

  }

  lineChart(chartName, data, options) {
    var myLineChart = new Chart(chartName, {
      type: 'line',
      data: data,
      options: options
    });
  }
}
