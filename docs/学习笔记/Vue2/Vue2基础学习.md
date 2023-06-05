---
title: Vue2基础学习
sidebar_label: Vue2基础学习
sidebar_position: 1
---

### MVVM设计模式
- model
  - 数据层
- view
  - 视图层
- view model 
  - vue
- 特点 : 双向数据绑定

### 插值表达式

1. 插值表达式(声明式渲染/文本插值)
  - 别名: Mustache (大胡子语法)  
  - 语法: {{ 表达式 }}

```js

<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>{{ obj.name }}</h2>
    <h3>{{ obj.age >= 18 ? '成年' : '未成年 ' }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '你好,章北海',
      obj: {
        name: '程心',
        age: 24
      }
    }
  }
}
</script>

```

### Vue 指令

#### 01_v-bind
  -  语法: v-bind.属性名='vue变量'
  -  简写: :属性名='vue变量'
```js

<template>
  <div id="app">
    <a v-bind:href="url">网页链接</a>
    <img :src="imgUrl" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'http://www.baidu.com',
      imgUrl: '图片地址'
    }
  }
}
</script>

```

#### 02_v-on给标签绑定事件
  - 方法在methods选项中定义 
  - 语法 
  - v-on:事件名='要执行的少量代码'  
  - v-on:事件名='methods中的函数名'
  - v-on:事件名='methods中的函数名(参数)'
  - 语法的简写
  - @事件名='methods中的函数'

```js

<template>
  <div id="app">
    <p>商品数量:{{ count }}</p>
    <button v-on:click="count = count + 1">增加1个</button>
    <button v-on:click="addFn">调用函数增加1个</button>
    <button v-on:click="addCountFn(10)">调用函数增加N个</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1
    }
  },

  methods: {
    addFn() {
      // this代表当前的实例对象
      // data中的所有数据,会自动挂载到vue实例对象上,可以直接用this来访问
      this.count++
    },
    addCountFn(n) {
      this.count += n
    }
  }
}
</script>

```

#### 03_v-on关于event事件对象

```js

<template>
  <div id="app">
    <a @click="foo_1" href="http://www.baidu.com">百度</a>
    <hr />
    <a @click="foo_2(10, $event)" href="http://www.taobao.com">淘宝</a>
  </div>
</template>

<script>
export default {
  methods: {
    // 1. 事件触发,无传值,可直接获取事件对象
    foo_1(e) {
      e.preventDefault();
    },
    // 2. 事件触发,传值,需要手动传入$event
    foo_2(num, e) {
      e.preventDefault();
    },
  },
};
</script>


```

#### 04_v-on事件的修饰符
   - 语法 
     - @事件名.修饰符="methods里的函数"
   - 修饰列表
     - .stop --阻止事件冒泡
     - .prevent --阻止默认行为
     - .once --程序运行期间,只触发一次事件处理函数

```js

<template>
  <div id="app">
    <div @click="fatherFn">
      <!- 阻止p标签的事件冒泡 .stop ->
      <p @click.stop="oneFn">我是p</p>
      <!- 阻止a标签的默认行为 .prevent ->
      <a @click.prevent="twoFn" href="http://www.taobao.com">我是a</a>
      <hr />
      <!- 程序运行期间,只触发一次事件处理函数 .once ->
      <span @click.once="threeFn">我是span,只会执行一次</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fatherFn() {
      console.log('我是爸爸')
    },
    oneFn() {
      console.log('我是p')
    },
    twoFn() {
      console.log('我是a')
    },
    threeFn() {
      console.log('我是span,只会执行一次')
    }
  },
};
</script>

```

#### 05_v-on按键修饰符
  - 语法
    - @keyup.enter --监测回车按键
    - @keyup.esc --监测返回按键

