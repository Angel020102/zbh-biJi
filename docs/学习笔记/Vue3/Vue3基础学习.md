---
title: Vue3基础学习
sidebar_label: Vue3基础学习
sidebar_position: 1
---
## Vue3

### 有关入口文件main.js
 - 在Vue3中不再引入Vue构造函数,引入的是createApp工厂函数
```js
  import { createApp } from 'vue'
  import App from './App.vue'
```

 - 创建应用实例对象-App(类似Vue2中的vm,比vm更**轻**)
```js
  // Vue3 的写法
  const app = createApp(App)
  // 挂载
  app.mount('#app')
  // 一秒钟后卸载 
  setTiment(()=> {
    app.unmount('#app')
  },1000)

  // VUe2 的写法
  const vm = new Vue({
    return:h => h(App)
  })
  vm.$mount('#App')
```

### template中可以不再需要根标签
```js
<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
</template>
```

### 常用 Composition(组合式) API

###### 新增的配置项 setup

- setup函数的两中返回值:
  - 若返回一个对象,则对象中的属性,方法在模版中可以直接使用(常用) 
  - 若返回一个渲染函数:则可以自定义渲染内容(了解) 
  ```js
    // 1. 返回对象
    setup() {
    // 数据
    let name = '章北海'
    let age = 35
    // 方法
    function sayHello() {
      alert(`我叫${name},${age}岁`)
    }
    return {
      name,
      age,
      sayHello
    }
  }
  ```
  ```js
    // 2. 返回渲染函数
    import { h } from 'vue'
    setup() {
    return return () => { return h('h1', 'DX3906') }
    // 简写
    return return () => h('h1','DX3906')
  }
  ```
  1. 尽量不与Vue2中的配置项混用
    - Vue2中配置项(data,methos,computed...)中是可以访问setup中的属性,方法
    - 但是在setup中不能访问Vue2中配置项(data,method,computed...)
    - 如果Vue2中的配置项和Vue3中的setup发生重名,会以setup优先
  2. setup不能是一个async函数,因为返回值不再是return对象而是一个promise,模版中是看不到return对象中的属性

### Vue3中ref函数

###### 处理_基本数据类型
 ```js
  <h1>这是一段测试</h1>
  // 此时name,age应该是name.value,age.value但是呢 会自动添加value
  <h3>姓名: {{ name }}</h3>
  <h3>年龄: {{ age }}</h3>
  <button @click="changeInfo">按钮</button>
  // 使用前先引入 ref
  import { ref } from 'vue' 
  // 触发响应式
    setup() {
    // 通过ref函数 处理数据
    let name = ref('章北海')
    let age = ref(35)
    function changeInfo() {
    // 此时的name,age是一个对象 RefImpl (引用对象)
    // 需要通过.value来触发响应式 
      name.value = '程心'
      age.value = 18
    }
    return {
      name,
      age,
      changeInfo
    }
  }
 ```

###### 处理_基本对象类型

  ```js
  <h5>工作种类:{{ job.type }}</h5>
  <h5>工作薪水:{{ job.salary }}</h5>
  <button @click="changeInfo">按钮</button>
  import { ref } from 'vue'
  setup() {
    const job = ref({
      type: '前端工程师',
      salary: '30k'
    })
    function changeInfo() {
      // 这里的job.value是一个proxy 对象
      // 对象是通过proxy来实现响应式的
      job.value.type = 'UI设计师'
      job.value.salary = '60k'
    }
    return {
      job,
      changeInfo
    }
  }

  ```

###### 总结

- ref 用来定义响应式数据
  ```js
  // 语法
  const xxx = ref(initValue)
  ```
  - 通过ref会创建一个引入对象(ref对象,reference对象)
  - 操作数据的话 : **xxx.value**
  - 在模版(templast)读取数据不需要.value: {{ xxx }}

- 接收的数据可以是:基本类型,对象类型
  - 基本类型:响应式的触发还是通过Object.defineProperty()中的get,set实现
  - 对象类型:借助Vue3中的新函数 - reactive函数
    - 将proxy封装在一个reactive函数中

### Vue3中reactive函数

