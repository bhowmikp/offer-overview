import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { JobsService } from '../../core/jobs.service';

@Component({
  selector: 'app-overall-earning',
  templateUrl: './overall-earning.component.html',
  styleUrls: ['./overall-earning.component.css']
})
export class OverallEarningComponent implements OnInit {
  chart = [];

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.jobsService.getJobs('SOYzrrmi7revQ6TO5SG7rC8m4mE2').subscribe(data => {
      let companyNames = [];
      let takeHomeEarning = [];
      let calculateTaxMonthly;
      let happinessMoney;
      let prestigeMoney;

      for (let job of data) {
        companyNames.push(job['companyName']);
        calculateTaxMonthly = (((job['salary'] * 12) + job['signingBonus']) * (job['tax'] / 100)) / 12;
        happinessMoney = (5 - job['happiness']) * 100;
        prestigeMoney = (5 - job['prestige']) * 100;
        takeHomeEarning.push(job['salary'] + (job['signingBonus'] / job['jobTenure']) + happinessMoney + prestigeMoney - job['livingCost'] - calculateTaxMonthly);
      }

      this.chart = new Chart('canvas3', {
        type: 'bar',
        data: {
          labels: companyNames,   // x-axis
          datasets: [
            {
              label: 'Total Home Earning (Monthly)',
              backgroundColor: '#9BE1DF',
              borderColor: '#8ECDC9',
              borderWidth: 1,
              data: takeHomeEarning,
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
