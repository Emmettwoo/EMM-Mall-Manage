import MallUtil from "util/mall.jsx";
const _mall = new MallUtil();

class Category {
    // 获取父子分类列表
    getCategoryList(parentId) {
        return _mall.request({
            type: "post",
            url: "/manage/category/get_children.do",
            data: {
                parentId: parentId
            }
        });
    }

    // 获取子孙分类列表
    getCatgeoryOffspring(parentId) {
        return _mall.request({
            type: "post",
            url: "/manage/category/get_offspring.do",
            data: {
                parentId: parentId
            }
        });
    }

    // 更新品类的名称
    updateCategoryName(categoryId, categoryName) {
        return _mall.request({
            type: "post",
            url: "/manage/category/update.do",
            data: {
                categoryId: categoryId,
                categoryName: categoryName
            }
        });
    }

    // 新增品类的信息
    addCategory(categoryName, parentId) {
        return _mall.request({
            type: "post",
            url: "/manage/category/add.do",
            data: {
                categoryName: categoryName, 
                parentId: parentId
            }
        });
    }

    // 删除某一品类
    deleteCategory(categoryId) {
        return _mall.request({
            type: "post",
            url: "/manage/category/delete.do",
            data: {
                categoryId: categoryId
            }
        });
    }
}

export default Category;
