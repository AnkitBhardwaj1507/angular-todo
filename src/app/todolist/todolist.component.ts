import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {

  localItem: string|null = "";
  

  taskArray = [{ taskName: 'Brush teeth', isCompleted: false, isEdit: false }];
  

  constructor() {
    this.localItem = localStorage.getItem("todos");
    if(this.localItem == null) {
      this.taskArray = [];
    }else {
      this.taskArray = JSON.parse(this.localItem);
    }
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEdit: false
    });
    localStorage.setItem("todos", JSON.stringify(this.taskArray));

    form.reset();
  }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(this.taskArray));
  }

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    localStorage.setItem("todos", JSON.stringify(this.taskArray));
  }

  onEdit(index: number) {
    this.taskArray.forEach(task => {
      task.isEdit = false;
    })
    localStorage.setItem("todos", JSON.stringify(this.taskArray));
    this.taskArray[index].isEdit = true;
  }

  onUpdate(index: number) {
    this.taskArray[index].isEdit = false;
    localStorage.setItem("todos", JSON.stringify(this.taskArray));
  }
}
