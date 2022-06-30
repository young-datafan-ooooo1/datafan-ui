# TypeScript

## TypeScript 是什么

::: tip
TypeScript 是 JavaScript 类型的超集，它可以编译成纯 JavaScript。TypeScript 可以在任何浏览器、任何计算机和任何操作系统上运行，并且是开源的。
:::

以上是[官网](https://www.tslang.cn/)对于 TypeScript 的定义。

TypeScript 简称 TS，既是一门新语言，也是 JS 的一个超集，它是在 JavaScript 的基础上增加了一套类型系统，它支持所有的 JS 语句，为工程化开发而生，最终在编译的时候去掉类型和特有的语法，生成 JS 代码。

### **Typescript 的设计初衷**

::: tip
关于 JavaScript 有一个段子：动态一时爽，重构地雷场。
:::

在大型应用的开发过程中，由于 JavaScript 动态语言与弱类型的语言特性，随着成员数量的增加、代码量的增长、业务场景复杂度的上升，文档及单元测试的缺失等情况，暴露出了以下问题：

- 类型错误多，bug 率居高不下。
- 缺少文档、新成员理解应用逻辑困难。
- 维护成本高、可扩展性差。

在软件开发过程中，随着需求的变化和系统规模的增大，项目不可避免地趋于复杂，最终造成了项目中后期进度缓慢的情形 。如何对软件复杂度及其增长速率进行有效控制，便成为一个日益突出的问题。Typescript 正是在这种情况下，应运而生的。

### TypeScript 和 JavaScript 的区别

| **TypeScript**                                 | **JavaScript**                           |
| ---------------------------------------------- | ---------------------------------------- |
| JavaScript 的超集用于解决大型项目的代码复杂性  | 一种脚本语言，用于创建动态网页           |
| 可以在编译期间发现并纠正错误                   | 作为一种解释型语言，只能在运行时发现错误 |
| 强类型，支持静态和动态类型                     | 弱类型，没有静态类型选项                 |
| 最终被编译成 JavaScript 代码，使浏览器可以理解 | 可以直接在浏览器中使用                   |

::: tip

- 什么是动态？什么是静态？

  动态语言是指在运行期间才去做数据类型检测的语言。静态语言是指在编译期间对数据类型进行检查的语言。

- 强类型语言？弱类型语言？

  强类型语言是一种强制类型定义的语言，即一旦某一个变量被定义类型，如果不经强制转换，那么它永远就是该数据类型。
  弱类型语言是一种弱类型定义的语言，某一个变量被定义类型，该变量可以根据环境变化自动进行转换，不需要经过现行强制转换。
  :::

### TypeScript 的两大特性

- 静态类型检查
- 面向对象特性

### TypeScript 的优点

- **静态输入**
  静态类型化是一种功能，可以在进行编写脚本时检测错误。查找并修复错误，对于编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。

- **全面支持面向对象**
  为了更好地进行项目的开发，TypeScript 完全**支持面向对象**，它引入了类，对象，接口等概念，同时它也支持封装，继承等特性，用它进行开发，你的代码将完全符合**OOP 特性**（Object Oriented Programming），代码将会变得非常好维护。

- **大型的开发项目**
  有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。而使用 TypeScript 工具来进行重构更变的容易、快捷。

- **更好的协作**
  当发开大型项目时，会有许多开发人员，此时乱码和错误的机也会增加。类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

## TypeScript 开发环境的搭建

我们需要使用到 `npm` 工具安装。

### NPM 安装 TypeScript

如果你的本地环境已经安装了`npm`工具，可以使用以下命令来安装。

使用国内镜像：

```shell
npm config set registry https://registry.npmmirror.com
```

安装 typescript：

```shell
npm install -g typescript
```

以上命令会在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行 `tsc` 命令了。

### Hello TypeScript

新建一个 `hello.ts` 的文件，代码如下：

```typescript
function sayHello(person: string) {
  return 'Hello, ' + person
}

let user = 'Tom'
console.log(sayHello(user))
```

然后执行

```shell
tsc hello.ts
```

这时候会生成一个编译好的文件 hello.js：

```javascript
function sayHello(person) {
  return 'Hello, ' + person
}
var user = 'Tom'
console.log(sayHello(user))
```

在 TypeScript 中，我们使用 `:` 指定变量的类型。

上述例子中，我们用 `:` 指定 **person** 参数类型为 **string**。但是编译为 js 之后，并没有什么检查的代码被插入进来。

这是因为**TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。

## TypeScript 的类型系统

### 原始类型

JavaScript 原始类型也同样适应于 TypeScript 的类型系统

```typescript
// 在 JavaScript 中
const str = 'Hello World' // 字符串
const num = 1 // 数值
const bool = true // 布尔值

// 在 TypeScript 中
const str: string = 'Hello World' // 字符串
const num: number = 1 // 数值
const bool: boolean = true // 布尔值
```

不过在实际的编程过程中，原始数据类型的类型定义是可以省略的，因为 TypeScript 会根据你声明变量时赋值的类型，自动帮你推导变量类型，也就是可以跟平时写 JavaScript 一样。

### 数组（array）

TypeScript 像 JavaScript 一样可以操作数组元素。

在 JavaScript 中定义数组通常采用以下方式：

```javascript
// 直接定义
var list = [1, 2, 3]

// 采用构建函数方式
var list = new Array()
```

在 TypeScript 中，通常采用两种方式定义数组。 第一种，可以**在元素类型后面接上** `[]`，表示由此类型元素组成的一个数组：

```typescript
// 表示数值数组
let list: number[] = [1, 2, 3]
```

第二种方式是**使用数组泛型**，`Array<元素类型>`：

```typescript
let list: Array<number> = [1, 2, 3]
```

### 函数（function）

::: tip
函数是 JavaScript 应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块。 在 TypeScript 里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义 *行为*的地方。 TypeScript 为 JavaScript 函数添加了额外的功能，让我们可以更容易地使用。
:::

**函数的写法**

在 JavaScript ，函数有很多种写法：比如函数声明、函数表达式、箭头函数以及对象上的方法等等。在 TypeScript 中，函数的写法就是**把类型写在参数后面，返回值写在圆括号后面**。

```typescript
// 函数声明写法
// 在 JavaScript 中
function sum1(x, y) {
  return x + y
}

// 在 TypeScript 中
function sum1(x: number, y: number): number {
  return x + y
}
```

也可以通过添加`?`来定义可选属性。

**函数的重载**

在实际开发中，你可能会接触到一个 API 有多个 TS 类型的情况，比如 Vue 的 watch API 。
Vue 的这个 watch API 在被调用时，需要接收一个数据源参数，当监听单个数据源和多个数据源时，需要匹配不同的类型。

```typescript
// 用函数重载
function greet(name: string): string // TS 类型
function greet(name: string[]): string[] // TS 类型
function greet(name: string | string[]) {
  if (Array.isArray(name)) {
    return name.map((n) => `Welcome, ${n}!`)
  }
  return `Welcome, ${name}!`
}

// 单个问候语
const greeting = greet('Petter') // 此时只有一个类型 string
console.log(greeting) // Welcome, Petter!

// 多个问候语
const greetings = greet(['Petter', 'Tom', 'Jimmy']) // 此时只有一个类型 string[]
console.log(greetings) // [ 'Welcome, Petter!', 'Welcome, Tom!', 'Welcome, Jimmy!' ]

// 当不用函数重载时，在入参和返回值的类型这里，显得非常乱
function greet(name: string | string[]): string | string[] {
  if (Array.isArray(name)) {
    return name.map((n) => `Welcome, ${n}!`)
  }
  return `Welcome, ${name}!`
}

// 在调用函数时，定义的变量也无法准确的获得它们的类型
// 此时这个变量依然可能有多个类型，增加了编码时的心智负担
const greeting: string | string[]
```

第 1 行是函数的 TS 类型，告知 TypeScript ，当入参为 **string** 类型时，返回值也是 **string** ;

第 2 行也是函数的 TS 类型，告知 TypeScript ，当入参为 **string[]** 类型时，返回值也是 **string[]** ;

第 3 行开始才是真正的函数体，这里的函数入参需要把可能涉及到的类型都写出来，用以匹配前两行的类型，并且这种情况下，函数的返回值类型可以省略，因为在第 1 、 2 行里已经定义过返回类型了。

### 接口（interfaces）

在 TypeScript 中，我们使用**接口（Interfaces）**来定义对象的类型。可以通过添加`?`来定义可选属性，`readonly`来定义**只读属性**。同样接口也可以调用自己身接口的属性以及可以继承其他接口。

接口只定义对象的结构，而不考虑实际值。

实现接口就是使类满足接口的要求，通过使用关键字`implements`

```typescript
interface UserItem {
  name: string
  // 可选属性
  age?: number
  enjoyFoods: string[]
  friendList: UserItem[]
}

// 这里Admin继承了 UserItem 的所有属性类型，并追加了一个权限等级属性
interface Admin extends UserItem {
  permissionLevel: number
}

const admin: Admin = {
  name: 'Petter',
  age: 18,
  friendList: [
    {
      name: 'Marry',
      age: 16,
      enjoyFoods: ['pizza', 'ice cream'],
      friendList: [],
    },
  ],
  permissionLevel: 1,
}
```

如果继承过程中不需要那么多属性，可以通过 `Omit` 帮助类型来实现

```typescript
type Omit<T, K extends string | number | symbol>
```

其中 `T` 代表已有的一个对象类型， `K` 代表要删除的属性名，如果只有一个属性就直接是一个字符串，如果有多个属性，用 `|` 来分隔开，通过以下方式就是删除了两个不需要的属性：

```typescript
// 这里在继承 UserItem 类型的时候，删除了两个多余的属性
interface Admin extends Omit<UserItem, 'enjoyFoods' | 'friendList'> {
  permissionLevel: number
}
```

### 任意值（any）

类型定义使用`any`可以让 TypeScript 将**类型检查关闭**，`any`能够兼容所有的类型（包括它自己）。所有类型都能被赋值给它，它也能被赋值给其他任何类型。

```typescript
let power: any

// 赋值任意类型
power = '123'
power = 123

// 它也兼容任何类型
let num: number
power = num
num = power

// 在任意值上访问任何属性都是允许的，也允许调用任何方法
```

当你把 JavaScript 迁移至 TypeScript 时，你将会经常性使用`any`。但你必须减少对它的依赖，因为你需要**确保类型安全**。当使用`any`时，你基本上是在告诉 TypeScript 编译器不要进行任何的类型检查。

### Unknown

简单来说，`unknown`就是安全版的`any`，它跟`any`的区别在于使用`unknown`时会结合类型守卫等方式，可以确保上游数据结构不确定时，也能让代码正常执行。

```typescript
function format1(value: any) {
  value.toFixed(2) // 不飘红，想干什么干什么，very dangerous
}

function format2(value: unknown) {
  value.toFixed(2) // 代码会飘红，阻止你这么做

  // 你需要收窄类型范围，例如：
  // 1、类型断言 —— 不飘红，但执行时可能错误
  ;(value as Number).toFixed(2)

  // 2、类型守卫 —— 不飘红，且确保正常执行
  if (typeof value === 'number') {
    // 推断出类型: number
    value.toFixed(2)
  }
}
```

### Void

某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```typescript
function sayHello(): void {
  console.log('Hello world')
}
```

### Null 和 Undefined

TypeScript 里，`undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`。 和 `void`相似，它们的本身的类型用处不是很大。

### Never

`never` 类型表示的是空类型，也就是值永不存在的类型。

值会永不存在的两种情况：

1. 如果一个函数执行时抛出了**异常**，那么这个函数永远不存在返回值。
2. 函数中执行无限循环的代码（**死循环**），使得程序永远无法运行到函数返回值那一步，永不存在返回。

```typescript
// 异常
function err(msg: string): never {
  // OK
  throw new Error(msg)
}

// 死循环
function loopForever(): never {
  // OK
  while (true) {}
}
```

### 元组类型（Tuple）

JavaScript 并不支持元组，通常只能使用数组来表示元组。

而 TypeScript 支持它，可以使用 :`[typeofmember1,typeofmember2]`的形式，为元组**添加类型注解**，元组可以包含**任意数量**的成员。其实就是个固定长度的数组。

```typescript
let nameNumber: [string, number]

nameNumber = ['Tom', 123456]

nameNumber = ['Tom', '123456'] // Error

// 同时还可以使用解构
const [name, num] = nameNumber
```

### 枚举（enum）

枚举是组织收集有关联变量的一种方式，许多程序语言（如：c/c#/Java）都有枚举数据类型。下面是定义一个 TypeScript 枚举类型的方式：

```typescript
enum UpdateMode {
  MANUAL = 'MANUAL',
  ROUTEINE = 'ROUTEINE',
}

// 简单的使用枚举类型
let Mode = UpdateMode.MANUAL

// 类型安全
Mode = 1 // Error:  不能赋值
```

如果枚举的 UpdateMode 在后期维护中去除了其中的 MANUAL，那么下方对于 Mode 的定义赋值就会报错，便于定位问题。

同时要是 MANUAL 的值发生了改变，只需要修改枚举值即可，不像 JavaScript 需要全局查找 "MANUAL" 进行修改替换。

所以相较于 JavaScript 直接使用值类型去做判断，**枚举的用法提升了代码的可读性和易维护性**。

### 联合类型（Union Types）

在 JavaScript 中，可能希望属性为多种类型之一，比如字符串或者数组。这时候就可以使用 TypeScript 中的联合类型（它使用 | 作为标记，如 string | number）。
关于联合类型，一个常见的用例是一个可以接受字符串数组或单个字符串的函数：

```typescript
function formatCommandline(command: string[] | string) {
  let line = ''
  if (typeof command === 'string') {
    line = command.trim()
  } else {
    line = command.join(' ').trim()
  }
}
```

### 交叉类型（Intersection Types）

交叉类型是将多个类型合并为一个类型。这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```typescript
interface A {
  name: string
  sex: number
}

interface B {
  age: number
  sex: number
}

type C = A & B // C 将包含 A 和 B 中共有的属性
let demo: C = { name: 'xxx', age: 18, sex: 1 }

type D = string | number
type E = string | boolean
type F = D & E // F 将是 string 类型

type G = number
type H = boolean
type I = G & H // I 将是 never 类型
```

### 类型别名

TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 **type SomeName = Some Valid Type Annotation** 来创建别名。

```typescript
type StrOrNum = string | number
// 如果后面的类型种类有很多时，在使用时就可以用类型别名代替，不需要一一列举

// 使用
let sample: StrOrNum
sample = 123
sample = '123'

// 会检查类型
sample = true // Error
```

类型别名可以简化类型的使用。

### type 与 interface 的异同

类型别名用来给一个类型起个新名字，使用`type`创建类型别名，类型别名不仅可以用来表示基本类型，还可以用来表示对象类型、联合类型、元祖和交集。

接口是命名数据结构(例如对象)的另一种方式；与 type 不同，`interface`仅限于描述对象类型。

#### **interface 与 type 的相似之处**

- 都可以描述 Object 和 Function，两者都可以用来描述对象或函数，但语法不同。
- 二者都可以被继承，interface 和 type 都可以被继承，具体的形式稍有差别，interface 是通过 extends 实现的，type 是通过&实现的。

```typescript
interface Person {
  name: string
}

type Student = Person & { stuNo: number }

interface Student extends Person {
  stuNo: number
}
```

- 实现 implements，类可以实现 interface 以及 type（除联合类型外）

#### **interface 与 type 的区别**

- type 可以定义 **基本类型的别名**，如 `type myString = string`

- type 可以通过 **typeof** 操作符来定义，如 `type myType = typeof someObj`

- type 可以申明 **联合类型**，如 `type unionType = myType1 | myType2`

- type 可以申明 **元组类型**，如 `type yuanzu = [myType1, myType2]`

- 声明合并，如果你多次声明一个同名的`interface`，typescript 会将它们合并到一个声明中，并将它们视为一个接口，这称为**声明合并**。如果是`type`的话，重复使用会报错。

  ```typescript
  interface test {
    name: string
  }
  interface test {
    age: number
  }

  /*
  test实际为 {
    name: string
    age: number
  }
  */
  ```

### 类型断言

TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。

类型断言的一个常见用例是当你从 JavaScript 迁移到 TypeScript 时：

```typescript
const foo = {}
foo.bar = 123 // Error: 'bar' 属性不存在于 ‘{}’
foo.bas = 'hello' // Error: 'bas' 属性不存在于 '{}'
```

这里的代码发出了错误警告，因为 `foo` 的类型推断为 `{}`，即没有属性的对象。因此，你不能在它的属性上添加 `bar` 或 `bas`，你可以通过类型断言来避免此问题：

```typescript
interface Foo {
  bar: number
  bas: string
}

const foo = {} as Foo
foo.bar = 123
foo.bas = 'hello'
```

请不要滥用类型断言，只在你能够确保代码正确的情况下去使用它，我们来看一个反例：

```typescript
// 原本要求 age 也是必须的属性之一
interface User {
  name: string
  age: number
}

// 但是类型断言过程中，你遗漏了
const petter = {} as User
petter.name = 'Petter'

// TypeScript 依然可以运行下去，但实际上你的数据是不完整的
console.log(petter) // { name: 'Petter' }
```

### 类型推论

在实际的编程过程中，原始数据类型的类型定义是可以省略的，因为 TypeScript 会根据你声明变量时赋值的类型，自动帮你推导变量类型，这其实是 TypeScript 的类型推论功能。

下面这个变量这样声明是 OK 的，因为 TypeScript 会帮你推导 `msg` 是 `string` 类型。

```typescript
// 相当于 msg: string
let msg = 'Hello World'

// 所以要赋值为 number 类型时会报错
msg = 3 // Type 'number' is not assignable to type 'string'
```

下面这段代码也是可以正常运行的，因为 TypeScript 会根据 `return` 的结果推导 `getRandomNumber` 的返回值是 `number` 类型，从而推导变量 `num` 也是 `number` 类型。

```typescript
// 相当于 getRandomNumber(): number
function getRandomNumber() {
  return Math.round(Math.random() * 10)
}

// 相当于 num: number
const num = getRandomNumber()
```

类型推论的前提是变量在声明时有明确的值，如果一开始没有赋值，那么会被默认为 `any` 类型。

```typescript
// 此时相当于 foo: any
let foo

// 所以可以任意改变类型
foo = 1 // 1
foo = true // true
```

### 泛型（Generics）

#### 泛型是什么

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

#### 为什么使用泛型

::: tip
软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

在像 C# 和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。
:::

设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：

- 类的实例成员
- 类的方法
- 函数参数
- 函数返回值

下面是快速创建数字类型的队列：

```typescript
class QueueNumber {
  private data = []
  push = (item: number) => this.data.push(item)
  pop = (): number => this.data.shift()
}

const queue = new QueueNumber()

queue.push(0)
queue.push('1') // Error: 不能推入一个 `string` 类型，只能是 `number` 类型
```

当我们想要想创建一个字符串的队列时，将不得不再次修改相当大的代码。我们真正想要的一种方式是无论什么类型被推入队列，被推出的类型都与推入类型一样。当你使用泛型时，这会很容易：

```typescript
/ 创建一个泛型类
class Queue<T> {
  private data: T[] = [];
  push = (item: T) => this.data.push(item);
  pop = (): T | undefined => this.data.shift();
}

// 简单的使用
const queue = new Queue<number>();
queue.push(0);
queue.push('1'); // Error：不能推入一个 `string`，只有 number 类型被允许
```

通常在决定是否使用泛型时，我们有以下两个参考标准：

- 当你的函数、接口或类将处理多种数据类型时。
- 当函数、接口或类在多个地方使用该数据类型时。

#### 泛型配合 axios 使用

通常情况下，我们会把后端返回数据格式单独放入一个 `interface` 里：

```typescript
// 请求接口数据
export interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number

  /**
   * 数据
   * @type { T }
   */
  result: T

  /**
   * 消息
   * @type { string }
   */
  message: string
}
```

当我们把 API 单独抽离成单个模块时：

```typescript
// 在 axios.ts 文件中对 axios 进行了处理，例如添加通用配置、拦截器等
import Ax from './axios'

import { ResponseData } from './interface.ts'

export function getUser<T>() {
  return Ax.get<ResponseData<T>>('/somepath')
    .then((res) => res.data)
    .catch((err) => console.error(err))
}
```

接着我们写入返回的数据类型`User`，这可以让 TypeScript 顺利推断出我们想要的类型：

```typescript
interface User {
  name: string
  age: number
}

async function test() {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser<User>()
}
```

#### 泛型约束

有时我们可能希望限制每个类型变量接受的类型数量，这就是泛型约束的作用。

有时候，我们希望类型变量对应的类型上存在某些属性。这时，除非我们显式地将特定属性定义为类型变量，否则编译器不会知道它们的存在。

比如在处理字符串或数组时，我们会假设 `length` 属性是可用的。我们使用 `identity` 函数并尝试输出参数的长度：

```typescript
function identity<T>(arg: T): T {
  console.log(arg.length) // Error
  return arg
}
```

在这种情况下，编译器将不会知道 `T` 确实含有 `length` 属性，尤其是在可以将任何类型赋给类型变量 `T` 的情况下。我们需要做的就是让类型变量 `extends` 一个含有我们所需属性的接口，比如这样：

```typescript
interface Length {
  length: number
}

function identity<T extends Length>(arg: T): T {
  console.log(arg.length) // 可以获取length属性
  return arg
}
```

`T extends Length` 用于告诉编译器，我们支持已经实现 `Length` 接口的任何类型。之后，当我们使用不含有 `length` 属性的对象作为参数调用 `identity` 函数时，TypeScript 会提示相关的错误信息。

此外，我们还可以使用 `,` 号来分隔多种约束类型，比如：`<T extends Length, Type2, Type3>`。而对于上述的 `length` 属性问题来说，如果我们显式地将变量设置为数组类型，也可以解决该问题，具体方式如下：

```typescript
function identity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

// or
function identity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}
```

#### 泛型常用工具类型

为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。

**Partial**

::: tip
`Partial<T>` 的作用就是将某个类型里的属性全部变为可选项 `?`。
:::

```typescript
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

首先通过 `keyof T` 拿到 `T` 的所有属性名，然后使用 `in` 进行遍历，将值赋给 `P`，最后通过 `T[P]` 取得相应的属性值。中间的 `?` 号，用于将所有属性变为可选。

**示例**

```typescript
interface Todo {
  title: string
  description: string
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate }
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter',
}

