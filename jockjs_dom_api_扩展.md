### JockJs Dom API 扩展

#### JockJsAPI与Jquery差别

* JockJsApi 链式调用函数
````
//dom.dom
fnExt
fnExtNull
````
##### jQuery Dom API 总列表

分类|函数|备注
---|---|---
Selectors | 选择器列表 Traversing
- | selector()
- | children() 
- | add() | 
- | addBack()
- | addSelf() 
- | closest() 
- | each() 
- | end() 
- | eq()
- | filter()
- | first()
- | has()
- | is()
- | last()
- | map()
- | next()
- | nextAll()
- | nextUntil()
- | not()
- | offsetParent()
- | parent()
- | parents()
- | parentsUntil()
- | prev()
- | prevAll()
- | prevUntil()
- | siblings()
- | slice()
Attributes | 属性列表
- | attr()
- | html()
- | prop()
- | removeAttr()
- | removeClass()
- | removeProp()
- | val()
Css | 样式列表
- | addClass()
- | css()
- | hasClass()
- | height()
- | innerHeight()
- | innerWidth()
- | offset()
- | outerHeight()
- | outerWidth()
- | position()
- | removeClass()
- | scrollLeft()
- | scrollTop()
- | toggleClass()
- | width()
Data | 数据列表
_ | clearQueue()
- | hasData()
- | data()
- | jQuery.data()
- | dequeue()
- | jQuery.dequeue()
- | queue()
- | jQuery.queue()
- | removeData()
- | jQuery.removeData()
Effects | 效果列表
- | animate()
- | delay()
- | finish()
- | hide()
- | show()
- | slideDown()
- | slideToggle()
- | slideUp()
- | stop()
- | toggle()
Manipulation | 操作列表
- | after()
- | append()
- | appendTo()
- | before()
- | clone()
- | css()
- | empty()
- | height()
- | html()
- | insertAfter()
- | insertBefore()
- | replaceAll()
- | replaceWith()
- | text()
- | unwrap()
- | wrap()
- | wrapAll()
- | wrapInner()

##### JockJs Dom API 总列表

分类|函数|备注
---|---|---
- | addClass()
- | attr()
- | append()
- | appendTo()
- | create()
- | down()
- | empty()
- | each()
- | eq()
- | first()
- | get()
- | getStyle()
- | getOpacity()
- | hasClass()
- | hide()
- | html()
- | height()
- | insertAfter()
- | insertBefore()
- | insertFirst()
- | insertFirstTo()
- | insertLast()
- | last()
- | next()
- | offset()
- | prev()
- | remove()
- | removeAttr()
- | removeClass()
- | s()
- | setStyle()
- | setOpacity()
- | show()
- | submit()
- | up()
- | visible()
- | val()
- | width()

##### JockJs API 需要新增列表

分类|函数|备注
---|---|---
节点 | - | 除selector 开发周期6小时，测试6小时
- | selector() | selector 替换原select选择器 - 8小时开发时间，测试4小时
- | find()
- | children()
- | parent()
- | after()
- | before()
- | filter()
- | first()
- | last()
- | map()
- | next()
- | offsetParent()
- | replaceWith()
- | replaceAll()
属性| - | 开发周期6小时，测试6小时
- | css()
- | hasClass()
- | innerHeight()
- | innerWidth()
- | offset()
- | outerHeight()
- | outerWidth()
- | position()
- | scrollLeft()
- | scrollTop()
- | toggleClass()
- | hasData()
- | data()
- | text()
行为 | - 
- | animate() | 开发周期8~12小时，测试4小时
- | delay()
- | finish()
- | slideDown()
- | slideToggle()
- | slideUp()
- | stop()
- | toggle()

#### 选择器分为高低版本

#### 加载方式类CMD模式模块化