- 处理对象
  ```js
    <h5>工作种类:{{ job.type }}</h5>
    <h5>工作薪水:{{ job.salary }}</h5>
    <h5>测试reactive:{{ job.a.b.c }}</h5>
    <button @click="changeInfo">按钮</button>
    import { reactive } from 'vue'
    setup() {
      // 数据
      const job = reactive({
        type: '前端工程师',
        salary: '30k',
        a: {
          b: {
            c: 666
          }
        }
      })
      // 方法
      function changeInfo() {
        job.type = 'UI设计师'
        job.salary = '60k'
        job.a.b.c = 999
      }
      return {
        job,
        changeInfo
      }
    }
  ```
- 处理数组
  ```js
    <h5>爱好:{{ hobby }}</h5>
    <button @click="changeInfo">按钮</button>
     import { reactive } from 'vue'
  setup() {
    // 数据
     const hobby = ['抽烟', '喝酒', '烫头']
    // 方法
    function changeInfo() {
    // 可以通过索引来修改
      person.hobby[0] = '读书'
    }
    return {
      hobby,
      changeInfo
    }
  }
  ```
- reactive的优化?_待处理
  - 之前写法感觉不语义化
  ```js
    <h1>这是一段测试</h1>
    <h3>姓名: {{ person.name }}</h3>
    <h3>年龄: {{ person.age }}</h3>
    <h5>工作种类:{{ person.job.type }}</h5>
    <h5>工作薪水:{{ person.job.salary }}</h5>
    <h5>爱好:{{ person.hobby }}</h5>
    <h5>测试reactive:{{ person.job.a.b.c }}</h5>
    <button @click="changeInfo">按钮</button>
    import { reactive } from 'vue'
    setup() {
    // 数据
    const person = reactive({
      name: '章北海',
      age: 35,
      job: {
        type: '前端工程师',
        salary: '30k',
        a: {
          b: {
            c: 666
          }
        }
      },
      hobby: ['抽烟', '喝酒', '烫头']
    })
    // 方法
    function changeInfo() {
      person.name = '程心'
      person.age = 18
      person.job.type = 'UI设计师'
      person.job.salary = '60k'
      person.hobby[0] = '读书'
      person.job.a.b.c = 999
    }
    return {
      person,
      changeInfo
    }
  }
  ```
###### 总结 reactive函数
- 定义一个对象类型的响应式数据(基本数据不能用,ref函数)
  ```js
    // 语法
    const 代理对象 = reactive(原对象)
    // 原对象-接收一个对象或者数组,返回一个代理对象(proxy的实例对象,简称proxy对象)
  ```
- reactive定义的响应式是深层的
- 内部通过ES6proxy实现,通过代理对象操作原对象内部的数据

### Vue2中的响应式
- 实现原理
  - 对象类型:通过Object.defineProperty()对属性的读取,修改进行拦截(数据劫持)
  - 数组类型:通过重写更新数组的一系列方法来实现拦截(对数组的变更方法进行了包裹)
  ```js
  Object.defineProperty(data,'count',{
  get(){},
  set(){}
  })
  ```
- 存在的问题:
  - 新增属性或删除属性,页面不会更新
  - 直接通过下标修改数组,界面不会自动更新

### Vue3中的响应式
- 实现原理
  - 通过Proxy(代理):拦截对象中任意属性的变化,包括:属性的读写,属性的添加,属性的删除
  - 通过Reflect(反射):对被代理的属性进行操作
  ```js
  new Proxy(data,{
  // 拦截读取属性值
  get(target,prop) {
    return Reflect.get(target,prop)
  }
  // 拦截设置属性值或者添加新属性
  set(target,prop,vlaue){  
    return Reflect.set(target,prop,value)
  }
  // 拦截删除属性
  deleteProperty(target,prop) {
    return Reflect.deleteProperty(target,prop)
  }
  })
  ```
### Vue中的响应原理

- 原数据
  ```js
  const person = {
    name: '章北海',
    age: 18
  }
  ```

- Vue2响应原理
  ```js
  // 模拟Vue2中的响应式
  let p = {}
  Object.defineProperty(p, 'name', {
    // 是否可以进行配置(删除)操作
    configurable: true,
    get() {
      console.log('有人读取name属性')
      return person.name
    },
    set(value) {
      console.log('有人要修改的name属性')
      person.name = value
    }
  })
  Object.defineProperty(p, 'age', {
    configurable: true,
    get() {
      console.log('有人读取age属性')
      return person.age
    },
    set(value) {
      console.log('有人要修改的age属性')
      person.age = value
     }
   })
  ```
