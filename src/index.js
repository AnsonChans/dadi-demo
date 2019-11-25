import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import HomeModal from "./home/home.modal"
import reducers from '@redux/reducers'
import './index.scss';
class App extends React.Component {
    render() {
        return (
            <HomeModal />
        )
    }
}
const store = createStore(reducers)
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("app"))