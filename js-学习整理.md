## browserify + babel + grunt + webpack + react

#### ** browserify 学习整理 **

__ browserify 命令行语法 __

````
Usage: browserify [entry files] {OPTIONS}

Standard Options:

--outfile    -o 将browserify合并的文件写到指定路径，如果指定则写入当前路径
--require    -r 使用一个模块或文件运用在bundle.require,任意使用一个分隔符来设置标记
--entry      -e 设置一个入口，用来进入应用
--ignore     -i 将一个文件替换成一个空存根，并让文件打包
--exclude    -u 从输出合并文件中忽略一个文件，并让文件打包
--transform  -t 在顶层文件中使用一个转换模块
--command    -c 在顶层文件中使用一个转换命令
--standalone -s 为了这个出口名称生成一个UMD捆绑，如果没有发现组件系统，这个捆绑操作与其他组件系统并设置了一个全局的名称
--debug      -d 启用源映射允许您调试你的文件差别
--help       -h 帮助，查看信息
````

__ browserify node语法 __

````
# methods
var browserify = require('browserify');

#function

browserify([files][, opts]);
#Return a new browserify instance.



````


#### ** babel 学习整理 ** 

__ babel 命令行语法 __

````

````

#### ** grunt 学习整理 **

__ grunt 命令行语法 __

````

````

#### ** webpack **

#### ** react **

#### ** react-router **

#### ** flux **
