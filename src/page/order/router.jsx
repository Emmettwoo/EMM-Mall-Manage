import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// 页面子组件
import OrderList from "page/order/index/index.jsx";
import OrderEdit from "page/order/index/edit/index.jsx";

class OrderRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/order/index" component={OrderList} />
                <Route path="/order/edit/:orderNo" component={OrderEdit} />
                <Redirect exact from="/order" to="/order/index" />
            </Switch>
        );
    }
}

export default OrderRouter;