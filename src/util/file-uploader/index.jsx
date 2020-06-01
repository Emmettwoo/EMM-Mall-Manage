import React from "react";
import FileUpload from "./FileUpload.jsx";

class FileUploader extends React.Component {

    render() {
        const options={
            baseUrl: "/manage/product/upload_origin_image.do",
            fileFieldName: "file",
            dataType: "json",
            chooseAndUpload: true,
            uploadSuccess: (res) => {this.props.onSuccess(res.data)},
            uploadError: this.props.onError
        }

        return (
            <FileUpload options={options}>
                <button className="btn btn-default" ref="chooseAndUpload">上传</button>
            </FileUpload>
        )
    }
}

export default FileUploader;