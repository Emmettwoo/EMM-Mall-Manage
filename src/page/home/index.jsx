import React from "react";
import PageTitle from "component/page-title/index.jsx";

class Home extends React.Component {
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="后台主页" />
                <div className="col-md-12">test;</div>
            </div>
        );
    }
}

export default Home;