- Vue3响应原理
  ```js
    // 模拟Vue3中的响应式
    const p = new Proxy(person, {
    // 有人读取p的某个属性时候调用
    get(target, propName) {
      console.log(`有人读取了${propName}属性`)
      // return target[propName]
      return Reflect.get(target, propName) // 这才是Vue实现的
    },
    // 有人修改p的某个属性或者追加某个属性时调用
    set(target, propName, value) {
      console.log(`有人修改了${propName}属性`)
      // target[propName] = value
      Reflect.set(target, propName, value)
    },
    // 有人删除p的某个属性的时候调用
    deleteProperty(target, propName) {
      console.log('有人删除了${propName}属性')
      // return delete target[propName]
      return Reflect.deleteProperty(target, propName)
    }
  })
  ```
- 关于Reflect使代码更加健壮
  - 通过Object.defineProperty进行操作
  ```js
  let obj = {a:1,b:2}
  try {
    Object.defineProperty(obj,'c',{
      get(){  
        return 3
      }
    })
    Object.defineProperty(obj,'c',{
      get(){  
        return 4
      }
    })
  } catch(error) {
  console.log(error)
  }
  ```
  - 通过Reflect.defineProperty进行操作
  ```js
  let obj = {a:1,b:2}
  const x1 = Reflect.defineProperty(obj,'c',{
    get(){
      return 3
    }
  })
  console.log(x1) // 返回的是布尔值 true
  const x2 = Reflect.defineProperty(obj,'c',{
    get(){
      return 4
    }
  })
  if(x2) {
    console.log('某操作成功')
  }else {
    console.log('某操作失败')
  }
  ```

### reactive和ref对比
- 定义数据角度对比
  - ref用来定义:**基本数据类型**
  - reactive用来定义:**对象(或数组)类型**
  - 备注:ref也可以用来定义对象(或数组)类型,内部会自动请求reactive转为代理对象
- 从原理角度对比
  - ref通过Object.defineProperty()的get与set来实现响应式(数据劫持)
  - reactive通过Proxy来实现响应式(数据劫持),并通过Reflect操作原对象内部的数据
- 从使用角度对比
  - ref定义的数据:操作数据需要.value,读取数据时模版中直接读取不需要.value
  - reactive定义的数据:操作数据与读取数据,均不需要.value

### setup的注意点
- setup执行时机
  - 在beforeCreate之前执行一次,this是undefined
  ```js
  beforeCreate() {
    console.log('这是beforeCreate...')
  },
  setup() {
    console.log('这是setup...', this)
  }
  // 先打印  这是setup... 其中this是undefined
  // 再打印  这是beforeCreate...
  ```
- setup的参数
  - props: 值是对象,包含组件外部传递过来,且组件内部声明接收了的属性
  - context: 上下文对象
    - atter:值是对象,包含组件外部传递过来,但没有在props配置中声明的属性,相当于Vue2中this.$attrs
    - slots:收到的插槽内容,相当于Vue2中的this.$slots
    - emit:分发自定义事件的函数,相当于this.$emit(在外部声明接收父组件的自定义事件,否则会有警告)
  - 这是父组件
  ```js
  <template>
      <Demo msg="DX3906"  @hello="showMsg">
      <template v-slot:qwe>
        <span>雪国</span>
      </template>
      <template v-slot:asd>
        <span>川端康成</span>
      </template>
    </Demo>
  </template>
  <script>
    import Demo from './components/Demo';
    export default {
    name: 'App',
    components: { Demo },
    setup() {
      function showMsg(value) {
        alert(`大家好!我是子组件触发的  hello事件,我是${value}`)
      }
      return {
        showMsg
      }
    }
  }
  </script>
  ```
  - 这是子组件
  ```js
  <template>
    <button @click="text">测试子组件给父组件传值</button>
  </template>
  <script>
  import { reactive } from 'vue'
  export default {
    name: 'Demo',
    props: ['msg'],
    emits: ['hello'],
    // beforeCreate() {
    //   console.log('这是beforeCreate...')
    // },
    setup(props, context) {
      console.log(props)
      console.log(context)
      console.log(context.attrs) // 类似 Vue2 中的  $attrs
      console.log(context.emit) // 触发自定义事件
      console.log(context.slots) // 插槽
      // 方法
      function text() {
        context.emit('hello', 'DX3906')
      }
      // console.log('这是setup...', this)
      const person = reactive({
        name: '章北海',
        age: 35,
      })
      return {
        person,
        text
      }
    }
  }
</script>
  ```

