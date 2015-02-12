## PHP 开发工程师 
## P6 申请材料
### 申请人：吴佳雷

#### 业务能力
* 深刻理解公司touch业务，并且在本职位的上游和下游部门具有一定的影响力。特别是具备与产品经理研讨最佳的产品需求与业务流程的能力。  
    * 从原来的pc端与移动产品API的对接，为移动IOS&android 提供新房API，并与移动开发和产品讨论最佳的api使用和结构。同时还解决了touch端资讯展示的难点（结构设计）。
            
            关于API的开发材料（主要负责移动API）
            仓库地址：http://gitlab.corp.anjuke.com/_xinfang/xinfang-site/tree/master/app-aifang-api
    * 现在为开发商touch端开发，依然与产品经理研讨最佳的产品需求与业务流程梳理，并具备有良好的业务抽象能力。参与分销项目研讨会和移交会，并提出有效业务观点。
* 具备良好的业务抽象能力。
* 具备基本的测试能力
      
          所有的代码都经过自测，保证了0.05以下的 bug工时比
          
#### 技术能力

* 深刻理解V2框架的路由、拦截器、组件、控制器生命周期
* 深刻理解 V2 js&css样式压缩和合并。
    * 为js & css 的合并新增了新的合并模式，通过装饰器配置，为使用同一装饰器的业务提供公用js & css 的压缩合并，更为有效的使用http cache
    * 为js & css 资源 新增http cache 头信息，将原来的304行为更改为了200 from cache 行为。
        
            //1、Resource 资源文件地址：
            http://gitlab.corp.anjuke.com/_xinfang/xinfang-site/blob/master/app-aifang-touch/controller/kfs/resource/Resources.php
            
            //2、Resource component 文件地址
            http://gitlab.corp.anjuke.com/_xinfang/xinfang-site/tree/master/app-aifang-touch/component/kfs/resource
        
    * 设计文档 
        
            //设计文档地址
            http://gitlab.corp.anjuke.com/_xinfang/kfs-design/tree/master/terminal/design/resource

* 新技术尝试
    * 使用basket.js使用javascript 在客户端缓存js & css资源（在touch 楼盘单页、列表，房源单页 列表 提升dom load 0-1秒时间比均提升了10%以上）
    
            //2、Resource component 文件地址 以Basket命名的文件
            http://gitlab.corp.anjuke.com/_xinfang/xinfang-site/tree/master/app-aifang-touch/component/kfs/resource/

* 熟悉nginx&apache 以及fpm的使用。
* 深刻理解前端的实现，能够为js & css debug 问题。并且解决一些touch交互存在的前端UI问题。

#### 业务规划设计能力

* 分销项目Spa模式业务设计。
    * //设计图
    
            http://gitlab.corp.anjuke.com/_xinfang/kfs-design/blob/master/terminal/design/fenxiao/%E5%88%86%E9%94%80SPA.jpg
* 能为团队设计软件过程文档，如需求分析文档、设计文档、单元测试文档等。

        http://gitlab.corp.anjuke.com/_xinfang/kfs-design/tree/master/terminal/component-docs

            
            
    

  
  
