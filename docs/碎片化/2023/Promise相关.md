### 1. 什么是回调地狱?
- 简单来说回调地狱就是回调(异步)函数的**嵌套**
- 回调函数就是当把一个函数**作为参数**传递,传递的是函数的定义函数不会立即执行,而是在将来特定的时间再去调用,在定时器setTimeout以及Ajax的请求中都会用到回调函数
- 在我们想要一个setTimeout执行完再去执行下一个setTimeout就必须将后一个setTimeout书写在前一个的**回调函数内部**,这种书写就是回调地狱
- 回调地狱会使代码**难以维护**,**复用性不强**,**阅读差**,**扩展性差**等问题

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02d6c4a443bd43e8a49a0ad7e57564cd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
### 2. JS的执行机制?
- JS是**单线程**,JS在执行一个任务时候,后面的任务就必须等待,此后就有了**同步任务**和**异步任务**
- 同步任务和异步任务会进入不同场所,同步进入主线程,异步进入Event Table(**事件列表**)并注册函数,当指定的事情完成,Event Table会将这个函数移入Event Queue(**事件队列**) 
- 当主线程任务执行完,JS引擎会持续不断的在Event Queue(**事件队列**)中查找是否有等待被调用的函数,让其加入主线程,这也是所谓的**事件循环**

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82ff2c9c6a944ec5af3a79da2cd3ac3b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
### 3. 宏任务和微任务?
- JS的异步任务分为宏任务和微任务,JS就是最大的宏任务
- 在不考虑最大的JS,会优先执行微任务,微任务执行完才会去执行靠前的宏任务01,然后依次执行宏任务01里面的微任务,当宏任务01全部执行完才会去执行下一个宏任务02

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5958849c50e34d568969ed0d62622bf4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
### 4. Promise的常用方法有那些?
1. then()
   - 第一个参数 接收 resolve 信息
   - 第二个参数 接收 reject 信息
2. catch()
   - catch方法只接受 reject中的错误信息
3. finally()
   - 无论是resolve还是reject 都会执行finally
4. Promise.all()
   - 接收一个promise数组,当全部执行完,返回一个数组
5. Promise.race()
   - 接收一个Promise数组,只要当其中的一个promise状态发生改变,就会返回包装期约 
### 5. Promise的三种状态分别是什么?
- Promise有三种状态 : **pending**(待定中) **fulfilled**(成功) **rejected**(失败)
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/18/16372988fa3130ec~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)
### 6. Promise的状态可逆吗?
- 一旦Promise的状态发生改变,就不会再也变,状态的改变只有两种可能:
  1. 从pending 变为 fulfilled
  2. 从pending 变为 rejected
**注意**:*状态是不可逆的,不可能从fulfilled变为rejected 或者 rejected变为fulfilled*