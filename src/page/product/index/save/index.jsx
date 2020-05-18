// 业务组件，非通用组件
import React from "react";

import "./index.scss";
import PageTitle from "component/page-title/index.jsx";
import CategorySelector from "../../util/category-selector/index.jsx";
import FileUploader from "util/file-uploader/index.jsx";

import MallUtil from "util/mall.jsx";
import Product from "service/product-service.jsx";
const _mall = new MallUtil();
const _product = new Product();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: 0,
            subImages: [],
        };
    }
    // 分类被选定后的回调函数
    onCategoryChange(categoryId) {
        console.log("分类选中成功: " + categoryId);
    }
    // 商品图片上传成功的回调函数
    onUploadSuccess(res) {
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState(
            {
                subImages: subImages,
            },
            () => {
                console.log(this.state.subImages);
            }
        );
    }
    // 商品图片上传失败的回调函数
    onUploadError(err) {
        _mall.errorTips("上传失败： " + err.message);
    }
    // 删除已上传图片
    onImageDelete(e) {
        // todo: 未对服务器图片进行删除，考虑到富文本编辑器同样对图片进行操作，需后期统一处理方法。
        let index = e.target.getAttribute('index');
        if(window.confirm("确定要删除第" + eval(index+"+"+1) + "张图片吗？")){
            let subImages = this.state.subImages;
            subImages.splice(index, 1);
            this.setState({
                subImages: subImages
            });
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品名称
                        </label>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="请输入商品名称"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品描述
                        </label>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="请输入商品描述"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品类别
                        </label>
                        <CategorySelector
                            onCategoryChange={(categoryId) =>
                                this.onCategoryChange(categoryId)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品价格
                        </label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="请输入商品价格"
                                    aria-describedby="basic-addon2"
                                />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品库存
                        </label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="请输入商品库存"
                                    aria-describedby="basic-addon2"
                                />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品图片
                        </label>
                        <div className="col-md-10">
                            {this.state.subImages.length
                                ? this.state.subImages.map((image, index) => (
                                      <div className="image-content">
                                          <img
                                              src={image.url}
                                              alt={image.uri}
                                              key={index}
                                          />
                                          <i
                                              className="fa fa-close"
                                              index={index}
                                              onClick={(e) =>
                                                  this.onImageDelete(e)
                                              }
                                          ></i>
                                      </div>
                                  ))
                                : null}
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-content">
                            <FileUploader
                                onSuccess={(res) => this.onUploadSuccess(res)}
                                onError={(err) => this.onUploadError(err)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品详情
                        </label>
                        <div className="col-md-10">editor;</div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary">
                                保存修改
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductSave;
