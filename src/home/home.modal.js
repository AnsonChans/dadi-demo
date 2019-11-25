import { connect } from 'react-redux'
import Home from './home.jsx'
import actions from "@redux/actions/actions";

const mapStateToProps = state => {
    const data = state.homeReducer
    return {
        recomendData: data.recomendData.feed.entry,
        appListData: data.appListData.feed.entry,
        scrollTop: data.scrollTop,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onScroll: (type) => {
            type == 'top' ? dispatch(actions.scrollTop) : dispatch(actions.scrollDown)
        }
    }
}

const HomeModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default HomeModal;