```js

<template>
  <div id="app">
     <!-- 1. 绑定键盘按下事件.enter --回车 -->  
    <input @keyup.enter="enterFn" type="text" />
    <hr />
    <!-- 2. .esc修饰符 --取消键 -->
    <input @keyup.esc="escFn" type="text" />
  </div>
</template>

<script>
export default {
  methods: {
    enterFn() {
      console.log('用户搞了Enter')
    },
    escFn() {
      console.log('用户搞了esc')
    }

  }

}
</script>

```

#### 06_v-model基本使用

  - value 属性和Vue数据变量的双向绑定到一起
  - 语法: v-model='Vue数据变量'
  - 双向数据绑定
    - 变量变化 => 视图自动同步
    - 视图变化 => 变量自动同步

```js

<template>
  <div id="div">
    <div>
      <span>用户名:</span>
      <!-- v-model 
          双向数据绑定
      value属性 <=> vue变量
       -->
      <input type="text" v-model="username" />
    </div>
    <div>
      <span>密码:</span>
      <input type="password" v-model="pass" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      pass: ''
    }
  }
}
</script>

```

#### 07_v-model绑定不同的表单标签

```js

<template>
  <div id="app">
    <div>
      <span>来自于:</span>
      <!-- 下来菜单要绑定在select上 -->
      <select v-model="from">
        <option value="章北海">章北海</option>
        <option value="罗辑">罗辑</option>
        <option value="程心">程心</option>
      </select>
    </div>
    <div>
      <!-- (重要)
        遇到复选框,v-model 的变量值
        非数组 -关联的是复选框的checked属性
        数组   -关联的是复选框的value属性
       -->

      <span>爱好:</span>
      <input type="checkbox" value="抽烟" v-model="hobby" />抽烟
      <input type="checkbox" value="喝酒" v-model="hobby" />喝酒
      <input type="checkbox" value="敲代码" v-model="hobby" />敲代码
    </div>
    <div>
      <span>性别:</span>
      <input type="radio" value="男" name="sex" v-model="gender" />男
      <input type="radio" value="女" name="sex" v-model="gender" />女
    </div>
    <div>
      <span>自我介绍</span>
      <textarea v-model="intro"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      from: '',
      hobby: [],
      gender: '',
      intro: ''
    }
  }

}
</script>

```

#### 08_v-model的修饰符
  - 语法: v-model.修饰符="Vue数据变量"
    - .number 以parseFloat转成数字类型
    - .trim   去除首尾空白字符
    - .lazy   在change时触发而非input时

```js

<template>
  <div id="app">
    <div>
      <span>年龄:</span>
      <!-- .number修饰符  -把值parseFloat转为数值再赋予给v-model对应的变量 -->
      <input type="number" v-model.number="age" />
    </div>
    <div>
      <span>人生格言</span>
      <!-- .trum修饰符 -去除首尾两边的空格 -->
      <input type="text" v-model.trim="motto" />
    </div>
    <div>
      <span>个人简介</span>
      <!-- .lazy修饰符  -失去焦点内容改变时(onchange事件) 把内容同步到v-model的变量 -->
      <textarea v-model.lazy="intro"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      age: null,
      motto: '',
      intro: ''
    }
  }

}
</script>

```

#### 09_v-text和v-html
  - 语法
    - v-text="Vue数据变量"
    - v-html="Vue数据变量"

```js

<template>
  <div id="app">
    <!-- v-text 和 v-html 会覆盖差值表达式 -->
    <p v-text="str"></p>
    <p v-html="str">{{ 3 + 1 }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      str: '<span>我是span</span>'
    }
  }

}
</script>

```

#### 10_v-show和v-if
  - 控制标签的隐藏和显示
  - 语法
    - v-show="Vue变量"
    - v-if="Vue变量"
  - 原理
    - v_show用display:none隐藏(频繁切换)
    - v-if 之间从DOM树上移除
  - v-if 与 v-else 的配合使用