const todo2 = updateTodo(todo1, {
  description: 'throw out trash',
})
```

在上面的 `updateTodo` 方法中，我们利用 `Partial<T>` 工具类型，定义 `fieldsToUpdate` 的类型为 `Partial<Todo>`，即：

```typescript
{
   title?: string | undefined;
   description?: string | undefined;
}
```

**Record**

::: tip
`Record<K extends keyof any, T>` 的作用是将 `K` 中所有的属性的值转化为 `T` 类型。
:::

```typescript
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

**示例**

```typescript
interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

const x: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' },
}
```

**Pick**

::: tip
`Pick<T, K extends keyof T>` 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。
:::

```typescript
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

**示例**

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}
```

**Exclude**

::: tip
`Exclude<T, U>` 的作用是将某个类型中属于另一个的类型移除掉。
:::

```typescript
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T
```

如果 `T` 能赋值给 `U` 类型的话，那么就会返回 `never` 类型，否则返回 `T` 类型。最终实现的效果就是将 `T` 中某些属于 `U` 的类型移除掉。

**示例**

```typescript
type T0 = Exclude<'a' | 'b' | 'c', 'a'> // "b" | "c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // "c"
type T2 = Exclude<string | number | (() => void), Function> // string | number
```

**ReturnType**

::: tip
`ReturnType<T>` 的作用是用于获取函数 `T` 的返回类型。
:::

