import MallUtil from "util/mall.jsx";
const _mall = new MallUtil();

class Category {
    // 获取可选分类列表
    getCategoryList(parentId) {
        return _mall.request({
            type: "post",
            url: "/manage/category/get_children.do",
            data: {
                parentId: parentId
            }
        });
    }
}

export default Category;