```js

<template>
  <div id="app">
    <h1 v-show="isShow">DX3906</h1>
    <h1 v-if="isIf">云天明</h1>

    <!-- v-if与v-else的使用 -->
    <p v-if="age >= 18">成年</p>
    <p v-else>未成年</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      isIf: true,
      age: 20
    }
  }

}
</script>

```

#### 11_v-for
  - 语法
    - v-for="(值变量,索引变量) in 目标结构"
    - v-for="值变量 in 目标结构"
  - 目标结构
    - 可以遍历数组/对象/数字
  - 注意
    - v-for的临时变量名不能到v-for范围外

```js

<template>
  <div>
    <!-- 
      语法1: v-for="(值变量名,索引变量名) in 目标结构" 
      谁循环在谁身
    -->
    <ul>
      <li v-for="(item, index) in arr" :key="index">
        {{ item }}---{{ index }}
      </li>
    </ul>
    <!-- 
      语法2: v-for="值变量名 in 目标结构"
     -->
    <ul>
      <li v-for="obj in stuArr" :key="obj.id">
        <span>{{ obj.sex }}=></span>
        <span>{{ obj.name }}</span>
        <span>{{ obj.hobby }}</span>
      </li>
    </ul>
    <!-- 
      语法3: v-for="(value,key) in 对象"
     -->
    <div>
      <p v-for="(value, key) in tObj" :key="value">
        <span>{{ value }}</span>
        ======
        <span>{{ key }}</span>
      </p>
    </div>
    <!-- 语法4:
      v-for="变量名 in 固定数字"
      从 1 开始遍历
     -->
    <div v-for="n in count" :key="n">{{ n }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: ["章北海", "云天明", "罗辑"],
      stuArr: [
        {
          id: 1001,
          name: "孙悟空",
          sex: "男",
          hobby: "吃桃子",
        },
        {
          id: 1002,
          name: "猪八戒",
          sex: "男",
          hobby: "背媳妇",
        },
      ],
      tObj: {
        name: "小黑",
        age: 18,
        class: "1期",
      },
      count: 20,
    }
  }
}
</script>


```

### Vue基础_更新监测

#### 01_v-for

  - 目标结构变化,触发v-for更新
  - 数组方法改变原数组 更新 v-for 
    - push() , pop() , shift() ,unshift() , splice() , sort() , reverse()
  - 数组方法不会改变原数组,返回新数组,就不会导致v-for更新,可采用覆盖数组或者this.$set()
    - filter() , concat() , slice()

```js

<template>
  <div>
    <ul>
      <li v-for="(val, index) in arr" :key="index">
        {{ val }}
      </li>
    </ul>
    <button @click="revBtn">数组的翻转</button>
    <button @click="sliceBtn">截取前三个元素</button>
    <button @click="updataBtn">改变第一个元素值</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [3, 9, 0, 6]
    }
  },
  methods: {
    revBtn() {
      // 1. 数组翻转可以让v-for更新
      this.arr.reverse()
    },
    sliceBtn() {
      // 2. 数组slice方法不会造成v-for更新
      // slice不会改变原数组
      // this.arr.slice(0, 3)

      // 解决 v-for更新 --- 覆盖原始值
      const newArr = this.arr.slice(0, 3)
      this.arr = newArr
    },
    updataBtn() {
      // 3. 更新某个值的时候,v-for是监测不到的
          // 直接使用数组下标索引修改内容
          // 对象新增的属性
      this.arr[0] = 100

      // 解决 -this.$set()
          //  - 参数1: 更新目标结构
          //  - 参数2: 更新位置
          //  - 参数3: 更新值
      this.$set(this.arr, 0, 333)
    }
  }

}
</script>

```

#### 02_v-for就地更新
  - 有设计虚拟DOM

```js

<template>
  <div>
    <ul>
      <li v-for="(val, ind) in arr" :key="ind">
        {{ val }}
      </li>
    </ul>
    <button @click="btn">索引1位置插入新来的</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: ['老大', '老二', '老三'],
    }
  },
  methods: {
    btn() {
      this.arr.splice(1, 0, '新来的')
    }
  }

}
</script>

```

