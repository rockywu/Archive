## 版本控制器

扩展basket.js 目的：解决现有basket.js，在v2中简化使用。

版本控制器伪码:

    structure Data {
        stamp : 0,  //被提取时间
        expire : 0, //过期时间
        key : 'keyname', //文件名
        execute : true, //是否需要执行
        url : 'url', //资源地址
        version : 'verion', //版本信息,便于资源更新
        data : data //资源内容
    }
    
    /**
     * 判断版本控制
     */
    Class Version
    {
        Methods
            GetRealSource(url)
            {
                match = GetUrlMatch(url);
                data = Storage.get(match.key);
                If (data.version === match.version) {
                    updateExpire(key);//更新过期时间
                    return Data;
                }
                Else
                {
                    Storage.remove(key);
                    return Basket.GetUrl(data);
                }
                
            }
            
            GetUrlMatch(url)
            {
                return {
                    url : url,
                    key : key,
                    version : version
                }
            }
     
    }
    
    /**
     * Basket 外部组件
     */
    Class Basket
    {
        Methods
            GetUrl (url)
            {
                ...
                return Data;
            }
    
    }
    
    /**
     * Storage 存储器
     */
     Class Storage
     {
         Methods 
             Object get(key) 
             {
                 return Object;
             }
             
             vold set(key, value)
             {
                 //设置
             }
             
             vold remove(key) {
             
             }
             .
             .
             .
     }
     
### 为了简化v2使用
* 想要 改造： v2 - system - Resource.php
    
    * 版本行为改为：?version=prefixHashCode
    * response header 添加新头：（方便跨域请求）
        * Access-Control-Allow-Origin
        * Access-Control-Allow-Methods
    