```typescript
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any
```

**示例**

```typescript
type T0 = ReturnType<() => string> // string
type T1 = ReturnType<(s: string) => void> // void
type T2 = ReturnType<<T>() => T> // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T> // number[]
```

## TypeScript 的面向对象

### 类的创建

我们使用 class 进行类的声明和创建，其中的属性和方法直接进行定义，之后可以使用`static`和`readonly`对属性、方法进行修饰。

```typescript
// 定义一个类
class User {
  // 实例属性，需要通过对象的实例去访问
  // 例如：const user = new User()，通过user.age访问
  name: string
  // 静态属性，可以直接通过类访问
  // 用static关键字可以定义类属性，此时通过实例访问该属性会报错，只能通过类访问，例如：User.age
  static age: number = 18
  // 只读属性
  readonly sex: string = '男'

  // constructor 上的数据需要先这样定好类型
  // 入参也要定义类型
  constructor(userName: string) {
    this.name = userName
  }

  // 方法定义
  getName() {
    console.log(this.name)
  }
  // 静态方法，同理通过类直接访问
  static sayhello() {
    console.log('say hello')
  }
}
```

### 构造函数

可以使用`constructor`定义一个构造器方法。

```typescript
class Dog {
  name: string
  age: number
  // 构造函数会在对象创建时调用
  constructor(name: string, age: number) {
    // 在实例方法中，this就表示当前的实例
    this.name = name
    this.age = age
  }
  bark() {
    // 通过this表示当前调用方法的对象
    console.log(this.name)
  }
}

// 相当于调用了Dog中的constructor
const dog = new Dog('小黄', 3)
console.log(dog)
dog.bark()
```

