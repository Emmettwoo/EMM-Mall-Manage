import React from "react";
import PageTitle from "component/page-title/index.jsx";
import { Link } from "react-router-dom";


class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="出错啦！" />
                <div className="row">
                    <div className="col-md-12">
                        找不到目标页面，
                        <Link to="/">点击返回主页</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorPage;
