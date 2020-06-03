// 业务组件，非通用组件
import React from "react";

class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: "",
        };
    }

    // 当值改变时实时更新到state
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }
    // 调用父组件传递过来的搜索函数
    onSearch() {
        this.props.onSearch(this.state.orderNo);
    }
    // 输入框内回车事件
    onSearchKeywordKeyup(e) {
        if(e.keyCode === 13) {
            this.onSearch();
        }
    }

    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select
                                className="form-control"
                            >
                                <option value="productId">按订单号查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="orderNo"
                                placeholder="订单号"
                                onChange={(e) => this.onValueChange(e)}
                                onKeyUp={(e) => this.onSearchKeywordKeyup(e)}
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => this.onSearch(e)}
                        >
                            搜索
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListSearch;
