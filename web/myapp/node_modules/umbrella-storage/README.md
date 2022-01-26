# umbrella
umbrella of localStorage &amp; sessionStorage between web apps

[![codecov](https://codecov.io/gh/yezihaohao/umbrella/branch/master/graph/badge.svg)](https://codecov.io/gh/yezihaohao/umbrella)
![travis-ci](https://travis-ci.org/yezihaohao/umbrella.svg?branch=master)

### 说明
一个操作localStorage和sessionStorage的插件，避免同一个域名下部署不同前端web app，本地存储使用同样的key导致的冲突问题。

默认会使用域名+路径作为前缀（适用于hashRouter）,对于BrowserRouter可以使用自定义前缀配置。

### 安装

yarn add umbrella-storage

### 使用
```js
import umbrella from 'umbrella-storage';

umbrella.setLocalStorage('test', 'test');
umbrella.getLocalStorage('test');

umbrella.setSessionStorage('sessionTest', { name: 'test' });
umbrella.getSessionStorage('sessionTest');
```

### API
```js
// 配置自定义前缀
umbrella.config(prefix: string);

// 操作localStorage，value不需要转成字符串，自动帮忙处理
umbrella.setLocalStorage(key, value);
umbrella.getLocalStorage(key);
umbrella.removeLocalStorage(key);

// 操作localStorage，value不需要转成字符串，自动帮忙处理
umbrella.setSessionStorage(key, value);
umbrella.getSessionStorage(key);
umbrella.removeSessionStorage(key);

```