### computed函数
- 与Vue2中的computed功能一致
  ```js
  姓: <input type="text" v-model="person.firstName">
  <br>
  名: <input type="text" v-model="person.lastName">
  <br>
  全名: <input type="text" v-model="fullName">

  import { computed } from 'vue'

  setup() {	
    const person = reactive({
      firstName: '章',
      lastName: '北海',
    })
    // 简写
    // let fullName = computed(() => {
    //   return person.firstName + '-' + person.lastName
    // })
    // 完整
    let fullName = computed({
      get() {
        return person.firstName + '-' + person.lastName
      },
      set(value) {
        const nameArr = value.split('-')
        person.firstName = nameArr[0]
        person.lastName = nameArr[1] ? nameArr[1] : ''
      }
    })
    return {
      person,
      fullName
    }
  }
  ```

### watch函数
- 与vue2中的watch功能一致
  ```js
  // 模版
  <h1>{{ sum }}</h1>
  <button @click="sum++">+1</button>
  <br>
  <h3>{{ msg }}</h3>
  <button @click="msg += '!'">改变我</button>
  <br>
  <h2>姓名:{{ person.name }}</h2>
  <h2>年龄:{{ person.age }}</h2>
  <h2>年龄:{{ person.job.j1.salary }}K</h2>
  <button @click="person.name += '~'">改变姓名</button>
  <button @click="person.age++">改变年龄</button>
  <button @click="person.job.j1.salary++">涨薪</button>
  // 导入
  import { ref, reactive, watch } from 'vue'
  // setup函数
  setup() {
    let sum = ref(0)
    let msg = ref('你好')
    const person = reactive({
      name: '程心',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    // 情况一:监听ref定义的一个响应式数据
    // watch(sum, (newValue, oldValue) => {
    //   console.log('监听到sum的变化..', newValue, oldValue)
    // }, { immediate: true })

    // 情况二:监听ref定义的多个响应式数据
    // watch([sum, msg], (newValue, oldValue) => {
    //   console.log('监听到sum或msg的变化..', newValue, oldValue)
    // }, { immediate: true, deep: true })

    /*
    情况三:监听reactive定义的一个响应式数据的全部属性
    BUG:  1. 此处无法正确获取oldValue的值
          2. 强制开启deep深度侦听(配置无效)
    */
    // watch(person, (newValue, oldValue) => {
    //   console.log('监听到person变化了...', newValue, oldValue)
    // },{ deep: true }) // 此处deep无效

    // 情况四:监听reactive定义的一个响应式数据的一个属性
    // watch(() => person.age, (newValue, oldValue) => {
    //   console.log('监听到age变化了...', newValue, oldValue)
    // })

    // 情况五:监听reactive定义的一个响应式数据的某些属性
    // watch([() => person.name, () => person.age], (newValue, oldValue) => {
    //   console.log('监听到age变化了...', newValue, oldValue)
    // })

    // 特殊情况
    // watch(() => person.job, (newValue, oldValue) => {
    //   console.log('监听到job变化了...', newValue, oldValue)
    // }, { deep: true }) // 此处需要开启深度侦听
    // -----------------
    // watch(person.job, (newValue, oldValue) => {
    //  console.log('监听到job变化了...', newValue, oldValue)
    // }, { deep: true })
    return {
      sum,
      msg,
      person
    }
  }
  ```