### 继承

在 TypeScript 里，我们可以使用常用的面向对象模式。基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。通过继承可以将其他类中的属性和方法引入到当前类中。

```typescript
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`)
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)
```

这个例子展示了最基本的继承：类从基类中继承了属性和方法。 这里， `Dog`是一个**派生类**，它派生自 `Animal` **基类**，通过 `extends`关键字。 派生类通常被称作**子类**，基类通常被称作 **超类**。

因为 `Dog`继承了 `Animal`的功能，因此我们可以创建一个 `Dog`的实例，它能够 `bark()`和 `move()`。

- 通过继承可以将多个类中共有的代码写在同一个父类中，这样只需要写一次即可让所有的子类都同时拥有父类中的属性。
- 如果希望在子类中添加一些父类中没有的属性或方法直接添加即可。
- 如果在子类中添加了和父类相同的方法，则子类方法会覆盖掉父类中方法，这种覆盖的形式成为**重写**。

**super 关键字**

```typescript
class Dog extends Animal {
  constructor(name: string, age: number) {
    // 如果在子类中写了构造函数，在子类构造函数中必须对父类的构造函数进行调用
    super(name) // 调用父类的构造函数，否则会有语法错误
    this.age = age
  }
  bark() {
    // 在类方法中super就表示当前类的父亲
    // super.move()
    console.log('Woof! Woof!')
  }
}
```

**抽象类**

以`abstract`开头的类就是抽象类，抽象类与其他类的区别不大，只是不能用来创建对象，换句话说，就是专门用来被继承的类。

```typescript
abstract class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  // 定义一个抽象方法，抽象方法用abstract开头，没有方法体
  // 抽象方法只能定义在抽象类中，并且子类必须对抽象方法进行重写
  abstract move(): void
}
```

### 接口

在传统的面向对象的编程中，一个类可以扩展另一个类，也可以实现一个或多个接口；实现一个接口可以被看作是签署了一份协议，必须遵守它的规则。接口的规则是属性和方法的签名，我们必须实现它们；

在 TypeScript 中接口有两点不同：

- 接口可以扩展其他接口或者类；
- 接口可以定义数据和行为而不只是行为；

```typescript
interface myinterface {
  name: string
  age: number
}

