---
title: TypeScript简介
sidebar_label: TypeScript简介
sidebar_position: 1
---

## 简介
> Typed JavaScript at Any Scale.添加了类型系统的 JavaScript，适用于任何规模的项目。
> 它强调了 TypeScript 的两个最重要的特性——类型系统、适用于任何规模。

### TypeScript 的特性

#### 类型系统

从 TypeScript 的名字就可以看出来，「类型」是其最核心的特性。
我们知道，JavaScript 是一门非常灵活的编程语言：
- 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。
- 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。
- 函数是 JavaScript 中的一等公民，可以赋值给变量，也可以当作参数或返回值。
这种灵活性就像一把双刃剑，一方面使得 JavaScript 蓬勃发展，无所不能，从 2013 年开始就一直蝉联最普遍使用的编程语言排行榜冠军；另一方面也使得它的代码质量参差不齐，维护成本高，运行时错误多。

而 TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点。

#### TypeScript 是静态类型

类型系统按照「类型检查的时机」来分类，可以分为动态类型和静态类型。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。JavaScript 是一门解释型语言，没有编译阶段，所以它是动态类型，以下这段代码在运行时才会报错：

```js
let foo = 1;
foo.split(' ');
// Uncaught TypeError: foo.split is not a function
// 运行时会报错（foo.split 不是一个函数），造成线上 bug
```

静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 TypeScript 是静态类型，这段 TypeScript 代码在编译阶段就会报错了：

```js
let foo = 1;
foo.split(' ');
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

JavaScript 代码都只需要经过少量的修改（或者完全不用修改）就变成 TypeScript 代码，这得益于 TypeScript 强大的**类型推论**，即使不去手动声明变量 foo 的类型，也能在变量初始化时自动推论出它是一个 number 类型。

完整的 TypeScript 代码是这样的：

```ts
let foo: number = 1;
foo.split(' ');
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

#### Typescript是弱类型

类型系统按照**是否允许隐式类型转换**来分类，可以分为强类型和弱类型。

以下这段代码不管是在 JavaScript 中还是在 TypeScript 中都是可以正常运行的，运行时数字 1 会被隐式类型转换为字符串 '1'，加号 + 被识别为字符串拼接，所以打印出结果是字符串 '11'。

```js
console.log(1 + '1');
// 打印出字符串 '11'
```

TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以它们都是弱类型。

作为对比，Python 是强类型，以下代码会在运行时报错：

```python
print(1 + '1')
# TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

若要修复该错误，需要进行强制类型转换：

```python
print(str(1) + '1')
# 打印出字符串 '11'
```
> 强/弱是相对的，Python 在处理整型和浮点型相加时，会将整型隐式转换为浮点型，但是这并不影响 Python 是强类型的结论，因为大部分情况下 Python 并不会进行隐式类型转换。相比而言，JavaScript 和 TypeScript 中不管加号两侧是什么类型，都可以通过隐式类型转换计算出一个结果——而不是报错——所以 **JavaScript 和 TypeScript 都是弱类型**。

>虽然 TypeScript 不限制加号两侧的类型，但是我们可以借助 TypeScript 提供的类型系统，以及 ESLint 提供的代码检查功能，来限制加号两侧必须同为数字或同为字符串。这在一定程度上使得 TypeScript 向「强类型」更近一步了——当然，这种限制是可选的。



### TypeScript 开发环境的搭建
1. 下载Node.js
[Node.js地址](https://nodejs.org/en) 

2. 全局安装TypeScript
   - 进入命令行
   - 输入: npm i -g typescript
3. 创建一个ts文件
4. 使用tsc对ts文件进行编译
   -  在ts文件所在的目录下执行 tsc xxx.ts

### Hello TypeScript

执行hello.ts中代码:

```Ts
function sayHello(person: string) {
    return 'Hello, ' + person
}

let user = '章北海';
console.log(sayHello(user))
```

执行

```nodejs
tsc hello.ts
```

会生成一个编译好的hello.js文件:

```js
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = '章北海';
console.log(sayHello(user));
```

在TypeScript中,我们可以使用:指定变量的类型， : 的前后有没有空格都可以

上述例子中，我们用 : 指定 person 参数类型为 string。但是编译为 js 之后，并没有什么检查的代码被插入进来。

这是因为 **TypeScript 只会在编译时对类型进行静态检查**，如果发现有错误，编译的时候就会报错。而在**运行时**，与普通的 JavaScript 文件一样，**不会对类型进行检查**。

要保证运行时的参数类型，还是得手动对类型进行判断:

```js
function sayHello(person: string) {
    if (typeof person === 'string') {
        return 'Hello, ' + person;
    } else {
        throw new Error('person is not a string');
    }
}
let user = '章北海';
console.log(sayHello(user));
```

这段代码在编译器中会提示错误，但是还会生成.js文件
```js
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = [0, 1, 2];
console.log(sayHello(user));
```

**这是因为 TypeScript 编译的时候即使报错了，还是会生成编译结果，我们仍然可以使用这个编译之后的文件。**