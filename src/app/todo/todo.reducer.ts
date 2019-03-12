import * as fromTodo from './todo.actions';
import { Todo } from './models/todo.model';
import { from } from 'rxjs';

const task1 = new Todo('Vencer a Thanos');
const task2 = new Todo('Salvara el fuking mundo!');
const task3 = new Todo('Robar el traje de IronMan');

task2.completado = true;

const estadoInicial: Todo[] = [
    task1,
    task2,
    task3
];

export function todoReducer(state = estadoInicial, action:fromTodo.Acciones): Todo[] {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.text);
            return [...state, todo ];//operador spread
            break;
        case fromTodo.TOGGLE_TODO:
            return state.map( todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });
            break;
        case fromTodo.TOGGLE_ALL_TODO:
            return state.map( todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                }
            });
            break;
        case fromTodo.EDITAR_TODO:
            return state.map( todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });
        case fromTodo.ELIMINAR_TODO:
            return state.filter( todoEdit => todoEdit.id !== action.id );
            break;
        case fromTodo.ELIMINAR_TODOS_COMPLETADOS:
            return state.filter(todoEdit => !todoEdit.completado);
            break;
        default:
            return state;
            break;
    }
}