const obj: myinterface = {
  name: 'yueyue',
  age: 18,
}
console.log(obj)
```

### 封装

::: tip
对象实质上就是属性和方法的容器，它的主要作用就是存储属性和方法，这就是所谓的封装

默认情况下，对象的属性是可以任意的修改的，为了确保数据的安全性，在 TS 中可以对属性的权限进行设置
:::

- 静态属性（static）

  声明为`static`的属性或方法不再属于实例，而是属于类的属性。

- 只读属性（readonly）

  如果在声明属性时添加一个`readonly`，则属性便成了只读属性无法修改。

- TS 中属性具有三种修饰符

  - `public`（默认值），修饰的属性可以在任意位置访问和修改。

  - `protected`，可以在当前类和当前类的子类中访问和修改。

  - `private`，私有属性，只能在类内部进行访问和修改，可通过在类中添加方法使得私有属性可以被外部方法访问。

```typescript
class Dog {
  private _name: string
  private _age: number
  // 构造函数
  constructor(name: string, age: number) {
    this._name = name
    this._age = age
  }
  // 通过在类中添加方法使得私有属性可以被外部方法访问
  getName() {
    return this._name
  }
  setName(name: string) {
    this._name = name
  }
  // ts中可以设置getter的方法
  get age() {
    return this._age
  }
  set age(value: number) {
    this._age = value
  }
  bark() {
    console.log(this._name)
  }
}

