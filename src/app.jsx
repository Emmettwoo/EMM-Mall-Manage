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

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route
                        path="/"
                        render={(props) => (
                            <Layout>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route path="/product" component={Home} />
                                    <Route
                                        path="/product-category"
                                        component={Home}
                                    />
                                    <Route path="/order" component={Home} />
                                    <Route path="/user" component={Home} />
                                    <Route component={ErrorPage} />
                                </Switch>
                            </Layout>
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
