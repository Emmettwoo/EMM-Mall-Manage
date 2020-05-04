import MallUtil from "util/mall.jsx";
const _mall = new MallUtil();

class Statistic {
    // 主页数据统计
    getHomeCount() {
        return _mall.request({
            url: "/manage/statistic/base_count.do"
        });
    }
}

export default Statistic;
