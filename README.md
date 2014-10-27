# TeaScript
TeaScript 是一个兼容 JavaScript(ES 5) 语法且可以编译为 JavaScript 的语言。旨在优雅简易地解决 JavaScript 的异步流程控制问题。

[![Build Status](https://travis-ci.org/luin/teascript.png?branch=master)](https://travis-ci.org/luin/teascript)

## 代码样例

```javascript
var count = 0;
function delayTask(interval, callback) {
  setTimeout(function() {
    callback(null, count++);
  }, interval);
}

for (var i = 0; i < 10; ++i) {
  console.log(new Date(), delayTask(1000, ~));
  console.log('step' + i);
}
```

输出结果：

    Mon Oct 27 2014 20:58:26 GMT+0800 (CST) 0
    step0
    Mon Oct 27 2014 20:58:27 GMT+0800 (CST) 1
    step1
    Mon Oct 27 2014 20:58:28 GMT+0800 (CST) 2
    step2
    Mon Oct 27 2014 20:58:29 GMT+0800 (CST) 3
    step3
    Mon Oct 27 2014 20:58:30 GMT+0800 (CST) 4
    step4
    Mon Oct 27 2014 20:58:31 GMT+0800 (CST) 5
    step5
    Mon Oct 27 2014 20:58:32 GMT+0800 (CST) 6
    step6
    Mon Oct 27 2014 20:58:33 GMT+0800 (CST) 7
    step7
    Mon Oct 27 2014 20:58:34 GMT+0800 (CST) 8
    step8
    Mon Oct 27 2014 20:58:35 GMT+0800 (CST) 9
    step9

## 使用方法

    // 安装 tea-script 模块，将在系统中加入 tea 命令
    $ npm install -g tea-script
    // --compile 参数将编译 tea 脚本并生成同名 js 脚本
    $ tea --compile script.tea
    // 查阅帮助与更多参数
    $ tea --help

## Node 版本

TeaScript 编译后的代码需要 Node 0.11.x 及以上版本并开启 `--harmony` 参数方能运行。

如果安装的版本较旧，可以使用 [n](https://github.com/visionmedia/n) 来快速安装 0.11.x：

	$ npm install -g n
	$ n 0.11.12
	$ tea script.tea