- watch 监听ref数据说明
  ```js
  <h2>姓名:{{ person.name }}</h2>
  <h2>年龄:{{ person.age }}</h2>
  <h2>年龄:{{ person.job.j1.salary }}K</h2>
  <button @click="person.name += '~'">改变姓名</button>
  <button @click="person.age++">改变年龄</button>
  <button @click="person.job.j1.salary++">涨薪</button>

  import { ref, watch } from 'vue'

  setup() {
    const person = ref({
      name: '程心',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    /* 注意: 
          1. 想监听 person.job 需要开启深度侦听
          2. 想监听 person.job job不再是ref函数,而是请求 reactive函数
    */
    // watch(person, (newValue, oldValue) => {
    //   console.log('监听了person的变化...', newValue, oldValue)
    // }, { deep: true })
    
    watch(person.value, (newValue, oldValue) => {
      console.log('监听了person的变化...', newValue, oldValue)
    })
    return {
      person,
    }
  }
  ```

### watchEffect函数

- watch:既要指明监听的属性,也要指明监听的回调
- watchEffect:不需要指明监听那个属性,监视的回调函数用到了那个,就会监听那个属性
- watchEffect 与 computed
  - computed 注重的技术出来的值,必须返回值
  - watchEffect 注重的是过程,不用返回值
  ```javascript
    setup() {
    let user = ref('北海')
    const person = reactive({
      name: '程心',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    // watch(user, (newValue, oldValue) => {
    //   console.log('监听了person的变化...', newValue, oldValue)
    // }, { immediate: true })
    watchEffect(() => {
      user.value += '猪货'
      person.job.j1.salary += 10
      console.log('监听到了...')
    })
    return {
      user,
      person,
    }
  }
  ```
### Vue3中的生命周期钩子
- beforeDestroy 改为 beforeUnmounted
- destroy 改为 unmounted
- 提供了CompositionAPI形式的生命钩子
  ```javascript
  //例子
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
  ```
- 了解: 配置项的生命周期在CompositionAPI钩子函数前执行

### hook

- hook本质是一个函数,把setup 函数中使用的CompositionAPI进行封装
- 自定义hook的优势:复用代码,让setup中的逻辑清楚易懂
  ```javascript
  import {reactive, onMounted, onBeforeUnmount} from 'vue'
  export default function () {

    const point = reactive({x: 0, y: 0})

    function savePoint(e) {
      point.x = e.pageX
      point.y = e.pageY
      console.log(e.pageX, e.pageY)
    }

    onMounted(() => {
      window.addEventListener('click', savePoint)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('click', savePoint)
    })
    return point
  }

  ```

### toRef和toRefs
- 创建一个ref对象,其Value值指向另一个对象中的某个属性
- const name  =  toRef(person,'name')
- 要将响应式对象中的某个属性单独提供给外部使用
- toRefs与toRef功能一致,但是可以批量创建多个ref对象 toRefs(person)

  ```javascript
    return {
      // name: toRef(person, 'name'),
      // age: toRef(person, 'age'),
      // salary: toRef(person.job.j1, 'salary'),
      ...toRefs(person)
    }
  ```

### shallowRecative和shallowRef

- shallowReactive: 只处理对象最外层属性的响应式(浅响应式)
- shallowRef: 只处理基本数据类型的响应式,不进行对象响应式的处理
- 用?
  - 如果一个对象数据,结构比较深,但变化时只是外层属性变化=> shallowReactive
  - 如果一个对象数据,后续功能不会修改该对象中的属性,而是生新的对象来替换=> shallowRef
```javascript
    const person = shallowReactive({
      name: '程心',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    let x = shallowRef({
      y: 0
    })
```

- 坑 
  - 如果两个以上的数据使用了shallowReactive会有问题，当操作让最外层的属性改变的时候，之前操作过的深层的属性也会跟着改变；如果不理解看下面代码；如果先点击涨薪按钮页面不会改变（不具有响应式），再点击改变年龄页面会改变（浅层具有响应式）并且涨薪之前的操作也会反应到页面
  - shallowRef也存在类似的问题，混合使用也有这个问题
  - 最新版本3.2.31也是存在这个问题的
  - 所以在数据量不是非常庞大的情况下不建议使用，如果哪个版本没有这个问题了我们就可以随便用了

