#!/usr/bin/env bash
echo "---------- EMM-Mall管理 部署开始 ----------"


echo "1. 清理以前的部署残留"
rm -rf /home/mall/Git/EMM-Mall-Manage/dist
rm -rf /www/wwwroot/mall/admin/*

echo "2. 进入管理项目目录"
cd /home/mall/Git/EMM-Mall-Manage/

echo "3. 切换git到主分支"
git checkout master

echo "4. 更新git的分支信息"
git fetch

echo "5. 拉取git的更新文件"
git pull 

echo "6. 安装nodejs依赖库"
yarn install

echo "7. 编译生成dist文件夹"
yarn run dist_linux

echo "8. 将view部署到Tomcat"
mv /home/mall/Git/EMM-Mall-Manage/dist/*.html /www/wwwroot/mall/admin/
mv /home/mall/Git/EMM-Mall-Manage/dist/*.ico /www/wwwroot/mall/admin/

echo "9. 移出旧的resource文件"
rm -rf /www/wwwroot/mall/resource/js/admin.js
rm -rf /www/wwwroot/mall/resource/js/app.js
rm -rf /www/wwwroot/mall/resource/css/main.css

echo "10. 部署新的resource文件"
cp /home/mall/Git/EMM-Mall-Manage/dist/js/admin.js /www/wwwroot/mall/resource/js/admin.js
cp /home/mall/Git/EMM-Mall-Manage/dist/js/app.js /www/wwwroot/mall/resource/js/app.js
cp /home/mall/Git/EMM-Mall-Manage/dist/css/main.css /www/wwwroot/mall/resource/css/main.css


echo "---------- EMM-Mall管理 部署完成 ----------"
