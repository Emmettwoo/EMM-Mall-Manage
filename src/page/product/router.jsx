import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// 页面子组件
import ProductList from "page/product/index/index.jsx";
import ProductEdit from "page/product/index/edit/index.jsx";

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/category" component={ProductList} />
                <Route path="/product/edit/:pid" component={ProductEdit} />
                <Route path="/product/edit" component={ProductEdit} />
                <Redirect exact from="/product" to="/product/index" />
            </Switch>
        );
    }
}

export default ProductRouter;