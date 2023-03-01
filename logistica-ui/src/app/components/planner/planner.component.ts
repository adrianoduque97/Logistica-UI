import { Component } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {

  public changingChart = {
    title: 'Changing Chart',
    type: ChartType.Gantt,
    columns: ['TaskId', 'TaskName', 'Resource','startDate','endDate', 'duration','percent', 'dep'],
    data: [
      ['2014Spring', 'Spring 2014', 'spring',
         new Date(2014, 2, 22), new Date(2014, 5, 20),10, 90, null],
         ['2014Summer', 'Summer 2014', 'summer',
         new Date(2014, 5, 21),new Date(2014, 8, 20), 10, 90, null],
    ],
    options:{
      with: 1000
      
    }
  };

}
