import React from "react";

import RcPagination from "rc-pagination";
import "rc-pagination/dist/rc-pagination.min.css";

// todo: 将导航栏居中显示
class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row center">
                <div className="col-md-12">
                    <RcPagination
                        {...this.props}
                        hideOnSinglePage
                        showQuickJumper
                    />
                </div>
            </div>
        );
    }
}

export default Pagination;