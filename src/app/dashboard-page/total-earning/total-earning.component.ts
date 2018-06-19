import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { JobsService } from '../../core/jobs.service';

@Component({
  selector: 'app-total-earning',
  templateUrl: './total-earning.component.html',
  styleUrls: ['./total-earning.component.css']
})
export class TotalEarningComponent implements OnInit, AfterViewInit {

  chart = [];

  @Input() user;

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
  }

  /*
  * Creates chart
  */
  ngAfterViewInit() {
    this.jobsService.getJobs(this.user.uid).subscribe(data => {
      const companyNames = [];
      const totalEarning = [];

      for (const job of data) {
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
