import React from "react";
import "./index.scss";

class Copyright extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <div className="copyright-content">
                <div className="beian">
                    
                <img className="police_beian_icon" src="https://blog.woohoo.top/img/police_beian.png" alt="police_beian_icon" />
                    <p>
                        <a className="link" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44512202000075">
                            粤公网安备44512202000075号
                        </a>
                    </p>
                    <p>
                        <a className="link" href="http://beian.miit.gov.cn/">
                            粤ICP备20034331号
                        </a>
                    </p>
                </div>
                <p className="copyright">
                    Copyright © 2020 EmmettWoo
                </p>
            </div>
        );
    }
}

export default Copyright;
