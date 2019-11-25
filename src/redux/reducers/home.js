import recomendData from './recomendData.json'
import appListData from './appListData.json'
export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case 'scrollTop': return Object.assign({}, state, {
            scrollTop: true,
        })
        case 'scrollDown': return Object.assign({}, state, {
            scrollTop: false,
        })
        default: return state;
    }
}

const initialState = {
    recomendData,
    appListData
}