#### 03_动态的class

  - 语法
    - :class="{类名,布尔值}" 


```js

<template>
  <div>
    <p :class="{ red: isRed }">动态操作类名</p>
    <button @click="fo">点我呀</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRed: true
    }
  },
  methods: {
    fo() {
      this.isRed = !this.isRed
    }
  }

}
</script>

<style>
p {
  font-size: 20px;
  font-weight: 700;
}

.red {
  color: green;
}
</style>

```

#### 04_动态style
  - 语法
    - :style="{css属性名:值}"

```js

<template>
  <p :style="{ color: colors, fontSize: '50px' }">动态添加style样式</p>
</template>

<script>

export default {
  data() {
    return {
      colors: 'green'
    }
  }

}
</script>

```

### Vue基础_过滤器

#### 01_过滤器的基础使用

  - 过滤器只能用在**插值表达式**和**v-bind动态属性**中
  - 过滤使用场景
    - 字符串翻转
    - 字母大小写的转换
  - 语法
    - Vue.filter('过滤器名',(值)=>{return '返回处理后的值'})
    - filters:('过滤器名',(值)=>{return '返回处理后的值'})
  - 全局过滤器在入口文件写入
  - 过滤器中无法通过this访问Vue组件实例对象

```js

<template>
  <div>
    <!-- 使用局部过滤器 -->
    <p>{{ msg | reverse }}</p>
    <!-- 全局过滤器的使用 -->
    <p :title="msg | toUp">演示全局过滤器</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello world'
    }
  },
  filters: {
    reverse(val) {
      return val.split('').reverse().join('')
    }
  }

}
</script>

```

#### 02_全局过滤器

```js

// 定义一个全局的过滤器
Vue.filter('toUp', val => {
  return val.toUpperCase()
})

```

#### 03_过滤器进阶使用

```js

<template>
  <div>
    <!-- 过滤器的进阶使用 -->
    <p>{{ msg | reverse("-", "?") }}</p>
    <p :title="msg | toUp | reverse">演示全局过滤器</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'hello world'
    }
  },
  filters: {
    reverse(val, mga, mga2) {
      return val.split('').reverse().join(mga) + mga2
    }
  }
}
</script>

```

### Vue基础_计算属性

#### 01_computed
  - 一个变量的值,依赖另外一些数据计算而来的结果
  - 计算属性名和data使用一样 **(不需要调用)**
  - 语法
```js

computed:{
    "计算属性名"(){
        return "值"    
}    
}

```
  - 计算属性也是vue数据变量,所以不要和data重名,用法和data相同

#### 02_缓存
  - 计算属性,基于依赖项的值进行缓存,依赖的变量不变,都直接从缓存取结果

#### 03_计算属性完整写法

```js

<template>
  <div>
    <input type="text" v-model="full" />
  </div>
</template>
<script>
export default {
  computed: {
    full: {
      get() {
        return '程心'
      },
      set() {
        console.log('DX3906')
      }
    }
  }
}
</script>
<style>
</style>

```

### Vue基础_侦听器

#### 01_侦听器的基本写法

  - 当需要侦听一个数据的变化时,可以使用侦听器

```js

<template>
  <div><input type="text" v-model="name" /></div>
</template>
<script>
export default {
  data() {
    return {
      name: '章北海'
    }
  },
  watch: {
    name(nv, ov) {
      console.log('nv:' + nv)
      console.log('ov:' + ov)
    }
  }

}
</script>
<style>
</style>

```

#### 02_侦听器的深度监听/立即监听

