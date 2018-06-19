import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { JobsService } from '../../core/jobs.service';

@Component({
  selector: 'app-all-data-chart',
  templateUrl: './all-data-chart.component.html',
  styleUrls: ['./all-data-chart.component.css']
})
export class AllDataChartComponent implements OnInit {

  chart = [];

  @Input() user;

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.jobsService.getJobs(this.user.uid).subscribe(data => {
      let companyNames = [];
      let salary = [];
      let signingBonus = [];
      let livingCost = [];

      for (let job of data) {
        companyNames.push(job['companyName']);
        salary.push(job['salary']);
        signingBonus.push(job['signingBonus']);
        livingCost.push(job['livingCost']);
      }

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: companyNames,   // x-axis
          datasets: [
            {
              label: 'Salary (Monthly)',
              backgroundColor: '#9BE1DF',
              borderColor: '#8ECDC9',
              borderWidth: 1,
              data: salary,
              fill: false
            },
            {
              label: 'Signing Bonus',
              backgroundColor: '#FBF099',
              borderColor: '#F7EA90',
              borderWidth: 1,
              data: signingBonus,
              fill: false
            },
            {
              label: 'Living Cost (Monthly)',
              backgroundColor: '#FF9DBE',
              borderColor: '#F28CAC',
              borderWidth: 1,
              data: livingCost,
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
            text: 'Company and Information Associated with them'
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
