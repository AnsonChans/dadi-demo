import "./home.use.scss"
import { SearchBar } from 'antd-mobile';

// 推荐列表
class RecomendBox extends React.Component {

    makeItem() {
        let { recomendData } = this.props;
        return recomendData.map((c) => {
            return (
                <div key={c.id.attributes['im:id']} className="recomendItem">
                    <img src={c['im:image'][1].label} alt="" />
                    <div className="item-name">{c['im:name'].label}</div>
                    <div className="item-subName">{c.category.attributes.label}</div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className={this.props.scrollTop ? "recomendBox hide-top" : "recomendBox"}>
                <div className="recomendTitle">推荐</div>
                <div className="recomendContent">
                    {this.makeItem()}
                </div>
            </div>
        )
    }
}


// app列表
let pageIndex = 0;
class AppListBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showListData: [],
        };
    }


    componentDidMount() {
        this.setShowData();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.appListData) !== JSON.stringify(prevProps.appListData)) {
            this.setState({
                showListData: []
            }, () => {
                pageIndex = 0
                this.setShowData();
            })

        }
    }

    // 构建可见区域
    setShowData() {
        let showListData = this.state.showListData;
        let len = this.props.appListData.length > 10 ? 10 : this.props.appListData.length
        if (this.props.appListData.length > 0 && this.props.appListData.length / 10 > pageIndex) {
            for (let i = 0; i < len; i++) {
                showListData = [...showListData, this.props.appListData[i * (pageIndex + 1)]]
            }
            pageIndex++
            this.setState({
                showListData,
            })
        }

    }

    // 绘制可见区域
    getShowData() {
        return this.state.showListData.map((c, i) => {
            return (
                <div key={i} className="appList-item">
                    <div className="item-idx">{i + 1}</div>
                    <div className="item-img"><img src={c['im:image'][1].label} alt="" /></div>
                    <div className="item-msg">
                        <div className="msg-name">{c['im:name'].label}</div>
                        <div className="msg-type">{c['im:contentType'].attributes.label}</div>
                        <div></div>
                    </div>
                </div>
            )
        })
    }

    render() {
        let { onScroll, scrollTop } = this.props
        let height = scrollTop ? '100%' : 'calc(100% - 214px)'
        return (
            <div onScrollCapture={(e) => {
                // 判断推荐列表是否隐藏
                if (e.target.scrollTop > 200) {
                    onScroll('top');
                } else if (e.target.scrollTop == 0) {
                    onScroll('down');
                }

                if (e.target.scrollTop > pageIndex * 400) {
                    this.setShowData()
                }
            }} className={scrollTop ? 'move-top appListBox' : 'appListBox'} style={{ height: height }}>
                {this.getShowData()}
            </div>
        );
    }
}


let timeout;
// 主组件
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count || 0,
            dataList: []
        }
    }

    componentDidMount() {
        this.setState({
            dataList: this.props.appListData
        })
    }
    // 搜索防抖
    changeInput(e) {
        if (timeout) clearTimeout(timeout);
        let that = this
        let data = e
        timeout = setTimeout(() => {
            that.filterData(data)
        }, 500);
    }

    // 搜索筛选
    filterData(data) {
        const { appListData } = this.props
        let deeData = JSON.parse(JSON.stringify(appListData))
        deeData = deeData.filter(e => {
            return e['im:name'].label.indexOf(data) !== -1
        })
        this.setState({
            dataList: deeData
        })
    }

    render() {
        const { recomendData, onScroll, scrollTop, scrollDown } = this.props
        const { dataList } = this.state
        return (
            <React.Fragment>
                <SearchBar className="homeSearch" onChange={(e) => { this.changeInput(e) }} placeholder="搜尋" />
                <div className="homeBody">
                    <RecomendBox recomendData={recomendData} scrollTop={scrollTop} scrollDown={scrollDown}></RecomendBox>
                    <AppListBox appListData={dataList} onScroll={onScroll} scrollTop={scrollTop} scrollDown={scrollDown}></AppListBox>
                </div>
            </React.Fragment>
        )
    }
}