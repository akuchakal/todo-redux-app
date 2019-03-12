import * as fromFiltro from './filter.actions';

const estadoInicial: fromFiltro.filtrosValidos = "todos";

export function filtrosReducer(state = estadoInicial, action: fromFiltro.Acciones): fromFiltro.filtrosValidos {
    switch (action.type) {
        case fromFiltro.SET_FILTRO:
            return action.filtro;
            break;
    
        default:
            return state;
            break;
    }
}