const dog = new Dog('小黄', 3)
dog.setName('小白')
console.log(dog.getName())
dog.age = 4
console.log(dog.age)
```

### 泛型

```typescript
function fn<T>(name: T): T {
  return name
}

console.log(fn(10))
console.log(fn<string>('name'))

interface inter {
  length: number
}

function fn1<T extends inter>(a: inter): number {
  return a.length
}

console.log(fn1({ length: 45 }))
```

## 了解 tsconfig.json

TypeScript 项目一般都会有一个 `tsconfig.json` 文件，放置于项目的根目录下，这个文件的作用是用来管理 TypeScript 在编译过程中的一些选项配置。

在命令行输入 `tsc --init` ，这是 TypeScript 提供的初始化功能，会生成一个默认的 `tsconfig.json` 文件。

```json
{
  // tsconfig.json是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译
  "compilerOptions": {
    // target 用来指定ts被编译为的ES的版本，esnext表示最新版本的es
    "target": "esnext",

    // module 指定要使用的模块化的规范
    "module": "esnext",

    // 所有严格检查的总开关
    "strict": true,

    // 用来设置编译后的文件是否使用严格模式，默认 为false（当有模块代码的时候，已经默认为严格模式）
    // "alwaysStrict": false,

    // 不允许隐式的any类型
    // "noImplicitAny": false,

    // 不允许不明确类型的this
    // "noImplicitThis": false,

    // 严格的检查空值
    // "strictNullChecks": false,

    // lib 用来指定项目中要使用的库
    "lib": ["esnext", "dom"]

    // outDir 用来制定编译后文件所在的目录
    // "outDir": "./dist"

    // outFile 设置将代码合并为一个文件
    // 设置 outFile 后，所有的全局作用域中的代码会合并到同一个文件中
    // 当想把多个模块合并为一个文件，module 要指定 amd 或者 system
    // "outFile": "./dist/app.js"

    // 是否对js文件进行编译，默认是false
    // "allowJs": false

    // 是否检查js代码符合语法规范，默认是false
    // "checkJs": false

    // 是否移除注释
    // "removeComments": false

    // 不生成编译后的文件
    // "noEmit": false

    // 当有错误时不生成编译后的文件
    // "noEmitOnError": false
  },

  // include 用来指定哪些ts文件需要被编译
  // 路径：** 表示任意目录 * 表示任意文件
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],

  // exclude 不需要被编译的文件目录
  // "exclude": [],

  "references": [{ "path": "./tsconfig.node.json" }]
}
```

完整的选项可以查看 TypeScript 官网：[tsconfig - typescriptlang](https://www.typescriptlang.org/tsconfig/)

一般在构建项目的时候会自动提前配置好通用的选项，只需要在不满足条件的情况下去调整就可以了。

## TS 在 vue3 中的使用

### 了解 setup 和 defineComponent

Vue 3 的 Composition API 系列里，推出了一个全新的 `setup` 函数，它是一个组件选项，在创建组件之前执行，一旦 props 被解析，将作为组合式 API 的入口点。

**基本用法**

```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  // defineComponent，是为了更好的类型检查
  setup(props, context) {
    // 业务代码写这里...

    return {
      // 需要给 template 用的数据、函数放这里 return 出去...
    }
  },
})
```

`defineComponent` 是 Vue 3 推出的一个全新 API ，可以用于 TypeScript 的类型推导，帮你简化掉很多编写过程中的类型定义。在编写组件的过程中，你只需要维护自己定义的数据类型就可以了，专注于业务。

### 了解响应式 API

vue3 在生命周期里取消了 Vue 实例的 `this`，此时调用响应式数据要用到的比如 `ref` 、`reactive` 等响应式 API ，都必须通过导入才能使用，然后在 `setup` 里定义。

**ref**

我们在进行类型声明时，想要保证数据的响应性，就需要用到这些 API。同时基于 TypeScript 语法的类型声明写法会有所不同。

```typescript
// 在ts语法中定义
const msg: string = 'Hello World!'

// 在使用 ref 时，需要使用 <> 来包裹类型定义
const msg = ref<string>('Hello World!')
```

需要注意的是，被 `ref` 包裹的变量会全部变成对象，不管你定义的是什么类型的值，都会转化为一个 ref 对象，其中 ref 对象具有指向内部值的单个 property `.value`。

所以我们要进行变量的读取与赋值时，需要通过 `xxx.value`。

**reactive**

`reactive` 是继 `ref` 之后最常用的一个响应式 API 了，相对于 `ref`，它的局限性在于只适合对象、数组。

不同在于`reactive`对象在读取字段的值，或者修改值的时候，与普通对象是一样的。

```typescript
// 声明对象的格式
interface Member {
  id: number
  name: string
}

// 定义一个成员对象
const userInfo: Member = reactive({
  id: 1,
  name: 'Tom',
})

// 读取用户名
console.log(userInfo.name)

// 修改用户名
userInfo.name = 'Petter'
```

不要对通过 `reactive` 定义的对象进行解构，解构后得到的变量会失去响应性。

**toRef 与 toRefs**

用于 `reactive` 向 `ref` 转换。

两个 API 的拼写非常接近，顾名思义，一个是只转换一个字段，一个是转换所有字段。
