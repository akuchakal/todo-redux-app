import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAction, EliminarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  chkField: FormControl;
  txtInput: FormControl;
  editando: boolean;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkField.valueChanges.subscribe( () => {
      const accion = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });

  }
  editar(){
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.valid && this.txtInput.value !== this.todo.texto) {
      //TODO: Acerel dsipatch
      const accion = new EditarTodoAction(this.todo.id,this.txtInput.value);
      this.store.dispatch(accion);
    } else {
      this.txtInput.setValue(this.todo.texto);
    }
  }

  eliminarTodo() {
    const accion = new EliminarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }

}