```javascript
<template>
  <h4>{{ x.y }}</h4>
  <button @click="x.y++">点我+</button>
  <button @click="x = { y: 999 }">点我替换</button>
  <hr>
  <h1>{{ person }}</h1>
  <h2>姓名:{{ name }}</h2>
  <h2>年龄:{{ age }}</h2>
  <h2>年龄:{{ job.j1.salary }}K</h2>
  <button @click="name += '~'">改变姓名</button>
  <button @click="age++">改变年龄</button>
  <button @click="job.j1.salary++">涨薪</button>
</template>
<script>
import { ref, reactive, toRefs, shallowRef, shallowReactive } from 'vue'
export default {
  name: 'Demo',
  setup() {
    const person = shallowReactive({
      name: '程心',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    let x = shallowRef({
      y: 0
    })

    return {
      person,
      x,
      ...toRefs(person)
    }
  }
}
</script>
```

### readonly和shallowReadonly

- readonly: 让一个响应式数据变为只读的(深只读)
- shallowReadonly: 让一个响应式数据变为只读的(浅只读)
- 在不希望数据发生改变时使用

```javascript
import { ref, reactive, toRefs, readonly, shallowReadonly } from 'vue'
  setup() {
    let sum = ref(0)
    let person = reactive({
      name: '程心',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    // sum = readonly(sum)
    // person = readonly(person)
    sum = shallowReadonly(sum)
    person = shallowReadonly(person)
    return {
      sum,
      ...toRefs(person)
    }
  }
```

### toRaw与markRaw

- toRaw
  - 作用: 将一个由reactive生成的响应式对象转为普通对象
  - 使用场景: 用户读取响应式对象对象的普通对象,对这个普通的对象的操作,不会引起页面的更新
  ```javascript
  // 将perosn转换为普通对象
   person = toRaw(person)
  ```
- markRaw
  - 作用: 标记一个对象,使其永远不会成为响应式对象
  - 应用场景: 
    1. 有些值不应被设置为响应式,例如复杂的第三方类库
    2. 当渲染具有不可变数据源的大列表时,跳过响应式转换可以提高性能
  ```javascript
  // 注意: 再添加属性 时候需要提前给person添加car属性,进行占位.或者将person 也抛出去
  // 例如  再页面中显示是 利用  person.car 直接car拿不到
  // 因为setup 再工作中只会执行一次!!!
  <h2 v-if="person.car">座驾:{{ person.car }}</h2>      
    return {
      person,
      ...toRefs(person),
    }
  // 给person对象添加car属性,将该属性设置为不会成为响应式的对象
  person.car = markRaw({ name: '奔驰', price: 40 })
  ```

### customRef 

- 创建一个自定义的Ref,并对其依赖项和更新触发进行显式控制
```javascript
<input type="text" v-model="keyWord">
<h3>{{ keyWord }}</h3>

import { customRef, ref } from 'vue'
export default {
  name: 'App',
  setup() {
    // 自定义的一个Ref 我的myRef
    function myRef(value,delay) {
      let time = null
      return customRef((track, trigger) => {
        //customRef 必须返回一个对象
        return {
          get() {
            // 当有人读取keyWord
            console.log(`有人读取了keyWord的值,值为${value}`)
            track()// 通知Vue追踪value的变化(提前跟get打招呼,让他认为value有用)
            return value
          },
          set(newValue) {
            // 当有人修改keyWord
            console.log(`有人修改了keyWord的值,值为${newValue}`)
            clearTimeout(time)
            time = setTimeout(() => {
              trigger()// 通知Vue重新解析模版
              value = newValue
            }, delay);
          }
        }
      })
    }
    // let keyWord = ref('程心') // Vue的Ref
    let keyWord = myRef('程心',1000) // 自己定义的Ref
    return {
      keyWord
    }
  }
}
```

### reactive和inject

- 实现祖孙组件之间通信
- 父组件通过provide选项来提供,后代组件有一个inject选项来开始使用
```javascript
// 这是祖先组件
setup() {
  const user = reactive({ name: '章北海', age: 35 })
  provide('user', user)
}
// 这是后代组件
setup() {
  const user = inject('user')
}
```

### 响应式数据的判断

