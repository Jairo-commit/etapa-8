import { CommonModule } from '@angular/common';
import { Component, computed, effect, Injector, inject, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([]);

  filter =signal<'all' | 'completed' | 'pending'>('all');

  taskByFilter= computed(()=>{
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'completed'){
      return this.tasks().filter(task => task.completed);
    }else if(filter === 'pending'){
      return this.tasks().filter(task => !task.completed);
    }else{
      return this.tasks();
    }
  });

  newTaskCtrl = new FormControl('', {nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  injector = inject(Injector);

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage) as Task[];
      this.tasks.set(tasks);
    }

    this.trackTask();
  }

  trackTask(){
    effect(()=>{
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector});
  }

  changeHandler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if(value !==''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
    
  };

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]); //Agrega un nuevo elemento al final de la lista
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position != index));
  }

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index){
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

  updateTaskEditingMode(index: number){
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index){
          return{
            ...task,
            editing: !task.completed
          }
        }
        return {
          ...task,
          editing: false,
        }
      })
    })
  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if(position === index){
          return{
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }

  changeFilter(filter: 'all' | 'completed' | 'pending'){
    this.filter.set(filter);
  }
}
