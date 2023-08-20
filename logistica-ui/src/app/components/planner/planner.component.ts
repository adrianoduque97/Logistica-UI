import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  myWidht = 700;

  constructor(public navService: NavbarService ){}

  ngOnInit(): void {
    this.navService.show();
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public changingChart = {
    title: 'Changing Chart',
    type: ChartType.Gantt,
    columns: ['TaskId', 'TaskName', 'Resource','startDate','endDate', 'duration','percent', 'dep'],
    data: [
      ['2014Spring', 'Spring 2014', 'spring',
         new Date(2014, 2, 22), new Date(2014, 5, 20),10, 90, null],
         ['2014Summer', 'Summer 2014', 'summer',
         new Date(2014, 5, 21),new Date(2014, 8, 20), 10, 90, null],
         ['2016Test', 'Test 2014', 'summer',
         new Date(2015, 7, 21),new Date(2015, 10, 20), 10, 90, null],
         ['2019Test', 'Test 2018', 'summer',
         new Date(2018, 7, 21),new Date(2018, 11, 20), 10, 90, null]
    ],
    options:{
      'with': 10000
      
    }
  };

}
