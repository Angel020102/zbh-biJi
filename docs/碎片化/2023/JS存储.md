### Cookie与Session
#### 1.  cookie
   1. cookie是客户端的解决方案,是从服务器发送到Web浏览器的一块数据,大小在4kb以内
   2. cookie是一个在浏览器和客户端之间来回传输文本值的内置机制,服务器可以根据cooke追踪用户在不同页面的访问信息
##### cookie的用处
  - 会话管理 : 用户账号密码
  - 个性化 : 用户偏好设置
  - 追踪 : 记录和分析用户行为
##### cookie的特点
  - 大小限制在4kb
  - 都会消耗网络的宽带
  - 不加密不安全
  - 使用JS操作Cookie比较复杂
#### 2. Session
   1. Session是一种服务端解决方案,通过服务器来保持状态
   2. Session是服务器为保护用户而创建的一个特殊对象,客户端请求服务器,服务器会为这次请示开辟内存
   3. Session弥补了HTTP的无状态特性
##### Session创建过程
> 在浏览器第一次访问服务器,服务器会创建一个Session对象 (唯一ID) 服务器会将SessionID以cookie的方式返回浏览器 当浏览器再次访问服务器时,会将SessionID发过去,服务器依据SessionID就可以找到对应的Session对象
---
### WebStorage(localStorage与sessionStorage)
#### 1. localStorage
   - 只读的localStorage允许访问一个Document的对象Storage,存储的数据将会保存在浏览器会话中
#### 2. sessionStorage
   - sessionStorage和localStorage相似,不同点在于sessionStorage里面的数据在页面会话结束时被清除(关闭浏览器)
##### 相同点
- localStorage和sessionStorage一样都是存储客户端临时信息的对象
- 只能存储字符串对象
- 存储的大小可以达到5M左右
- 不同浏览器无法共享localStorage和sessionStorage中的信息(同源页面可以共享locals,不能共享sessionStorage)
##### 不同点
- localStorage的生命周期是永久的,除非用户清除localStorage信息
- sessionStorage的生命周期为当前窗口或标签页,一旦窗口关闭就结束了
