import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { JobsService } from '../../core/jobs.service';

@Component({
  selector: 'app-total-earning',
  templateUrl: './total-earning.component.html',
  styleUrls: ['./total-earning.component.css']
})
export class TotalEarningComponent implements OnInit {

  chart = [];

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.jobsService.getJobs('SOYzrrmi7revQ6TO5SG7rC8m4mE2').subscribe(data => {
      let companyNames = [];
      let totalEarning = [];

      for (let job of data) {
        companyNames.push(job['companyName']);
        totalEarning.push(job['salary'] + Math.floor(job['signingBonus'] / job['jobTenure']));
      }

      this.chart = new Chart('canvas1', {
        type: 'bar',
        data: {
          labels: companyNames,   // x-axis
          datasets: [
            {
              label: 'Total Earning (Monthly)',
              backgroundColor: '#9BE1DF',
              borderColor: '#8ECDC9',
              borderWidth: 1,
              data: totalEarning,
              fill: false
            },
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true,
            position: 'right',
          },
          title: {
            display: true,
            text: 'Total Earning per Month'
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Company',
              },
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Money ($)',
              },
            }]
          }
        }
      });
    });

  }

}
