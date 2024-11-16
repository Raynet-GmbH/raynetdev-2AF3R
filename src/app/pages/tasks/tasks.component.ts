import { Component,OnInit  } from '@angular/core';
import 'devextreme/data/odata/store';

@Component({
  templateUrl: 'tasks.component.html'
})

export class TasksComponent implements OnInit {
  dataSource: any;
  priority: any[] = [];
  focusedRowIndex: number = 0;
  constructor() {
    this.dataSource = {
      store: {
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name'
      ]
    };
    const priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];
    this.priority = priority;
  }
  ngOnInit(): void {
    this.dataSource.store.load().then((data: any[]) => {
      this.focusedRowIndex = 0;  
    });
  }
}
