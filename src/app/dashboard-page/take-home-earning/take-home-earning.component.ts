import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { JobsService } from '../../core/jobs.service';

@Component({
  selector: 'app-take-home-earning',
  templateUrl: './take-home-earning.component.html',
  styleUrls: ['./take-home-earning.component.css']
})
export class TakeHomeEarningComponent implements OnInit {
  chart = [];

  @Input() user;

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.jobsService.getJobs(this.user.uid).subscribe(data => {
      let companyNames = [];
      let takeHomeEarning = [];
      let calculateTaxMonthly;

      for (let job of data) {
        companyNames.push(job['companyName']);
        calculateTaxMonthly = (((job['salary'] * 12) + job['signingBonus']) * (job['tax'] / 100)) / 12;
        takeHomeEarning.push(job['salary'] + (job['signingBonus'] / job['jobTenure']) - job['livingCost'] - calculateTaxMonthly);
      }

      this.chart = new Chart('canvas2', {
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
            text: 'Take Home Earning per Month'
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
