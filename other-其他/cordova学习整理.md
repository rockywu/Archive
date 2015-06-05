### install cordova #现在cordova由node.js管理使用npm安装

```
$ sudo npm install -g cordova
```

##### 添加android & iOS平台

```
$ cordova platform android
$ cordova platform ios
```

##### 修改AppName

__ 1、IOS修改方法 __

```
//platforms/ios/fxapp/fxapp-Info.plist 添加key
<key>CFBundleDisplayName</key>
<string>分销平台</string>
```
__ 2、android修改方法 __

```
// platforms/android/res/values/strings.xml 修改app_name
<?xml version='1.0' encoding='utf-8'?>
<resources>
<string name="app_name">分销平台</string>
</resources>
```

### android推送服务搭建

__ 仓库clone __

```
$ git clone git@gitlab.corp.anjuke.com:_mobile-api/amtp.git
```

__ 启动服务 依赖java 1.7 jdk包 __

```
$ cd broker
$ nohup mvn compile exec:java -Dexec.mainClass="com.anjuke.mobile.amtp.App" > /tmp/com.anjuke.mobile.amtp.App.log 2>&1 &
```

__ 修改配置 __

```
$ vim broker/src/main/resources/amtp.properties
```


mvn compile exec:java -Dexec.mainClass="com.anjuke.mobile.amtp.App"

curl -v -d '{"toDeviceId":"xxxx","toUserId":123,"toAppName":"i-xxx","data":{"msgType":"chat","body":{"action":"has_message","target":"user"},"appName":"i-xxx"}}' 127.0.0.1:8888/message

@android平台创建
@ios平台创建

### android 推送Server 搭建

__ Application  添加 BroadcastReceiver监听 __

```
<receiver android:name=".FxReceiver">
     <intent-filter>
          <action android:name="socket.service.action.receive_data" />
     </intent-filter>
</receiver>
```
__ 推送整个过程 __

__ 约定推送信息格式 __

```
{
     "toDeviceId": "Bx", //用户驱动id
     "toUserId": 1, //用户注册id
     "toAppName": "i-ajk", //AppName
     "data": {
           "msgType": "fxmsg", //消息类型
          "body": {
               "title" : "", //标题
               "content" : "", //内容
               "url" : "", //需要跳转到得指定链接
          },
     "appName": "i-ajk" //AppName
     }
}
```