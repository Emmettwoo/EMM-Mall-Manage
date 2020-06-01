import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// 页面子组件
import ProductList from "page/product/index/index.jsx";
import ProductEdit from "page/product/index/edit/index.jsx";
import CategoryList from "page/product/category/index.jsx";
import CategoryAdd from "page/product/category/add/index.jsx";

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product-category/add" component={CategoryAdd} />
                <Route path="/product-category/:categoryId" component={CategoryList} />
                <Route path="/product-category" component={CategoryList} />
                <Route path="/product/edit/:pid" component={ProductEdit} />
                <Route path="/product/edit" component={ProductEdit} />
                <Redirect exact from="/product" to="/product/index" />
            </Switch>
        );
    }
}

export default ProductRouter;