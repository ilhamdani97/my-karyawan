interface AppReducerState {
    token: string;
}
export type AppReducerAction = 
| { type: 'SET_TOKEN' ; token: string }

const defaultState = {
    token: '',
} as AppReducerState;

export default function authReducer(
    state = defaultState,
    action: AppReducerAction
) {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                dataMining: action.token
            }
        default:
            return state;
    }
}