- isRef: 检查一个值是否为ref对象
- isReactive: 检查一个对象是否由reactive创建的响应式代理
- isReadonly: 检查一个对象是否由readonly创建的响应式代理
- isProxy: 检查一个对象是否由reactive或者readonly方法创建的代理
```javascript
import { ref, reactive, toRefs, readonly, isReactive, isRef, isReadonly, isProxy } from 'vue'
export default {
  name: 'App',
  setup() {
    const user = reactive({ name: '章北海', age: 35 })
    const sum = ref(0)
    const car = readonly(user)

    console.log(isRef(sum))
    console.log(isReactive(user))
    console.log(isReadonly(car))
    console.log(isProxy(user))
    console.log(isProxy(car), '经过readonly修饰还是Proxy')
    return {
      ...toRefs(user)
    }
  }
}

```

### Options API 存在的问题 以及Composition API 的优势

- 使用传统的OptionsAPI,新增或者修改一个需求,就需要分别在data,methods,computed里面修改
- 通过CompositionAPI我们可以优雅的组织我们代码,函数,更加有序

### 新的组件

###### Fragment

- 在Vue2中,组件必须有一个根标签
- 在Vue3中,组件可以没有根标签,内部会将多个标签包含在一个Fragment的虚拟元素
- 好处: 减少标签层级,减少内存占用

###### Teleport

- Teleport 是一种能将我们的组件html结构移动到指定的位置技术
```javascript
<teleport to="移动的位置">
  <div class="mask" v-if="isShow">
    <div class="box">
     <h2>我是一个弹窗</h2>
      <h4>一些内容</h4>
      <h4>一些内容</h4>
      <h4>一些内容</h4>
      <h4>一些内容</h4>
      <button @click="isShow = false">关闭弹窗</button>
    </div>
  </div>
</teleport>
```

###### Suspense

- 等待异步组件时渲染一些额外的内容，让用户有更好的体验
```javascript
// 异步组件的引入
import { defineAsyncComponent } from 'vue';
const Child = defineAsyncComponent(() => import('./components/Child.vue'))  // 异步组件
// 使用Suspense包裹组件,并配置好default与fallback
    <Suspense>
      <template v-slot:default>
        <Child />
      </template>
      <template v-slot:fallback>
        <h1>请稍等...我正在加载</h1>
      </template>
    </Suspense>

// return promise
export default {
  name: 'Child',
  async setup() {
    let name = ref('章北海')
    // 写法一
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({ name })
    //   }, 3000);
    // })
    // 写法二
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ name })
      }, 3000)
    })
    return await p
  }
}
```
### 其他

###### 全局API的转移
- Vue2中的全局API和配置
```javascript
// 注册全局组件
Vue.component('MyButton',{
    data:()=> ({
      count:0
  })
  template:'<button @click=count++> Clicked{{ count }} times.'</button> 
})

// 注册全局的指令
Vue.directive('focus',{
  inserted:el=> el.focus()
})
```
- Vue3对API做出了调整
  - 将全局的API, Vue:xxx 调整到了应用实例app上

| 2.x全局API(Vue)          | 3.x实例API(app)             |
| ------------------------ | --------------------------- |
| Vue.config.xxx           | app.config.xxx              |
| Vue.config.productionTip | 移除                        |
| Vue.component            | app.component               |
| Vue.directive            | app.directive               |
| Vue.minxin               | app.mixin                   |
| Vue.use                  | app.use                     |
| Vue.prototype            | app.config.globalProperties |

###### 其他改变

- data选项应该始终被声明为一个函数
- 过度类名的改变

| Vue2写法             | Vue3写法                  |
| -------------------- | ------------------------- |
| .V-enter,.V-leave-to | .V-enter-from,.V-leave-to |
| .V-leave,v-enter-to  | .V-leave-from,V-enter-to  |

- 移除
  - keyCode作为v-on的修饰符,同时也不再支持config.keyCodes
  - V-on.native修饰符
```javascript
// 父组件中绑定事件
<my-component 
v-on:close="handleComponentEvent"
v-on:click="handleNativeClickEvent"
/>

// 子组件中声明自定义事件
<script> 
  export default {
    emits:['close'] // 没有指定click,它就是原生事件,指定后,她才是自定义事件
}
</script>
```
- 过滤器的移除(filter)
  - 过滤器虽然这看起来很方便,但它需要一个自定义语法,打破大括号内表达式是"只是JavaScript"的假设,这不仅有学习成本,而且有实现成本!建议用方法调用或者计算属性去替换过滤器

2023年4月30日/[吹个泡糖]  完