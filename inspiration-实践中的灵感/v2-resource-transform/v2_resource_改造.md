##v2 resource 改造

### 需求：

** 由于公司是按照日期版本发布生产环境，每天可能发布多个版本，这样导致新发布的版本无法有效的让浏览器使用到http cache.  **

** 为了提高移动客户端缓存资源利用率，将公共内容做独立资源加载 **

### apf页面资源改造如下：

** 1、apf资源改造 ** 

* 文件hash控制.
    * config/resource.php 新增配置：
        * resource_hash_environmen //声明hash控制的环境（string）最主要目的：过期版本.（默认为default）
        * resource_hash_switch //声明是否开启hash 控制（boolean）（默认为false）
             
* 装饰器公共资源
    * config/resource.php 新增配置：
        * resource_decorator_switch //声明是否开启独立装饰器资源.（boolean）（默认为false）
        * resource_type_decorator //声明装饰器资源在路由中定义的类型（默认为 d )
    * 如果添加独立装饰器加载需要route规则做少许更改：
        * 原：
        
                ^/res/[^\/]+/?(b|s)/(.*)\.(css|js)$
        * 新：
        
                ^/res/[^\/]+/?(b|s|d)/(.*)\.(css|js)$  //增加类型 d
    * decorator 中新增function
          
           /**
            * 获取页面的装饰器名
            */
           public function get_decorator_name() 
           {
               return __CLASS__;
           }
* 其他改造请见改造详解.  
 
** 2、APF_Resource_JavascriptsAndStylesComponent 中新增decorator资源方法 **

    /**
     * 获取css资源包uri
     */
    public function get_decorator_styles_uri() 
    { 
        return Kfs_Resource_ResourcesController::build_decorator_uri($this->get_page_class(), 'css');
    }

    /**
     * 获取css资源url
     */
    public function get_decorator_styles_url()
    {
        $prefix = $this->cdn_boundable_prefix();
        $uri = $this->get_decorator_styles_uri();
        return "$prefix$uri";
    }

    /**
     * 获取js资源包uri
     */
    public function get_decorator_javascripts_uri() 
    { 
        return Kfs_Resource_ResourcesController::build_decorator_uri($this->get_page_class(), 'js');
    }

    /**
     * 获取js资源url
     */
    public function get_decorator_javascripts_url()
    {
        $prefix = $this->cdn_boundable_prefix();
        $uri = $this->get_decorator_javascripts_uri();
        return "$prefix$uri";
    }

** 3、 component修改 ** 

* component/apf/resource/ScriptBlocks.phtml 新增连接
    
        //新增decorator资源新增
        <?php if($this->get_decorator_javascripts_uri()): ?>
            <script type="text/javascript" src="<?php echo $this->get_decorator_javascripts_url(); ?>"></script>
        <?php endif; ?>
* component/apf/resource/StyleBlocks.phtml 新增连接

        //新增decorator资源新增
        <?php if($this->get_decorator_styles_uri()):?>
            <link rel="stylesheet" rev="stylesheet" href="<?php echo $this->get_decorator_styles_url(); ?>" type="text/css" />
        <?php endif;?>
