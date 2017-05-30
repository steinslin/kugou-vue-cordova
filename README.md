# kugou-vue-cordova
一个仿照酷狗的app  
修改yourpath/kugou/proxy.js  端口和ip  
修改yourpath/kugou/src/config/server.js  端口和ip  
  
cd kugou  
#安装依赖  
npm install  

#在浏览器中预览 请使用chrome切换成手机模式  
npm run dev  

#如果要编译成app  请安装cordova
#添加平台 android或ios 具体环境搭建google  
cordova platform add android   
#在手机预览 手机连接电脑usb 开启usb调试 连接电脑wifi 
npm run android 
#开启服务器（npm run dev时会自动开启）  
node proxy.js 