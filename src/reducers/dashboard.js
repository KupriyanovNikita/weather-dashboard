const initialState = {
    widgets: [],
    searchQuery: '',
    ready: true
};

export default function dashboard(state = initialState, action) {
    if (action.type === 'SET_SEARCH_QUERY')
        return {...state, searchQuery: action.payload};

    if (action.type === 'DELETE_WIDGET')
        return {...state, widgets: state.widgets.filter(widget => widget !== action.payload)};

    if (action.type === 'ADD_WIDGET')
        return {...state, widgets: [action.payload, ...state.widgets]};

    if (action.type === 'INIT_WIDGETS')
        return {...state, widgets: [...action.payload]};

    if (action.type === 'SET_READY')
        return {...state, ready: action.payload};

    if (action.type === 'SET_ERROR')
        return {...state, error: action.payload};
    return state;
}
