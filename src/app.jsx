import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Link,
} from "react-router-dom";

// 页面子组件
import Layout from "component/layout/index.jsx";
import ErrorPage from "page/error/index.jsx";
import Home from "page/home/index.jsx";
import Login from "page/login/index.jsx";
import UserList from "page/user/index.jsx";
import OrderList from "page/order/index.jsx";
import ProductRouter from "page/product/router.jsx";

class App extends React.Component {

    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />

                    <Redirect exact from="/user" to="/user/index" />
                    <Route path="/user/index" component={UserList} />

                    <Route path="/product*" component={ProductRouter} />

                    <Redirect exact from="/order" to="/order/index" />
                    <Route path="/order" component={OrderList} />

                    <Route component={ErrorPage} />
                </Switch>
            </Layout>
        );

        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={(props) => (LayoutRouter)} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
