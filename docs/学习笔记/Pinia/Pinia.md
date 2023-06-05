# Pinia

##  简介

- Pinia 起始于 2019 年 11 月左右的一次实验，其目的是设计一个拥有组合式 API 的 Vue 状态管理库。
- Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。
- 使用Pinia 可实现一下功能:
  - Devtools 支持  
    - 追踪 actions、mutations 的时间线
    - 在组件中展示它们所用到的 Store
    - 让调试更容易的 Time travel
  - 热更新
    - 不必重载页面即可修改 Store
    - 开发时可保持当前的 State
  -  插件：可通过插件扩展 Pinia 功能
  -  为 JS 开发者提供适当的 TypeScript 支持以及自动补全功能。
  -  支持服务端渲染 

## 安装

- yarn add pinia
- npm install pinia

创建一个 pinia 实例 (根 store) 并将其传递给应用:
```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```
使用的是Vue2的话,还需要安装一个插件，并在应用的根部注入创建的 pinia:
```js
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // 其他配置...
  // ...
  // 请注意，同一个`pinia'实例
  // 可以在同一个页面的多个 Vue 应用中使用。 
  pinia,
})
```
**注意: 在 Vue 2 中，Pinia 使用的是 Vuex 的现有接口 (因此不能与 Vuex 一起使用)**
#### 什么是Store?
- Store (如 Pinia) 是一个保存状态和业务逻辑的实体，它并不与你的组件树绑定。它承载着全局状态。它有点像一个永远存在的组件，每个组件都可以读取和写入它。它有三个概念，state、getter 和 action，我们可以假设这些概念相当于组件中的 data、 computed 和 methods。


##  定义Store
-  Store 是用 defineStore() 定义的，它的第一个参数要求是一个独一无二的名字。 
```js
import { defineStore } from 'pinia'
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```
这个名字 ，也被用作 id ，是必须传入的， Pinia 将用它来连接 store 和 devtools。为了养成习惯性的用法，将返回的函数命名为 use... 是一个符合组合式函数风格的约定。
defineStore() 的第二个参数可接受两类值：Setup 函数或 Option 对象。

##  Option Store
```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```
你可以认为 state 是 store 的数据 (data)，getters 是 store 的计算属性 (computed)，而 actions 则是方法 (methods)。

## Setup Store
```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```
在 Setup Store 中:
- ref() 就是 state 属性
- computed() 就是 getters
- function() 就是 actions

## 使用Store
```Vue
<script setup>
import { useCounterStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
</script>
```

- 请注意，store 是一个用 reactive 包装的对象，这意味着不需要在 getters 后面写 .value，就像 setup 中的 props 一样，如果你写了，我们也不能解构它:
```Vue
<script setup>
const store = useCounterStore()
// ❌ 这将不起作用，因为它破坏了响应性
// 这就和直接解构 `props` 一样
const { name, doubleCount } = store 
name // 将始终是 "Eduardo" 
doubleCount // 将始终是 0 
setTimeout(() => {
  store.increment()
}, 1000)
// ✅ 这样写是响应式的
// 💡 当然你也可以直接使用 `store.doubleCount`
const doubleValue = computed(() => store.doubleCount)
</script>
```

- 为了从 store 中提取属性时保持其响应性，你需要使用 **storeToRefs()**。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。请注意，你可以直接从 store 中解构 action，因为它们也被绑定到 store 上:
```Vue
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```