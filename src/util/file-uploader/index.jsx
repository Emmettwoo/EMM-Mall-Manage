import React from "react";
import FileUpload from "./FileUpload.jsx";

class FileUploader extends React.Component {

    render() {
        const options={
            baseUrl: "/manage/product/upload_origin_image.do",
            fileFieldName: "file",
            dataType: "json",
            chooseAndUpload: true,
            uploadSuccess: (res) => {
                console.log("res: " + res);
            },
            uploadError: (err) => {
                console.log("err: " + err);
            }
        }

        return (
            <FileUpload options={options}>
                <button className="btn btn-default" ref="chooseAndUpload">choose</button>
            </FileUpload>
        )
    }
}

export default FileUploader;