```js

<template>
  <div>
    <span>用户名: </span>
    <input type="text" v-model="obj.username" />
    <span>密码:</span>
    <input type="text" v-model="obj.password" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      obj: {
        username: '程心',
        password: 'DX3906'
      }
    }
  },
  /*
  默认情况下,侦听器侦听不到对象内部属性的变化
  需要侦听,请开启深度侦听模式
  watch: {
    监听属性: {
      handler(nv, ov) {
        侦听走进来
      },
      deep: true, // 开启深度监听
      immediate: true  // 页面加载后,先进行一次监听
    }
  }
  */
  watch: {
    obj: {
      handler(nv, ov) {
        console.log(nv)
        console.log(ov)
      },
      deep: true, // 开启深度监听
      immediate: true  // 页面加载后,先进行一次监听
    }
  }
}
</script>
<style>
</style>

```


### 组件

#### 01_概念
  - 组件是可复用的Vue实例,封装标签,样式和JS代码
  - 组件化: 封装的思想,把页面上可**重用的部分**封装为**组件**,从而方便项目的开发和维护
  - 一个页面,可以拆分成一个组件,一个组件就是一个整体,每一个组件可以有自己独立的结构样式和行为

### 生命周期
  - 从创建到销毁的整个过程就是 Vue实例的生命周期

#### 钩子函数
  - Vue框架内置函数,随着组件的生命周期阶段,自动执行
  - 作用:特定的时间点,执行特定的操作
  - 场景:组件创建完毕后,可以在created生命周期函数中发起Ajax请求,从而初始化data数据
  - 分类 
    - 初始化  beforeCreate    create
    - 挂载    beforeMount     mounted
    - 更新    beforeUpdate    updated
    - 销毁    beforeDestroy   destroyed

  - 父组件代码
```js

<template>
  <div>
    <Life v-if="isShow"></Life>
    <button @click="isShow = false">摧毁组件</button>
  </div>
</template>

<script>
import Life from './components/LifeCycle.vue'
export default {
  components: {
    Life
  },
  data() {
    return {
      isShow: true
    }
  }

}
</script>

<style>
</style>
  
```

  - 子组件代码
```

<template>
  <div>
    <h3>生命周期</h3>
    <h3 id="myH3">{{ msg }}</h3>
    <ul>
      <li v-for="(item, index) in arr" :key="index">{{ item }}</li>
    </ul>
    <button @click="arr.push('章北海')">列表加数组</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '程心',
      arr: [1, 2, 3],
      timeId: null
    }
  },
  methods: {
    fun() {
      console.log('DX3906')
    }
  },
  // 初识化之前
  beforeCreate() {
    console.log('beforeCreate')
    // data 中的数据和 methods中的方法还有没加载完
    // console.log(this.msg)
    // this.fun()
  },
  // 初始化之后
  created() {
    console.log('created')
    // 初始化结束: data methods 中的已经加载完
    // console.log(this.msg)
    // this.fun()
    //---------------------
    this.timeId = setInterval(() => {
      console.log('DX3906')
    }, 1000)
  },
  // 挂载之前
  beforeMount() {
    console.log('beforeMount')
    // const h3 = document.querySelector('#myH3')
    // console.log(h3)
  },
  // 挂载结束
  mount() {
    console.log('mount')
    // 应用场景: 如果要操作DOM元素,需要在这个构造函数中进行
    const h3 = document.querySelector('#myH3')
    console.log(h3)
  },
  // 更新之前,数据发生变化,但还没有作用到真实的DOM上
  beforeUpdate() {
    console.log('beforeCreate')
    const li = document.querySelectorAll('ul>li')[3]
    console.log(li) // undefined
  },
  // 更新之后,真实DOM更新完
  updated() {
    console.log('updated')
    const li = document.querySelectorAll('ul>li')[3]
    console.log(li)
  },
  // 销毁之前
  beforeDestroy() {
    // 应用场景: 关闭计时器,定时器,以免组件销毁后继续执行
    console.log('beforeDestroy')
    // 销毁之前 关掉定时器
    clearInterval(this.timeId)
  },
  // 销毁之后
  destroyed() {
    console.log('destroyed')
  }
}
</script>
<style>
</style>

```

2023-02-10 [吹个泡糖]