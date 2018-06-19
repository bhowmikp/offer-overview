import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { JobsService } from '../../core/jobs.service';

@Component({
  selector: 'app-overall-earning',
  templateUrl: './overall-earning.component.html',
  styleUrls: ['./overall-earning.component.css']
})
export class OverallEarningComponent implements OnInit, AfterViewInit {
  chart = [];

  @Input() user;

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.jobsService.getJobs(this.user.uid).subscribe(data => {
      const companyNames = [];
      const takeHomeEarning = [];
      let calculateTaxMonthly: number;
      let happinessMoney: number;
      let prestigeMoney: number;

      for (const job of data) {
        companyNames.push(job['companyName']);
        calculateTaxMonthly = ((
          (job['salary'] * 12) + job['signingBonus']) *
          (job['tax'] / 100)) / 12;
        happinessMoney = (5 - job['happiness']) * 100;
        prestigeMoney = (5 - job['prestige']) * 100;
        takeHomeEarning.push(
          job['salary'] + (job['signingBonus'] / job['jobTenure']) +
          happinessMoney + prestigeMoney - job['livingCost'] - calculateTaxMonthly);
      }

      this.chart = new Chart('canvas3', {
        type: 'bar',
        data: {
          labels: companyNames,   // x-axis
          datasets: [
            {
              label: 'Overall Earning (Monthly)',
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
            text: 'Overall Earning per Month'
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
