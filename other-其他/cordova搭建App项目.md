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
__ 1、推送服务搭建 __
android webview loadData() loadUrl()