import React from "react";
import "./theme.css";

// 页面子组件
import NavTop from "component/nav-top/index.jsx";
import NavSide from "component/nav-side/index.jsx";

class Layout extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div id="wrapper">
                <NavTop />
                <NavSide />
                {this.props.children}
            </div>
        );
    }
}

export default Layout;