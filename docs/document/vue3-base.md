## Vue3 简介

- 2020 年 9 月 18 日，Vue.js 发布 3.0 版本，代号：One Piece（海贼王）
- 耗时 2 年多、[2600+次提交](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个 RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次 PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99 位贡献者](https://github.com/vuejs/vue-next/graphs/contributors)
- github 上的 tags 地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

## Vue3 带来了什么

### 性能的提升

- 打包大小减少 41%

- 初次渲染快 55%, 更新渲染快 133%

- 内存减少 54%

  ......

### 源码的升级

- 使用 Proxy 代替 defineProperty 实现响应式

- 重写虚拟 DOM 的实现和 Tree-Shaking

  ......

### 拥抱 TypeScript

- Vue3 可以更好的支持 TypeScript

## 创建 Vue3.0 工程

### 使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

### 使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite 官网：https://vitejs.cn

- 什么是 vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite 构建对比图

<img src="https://cn.vitejs.dev/assets/bundler.37740380.png" style="width:500px;height:280px;float:left" /><img src="https://cn.vitejs.dev/assets/esm.3070012d.png" style="width:480px;height:280px" />

```bash
## 创建工程
npm init vite-app <project-name>
yarn create vite <project-name> --template vue-ts
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```



## setup
### 基本语法
```ts
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, context) {
    // 业务代码写这里...

    return {
      // 需要给 template 用的数据、函数放这里 return 出去...
    }
  },
})
```
这里我还写了一个 `defineComponent`，也是本次的新东西，可以点击 [了解 defineComponent](#了解-definecomponent) 。

### setup 的两个注意点

- setup 执行的时机

  - 在 beforeCreate 之前执行一次

- setup 的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性, 相当于 `this.$attrs`。
    - slots: 收到的插槽内容, 相当于 `this.$slots`。
    - emit: 分发自定义事件的函数, 相当于 `this.$emit`。

### 了解 defineComponent
这是 Vue 3 推出的一个全新 API ，defineComponent 可以用于 TypeScript 的类型推导，帮你简化掉很多编写过程中的类型定义。

比如，你原本需要这样才可以使用 setup 函数：
```js
import { Slots } from 'vue'

// 声明 props 和 return 的数据类型
interface Data {
  [key: string]: unknown
}

// 声明 context 的类型
interface SetupContext {
  attrs: Data
  slots: Slots
  emit: (event: string, ...args: unknown[]) => void
}

// 使用的时候入参要加上声明， return 也要加上声明
export default {
  setup(props: Data, context: SetupContext): Data {
    // ...

    return {
      // ...
    }
  },
}
```
使用了 defineComponent 之后，你就可以省略这些类型定义：
```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, context) {
    // ...

    return {
      // ...
    }
  },
})
```
只要是 Vue 本身的 API ，defineComponent 都可以自动帮你推导。
在编写组件的过程中，你只需要维护自己定义的数据类型就可以了，专注于业务。

## script-setup

这是一个比较有争议的新特性，作为 setup 函数的语法糖，褒贬不一，不过经历了几次迭代之后，目前在体验上来说，感受还是非常棒的。

:::tip
截止至 2021-07-16 ，`<script setup>` 方案已在 Vue `3.2.0-beta.1` 版本中脱离实验状态，正式进入 Vue 3.0 的队伍，在新的版本中已经可以作为一个官方标准的开发方案使用（但初期仍需注意与开源社区的项目兼容性问题，特别是 UI 框架）。

另外，Vue 的 `3.1.2` 版本是针对 script-setup 的一个分水岭版本，自 `3.1.4` 开始 script-setup 进入定稿状态，部分旧的 API 已被舍弃，本章节内容将以最新的 API 为准进行整理说明，如果您需要查阅旧版 API 的使用，请参阅 [这里](https://chengpeiquan.com/article/vue3-script-setup.html) 。
:::

### 新特性的产生背景

在了解它怎么用之前，可以先了解一下它被推出的一些背景，可以帮助你对比开发体验上的异同点，以及了解为什么会有这一章节里面的新东西。

在 Vue 3.0 的 .vue 组件里，遵循 SFC 规范要求（注：SFC，即 Single-File Component，.vue 单组件），标准的 setup 用法是，在 setup 里面定义的数据如果需要在 template 使用，都需要 return 出来。

如果你使用的是 TypeScript ，还需要借助 [defineComponent](component.md#了解-definecomponent) 来帮助你对类型的自动推导。

script-setup 的推出是为了让熟悉 3.0 的用户可以更高效率的开发组件，减少一些心智负担，只需要给 script 标签添加一个 setup 属性，那么整个 script 就直接会变成 setup 函数，所有顶级变量、函数，均会自动暴露给模板使用（无需再一个个 return 了）。

Vue 会通过单组件编译器，在编译的时候将其处理回标准组件，所以目前这个方案只适合用 .vue 文件写的工程化项目。

```vue
<!-- 使用 script-setup 格式 -->
<script setup lang="ts">
  // ...
</script>
```

对，就是这样，代码量瞬间大幅度减少……

:::tip
因为 script-setup 的大部分功能在书写上和标准版是一致的，这里只提及一些差异化的表现。
:::

### 全局编译器宏

在 script-setup 模式下，新增了 4 个全局编译器宏，他们无需 import 就可以直接使用。

宏|说明
:-:|:-:
defineProps|[点击查看](#defineprops-的基础用法)
defineEmits|[点击查看](#defineemits-的基础用法)
defineExpose|[点击查看](#defineexpose-的基础用法)
withDefaults|[点击查看](#withdefaults-的基础用法)

下面我们继续了解 script-setup 的变化。

### template 操作简化

主要体现在这两点：

#### 变量无需进行 return

标准组件模式下，setup 里定义的变量，需要 return 后，在 template 部分才可以正确拿到：

```vue
<!-- 标准组件格式 -->
<template>
  <p>{{ msg }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const msg: string = 'Hello World!';
    
    // 要给 template 用的数据需要 return 出来才可以
    return {
      msg
    }
  }
})
</script>
```

在 script-setup 模式下，你定义了就可以直接使用。

```vue
<!-- 使用 script-setup 格式 -->
<template>
  <p>{{ msg }}</p>
</template>

<script setup lang="ts">
const msg: string = 'Hello World!';
</script>
```

#### 子组件无需手动注册

子组件的挂载，在标准组件里的写法是需要 import 后再放到 components 里才能够启用：

```vue
<!-- 标准组件格式 -->
<template>
  <Child />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 导入子组件
import Child from '@cp/Child.vue'

export default defineComponent({
  // 需要启用子组件作为模板
  components: {
    Child
  },

  // 组件里的业务代码
  setup () {
    // ...
  }
})
</script>
```

在 script-setup 模式下，只需要导入组件即可，编译器会自动识别并启用。

```vue
<!-- 使用 script-setup 格式 -->
<template>
  <Child />
</template>

<script setup lang="ts">
import Child from './components/Child.vue'
</script>
```

### props 的接收方式变化

由于整个 script 都变成了一个大的 setup function ，没有了组件选项，也没有了 setup 入参，所以没办法和标准写法一样去接收 props 了。

这里需要使用一个全新的 API ：`defineProps` 。

`defineProps` 是一个方法，内部返回一个对象，也就是挂载到这个组件上的所有 props ，它和普通的 props 用法一样，如果不指定为 prop， 则传下来的属性会被放到 attrs 那边去。


#### defineProps 的基础用法

所以，如果只是单纯在 template 里使用，那么其实就这么简单定义就可以了：

```ts
defineProps([
  'name',
  'userInfo',
  'tags'
])
```

使用 `string[]` 数组作为入参，把 prop 的名称作为数组的 item 传给 `defineProps` 就可以了。

如果 script 里的方法要拿到 props 的值，你也可以使用字面量定义：

```ts
const props = defineProps([
  'name',
  'userInfo',
  'tags'
])

console.log(props.name);
```

但在作为一个 Vue 老玩家，都清楚不显性的指定 prop 类型的话，很容易在协作中引起程序报错，那么应该如何对每个 prop 进行类型检查呢？

有两种方式来处理类型定义。

#### 通过构造函数检查 prop

这是第一种方式：使用 JavaScript 原生构造函数进行类型规定。

也就是跟我们平时定义 prop 类型时一样， Vue 会通过 `instanceof` 来进行 [类型检查](https://v3.cn.vuejs.org/guide/component-props.html#%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5) 。

使用这种方法，需要通过一个 “对象” 入参来传递给 `defineProps` ，比如：

```ts
defineProps({
  name: String,
  userInfo: Object,
  tags: Array
});
```

所有原来 props 具备的校验机制，都可以适用，比如你除了要限制类型外，还想指定 `name` 是可选，并且带有一个默认值：

```ts
defineProps({
  name: {
    type: String,
    required: false,
    default: 'Petter'
  },
  userInfo: Object,
  tags: Array
});
```

#### 使用类型注解检查 prop

这是第二种方式：使用 TypeScript 的类型注解。

和 ref 等 API 的用法一样，`defineProps` 也是可以使用尖括号 <> 来包裹类型定义，紧跟在 API 后面，另外，由于 `defineProps` 返回的是一个对象（因为 props 本身是一个对象），所以尖括号里面的类型还要用大括号包裹，通过 `key: value` 的键值对形式表示，如：

```ts
defineProps<{ name: string }>();
```

注意到了吗？这里使用的类型，和第一种方法提到的指定类型时是不一样的。

:::tip
在这里，不再使用构造函数校验，而是需要遵循使用 TypeScript 的类型。

比如字符串是 `string`，而不是 `String` 。
:::

如果有多个 prop ，就跟写 interface 一样：

```ts
defineProps<{
  name: string;
  phoneNumber: number;
  userInfo: object;
  tags: string[];
}>();
```

其中，举例里的 `userInfo` 是一个对象，你可以简单的指定为 object，也可以先定义好它对应的类型，再进行指定：

```ts
interface UserInfo {
  id: number;
  age: number;
}

defineProps<{
  name: string;
  userInfo: UserInfo;
}>();
```

如果你想对某个数据设置为可选，也是遵循 TS 规范，通过英文问号 `?` 来允许可选：

```ts
// name 是可选
defineProps<{
  name?: string;
  tags: string[];
}>();
```

如果你想设置可选参数的默认值，需要借助 [withDefaults](#withdefaults-的基础用法) API。

:::warning
需要强调的一点是：在 [构造函数](#通过构造函数检查-prop) 和 [类型注解](#使用类型注解检查-prop) 这两种校验方式只能二选一，不能同时使用，否则会引起程序报错
:::

#### withDefaults 的基础用法

这个新的 withDefaults API 可以让你在使用 TS 类型系统时，也可以指定 props 的默认值。

它接收两个入参：

参数|类型|含义
:--|:--|:--
props|object|通过 defineProps 传入的 props
defaultValues|object|根据 props 的 key 传入默认值

可能缺乏一些官方描述，还是看参考用法可能更直观：

```ts
withDefaults(defineProps<{
  size?: number
  labels?: string[]
}>(), {
  size: 3,
  labels: () => ['default label']
})
```

如果你要在 TS / JS 再对 props 进行获取，也可以通过字面量来拿到这些默认值：

```ts
// 如果不习惯上面的写法，你也可以跟平时一样先通过interface定义一个类型接口
interface Props {
  msg?: string
}

// 再作为入参传入
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello'
})

// 这样就可以通过props变量拿到需要的prop值了
console.log(props.msg)
```

### emits 的接收方式变化

和 props 一样，emits 的接收也是需要使用一个全新的 API 来操作，这个 API 就是 `defineEmits` 。

和 `defineProps` 一样， `defineEmits` 也是一个方法，它接受的入参格式和标准组件的要求是一致的。

#### defineEmits 的基础用法

由于 emit 并非提供给模板直接读取，所以需要通过字面量来定义 emits。

最基础的用法也是传递一个 `string[]` 数组进来，把每个 emit 的名称作为数组的 item 。

```ts
// 获取 emit
const emit = defineEmits(['chang-name']);

// 调用 emit
emit('chang-name', 'Tom');
```


### attrs 的接收方式变化

`attrs` 和 `props` 很相似，也是基于父子通信的数据，如果父组件绑定下来的数据没有被指定为 `props` ，那么就会被挂到 `attrs` 这边来。

在标准组件里， `attrs` 的数据是通过 `setup` 的第二个入参 `context` 里的 `attrs` API 获取的。

```ts
// 标准组件的写法
export default defineComponent({
  setup (props, { attrs }) {
    // attrs 是个对象，每个 Attribute 都是它的 key
    console.log(attrs.class);

    // 如果传下来的 Attribute 带有短横线，需要通过这种方式获取
    console.log(attrs['data-hash']);
  }
})
```

但和 `props` 一样，由于没有了 `context` 参数，需要使用一个新的 API 来拿到 `attrs` 数据。

这个 API 就是 `useAttrs` 。

:::tip
请注意，`useAttrs` API 需要 Vue `3.1.4` 或更高版本才可以使用。
:::

#### useAttrs 的基础用法

顾名思义， useAttrs 可以是用来获取 attrs 数据的，它的用法非常简单：

```ts
// 导入 useAttrs 组件
import { useAttrs } from 'vue'

// 获取 attrs
const attrs = useAttrs()

// attrs是个对象，和 props 一样，需要通过 key 来得到对应的单个 attr
console.log(attrs.msg);
```

### slots 的接收方式变化

`slots` 是 Vue 组件的插槽数据，也是在父子通信里的一个重要成员。

对于使用 template 的开发者来说，在 script-setup 里获取插槽数据并不困难，因为跟标准组件的写法是完全一样的，可以直接在 template 里使用 `<slot />` 标签渲染。

```vue
<template>
  <div>
    <!-- 插槽数据 -->
    <slot />
    <!-- 插槽数据 -->
  </div>
</template>
```

但对使用 JSX / TSX 的开发者来说，就影响比较大了，在标准组件里，想在 script 里获取插槽数据，也是需要在 `setup` 的第二个入参里拿到 `slots` API 。

```ts
// 标准组件的写法
export default defineComponent({
  // 这里的 slots 就是插槽
  setup (props, { slots }) {
    // ...
  }
})
```

新版本的 Vue 也提供了一个全新的 `useSlots` API 来帮助 script-setup 用户获取插槽。

:::tip
请注意，`useSlots` API 需要 Vue `3.1.4` 或更高版本才可以使用。
:::

#### useSlots 的基础用法

先来看看父组件，父组件先为子组件传入插槽数据 ：

```vue
<template>
  <!-- 子组件 -->
  <ChildTSX>
    <!-- 默认插槽 -->
    <p>I am a default slot from TSX.</p>
    <!-- 默认插槽 -->

    <!-- 命名插槽 -->
    <template #msg>
      <p>I am a msg slot from TSX.</p>
    </template>
    <!-- 命名插槽 -->

    <!-- 作用域插槽 -->
    <template v-slot:content="slotprops">
      <p>{{slotprops}}</p>
    </template>
    <!-- 作用域插槽 -->

  </ChildTSX>
  <!-- 子组件 -->
</template>

<script setup lang="ts">
import ChildTSX from '@cp/context/Child.tsx'
</script>
```

在使用 JSX / TSX 编写的子组件里，就可以通过 `useSlots` 来获取父组件传进来的 `slots` 数据进行渲染：

```tsx
// 注意：这是一个 .tsx 文件
import { defineComponent, useSlots } from 'vue'

const ChildTSX = defineComponent({
  setup() {
    // 获取插槽数据
    const slots = useSlots()

    // 渲染组件
    return () => (
      <div>
        {/* 渲染默认插槽 */}
        <p>{ slots.default ? slots.default() : '' }</p>

        {/* 渲染命名插槽 */}
        <p>{ slots.msg ? slots.msg() : '' }</p>

        {/* 渲染作用域插槽 */}
        <p>{ slots.content ? slots.content('作用域插槽') : '' }</p>
      </div>
    )
  },
})

export default ChildTSX
```

### ref 的通信方式变化

在标准组件写法里，子组件的数据都是默认隐式暴露给父组件的，也就是父组件可以通过 `childComponent.value.foo` 这样的方式直接操作子组件的数据

但在 script-setup 模式下，所有数据只是默认隐式 return 给 template 使用，不会暴露到组件外，所以父组件是无法直接通过挂载 ref 变量获取子组件的数据。

在 script-setup 模式下，如果要调用子组件的数据，需要先在子组件显式的暴露出来，才能够正确的拿到，这个操作，就是由 `defineExpose` 来完成。

#### defineExpose 的基础用法

`defineExpose` 的用法非常简单，它本身是一个函数，可以接受一个对象参数。

在子组件里，像这样把需要暴露出去的数据通过 `key: value` 的形式作为入参

```vue
<script setup lang="ts">
// 定义一个想提供给父组件拿到的数据
const msg: string = 'Hello World!';

// 显示暴露的数据，才可以在父组件拿到
defineExpose({
  msg
});
</script>
```

然后你在父组件就可以通过挂载在子组件上的 ref 变量，去拿到暴露出来的数据了。

## 组件的生命周期

从 Vue 2.x 升级到 3.x，在保留对 2.x 的生命周期支持的同时，3.x 也带来了一定的调整。

:::tip
Vue 2 的生命周期写法名称是 Options API ， Vue 3 新的生命周期写法名称是 Composition API 。

Vue 3 本身也支持 Options API 风格， Vue 2 也可以通过安装 [@vue/composition-api](https://www.npmjs.com/package/@vue/composition-api) 插件来使用 Composition API 。

:::

生命周期的变化，可以直观的从下表了解：

2.x 生命周期|3.x 生命周期|执行时间说明
:-:|:-:|:-:
beforeCreate|setup|组件创建前执行
created|setup|组件创建后执行
beforeMount|onBeforeMount|组件挂载到节点上之前执行
mounted|onMounted|组件挂载完成后执行
beforeUpdate|onBeforeUpdate|组件更新之前执行
updated|onUpdated|组件更新完成之后执行
beforeDestroy|onBeforeUnmount|组件卸载之前执行
destroyed|onUnmounted|组件卸载完成后执行
errorCaptured|onErrorCaptured|当捕获一个来自子孙组件的异常时激活钩子函数

其中，在 3.x ，`setup` 的执行时机比 2.x 的 `beforeCreate` 和 `created` 还早，可以完全代替原来的这 2 个钩子函数。

另外，被包含在 `<keep-alive>` 中的组件，会多出两个生命周期钩子函数：

2.x 生命周期|3.x 生命周期|执行时间说明
:-:|:-:|:-:
activated|onActivated|被激活时执行
deactivated|onDeactivated|切换组件后，原组件消失前执行
## Vue3.0 中的响应式原理

### vue2.x 的响应式

- 实现原理：

  - 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
      get() {},
      set() {},
    })
    ```

- 存在问题：
  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

### Vue3.0 的响应式

- 实现原理:

  - 通过 Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过 Reflect（反射）: 对源对象的属性进行操作。
  - MDN 文档中描述的 Proxy 与 Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

      ```js
      new Proxy(data, {
        // 拦截读取属性值
        get(target, prop) {
          return Reflect.get(target, prop)
        },
        // 拦截设置属性值或添加新属性
        set(target, prop, value) {
          return Reflect.set(target, prop, value)
        },
        // 拦截删除属性
        deleteProperty(target, prop) {
          return Reflect.deleteProperty(target, prop)
        },
      })

      proxy.name = 'tom'
      ```

## 响应式 API 之 ref

`ref` 是最常用的一个响应式 API，它可以用来定义所有类型的数据，包括 Node 节点。

没错，在 2.x 常用的 `this.$refs.xxx` 来取代 `document.querySelector('.xxx')` 获取 Node 节点的方式，也是用这个 API 来取代。

### 类型声明

在开始使用 API 之前，要先了解一下在 TypeScript 中，`ref` 需要如何进行类型声明。

平时我们在定义变量的时候，都是这样给他们进行类型声明的：

```ts
// 单类型
const msg: string = 'Hello World!';

// 多类型
const phoneNumber: number | string = 13800138000;
```

但是在使用 `ref` 时，不能这样子声明，会报错，正确的声明方式应该是使用 `<>` 来包裹类型定义，紧跟在 `ref` API 之后：

```ts
// 单类型
const msg = ref<string>('Hello World!');

// 多类型
const phoneNumber = ref<number | string>(13800138000);
```
### 变量的定义

了解了如何进行类型声明之后，对变量的定义就没什么问题了，前面说了它可以用来定义所有类型的数据，包括 Node 节点，但不同类型的值之间还是有少许差异和注意事项，具体可以参考如下。

#### 基本类型

对字符串、布尔值等基本类型的定义方式，比较简单：

```ts
// 字符串
const msg = ref<string>('Hello World!');

// 数值
const count = ref<number>(1);

// 布尔值
const isVip = ref<boolean>(false);
```

#### 引用类型

对于对象、数组等引用类型也适用，比如要定义一个对象：

```ts
// 声明对象的格式
interface Member {
  id: number,
  name: string
};

// 定义一个成员对象
const userInfo = ref<Member>({
  id: 1,
  name: 'Tom'
});
```

定义一个普通数组：

```ts
// 数字数组
const uids = ref<number[]>([ 1, 2, 3 ]);

// 字符串数组
const names = ref<string[]>([ 'Tom', 'Petter', 'Andy' ]);
```

定义一个对象数组：

```ts
// 声明对象的格式
interface Member {
  id: number,
  name: string
};

// 定义一个成员组
const memberList = ref<Member[]>([
  {
    id: 1,
    name: 'Tom'
  },
  {
    id: 2,
    name: 'Petter'
  }
]);
```
### DOM 元素与子组件

除了可以定义数据，`ref` 也有我们熟悉的用途，就是用来挂载节点，也可以挂在子组件上。

对于 2.x 常用的 `this.$refs.xxx` 来获取 DOM 元素信息，该 API 的使用方式也是同样：

模板部分依然是熟悉的用法，把 ref 挂到你要引用的 DOM 上。

```vue
<template>
  <!-- 挂载DOM元素 -->
  <p ref="msg">
    留意该节点，有一个ref属性
  </p>
  <!-- 挂载DOM元素 -->

  <!-- 挂载子组件 -->
  <Child ref="child" />
  <!-- 挂载子组件 -->
</template>
```

`script` 部分有三个最基本的注意事项：

:::tip
1. 定义挂载节点后，也是必须通过 `xxx.value` 才能正确操作到挂载的 DOM 元素或组件（详见下方的[变量的读取与赋值](#变量的读取与赋值)）；

2. 请保证视图渲染完毕后再执行 DOM 或组件的相关操作（需要放到生命周期的 `onMounted` 或者 `nextTick` 函数里，这一点在 2.x 也是一样）；

3. 该变量必须 `return` 出去才可以给到 `template` 使用（这一点是 3.x 生命周期的硬性要求，子组件的数据和方法如果要给父组件操作，也要 `return` 出来才可以）。
:::

配合上面的 `template` ，来看看 `script` 部分的具体例子：

```ts
import { defineComponent, onMounted, ref } from 'vue'
import Child from '@cp/Child.vue'

export default defineComponent({
  components: {
    Child
  },
  setup () {
    // 定义挂载节点，声明的类型详见下方附表
    const msg = ref<HTMLElement | null>(null);
    const child = ref<typeof Child | null>(null);

    // 请保证视图渲染完毕后再执行节点操作 e.g. onMounted / nextTick
    onMounted( () => {
      // 比如获取DOM的文本
      console.log(msg.value.innerText);

      // 或者操作子组件里的数据
      child.value.isShowDialog = true;
    });

    // 必须return出去才可以给到template使用
    return {
      msg,
      child
    }
  }
})
```

关于 DOM 和子组件的 TS 类型声明，可参考以下规则：

节点类型|声明类型|参考文档
:--|:--|:--
DOM 元素|使用 HTML 元素接口|[HTML 元素接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#html_%E5%85%83%E7%B4%A0%E6%8E%A5%E5%8F%A3)
子组件|使用 typeof 获取子组件的类型|[typeof 操作符](https://zhuanlan.zhihu.com/p/311150643)


### 变量的读取与赋值

被 `ref` 包裹的变量会全部变成对象，不管你定义的是什么类型的值，都会转化为一个 ref 对象，其中 ref 对象具有指向内部值的单个 property `.value`。

:::tip
读取任何 ref 对象的值都必须通过 `xxx.value` 才可以正确获取到。
:::

普通变量都必须使用 `let` 才可以修改值，由于 ref 对象是个引用类型，所以可以在 `const` 定义的时候，直接通过 `.value` 来修改。

```ts
// 定义一个字符串变量
const msg = ref<string>('Hi!');

// 1s后修改它的值
setTimeout(() => {
  msg.value = 'Hello!'
}, 1000);
```

因此你在对接接口数据的时候，可以自由的使用 `forEach`、`map`、`filter` 等遍历函数来操作你的 ref 数组，或者直接重置它。

```ts
const data = ref<string[]>([]);

// 提取接口的数据
data.value = api.data.map( (item: any) => item.text );

// 重置数组
data.value = [];
```

## 响应式 API 之 reactive

`reactive` 是继 `ref` 之后最常用的一个响应式 API 了，相对于 `ref`，它的局限性在于只适合对象、数组。

:::tip
使用 `reactive` 的好处就是写法跟平时的对象、数组几乎一模一样，但它也带来了一些特殊注意点，请留意赋值部分的特殊说明。
:::

### 类型声明与定义

`reactive` 的声明方式，以及定义方式，没有 `ref` 的变化那么大，就是和普通变量一样。

reactive 对象：

```ts
// 声明对象的格式
interface Member {
  id: number,
  name: string
};

// 定义一个成员对象
const userInfo: Member = reactive({
  id: 1,
  name: 'Tom'
});
```

reactive 数组：

```ts
// 普通数组
const uids: number[] = [ 1, 2, 3];

// 对象数组
interface Member {
  id: number,
  name: string
};

// 定义一个成员对象数组
const userList: Member[] = reactive([
  {
    id: 1,
    name: 'Tom'
  },
  {
    id: 2,
    name: 'Petter'
  },
  {
    id: 3,
    name: 'Andy'
  }
]);
```

### 变量的读取与赋值

reactive 对象在读取字段的值，或者修改值的时候，与普通对象是一样的。

reactive 对象：

```ts
// 声明对象的格式
interface Member {
  id: number,
  name: string
};

// 定义一个成员对象
const userInfo: Member = reactive({
  id: 1,
  name: 'Tom'
});

// 读取用户名
console.log(userInfo.name);

// 修改用户名
userInfo.name = 'Petter';
```

但是对于 reactive 数组，和普通数组会有一些区别。

先看看普通数组，重置，或者改变值，都是可以直接轻松的进行操作：

```ts
// 定义一个普通数组
let uids: number[] = [ 1, 2, 3 ];

// 从另外一个对象数组里提取数据过来
uids = api.data.map( item => item.id );

// 合并另外一个数组
let newUids: number[] = [ 4, 5, 6 ];
uids = [...uids, ...newUids];

// 重置数组
uids = [];
```

在 2.x 的时候，你在操作数组时，完全可以和普通数组那样随意的处理数据的变化，依然能够保持响应性。

但在 3.x ，如果你使用 `reactive` 定义数组，则不能这么搞了，必须只使用那些不会改变引用地址的操作。

:::tip
按照原来的思维去使用 `reactive` 数组，会造成数据变了，但模板不会更新的 bug ，如果你遇到类似的情况，可以从这里去入手排查问题所在。
:::

举个例子，比如你要从接口读取翻页数据的时候，通常要先重置数组，再异步添加数据：

如果你使用常规的重置，会导致这个变量失去响应性：

```ts
/** 
 * 不推荐使用这种方式
 * 异步添加数据后，模板不会响应更新
 */
let uids: number[] = reactive([ 1, 2, 3 ]);

// 丢失响应性的步骤
uids = [];

// 异步获取数据后，模板依然是空数组
setTimeout( () => {
  uids.push(1);
}, 1000);
```

要让模板那边依然能够保持响应性，则必须在关键操作时，不破坏响应性 API 的存在。

```ts
/** 
 * 不推荐使用这种方式
 * 异步添加数据后，模板不会响应更新
 */
let uids: number[] = reactive([ 1, 2, 3 ]);

// 不会破坏响应性
uids.length = 0;

// 异步获取数据后，模板可以正确的展示
setTimeout( () => {
  uids.push(1);
}, 1000);
```

### 特别注意

不要对通过 `reactive` 定义的对象进行解构，解构后得到的变量会失去响应性。

比如这些情况，在 2s 后都得不到新的 name 信息：

```ts
import { defineComponent, reactive } from 'vue'

interface Member {
  id: number,
  name: string
};

export default defineComponent({
  setup () {

    // 定义一个带有响应性的成员对象
    const userInfo: Member = reactive({
      id: 1,
      name: 'Petter'
    });

    // 2s后更新userInfo
    setTimeout( () => {
      userInfo.name = 'Tom';
    }, 2000);

    // 这个变量在2s后不会同步更新
    const newUserInfo: Member = {...userInfo};

    // 这个变量在2s后不会再同步更新
    const { name } = userInfo;

    // 这样return出去给模板用，在2s后也不会同步更新
    return {
      ...userInfo
    }
  }
})
```






## 响应式 API 之 toRef 与 toRefs

看到这里之前，应该对 `ref` 和 `reactive` 都有所了解了，为了方便开发者，Vue 3 还推出了 2 个与之相关的 API ，用于 `reactive` 向 `ref` 转换。

### 各自的作用

两个 API 的拼写非常接近，顾名思义，一个是只转换一个字段，一个是转换所有字段。

API|作用
:--|:--
toRef|创建一个新的ref变量，转换 reactive 对象的某个字段为ref变量
toRefs|创建一个新的对象，它的每个字段都是 reactive 对象各个字段的ref变量

我们先定义好一个 `reactive` 变量：

```ts
interface Member {
  id: number,
  name: string
};

const userInfo: Member = reactive({
  id: 1,
  name: 'Petter'
});
```

然后来看看这 2 个 API 应该怎么使用。

### 使用 toRef

`toRef` 接收 2 个参数，第一个是 `reactive` 对象, 第二个是要转换的 `key` 。

在这里我们只想转换 `userInfo` 里的 `name` ，只需要这样操作：

```ts
const name: string = toRef(userInfo, 'name');
```

这样就成功创建了一个 `ref` 变量。

之后读取和赋值就使用 `name.value`，它会同时更新 `name` 和 `userInfo.name`。 

:::tip
在 `toRef` 的过程中，如果使用了原对象上面不存在的 `key` ，那么定义出来的变量的 `value` 将会是 `undefined` 。

如果你对这个不存在的 `key` 的 `ref` 变量，进行了 `value` 赋值，那么原来的对象也会同步增加这个 `key`，其值也会同步更新。
:::

### 使用 toRefs

`toRefs` 接收 1 个参数，是一个 `reactive` 对象。

```ts
const userInfoRefs: Member = toRefs(userInfo);
```

这个新的 `userInfoRefs` ，本身是个普通对象，但是它的每个字段，都是与原来关联的 `ref` 变量。

### 为什么要进行转换

关于为什么要出这么 2 个 API ，官方文档没有特别说明，不过经过自己的一些实际使用，以及在写上一节 `reactive` 的 [特别注意](#特别注意)，可能知道一些使用理由。

`ref` 和 `reactive` 这两者的好处就不重复了，但是在使用的过程中，各自都有各自不方便的地方：

1. `ref` 虽然在 `template` 里使用起来方便，但比较烦的一点是在 `script` 里进行读取/赋值的时候，要一直记得加上 `.value` ，否则bug就来了

2. `reactive` 虽然在使用的时候，因为你知道它本身是一个 `Object` 类型，所以你不会忘记 `foo.bar` 这样的格式去操作，但是在 `template` 渲染的时候，你又因此不得不每次都使用 `foo.bar` 的格式去渲染

那么有没有办法，既可以在编写 `script` 的时候不容易出错，在写 `template` 的时候又比较简单呢？

于是， `toRef` 和 `toRefs` 因此诞生。

### 什么场景下比较适合使用它们

从便利性和可维护性来说，最好只在功能单一、代码量少的组件里使用，比如一个表单组件，通常表单的数据都放在一个对象里。

当然你也可以更猛一点就是把所有的数据都定义到一个 `data` 里，然后你再去 `data` 里面取…但是没有必要为了转换而转换。

### 在业务中的具体运用

**在 `script` 部分：**

1. 先用 `reactive` 定义一个源数据，所有的数据更新，都是修改这个对象对应的值，按照对象的写法去维护你的数据

2. 再通过 `toRefs` 定义一个给 `template` 用的对象，它本身不具备响应性，但是它的字段全部是 `ref` 变量

3. 在 `return` 的时候，对 `toRefs` 对象进行解构，这样导出去就是各个字段对应的 `ref` 变量，而不是一整个对象

```ts
import { defineComponent, reactive, toRefs } from 'vue'

interface Member {
  id: number,
  name: string,
  age: number,
  gender: string
};

export default defineComponent({
  setup () {
    // 定义一个reactive对象
    const userInfo = reactive({
      id: 1,
      name: 'Petter',
      age: 18,
      gender: 'male'
    })

    // 定义一个新的对象，它本身不具备响应性，但是它的字段全部是ref变量
    const userInfoRefs = toRefs(userInfo);

    // 2s后更新userInfo
    setTimeout( () => {
      userInfo.id = 2;
      userInfo.name = 'Tom';
      userInfo.age = 20;
    }, 2000);

    // 在这里结构toRefs对象才能继续保持响应式
    return {
      ...userInfoRefs
    }
  }
})
```

**在 `template` 部分：**

由于 `return` 出来的都是 `ref` 变量，所以你在模板里直接使用 `userInfo` 各个字段的 `key` 即可。

```vue
<template>
  <ul class="user-info">

    <li class="item">
      <span class="key">ID:</span>
      <span class="value">{{ id }}</span>
    </li>

    <li class="item">
      <span class="key">name:</span>
      <span class="value">{{ name }}</span>
    </li>

    <li class="item">
      <span class="key">age:</span>
      <span class="value">{{ age }}</span>
    </li>

    <li class="item">
      <span class="key">gender:</span>
      <span class="value">{{ gender }}</span>
    </li>

  </ul>
</template>
```

### 需要注意的问题

请注意是否有相同命名的变量存在，比如上面在 `return` 给 `template` 使用时，解构 `userInfoRefs` 的时候已经包含了一个 `name` 字段，此时如果还有一个单独的变量也叫 `name`。

:::tip
那么他们谁会生效，取决于谁排在后面。

因为 `return` 出去的其实是一个对象，在对象里，如果存在相同的 `key` ，则后面那个会覆盖前面的。
:::

这种情况下，会以单独定义的 `name` 为渲染数据。

```ts
return {
  ...userInfoRefs,
  name
}
```

这种情况下，则是以 `userInfoRefs` 里的 `name` 为渲染数据。

```ts
return {
  name,
  ...userInfoRefs
}
```

所以当你决定使用 `toRef` 和 `toRefs` 的时候，请注意这个特殊情况！

## 其它响应式API
### readonly()
接受一个对象 (不论是响应式还是一般的) 或是一个 ref，返回一个原值的只读代理。
只读代理是深层的：对任何嵌套 property 的访问都将是只读的。
```ts
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count)
})

// 更改源属性会触发其依赖的侦听器
original.count++

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!
```

### isRef()
检查某个值是否为 ref。
```ts
let foo: unknown
if (isRef(foo)) {
  foo.value
}
```
### unref()
如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖。
```ts
let foo=ref('test')
let copyFoo=unref(foo)
console.log(foo,copyFoo)
```
### isProxy()
检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理。

### isReactive()
检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。

### isReactive()
检查一个对象是否是由 readonly() 或 shallowReadonly() 创建的代理。

### shallowRef()
ref() 的浅层作用形式。
和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。

### triggerRef()
强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

### shallowReactive()
reactive() 的浅层作用形式。
和 reactive() 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的 property 是响应式的。

### shallowReadonly()
readonly() 的浅层作用形式
```ts
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性会失败
state.foo++

// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false

// 这是可以通过的
state.nested.bar++

```
### toRaw()
根据一个 Vue 创建的代理返回其原始对象。
toRaw() 可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象。
```ts
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true

```
### markRaw()
将一个对象标记为不可被转为代理。返回该对象本身。
```ts
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false

```
### customRef()
创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。
customRef() 预期接收一个函数作为参数，这个函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。

创建一个防抖 ref，即只在最近一次 set 调用后的一段固定间隔后再调用：
```vue
<script setup lang="ts">
import { customRef } from 'vue'
function useDebouncedRef(value:string, delay = 200){
  let timeout:any
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
const text = useDebouncedRef('hello',1000)
</script>

<template>
  <input v-model="text" />
</template>

```



## 自定义 hook 函数


- 什么是 hook？—— 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。

- 类似于 vue2.x 中的 mixin。

- 自定义 hook 的优势: 复用代码, 让 setup 中的逻辑更清楚易懂。

## 数据的监听

Vue 3 在保留原来的 `watch` 功能之外，还新增了一个 `watchEffect` 帮助我们更简单的进行监听。

### watch

在 Vue 3 ，新版的 `watch` 和 Vue 2 的旧版写法对比，在使用方式上变化非常大！

#### 回顾 Vue 2

在 Vue 2 是这样用的，和 `data` 、 `methods` 都在同级配置：

```ts
export default {
  data() {
    return {
      // ...
    }
  },
  // 注意这里，放在 data 、 methods 同个级别
  watch: {
    // ...
  },
  methods: {
    // ...
  }
}
```

并且类型繁多，选项式 API 的类型如下：

```ts
watch: { [key: string]: string | Function | Object | Array}
```

联合类型过多，意味着用法复杂，下面是个很好的例子，虽然出自 [官网](https://v3.cn.vuejs.org/api/options-data.html#watch) 的用法介绍，但也反映出来对初学者不太友好，初次接触可能会觉得一头雾水：

```ts
export default {
  data() {
    return {
      a: 1,
      b: 2,
      c: {
        d: 4
      },
      e: 5,
      f: 6
    }
  },
  watch: {
    // 侦听顶级 property
    a(val, oldVal) {
      console.log(`new: ${val}, old: ${oldVal}`)
    },
    // 字符串方法名
    b: 'someMethod',
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler(val, oldVal) {
        console.log('c changed')
      },
      deep: true
    },
    // 侦听单个嵌套 property
    'c.d': function (val, oldVal) {
      // do something
    },
    // 该回调将会在侦听开始之后被立即调用
    e: {
      handler(val, oldVal) {
        console.log('e changed')
      },
      immediate: true
    },
    // 你可以传入回调数组，它们会被逐一调用
    f: [
      'handle1',
      function handle2(val, oldVal) {
        console.log('handle2 triggered')
      },
      {
        handler: function handle3(val, oldVal) {
          console.log('handle3 triggered')
        }
        /* ... */
      }
    ]
  },
  methods: {
    someMethod() {
      console.log('b changed')
    },
    handle1() {
      console.log('handle 1 triggered')
    }
  }
}
```

当然肯定也会有人觉得这样选择多是个好事，选择适合自己的就好，但我个人还是感觉，这种写法对于初学者来说不是那么友好，有些过于复杂化，如果一个用法可以适应各种各样的场景，岂不是更妙？

:::tip
另外需要注意的是，不能使用箭头函数来定义 watcher 函数 (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)` )。

因为箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向组件实例， `this.updateAutocomplete` 将是 `undefined` 。
:::

Vue 2 也可以通过 `this.$watch()` 这个 API 的用法来实现对某个数据的监听，它接受三个参数： `source` 、 `callback` 和 `options` 。

```ts
export default {
  data() {
    return {
      a: 1,
    }
  },
  // 生命周期钩子
  mounted() {
    this.$watch('a', (newVal, oldVal) => {
      // ...
    })
  }
}
```

由于 `this.$watch` 的用法和 Vue 3 比较接近，所以这里不做过多的回顾，请直接看 [了解 Vue 3](#了解-vue-3-1) 部分。

#### 了解 Vue 3

在 Vue 3 的组合式 API 写法， `watch` 是一个可以接受 3 个参数的函数（保留了 Vue 2 的 `this.$watch` 这种用法），在使用层面上简单了好多。

```ts
import { watch } from 'vue'

// 一个用法走天下
watch(
  source, // 必传，要监听的数据源
  callback, // 必传，监听到变化后要执行的回调函数
  // options // 可选，一些监听选项
)
```

下面的内容都基于 Vue 3 的组合式 API 用法展开讲解。

API 接受 3 个入参：

参数|是否可选|含义
:-:|:-:|:--
source|必传|数据源（详见：[要监听的数据源](#要监听的数据源)）
callback|必传|监听到变化后要执行的回调函数（详见：[监听后的回调函数](#监听后的回调函数)）
options|可选|一些监听选项（详见：[监听的选项](#监听的选项)）

并返回一个可以用来停止监听的函数（详见：[停止监听](#停止监听)）。

#### 要监听的数据源

watch API 的第 1 个参数 `source` 是要监听的数据源，它的 TS 类型如下：

```ts
// watch 第 1 个入参的 TS 类型
// ...
export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T)
// ...
```

可以看到能够用于监听的数据，是通过 [响应式 API](#响应式数据的变化-new) 定义的变量（ `Ref<T>` ），或者是一个 [计算数据](#数据的计算-new) （ `ComputedRef<T>` ），或者是一个 返回值的函数。

所以要想定义的 watch 能够做出预期的行为，数据源必须具备响应性或者是一个 getter ，如果只是通过 `let` 定义一个普通变量，然后去改变这个变量的值，这样是无法监听的。

:::tip
如果要监听响应式对象里面的某个值（这种情况下对象本身是响应式，但它的 property 不是），需要写成有返回值的函数，这个函数 return 你要监听的数据， e.g. `() => foo.bar` ，可以结合下方 [基础用法](#基础用法) 的例子一起理解。
:::

#### 监听后的回调函数

watch API 的第 2 个参数 `callback` 是监听到数据变化时要做出的行为，它的 TS 类型如下：

```ts
// watch 第 2 个入参的 TS 类型
// ...
export declare type WatchCallback<V = any, OV = any> = (
  value: V,
  oldValue: OV,
  onCleanup: OnCleanup
) => any
// ...
```

乍一看它有三个参数，但实际上这些参数不是你自己定义的，而是 watch API 传给你的，所以不管你用或者不用，它们都在那里：

参数|作用
:--|:--
value|变化后的新值，类型和数据源保持一致
oldValue|变化前的旧值，类型和数据源保持一致
onCleanup|注册一个清理函数，详见 [监听效果清理](#监听效果清理) 部分

注意：第一个参数是新值，第二个才是原来的旧值！

如同其他 JS 函数，在使用 watch 的回调函数时，可以对这三个参数任意命名，比如把 `value` 命名为你觉得更容易理解的 `newValue` 。

:::tip
如果监听的数据源是一个 [引用类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%AF%B9%E8%B1%A1) 时（ e.g. `Object` 、 `Array` 、 `Date` … ）， `value` 和 `oldValue` 是完全相同的，因为指向同一个对象。
:::

另外，默认情况下，`watch` 是惰性的，也就是只有当被监听的数据源发生变化时才执行回调。

#### 基础用法

来到这里，对 2 个必传的参数都有一定的了解了，我们先看看基础的用法，也就是日常最常编写的方案，我们只需要先关注前 2 个必传的参数。

```ts
// 不要忘了导入要用的 API
import { defineComponent, reactive, watch } from 'vue'

export default defineComponent({
  setup() {
    // 定义一个响应式数据
    const userInfo = reactive({
      name: 'Petter',
      age: 18,
    })

    // 2s后改变数据
    setTimeout(() => {
      userInfo.name = 'Tom'
    }, 2000)

    /**
     * 可以直接监听这个响应式对象
     * callback 的参数如果不用可以不写
     */
    watch(userInfo, () => {
      console.log('监听整个 userInfo ', userInfo.name)
    })

    /**
     * 也可以监听对象里面的某个值
     * 此时数据源需要写成 getter 函数
     */
    watch(
      // 数据源，getter 形式
      () => userInfo.name,
      // 回调函数 callback
      (newValue, oldValue) => {
        console.log('只监听 name 的变化 ', userInfo.name)
        console.log('打印变化前后的值', { oldValue, newValue })
      }
    )
  },
})
```

一般的业务场景，基础用法足以面对。

如果你有多个数据源要监听，并且监听到变化后要执行的行为一样，那么可以使用 [批量监听](#批量监听) 。

特殊的情况下，你可以搭配 [监听的选项](#监听的选项) 做一些特殊的用法，详见下面部分的内容。

#### 批量监听

如果你有多个数据源要监听，并且监听到变化后要执行的行为一样，第一反应可能是这样来写：

1. 抽离相同的处理行为为公共函数
2. 然后定义多个监听操作，传入这个公共函数

```ts{15-25}
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const message = ref<string>('')
    const index = ref<number>(0)

    // 2s后改变数据
    setTimeout(() => {
      // 来到这里才会触发 watch 的回调
      message.value = 'Hello World!'
      index.value++
    }, 2000)

    // 抽离相同的处理行为为公共函数
    const handleWatch = (
      newValue: string | number,
      oldValue: string | number
    ): void => {
      console.log({ newValue, oldValue })
    }

    // 然后定义多个监听操作，传入这个公共函数
    watch(message, handleWatch)
    watch(index, handleWatch)
  },
})
```

这样写其实没什么问题，不过除了抽离公共代码的写法之外， watch API 还提供了一个批量监听的用法，和 [基础用法](#基础用法) 的区别在于，数据源和回调参数都变成了数组的形式。

数据源：以数组的形式传入，里面每一项都是一个响应式数据。

回调参数：原来的 `value` 和 `newValue` 也都变成了数组，每个数组里面的顺序和数据源数组排序一致。

可以看下面的这个例子更为直观：

```ts{17,19}
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    // 定义多个数据源
    const message = ref<string>('')
    const index = ref<number>(0)

    // 2s后改变数据
    setTimeout(() => {
      message.value = 'Hello World!'
      index.value++
    }, 2000)

    watch(
      // 数据源改成了数组
      [message, index],
      // 回调的入参也变成了数组，每个数组里面的顺序和数据源数组排序一致
      ([newMessage, newIndex], [oldMessage, oldIndex]) => {
        console.log('message 的变化', { newMessage, oldMessage })
        console.log('index 的变化', { newIndex, oldIndex })
      }
    )
  },
})
```

什么情况下可能会用到批量监听呢？比如一个子组件有多个 props ，当有任意一个 prop 发生变化时，都需要执行初始化函数重置组件的状态，那么这个时候就可以用上这个功能啦！

:::tip
在适当的业务场景，你也可以使用 [watchEffect](#watchEffect) 来完成批量监听，但请留意 [功能区别](#和-watch-的区别) 部分的说明。
:::

#### 监听的选项

watch API 还接受第 3 个参数 `options` ，可选的一些监听选项。

`options` 是一个对象的形式传入，有以下几个选项：

选项|类型|默认值|可选值|作用
:-:|:-:|:-:|:-:|:--
deep|boolean|false|true \| false|是否进行深度监听
immediate|boolean|false|true \| false|是否立即执行监听回调
flush|string|'pre'|'pre' \| 'post' \| 'sync'|控制监听回调的调用时机
onTrack|(e) => void|||在数据源被追踪时调用
onTrigger|(e) => void|||在监听回调被触发时调用

其中 `onTrack` 和 `onTrigger` 的 `e` 是 debugger 事件，建议在回调内放置一个 [debugger 语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/debugger) 以调试依赖，这两个选项仅在开发模式下生效。

:::tip
deep 默认是 `false` ，但是在监听 reactive 对象或数组时，会默认为 `true` ，详见 [监听选项之 deep](#监听选项之-deep)。
:::

#### 监听选项之 deep

`deep` 选项接受一个布尔值，可以设置为 `true` 开启深度监听，或者是 `false` 关闭深度监听，默认情况下这个选项是 `false` 关闭深度监听的，但也存在特例。

设置为 `false` 的情况下，如果直接监听一个响应式的 [引用类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%AF%B9%E8%B1%A1) 数据（e.g. `Object` 、 `Array` … ），虽然它的属性的值有变化，但对其本身来说是不变的，所以不会触发 watch 的 callback 。

下面是一个关闭了深度监听的例子：

```ts{23-26}
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    // 定义一个响应式数据，注意我是用的 ref 来定义
    const nums = ref<number[]>([])

    // 2s后给这个数组添加项目
    setTimeout(() => {
      nums.value.push(1)

      // 可以打印一下，确保数据确实变化了
      console.log('修改后', nums.value)
    }, 2000)

    // 但是这个 watch 不会按预期执行
    watch(
      nums,
      // 这里的 callback 不会被触发
      () => {
        console.log('触发监听', nums.value)
      },
      // 因为关闭了 deep
      {
        deep: false,
      }
    )
  },
})
```

类似这种情况，你需要把 `deep` 设置为 `true` 才可以触发监听。

可以看到我的例子特地用了 [ref API](#响应式-api-之-ref-new) ，这是因为通过 [reactive API](#响应式-api-之-reactive-new) 定义的对象无法将 `deep` 成功设置为 `false` 。

```ts{4}
// ...
if (isReactive(source)) {
  getter = () => source
  deep = true // 被强制开启了
}
// ...
```

这个情况就是我说的 “特例” ，你可以通过 `isReactive` API 来判断是否需要手动开启深度监听。

```ts
// 导入 isReactive API
import { defineComponent, isReactive, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    // 监听这个数据时，会默认开启深度监听
    const foo = reactive({
      name: 'Petter',
      age: 18,
    })
    console.log(isReactive(foo)) // true

    // 监听这个数据时，不会默认开启深度监听
    const bar = ref({
      name: 'Petter',
      age: 18,
    })
    console.log(isReactive(bar)) // false
  },
})
```

#### 监听选项之 immediate

在 [监听后的回调函数](#监听后的回调函数) 部分有了解过， watch 默认是惰性的，也就是只有当被监听的数据源发生变化时才执行回调。

这句话是什么意思呢？来看一下这段代码，为了减少 [deep](#监听选项之-deep) 选项的干扰，我们换一个类型，换成 `string` 数据来演示，请留意我的注释：

```ts
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    // 这个时候不会触发 watch 的回调
    const message = ref<string>('')

    // 2s后改变数据
    setTimeout(() => {
      // 来到这里才会触发 watch 的回调
      message.value = 'Hello World!'
    }, 2000)

    watch(message, () => {
      console.log('触发监听', message.value)
    })
  },
})
```

可以看到，数据在初始化的时候并不会触发监听回调，如果有需要的话，通过 `immediate` 选项来让它直接触发。

`immediate` 选项接受一个布尔值，默认是 `false` ，你可以设置为 `true` 让回调立即执行。

我们改成这样，请留意高亮的代码部分和新的注释：

```ts{5-6,19-22}
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    // 这一次在这里可以会触发 watch 的回调了
    const message = ref<string>('')

    // 2s后改变数据
    setTimeout(() => {
      // 这一次，这里是第二次触发 watch 的回调，不再是第一次
      message.value = 'Hello World!'
    }, 2000)

    watch(
      message,
      () => {
        console.log('触发监听', message.value)
      },
      // 设置 immediate 选项
      {
        immediate: true,
      }
    )
  },
})
```

注意，在带有 immediate 选项时，不能在第一次回调时取消该数据源的监听，详见 [停止监听](#停止监听) 部分。

#### 监听选项之 flush

`flush` 选项是用来控制 [监听回调](#监听后的回调函数) 的调用时机，接受指定的字符串，可选值如下，默认是 `'pre'` 。

可选值|回调的调用时机|使用场景
:-:|:--|:--
'pre'|将在渲染前被调用|允许回调在模板运行前更新了其他值
'sync'|在渲染时被同步调用|目前来说没什么好处，可以了解但不建议用…
'post'|被推迟到渲染之后调用|如果要通过 ref 操作 [DOM 元素与子组件](#dom-元素与子组件) ，需要使用这个值来启用该选项，以达到预期的执行效果


#### 停止监听

如果你在 [setup](#全新的-setup-函数-new) 或者 [script-setup](efficient.md#script-setup-new) 里使用 watch 的话， [组件被卸载](#组件的生命周期-new) 的时候也会一起被停止，一般情况下不太需要关心如何停止监听。

不过有时候你可能想要手动取消， Vue 3 也提供了方法。

:::tip
随着组件被卸载一起停止的前提是，侦听器必须是 [同步语句](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Introducing#%E5%90%8C%E6%AD%A5javascript) 创建的，这种情况下侦听器会绑定在当前组件上。

如果放在 `setTimeout` 等 [异步函数](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Introducing#%E5%BC%82%E6%AD%A5javascript) 里面创建，则不会绑定到当前组件，因此组件卸载的时候不会一起停止该侦听器，这种时候你就需要手动停止监听。
:::

当你在定义一个 watch 行为的时候，它会返回一个用来停止监听的函数。

用法很简单，做一下简单了解即可：

```ts
// 定义一个取消观察的变量，它是一个函数
const unwatch = watch(message, () => {
  // ...
})

// 在合适的时期调用它，可以取消这个监听
unwatch()
```

但是也有一点需要注意的是，如果你启用了 [immediate  选项](#监听选项之-immediate) ，不能在第一次触发监听回调时执行它。

```ts
// 注意：这是一段错误的代码，运行会报错
const unwatch = watch(
  message,
  // 监听的回调
  () => {
    // ...
    // 在这里调用会有问题 ❌
    unwatch()
  },
  // 启用 immediate 选项
  {
    immediate: true,
  }
)
```

你会收获一段报错，告诉你 `unwatch` 这个变量在初始化前无法被访问：

```bash
Uncaught ReferenceError: Cannot access 'unwatch' before initialization
```

目前有两种方案可以让你实现这个操作：

方案一：使用 `var` 并判断变量类型，利用 [var 的变量提升](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var#%E6%8F%8F%E8%BF%B0) 来实现目的。

```ts{2,7-9}
// 这里改成 var ，不要用 const 或 let
var unwatch = watch(
  message,
  // 监听回调
  () => {
    // 这里加一个判断，是函数才执行它
    if (typeof unwatch === 'function') {
      unwatch()
    }
  },
  // 监听选项
  {
    immediate: true,
  }
)
```

不过 `var` 已经属于过时的语句了，建议用方案二的 `let` 。

方案二：使用 `let` 并判断变量类型。

```ts{5-6,11-13}
// 如果不想用 any ，可以导入 TS 类型
import type { WatchStopHandle } from 'vue'

// 这里改成 let ，但是要另起一行，先定义，再赋值
let unwatch: WatchStopHandle
unwatch = watch(
  message,
  // 监听回调
  () => {
    // 这里加一个判断，是函数才执行它
    if (typeof unwatch === 'function') {
      unwatch()
    }
  },
  // 监听选项
  {
    immediate: true,
  }
)
```

#### 监听效果清理

在 [监听后的回调函数](#监听后的回调函数) 部分提及到一个参数 `onCleanup` ，它可以帮你注册一个清理函数。

有时 watch 的回调会执行异步操作，当 watch 到数据变更的时候，需要取消这些操作，这个函数的作用就用于此，会在以下情况调用这个清理函数：

- watcher 即将重新运行的时候
- watcher 被停止（组件被卸载或者被手动 [停止监听](#停止监听) ）

用法方面比较简单，传入一个回调函数运行即可，不过需要注意的是，需要在停止监听之前注册好清理行为，否则不会生效。

我们在 [停止监听](#停止监听) 里的最后一个 immediate 例子的基础上继续添加代码，请注意注册的时机：

```ts{6-9}
let unwatch: WatchStopHandle
unwatch = watch(
  message,
  (newValue, oldValue, onCleanup) => {
    // 需要在停止监听之前注册好清理行为
    onCleanup(() => {
      console.log('监听清理ing')
      // 根据实际的业务情况定义一些清理操作 ...
    })
    // 然后再停止监听
    if (typeof unwatch === 'function') {
      unwatch()
    }
  },
  {
    immediate: true,
  }
)
```

### watchEffect

如果一个函数里包含了多个需要监听的数据，一个一个数据去监听太麻烦了，在 Vue 3 ，你可以直接使用 watchEffect API 来简化你的操作。

#### 用法示例

它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```ts
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  setup () {
    // 单独定义两个数据，后面用来分开改变数值
    const name = ref<string>('Petter');
    const age = ref<number>(18);

    // 定义一个调用这两个数据的函数
    const getUserInfo = (): void => {
      console.log({
        name: name.value,
        age: age.value
      });
    }

    // 2s后改变第一个数据
    setTimeout(() => {
      name.value = 'Tom';
    }, 2000);

    // 4s后改变第二个数据
    setTimeout(() => {
      age.value = 20;
    }, 4000);

    // 直接监听调用函数，在每个数据产生变化的时候，它都会自动执行
    watchEffect(getUserInfo);
  }
})
```

#### 和 watch 的区别

虽然理论上 `watchEffect` 是 `watch` 的一个简化操作，可以用来代替 [批量监听](#批量监听) ，但它们也有一定的区别：

1. `watch` 可以访问侦听状态变化前后的值，而 `watchEffect` 没有。

2. `watch` 是在属性改变的时候才执行，而 `watchEffect` 则默认会执行一次，然后在属性改变的时候也会执行。

第二点的意思，看下面这段代码可以有更直观的理解：

使用 watch ：

```ts{13-17}
export default defineComponent({
  setup() {
    const foo = ref<string>('')

    setTimeout(() => {
      foo.value = 'Hello World!'
    }, 2000)

    function bar() {
      console.log(foo.value)
    }

    // 使用 watch 需要先手动执行一次
    bar()

    // 然后当 foo 有变动时，才会通过 watch 来执行 bar()
    watch(foo, bar)
  },
})
```

使用 watchEffect ：

```ts{13-14}
export default defineComponent({
  setup() {
    const foo = ref<string>('')

    setTimeout(() => {
      foo.value = 'Hello World!'
    }, 2000)

    function bar() {
      console.log(foo.value)
    }

    // 可以通过 watchEffect 实现 bar() + watch(foo, bar) 的效果
    watchEffect(bar)
  },
})
```

#### 可用的监听选项

虽然用法和 watch 类似，但也简化了一些选项，它的监听选项 TS 类型如下：


它不支持 [deep](#监听选项之-deep) 和 [immediate](#监听选项之-immediate) ，请记住这一点，其他的用法是一样的。

`flush` 选项的使用详见 [监听选项之 flush](#监听选项之-flush) ，`onTrack` 和 `onTrigger` 详见 [监听的选项](#监听的选项) 部分内容。

### watchPostEffect

[watchEffect](#watchEffect) API 使用 `flush: 'post'` 选项时的别名，具体区别详见 [监听选项之 flush](#监听选项之-flush) 部分。

:::tip
Vue v3.2.0 及以上版本才支持该 API 。
:::

### watchSyncEffect

[watchEffect](#watchEffect) API 使用 `flush: 'sync'` 选项时的别名，具体区别详见 [监听选项之 flush](#监听选项之-flush) 部分。

:::tip
Vue v3.2.0 及以上版本才支持该 API 。
:::

## 数据的计算

和 Vue 2.0 一样，数据的计算也是使用 `computed` API ，它可以通过现有的响应式数据，去通过计算得到新的响应式变量，用过 Vue 2.0 的同学应该不会太陌生，但是在 Vue 3.0 ，在使用方式上也是变化非常大！

:::tip
这里的响应式数据，可以简单理解为通过 [ref](#响应式-api-之-ref-new) API 、 [reactive](#响应式-api-之-reactive-new) API 定义出来的数据，当然 Vuex 、Vue Router 等 Vue 数据也都具备响应式。
:::

### 用法变化

我们先从一个简单的用例来看看在 Vue 新旧版本的用法区别：

假设你定义了两个分开的数据 `firstName` 名字和 `lastName` 姓氏，但是在 template 展示时，需要展示完整的姓名，那么你就可以通过 `computed` 来计算一个新的数据：

#### 回顾 Vue 2

在 Vue 2.0 ，`computed` 和 `data` 在同级配置，并且不可以和 `data` 里的数据同名重复定义：

```ts
// 在 Vue 2 的写法：
export default {
  data() {
    return {
      firstName: 'Bill',
      lastName: 'Gates',
    }
  },
  // 注意这里定义的变量，都要通过函数的形式来返回它的值
  computed: {
    // 普通函数可以直接通过熟悉的 this 来拿到 data 里的数据
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    // 箭头函数则需要通过参数来拿到实例上的数据
    fullName2: (vm) => `${vm.firstName} ${vm.lastName}`,
  }
}
```

这样你在需要用到全名的地方，只需要通过 `this.fullName` 就可以得到 `Bill Gates` 。

#### 了解 Vue 3

在 Vue 3.0 ，跟其他 API 的用法一样，需要先导入 `computed` 才能使用：

```ts
// 在 Vue 3 的写法：
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    // 定义基本的数据
    const firstName = ref<string>('Bill')
    const lastName = ref<string>('Gates')

    // 定义需要计算拼接结果的数据
    const fullName = computed(() => `${firstName.value} ${lastName.value}`)

    // 2s 后改变某个数据的值
    setTimeout(() => {
      firstName.value = 'Petter'
    }, 2000)

    // template 那边在 2s 后也会显示为 Petter Gates
    return {
      fullName,
    }
  },
})
```

你可以把这个用法简单的理解为，传入一个回调函数，并 `return` 一个值，对，它需要有明确的返回值。

:::tip
需要注意的是：

1. 定义出来的 `computed` 变量，和 `ref` 变量的用法一样，也是需要通过 `.value` 才能拿到它的值

2. 但是区别在于， `computed` 的 `value` 是只读的

原因详见下方的 [类型定义](#类型定义) 。
:::

### 类型定义

我们之前说过，在 [defineComponent](#了解-definecomponent) 里，会自动帮我们推导 Vue API 的类型，所以一般情况下，你是不需要显式的去定义 `computed` 出来的变量类型的。

在确实需要手动指定的情况下，你也可以导入它的类型然后定义：

```ts
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

// 注意这里添加了类型定义
const fullName: ComputedRef<string> = computed(
  () => `${firstName.value} ${lastName.value}`
)
```

你要返回一个字符串，你就写 `ComputedRef<string>` ；返回布尔值，就写 `ComputedRef<boolean>` ；返回一些复杂对象信息，你可以先定义好你的类型，再诸如 `ComputedRef<UserInfo>` 去写。

```ts
// 这是 ComputedRef 的类型定义：
export declare interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T;
  [ComoutedRefSymbol]: true;
}
```

### 优势对比和注意事项

在继续往下看之前，我们先来了解一下这个 API 的一些优势和注意事项（如果在 Vue 2 已经有接触过的话，可以跳过这一段，因为优势和需要注意的东西比较一致）。

#### 优势对比

看到这里，相信刚接触的同学可能会有疑问，既然 `computed` 也是通过一个函数来返回值，那么和普通的 `function` 有什么区别，或者说优势？

1. 性能优势

这一点在 [官网文档](https://v3.cn.vuejs.org/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95) 其实是有提到的：

>数据的计算是基于它们的响应依赖关系缓存的，只在相关响应式依赖发生改变时它们才会重新求值。

也就是说，只要原始数据没有发生改变，多次访问 `computed` ，都是会立即返回之前的计算结果，而不是再次执行函数；而普通的 `function` 调用多少次就执行多少次，每调用一次就计算一次。

至于为何要如此设计，官网文档也给出了原因：

> 我们为什么需要缓存？假设我们有一个性能开销比较大的计算数据 list，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算数据依赖于 list。如果没有缓存，我们将不可避免的多次执行 list 的 getter！如果你不希望有缓存，请用 function 来替代。


2. 书写统一

我们假定 foo1 是 `ref` 变量， foo2 是 `computed` 变量， foo3 是普通函数返回值

看到这里的同学应该都已经清楚 Vue 3 的 `ref` 变量是通过 `foo1.value` 来拿到值的，而 `computed` 也是通过 `foo2.value` ，并且在 template 里都可以省略 `.value` ，在读取方面，他们是有一致的风格和简洁性。

而 foo3 不管是在 script 还是 template ，都需要通过 `foo3()` 才能拿到结果，相对来说会有那么一丢丢别扭。

当然，关于这一点，如果涉及到的数据不是响应式数据，那么还是老老实实的用函数返回值吧，原因请见下面的 [注意事项](#注意事项) 。

#### 注意事项

有优势当然也就有一定的 “劣势” ，当然这也是 Vue 框架的有意为之，所以在使用上也需要注意一些问题：

1. 只会更新响应式数据的计算

假设你要获取当前的时间信息，因为不是响应式数据，所以这种情况下你就需要用普通的函数去获取返回值，才能拿到最新的时间。

```ts
const nowTime = computed(() => new Date())
console.log(nowTime.value)
// 输出 Sun Nov 14 2021 21:07:00 GMT+0800 (GMT+08:00)

// 2s 后依然是跟上面一样的结果
setTimeout(() => {
  console.log(nowTime.value)
  // 还是输出 Sun Nov 14 2021 21:07:00 GMT+0800 (GMT+08:00)
}, 2000)
```

2. 数据是只读的

通过 computed 定义的数据，它是只读的，这一点在 [类型定义](#类型定义) 已经有所了解。

如果你直接赋值，不仅无法变更数据，而且会收获一个报错。

```bash
TS2540: Cannot assign to 'value' because it is a read-only property.
```

虽然无法直接赋值，但是在必要的情况下，你依然可以通过 `computed` 的 `setter` 来更新数据。

点击了解：[computed 的 setter 用法](#setter-的使用)

### setter 的使用

通过 computed 定义的变量默认都是只读的形式（只有一个 getter ），但是在必要的情况下，你也可以使用其 setter 属性来更新数据。

#### 基本格式

当你需要用到 setter 的时候， `computed` 就不再是一个传入 callback 的形式了，而是传入一个带有 2 个方法的对象。

```ts
// 注意这里computed接收的入参已经不再是函数
const foo = computed({
  // 这里需要明确的返回一个值
  get() {
    // ...
  },
  // 这里接收一个参数，代表修改 foo 时，赋值下来的新值
  set(newValue) {
    // ...
  },
})
```

这里的 `get` 就是 `computed` 的 getter ，跟原来传入 callback 的形式一样，是用于 `foo.value` 的读取，所以这里你必须有明确的返回值。

这里的 `set` 就是 `computed` 的 setter ，它会接收一个参数，代表新的值，当你通过 `foo.value = xxx` 赋值的时候，赋入的这个值，就会通过这个入参来传递进来，你可以根据你的业务需要，把这个值，赋给相关的数据源。

:::tip
请注意，必须使用 `get` 和 `set` 这 2 个方法名，也只接受这 2 个方法。
:::

## CSS 样式与预处理器

Vue 组件的 CSS 样式部分，3.x 保留着和 2.x 完全一样的写法。 

### 编写组件样式表

最基础的写法，就是在 Vue 文件里创建一个 `style` 标签，即可在里面写 CSS 代码了。

```vue
<style>
.msg {
  width: 100%;
}
.msg p {
  color: #333;
  font-size: 14px;
}
</style>
```

### 动态绑定 CSS

动态绑定 CSS ，在 Vue 2 就已经存在了，在此之前常用的是 `:class` 和 `:style` ，现在在 Vue 3 ，还可以通过 `v-bind` 来动态修改了。

其实这一部分主要是想说一下 3.x 新增的 `<style> v-bind` 功能，不过既然写到这里，就把另外两个动态绑定方式也一起提一下。

#### 使用 :class 动态修改样式名

它是绑定在 DOM 元素上面的一个属性，跟 `class` 同级别，它非常灵活！

:::tip
使用 `:class` 是用来动态修改样式名，也就意味着你必须提前把样式名对应的样式表先写好！
:::

假设我们已经提前定义好了这几个变量：

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const activeClass = 'active-class'
    const activeClass1 = 'active-class1'
    const activeClass2 = 'active-class2'
    const isActive = true

    return {
      activeClass,
      activeClass1,
      activeClass2,
      isActive,
    }
  }
})
</script>
```

如果只想绑定一个单独的动态样式，你可以传入一个字符串：

```vue
<template>
  <p :class="activeClass">Hello World!</p>
</template>
```

如果有多个动态样式，也可以传入一个数组：

```vue
<template>
  <p :class="[activeClass1, activeClass2]">Hello World!</p>
</template>
```

你还可以对动态样式做一些判断，这个时候传入一个对象：

```vue
<template>
  <p :class="{ 'active-class': isActive }">Hello World!</p>
</template>
```

多个判断的情况下，记得也用数组套起来：

```vue
<template>
  <p
    :class="[
      { activeClass1: isActive },
      { activeClass2: !isActive }
    ]"
  >
    Hello World!
  </p>
</template>
```

那么什么情况下会用到 `:class` 呢？

最常见的场景，应该就是导航、选项卡了，比如你要给一个当前选中的选项卡做一个突出高亮的状态，那么就可以使用 `:class` 来动态绑定一个样式。

```vue
<template>
  <ul class="list">
    <li
      class="item"
      :class="{ cur: index === curIndex }"
      v-for="(item, index) in 5"
      :key="index"
      @click="curIndex = index"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const curIndex = ref<number>(0)

    return {
      curIndex,
    }
  }
})
</script>

<style scoped>
.cur {
  color: red;
}
</style>
```

这样就简单实现了一个点击切换选项卡高亮的功能。

#### 使用 :style 动态修改内联样式

如果你觉得使用 `:class` 需要提前先写样式，再去绑定样式名有点繁琐，有时候只想简简单单的修改几个样式，那么你可以通过 `:style` 来处理。

默认的情况下，我们都是传入一个对象去绑定：

- `key` 是符合 CSS 属性名的 “小驼峰式” 写法，或者套上引号的短横线分隔写法（原写法），例如在 CSS 里，定义字号是 `font-size` ，那么你需要写成 `fontSize` 或者 `'font-size'` 作为它的键。

- `value` 是 CSS 属性对应的 “合法值”，比如你要修改字号大小，可以传入 `13px` 、`0.4rem` 这种带合法单位字符串值，但不可以是 `13` 这样的缺少单位的值，无效的 CSS 值会被过滤不渲染。

```vue
<template>
  <p
    :style="{
      fontSize: '13px',
      'line-height': 2,
      color: '#ff0000',
      textAlign: 'center'
    }"
  >
    Hello World!
  </p>
</template>
```

如果有些特殊场景需要绑定多套 `style`，你需要在 `script` 先定义好各自的样式变量（也是符合上面说到的那几个要求的对象），然后通过数组来传入：

```vue
<template>
  <p
    :style="[style1, style2]"
  >
    Hello World!
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const style1 = {
      fontSize: '13px',
      'line-height': 2,
    }
    const style2 = {
      color: '#ff0000',
      textAlign: 'center',
    }

    return {
      style1,
      style2,
    }
  }
})
</script>
```

#### 使用 v-bind 动态修改 style

当然，以上两种形式都是关于 `<script />` 和 `<template />` 部分的相爱相杀，如果你觉得会给你的模板带来一定的维护成本的话，不妨考虑这个新方案，将变量绑定到 `<style />` 部分去。

:::tip
请注意这是一个在 `3.2.0` 版本之后才被归入正式队列的新功能！

如果需要使用它，请确保你的 `vue` 和 `@vue/compiler-sfc` 版本号在 `3.2.0` 以上，最好是保持最新的 `@next` 版本。
:::

我们先来看看基本的用法：

```vue
<template>
  <p class="msg">Hello World!</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const fontColor = ref<string>('#ff0000')

    return {
      fontColor,
    }
  }
})
</script>

<style scoped>
.msg {
  color: v-bind(fontColor);
}
</style>
```

如上面的代码，你将渲染出一句红色文本的 `Hello World!`

这其实是利用了现代浏览器支持的 CSS 变量来实现的一个功能（所以如果你打算用它的话，需要提前注意一下兼容性噢，点击查看：[CSS Variables 兼容情况](https://caniuse.com/css-variables)）

它渲染到 DOM 上，其实也是通过绑定 `style` 来实现，我们可以看到渲染出来的样式是：

```html
<p
  class="msg"
  data-v-7eb2bc79=""
  style="--7eb2bc79-fontColor:#ff0000;"
>
  Hello World!
</p>
```

对应的 CSS 变成了：

```css
.msg[data-v-7eb2bc79] {
  color: var(--7eb2bc79-fontColor);
}
```

理论上 `v-bind` 函数可以在 Vue 内部支持任意的 JS 表达式，但由于可能包含在 CSS 标识符中无效的字符，因此官方是建议在大多数情况下，用引号括起来，如：

```css
.text {
  font-size: v-bind('theme.font.size');
}
```

由于 CSS 变量的特性，因此对 CSS 响应式属性的更改不会触发模板的重新渲染（这也是和 `:class` 与 `:style` 的最大不同）。

:::tip
不管你有没有开启 [\<style scoped\>](#style-scoped) ，使用 `v-bind` 渲染出来的 CSS 变量，都会带上 `scoped` 的随机 hash 前缀，避免样式污染（永远不会意外泄漏到子组件中），所以请放心使用！
:::

如果你对 CSS 变量的使用还不是很了解的话，可以先阅读一下相关的基础知识点。

相关阅读：[使用CSS自定义属性（变量） - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

### 样式表的组件作用域

CSS 不像 JS ，是没有作用域的概念的，一旦写了某个样式，直接就是全局污染。所以 [BEM 命名法](https://www.bemcss.com/) 等规范才应运而生。

但在 Vue 组件里，有两种方案可以避免出现这种污染问题。

一个是 Vue 2 就有的 `<style scoped>` ，一个是 Vue 3 新推出的 `<style module>` 。

#### style scoped

Vue 组件在设计的时候，就想到了一个很优秀的解决方案，通过 `scoped` 来支持创建一个 CSS 作用域，使这部分代码只运行在这个组件渲染出来的虚拟 DOM 上。

使用方式很简单，只需要在 `style` 后面带上 `scoped` 属性。

```vue
<style scoped>
.msg {
  width: 100%;
}
.msg p {
  color: #333;
  font-size: 14px;
}
</style>
```

编译后，虚拟 DOM 都会带有一个 `data-v-xxxxx` 这样的属性，其中 `xxxxx` 是一个随机生成的 hash ，同一个组件的 hash 是相同并且唯一的：

```html
<div class="msg" data-v-7eb2bc79>
  <p data-v-7eb2bc79>Hello World!</p>
</div>
```

而 CSS 则也会带上与 HTML 相同的属性，从而达到样式作用域的目的。

```css
.msg[data-v-7eb2bc79] {
  width: 100%;
}
.msg p[data-v-7eb2bc79] {
  color: #333;
  font-size: 14px;
}
```

使用 `scoped` 可以有效的避免全局样式污染，你可以在不同的组件里面都使用相同的 className，而不必担心会相互覆盖，不必再定义很长很长的样式名来防止冲突了。

:::tip
添加 `scoped` 生成的样式，只作用于当前组件中的元素，并且权重高于全局 CSS ，可以覆盖全局样式
:::

#### style module

这是在 Vue 3 才推出的一个新方案，和 `<style scoped>` 不同，scoped 是通过给 DOM 元素添加自定义属性的方式来避免冲突，而 `<style module>` 则更为激进，将会编译成 [CSS Modules](https://github.com/css-modules/css-modules) 。

对于 CSS Modules 的处理方式，我们也可以通过一个小例子来更直观的了解它：

```css
/* 编译前 */
.title {
  color: red;
}

/* 编译后 */
._3zyde4l1yATCOkgn-DBWEL {
  color: red;
}
```

可以看出，是通过比较 “暴力” 的方式，把我们编写的 “好看的” 样式名，直接改写成一个随机 hash 样式名，来避免样式互相污染。

>上面的案例来自阮老师的博文 [CSS Modules 用法教程](https://www.ruanyifeng.com/blog/2016/06/css_modules.html) 

所以我们回到 Vue 这边，看看 `<style module>` 是怎么操作的。

```vue
<template>
  <p :class="$style.msg">Hello World!</p>
</template>

<style module>
.msg {
  color: #ff0000;
}
</style>
```

于是，你将渲染出一句红色文本的 `Hello World!` 。

:::tip
1. 使用这个方案，需要了解如何 [使用 :class 动态修改样式名](#使用-class-动态修改样式名) 

2. 如果单纯只使用 `<style module>` ，那么在绑定样式的时候，是默认使用 `$style` 对象来操作的

3. 必须显示的指定绑定到某个样式，比如 `$style.msg` ，才能生效

4. 如果单纯的绑定 `$style` ，并不能得到 “把全部样式名直接绑定” 的期望结果

5. 如果你指定的 className 是短横杆命名，比如 `.user-name` ，那么需要通过 `$style['user-name']` 去绑定
:::

你也可以给 `module` 进行命名，然后就可以通过你命名的 “变量名” 来操作：

```vue
<template>
  <p :class="classes.msg">Hello World!</p>
</template>

<style module="classes">
.msg {
  color: #ff0000;
}
</style>
```

:::tip
需要注意的一点是，一旦开启 `<style module>` ，那么在 `<style module>` 里所编写的样式，都必须手动绑定才能生效，没有被绑定的样式，会被编译，但不会主动生效到你的 DOM 上。

原因是编译出来的样式名已经变化，而你的 DOM 未指定对应的样式名，或者指定的是编译前的命名，所以并不能匹配到正确的样式。
:::

#### useCssModule

这是一个全新的 API ，面向在 script 部分操作 CSS Modules 。

在上面的 [CSS Modules](#style-module-new) 部分可以知道，你可以在 `style` 定义好样式，然后在 `template` 部分通过变量名来绑定样式。

那么如果有一天有个需求，你需要通过 `v-html` 来渲染 HTML 代码，那这里的样式岂不是凉凉了？当然不会！

Vue 3 提供了一个 Composition API `useCssModule` 来帮助你在 `setup` 函数里操作你的 CSS Modules （对，只能在 [setup](#全新的-setup-函数-new) 或者 [script setup](efficient.md#script-setup-new) 里使用）。

**基本用法：**

我们绑定多几个样式，再来操作：

```vue
<template>
  <p :class="$style.msg">
    <span :class="$style.text">Hello World!</span>
  </p>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  setup () {
    const style = useCssModule()
    console.log(style)
  }
})
</script>

<style module>
.msg {
  color: #ff0000;
}
.text {
  font-size: 14px;
}
</style>
```

可以看到打印出来的 `style` 是一个对象：

- `key` 是你在 `<style modules>` 里定义的原始样式名

- `value` 则是编译后的新样式名

```js
{
  msg: 'home_msg_37Xmr',
  text: 'home_text_2woQJ'
}
```

所以我们来配合 [模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals) 的使用，看看刚刚说的，要通过 `v-html` 渲染出来的内容应该如何绑定样式：

```vue
<template>
  <div v-html="content"></div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  setup () {
    // 获取样式
    const style = useCssModule()

    // 编写模板内容
    const content = `<p class="${style.msg}">
      <span class="${style.text}">Hello World! —— from v-html</span>
    </p>`

    return {
      content,
    }
  }
})
</script>

<style module>
.msg {
  color: #ff0000;
}
.text {
  font-size: 14px;
}
</style>
```

是不是也非常简单？可能刚开始不太习惯，但写多几次其实也蛮好玩的这个功能！

**另外，需要注意的是，如果你是指定了 modules 的名称，那么必须传入对应的名称作为入参才可以正确拿到这些样式：**

比如指定了一个 classes 作为名称：

```vue
<style module="classes">
/* ... */
</style>
```

那么需要通过传入 classes 这个名称才能拿到样式，否则会是一个空对象：

```ts
const style = useCssModule('classes')
```

:::tip
在 `const style = useCssModule()` 的时候，命名是随意的，跟你在 `<style module="classes">` 这里指定的命名没有关系。
:::

### 深度操作符

在 [样式表的组件作用域](#样式表的组件作用域) 部分我们了解到，使用 scoped 后，父组件的样式将不会渗透到子组件中，但也不能直接修改子组件的样式。

如果确实需要进行修改子组件的样式，必须通过 `::v-deep`（完整写法） 或者 `:deep`（快捷写法） 操作符来实现。

:::tip
1. 旧版的深度操作符是 `>>>` 、 `/deep/` 和 `::v-deep`，现在 `>>>` 和 `/deep/` 已进入弃用阶段（虽然暂时还没完全移除）

2. 同时需要注意的是，旧版 `::v-deep` 的写法是作为组合器的方式，写在样式或者元素前面，如：`::v-deep .class-name { /* ... */ }`，现在这种写法也废弃了。
:::

现在不论是 `::v-deep` 还是 `:deep` ，使用方法非常统一，我们来假设 .b 是子组件的样式名：

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

编译后：

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
可以看到，新的 deep 写法是作为一个类似 JS “函数” 那样去使用，需要深度操作的样式或者元素名，作为 “入参” 去传入。
:::

同理，如果你使用 Less 或者 Stylus 这种支持嵌套写法的预处理器，也是可以这样去深度操作的：

```less
.a {
  :deep(.b) {
    /* ... */
  }
}
```

另外，除了操作子组件的样式，那些通过 `v-html` 创建的 DOM 内容，也不受作用域内的样式影响，也可以通过深度操作符来实现样式修改。

## 组件之间的通信

通信场景|快速定位
:--|:--
父子组件通信|[点击查看](#父子组件通信)
爷孙组件通信|[点击查看](#爷孙组件通信)
兄弟组件通信|[点击查看](#兄弟组件通信)
全局组件通信|[点击查看](#全局组件通信)

## 父子组件通信

父子组件通信是指，B 组件引入到 A 组件里渲染，此时 A 是 B 的父级；B 组件的一些数据需要从A组件拿，B 组件有时也要告知 A 组件一些数据变化情况。

他们之间的关系如下，`Child.vue` 是直接挂载在 `Father.vue` 下面：

```
Father.vue
└─Child.vue
```

常用的方法有：

方案|父组件向子组件|子组件向父组件|对应章节传送门
:--|:--|:--|:--
props / emits|props|emits|[点击查看](#props-emits)
v-model / emits|v-model|emits|[点击查看](#v-model-emits)
ref / emits|ref|emits|[点击查看](#ref-emits)
provide / inject|provide|inject|[点击查看](#provide-inject)
EventBus|emit / on|emit / on|[点击查看](#eventbus-new)

为了方便阅读，下面的父组件统一叫 `Father.vue`，子组件统一叫 `Child.vue`。

:::warning
在 2.x，有的同学可能喜欢用 `$attrs / $listeners` 来进行通信，但该方案在 3.x 已经移除了，详见 [移除 $listeners](https://v3.cn.vuejs.org/guide/migration/listeners-removed.html)
:::

## props / emits

这是Vue跨组件通信最常用，也是基础的一个方案，它的通信过程是：

1. `Father.vue` 通过 `prop` 向 `Child.vue` 传值（可包含父级定义好的函数）

2. `Child.vue` 通过 `emit` 向 `Father.vue` 触发父组件的事件执行

### 下发 props

下发的过程是在 `Father.vue` 里完成的，父组件在向子组件下发 `props` 之前，需要导入子组件并启用它作为自身的模板，然后在 `setup` 里处理好数据，return 给 `template` 用。

在 `Father.vue` 的 `script` 里：

```ts
import { defineComponent } from 'vue'
import Child from '@cp/Child.vue'

interface Member {
  id: number,
  name: string
};

export default defineComponent({
  // 需要启用子组件作为模板
  components: {
    Child
  },

  // 定义一些数据并return给template用
  setup () {
    const userInfo: Member = {
      id: 1,
      name: 'Petter'
    }

    // 不要忘记return，否则template拿不到数据
    return {
      userInfo
    }
  }
})
```

然后在 `Father.vue` 的 `template` 这边拿到 return 出来的数据，把要传递的数据通过属性的方式绑定在 `template` 的组件标签上。

```vue
<template>
  <Child
    title="用户信息"
    :index="1"
    :uid="userInfo.id"
    :user-name="userInfo.name"
  />
</template>
```

这样就完成了 `props` 数据的下发。

:::tip
1. 在 `template` 绑定属性这里，如果是普通的字符串，比如上面的 `title`，则直接给属性名赋值就可以

2. 如果是变量，或者其他类型如 `Number`、`Object` 等，则需要通过属性动态绑定的方式来添加，使用 `v-bind:` 或者 `:` 符号进行绑定

3. 官方建议 prop 在 `template` 统一采用短横线分隔命名 （详见：[Prop 的大小写命名](https://v3.cn.vuejs.org/guide/component-props.html#prop-%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%91%BD%E5%90%8D-camelcase-vs-kebab-case)），但实际上你采用驼峰也是可以正确拿到值，因为 Vue 的源码里有做转换
:::

### 接收 props

接收的过程是在 `Child.vue` 里完成的，在 `script` 部分，子组件通过与 `setup` 同级的 `props` 来接收数据。

它可以是一个数组，每个 `item` 都是 `String` 类型，把你要接受的变量名放到这个数组里，直接放进来作为数组的 `item`：

```ts
export default defineComponent({
  props: [
    'title',
    'index',
    'userName',
    'uid'
  ]
})
```

但这种情况下，使用者不知道这些属性到底是什么类型的值，是否必传。

### 带有类型限制的 props

> 注：这一小节的步骤是在 `Child.vue` 里操作。

既然我们最开始在决定使用 Vue 3.0 的时候，为了更好的类型限制，已经决定写 TypeScript ，那么我们最好不要出现这种使用情况。

**推荐的方式是把 `props` 定义为一个对象，以对象形式列出 `prop`，每个 `property` 的名称和值分别是 `prop` 各自的名称和类型，只有合法的类型才允许传入。**

:::tip
注意，和 TS 的类型定义不同， `props` 这里的类型，首字母需要大写。
:::

支持的类型有：

类型|含义
:--|:--
String|字符串
Number|数值
Boolean|布尔值
Array|数组
Object|对象
Date|日期数据，e.g. new Date()
Function|函数，e.g. 普通函数、箭头函数、构造函数
Promise|Promise 类型的函数
Symbol|Symbol 类型的值

于是我们把 `props` 再改一下，加上类型限制：

```ts
export default defineComponent({
  props: {
    title: String,
    index: Number,
    userName: String,
    uid: Number
  }
})
```

这样我们如果传入不正确的类型，程序就会抛出警告信息，告知开发者必须正确传值。

如果你需要对某个 `prop` 允许多类型，比如这个 `uid` 字段，它可能是数值，也可能是字符串，那么可以在类型这里，使用一个数组，把允许的类型都加进去。

```ts
export default defineComponent({
  props: {
    // 单类型
    title: String,
    index: Number,
    userName: String,

    // 这里使用了多种类型
    uid: [ Number, String ]
  }
})
```

### 可选以及带有默认值的 props

> 注：这一小节的步骤是在 `Child.vue` 里操作。

有时候我们想对一些 `prop` 设置为可选，然后提供一些默认值，还可以再将 `prop` 再进一步设置为对象，支持的字段有：

字段|类型|含义|
:--|:--|:--
type|string|prop 的类型
required|boolean|是否必传，true=必传，false=可选
default|any|与 type 字段的类型相对应的默认值，如果 required 是 false ，但这里不设置默认值，则会默认为 `undefined`
validator|function|自定义验证函数，需要 return 一个布尔值，true=校验通过，false=校验不通过，当校验不通过时，控制台会抛出警告信息

我们现在再对 `props` 改造一下，对部分字段设置为可选，并提供默认值：

```ts
export default defineComponent({
  props: {
    // 可选，并提供默认值
    title: {
      type: String,
      required: false,
      default: '默认标题'
    },

    // 默认可选，单类型
    index: Number,

    // 添加一些自定义校验
    userName: {
      type: String,

      // 在这里校验用户名必须至少3个字
      validator: v => v.length >= 3
    },

    // 默认可选，但允许多种类型
    uid: [ Number, String ]
  }
})
```

### 使用 props

> 注：这一小节的步骤是在 `Child.vue` 里操作。

在 `template` 部分，3.x 的使用方法和 2.x 是一样的，比如要渲染我们上面传入的 `props` ：

```vue
<template>
  <p>标题：{{ title }}</p>
  <p>索引：{{ index }}</p>
  <p>用户id：{{ uid }}</p>
  <p>用户名：{{ userName }}</p>
</template>
```

**但是 `script` 部分，变化非常大！**

在 2.x ，只需要通过 `this.uid`、`this.userName` 就可以使用父组件传下来的 `prop` 。

但是 3.x 没有了 `this`， 需要给 `setup` 添加一个入参才可以去操作。

```ts
export default defineComponent({
  props: {
    title: String,
    index: Number,
    userName: String,
    uid: Number
  },

  // 在这里需要添加一个入参
  setup (props) {

    // 该入参包含了我们定义的所有props
    console.log(props);

  }
})
```

:::tip
1. `prop` 是只读，不允许修改

2. `setup` 的第一个入参，包含了我们定义的所有props（如果在 `Child.vue` 里未定义，但 父组件 `Father.vue` 那边非要传过来的，不会拿到，且控制台会有警告信息）

3. 该入参可以随意命名，比如你可以写成一个下划线 `_`，通过 `_.uid` 也可以拿到数据，但是语义化命名，是一个良好的编程习惯。
:::

### 传递非 Prop 的 Attribute

上面的提示里有提到一句：

> 如果在 `Child.vue` 里未定义，但 父组件 `Father.vue` 那边非要传过来的，不会拿到，且控制台会有警告信息

但并不意味着你不能传递任何未定义的属性数据，在父组件，除了可以给子组件绑定 props，你还可以根据实际需要去绑定一些特殊的属性。

比如给子组件设置 `class`、`id`，或者 `data-xxx` 之类的一些自定义属性，**如果 `Child.vue` 组件的 `template` 只有一个根节点，这些属性默认自动继承，并渲染在 node 节点上**。

在 `Father.vue` 里，对 `Child.vue` 传递了 `class`、`id` 和 `data-hash`：

```vue
<template>
  <Child
    class="child"
    keys="aaaa"
    data-hash="afJasdHGUHa87d688723kjaghdhja"
  />
</template>
```

渲染后（2个 `data-v-xxx` 是父子组件各自的 `css scoped` 标记）：

```html
<div
  class="child"
  keys="aaaa"
  data-hash="afJasdHGUHa87d688723kjaghdhja"
  data-v-2dcc19c8=""
  data-v-7eb2bc79=""
>
  <!-- Child的内容 -->
</div>
```

你可以在 `Child.vue` 配置 `inheritAttrs` 为 `false`，来屏蔽这些自定义属性的渲染。

```ts
export default defineComponent({
  inheritAttrs: false,
  setup () {
    // ...    
  }
})
```

### 获取非 Prop 的 Attribute

想要拿到这些属性，原生操作需要通过 `element.getAttribute` ，但 Vue 也提供了相关的 API ：

在 `Child.vue` 里，可以通过 `setup` 的第二个参数 `context` 里的 `attrs` 来获取到这些属性。

```ts
export default defineComponent({
  setup (props, { attrs }) {
    // attrs 是个对象，每个 Attribute 都是它的 key
    console.log(attrs.class);

    // 如果传下来的 Attribute 带有短横线，需要通过这种方式获取
    console.log(attrs['data-hash']);
  }
})
```

:::tip
1. `attr` 和 `prop` 一样，都是只读的

2. 不管 `inheritAttrs` 是否设置，都可以通过 `attrs` 拿到这些数据，但是 `element.getAttribute` 则只有 `inheritAttrs` 为 `true` 的时候才可以。
:::

Vue 3 的 `template` 还允许多个根节点，多个根节点的情况下，无法直接继承这些属性，需要在 `Child.vue` 指定继承在哪个节点上，否则会有警告信息。

```vue
<template>
  <!-- 指定继承 -->
  <p v-bind="attrs"></p>
  <!-- 指定继承 -->
  
  <!-- 这些不会自动继承 -->
  <p></p>
  <p></p>
  <p></p>
  <!-- 这些不会自动继承 -->
</template>
```

当然，前提依然是，`setup` 里要把 `attrs` 给 `return` 出来。

查看详情：[多个根节点上的 Attribute 继承](https://v3.cn.vuejs.org/guide/component-attrs.html#%E5%A4%9A%E4%B8%AA%E6%A0%B9%E8%8A%82%E7%82%B9%E4%B8%8A%E7%9A%84-attribute-%E7%BB%A7%E6%89%BF)

### 绑定 emits

最开始有介绍到，子组件如果需要向父组件告知数据更新，或者执行某些函数时，是通过 emits 来进行的。

每个 `emit` 都是事件，所以需要先由父组件先给子组件绑定，子组件才能知道应该怎么去调用。

:::tip
当然，父组件也是需要先在 `setup` 里进行定义并 `return`，才能够在 `template` 里绑定给子组件。
:::

比如要给 `Child.vue` 绑定一个更新用户年龄的方法，那么在 `Father.vue` 里需要这么处理：

先看 `script` 部分（留意注释部分）：

```ts
import { defineComponent, reactive } from 'vue'
import Child from '@cp/Child.vue'

interface Member {
  id: number,
  name: string,
  age: number
};

export default defineComponent({
  components: {
    Child
  },
  setup () {
    const userInfo: Member = reactive({
      id: 1,
      name: 'Petter',
      age: 0
    })

    // 定义一个更新年龄的方法
    const updateAge = (age: number): void => {
      userInfo.age = age;
    }

    return {
      userInfo,

      // return给template用
      updateAge
    }
  }
})
```

再看 `template` 部分（为了方便阅读，我把之前绑定的 props 先去掉了）：

```vue
<template>
  <Child
    @update-age="updateAge"
  />
</template>
```

:::tip
1. 动态绑定 `props` 是用 `:`，绑定 `emit` 是用 `@`

2. 关于绑定的这个 `@` 符号，其实很好记忆，因为在 Vue 的 `template` 里，所有的事件绑定都是通过 `@`，比如 `@click`、`@change` 等等

3. 同样的，在绑定 `emit` 时，也需要使用短横线写法（详见：[事件名](https://v3.cn.vuejs.org/guide/component-custom-events.html#%E4%BA%8B%E4%BB%B6%E5%90%8D)）
:::

### 接收 emits

> 注：这一小节的步骤是在 `Child.vue` 里操作。

和 `props` 一样，你可以指定是一个数组，把要接收的 `emit` 名称写进去：

```ts
export default defineComponent({
  emits: [
    'update-age'
  ]
})
```

其实日常这样配置就足够用了。

:::tip
1. 这里的 `emit` 名称指 `Father.vue` 在给 `Child.vue` 绑定事件时，`template` 里面给子组件指定的 `@aaaaa="bbbbb"` 里的 `aaaaa`

2. 当在 emits 选项中定义了原生事件 (如 `click` ) 时，将使用组件中的事件替代原生事件侦听器
:::

### 接收 emits 时做一些校验

当然你也可以对这些事件做一些验证，配置为对象，然后把这个 `emit` 名称作为 `key`， `value` 则配置为一个方法。

比如上面的更新年龄，只允许达到成年人的年龄才会去更新父组件的数据：

```ts
export default defineComponent({
  emits: {
    // 需要校验
    'update-age': (age: number) => {
      // 写一些条件拦截，记得返回false
      if ( age < 18 ) {
        console.log('未成年人不允许参与');
        return false;
      }

      // 通过则返回true
      return true;
    },

    // 一些无需校验的，设置为null即可
    'update-name': null
  }
})
```

### 调用 emits

> 注：这一小节的步骤是在 `Child.vue` 里操作。

和 `props` 一样，也需要在 `setup` 的入参里引入 `emit` ，才允许操作。

`setup` 的第二个入参 `expose` 是一个对象，你可以完整导入 `expose` 然后通过 `expose.emit` 去操作，也可以按需导入 `{ emit }` （推荐这种方式）：

```ts
export default defineComponent({
  emits: [
    'update-age'
  ],
  setup (props, { emit }) {
    
    // 2s 后更新年龄
    setTimeout( () => {
      emit('update-age', 22);
    }, 2000);

  }
})
```

:::tip
`emit` 的第二个参数开始是父组件那边要接收的自定义数据，为了开发上的便利，建议如果需要传多个数据的情况下，直接将第二个参数设置为一个对象，把所有数据都放到对象里，传递和接收起来都会方便很多。
:::

## v-model / emits

对比 `props / emits` ，这个方式更为简单：

1. 在 `Father.vue` ，通过 `v-model` 向 `Child.vue` 传值

2. `Child.vue` 通过自身设定的 emits 向 `Father.vue` 通知数据更新

`v-model` 的用法和 `props` 非常相似，但是很多操作上更为简化，但操作简单带来的 “副作用” ，就是功能上也没有 `props` 那么多。

### 绑定 v-model

它的和下发 props 的方式类似，都是在子组件上绑定 `Father.vue` 定义好并 `return` 出来的数据。

:::tip
1. 和 2.x 不同， 3.x 可以直接绑定 `v-model` ，而无需在子组件指定 `model` 选项。

2. 另外，3.x 的 `v-model` 需要使用 `:` 来指定你要绑定的属性名，同时也开始支持绑定多个 `v-model`
:::

我们来看看具体的操作：

```vue
<template>
  <Child
    v-model:user-name="userInfo.name"
  />
</template>
```

如果你要绑定多个数据，写多个 `v-model` 即可

```vue
<template>
  <Child
    v-model:user-name="userInfo.name"
    v-model:uid="userInfo.id"
  />
</template>
```

看到这里应该能明白了，一个 `v-model` 其实就是一个 `prop`，它支持的数据类型，和 `prop` 是一样的。

所以，子组件在接收数据的时候，完全按照 `props` 去定义就可以了。

点击回顾：[接收 props](#接收-props) ，了解在 `Child.vue` 如何接收 `props`，以及相关的 `props` 类型限制等部分内容。

### 配置 emits

> 注：这一小节的步骤是在 `Child.vue` 里操作。

虽然 `v-model` 的配置和 `prop` 相似，但是为什么出这么两个相似的东西？自然是为了简化一些开发上的操作。

使用 props / emits，如果要更新父组件的数据，还需要在父组件定义好方法，然后 `return` 给 `template` 去绑定事件给子组件，才能够更新。

而使用 `v-model / emits` ，无需如此，可以在 `Child.vue` 直接通过 “update:属性名” 的格式，直接定义一个更新事件：

```ts
export default defineComponent({
  props: {
    userName: String,
    uid: Number
  },
  emits: [
    'update:userName',
    'update:uid'
  ]
})
```

这里的 update 后面的属性名，支持驼峰写法，这一部分和 2.x 的使用是相同的。

这里也可以对数据更新做一些校验，配置方式和 [接收 emits 时做一些校验](#接收-emits-时做一些校验) 是一样的。

### 调用自身的 emits

> 注：这一小节的步骤是在 `Child.vue` 里操作。

在 `Child.vue` 配置好 emits 之后，就可以在 `setup` 里直接操作数据的更新了：

```ts
export default defineComponent({
  // ...
  setup (props, { emit }) {

    // 2s 后更新用户名
    setTimeout(() => {
      emit('update:userName', 'Tom')
    }, 2000);

  }
})
```

在使用上，和 [调用 emits](#调用-emits-new) 是一样的。

## ref / emits

### 父组件操作子组件

父组件也可以直接通过对子组件绑定 `ref` 属性，然后通过 ref 变量去操作子组件的数据或者调用里面的方法。

比如导入了一个 `Child.vue` 作为子组件，需要在 `template` 处给子组件标签绑定 `ref`：

```vue
<template>
  <Child ref="child" />
</template>
```

然后在 `script` 部分定义好对应的变量名称（记得要 `return` 出来）：

```ts
import { defineComponent, onMounted, ref } from 'vue'
import Child from '@cp/Child.vue'

export default defineComponent({
  components: {
    Child
  },
  setup () {
    // 给子组件定义一个ref变量
    const child = ref<HTMLElement>(null);

    // 请保证视图渲染完毕后再执行操作
    onMounted( () => {
      // 执行子组件里面的ajax函数
      child.value.getList();

      // 打开子组件里面的弹窗
      child.value.isShowDialog = true;
    });

    // 必须return出去才可以给到template使用
    return {
      child
    }
  }
})
```

### 子组件通知父组件

子组件如果想主动向父组件通讯，也需要使用 `emit`，详细的配置方法可见：[绑定 emits](#绑定-emits-new)

## 爷孙组件通信

顾名思义，爷孙组件是比 [父子组件通信](#父子组件通信) 要更深层次的引用关系（也有称之为 “隔代组件”）：

C组件引入到B组件里，B组件引入到A组件里渲染，此时A是C的爷爷级别（可能还有更多层级关系），如果你用 `props` ，只能一级一级传递下去，那就太繁琐了，因此我们需要更直接的通信方式。

他们之间的关系如下，`Grandson.vue` 并非直接挂载在 `Grandfather.vue` 下面，他们之间还隔着至少一个 `Son.vue` （可能有多个）：

```
Grandfather.vue
└─Son.vue
  └─Grandson.vue
```

这一 Part 就是讲一讲 C 和 A 之间的数据传递，常用的方法有：

方案|爷组件向孙组件|孙组件向爷组件|对应章节传送门
:--|:--|:--|:--
provide / inject|provide|inject|[点击查看](#provide-inject)
EventBus|emit / on|emit / on|[点击查看](#eventbus-new)
Vuex|-|-|[点击查看](#vuex-new)

为了方便阅读，下面的父组件统一叫 `Grandfather.vue`，子组件统一叫 `Grandson.vue`，但实际上他们之间可以隔无数代…

:::tip
因为上下级的关系的一致性，爷孙组件通信的方案也适用于 [父子组件通信](#父子组件通信) ，只需要把爷孙关系换成父子关系即可。
:::

## provide / inject

这个特性有两个部分：`Grandfather.vue` 有一个 `provide` 选项来提供数据，`Grandson.vue` 有一个 `inject` 选项来开始使用这些数据。

1. `Grandfather.vue` 通过 `provide` 向 `Grandson.vue` 传值（可包含定义好的函数）

2. `Grandson.vue` 通过 `inject` 向 `Grandfather.vue` 触发爷爷组件的事件执行

无论组件层次结构有多深，发起 `provide` 的组件都可以作为其所有下级组件的依赖提供者。

:::tip
这一部分的内容变化都特别大，但使用起来其实也很简单，不用慌，也有相同的地方：

1. 父组件不需要知道哪些子组件使用它 provide 的 property

2. 子组件不需要知道 inject property 来自哪里

另外，要切记一点就是：provide 和 inject 绑定并不是可响应的。这是刻意为之的，但如果传入了一个可监听的对象，那么其对象的 property 还是可响应的。
:::

### 发起 provide

我们先来回顾一下 2.x 的用法：

```ts
export default {
  // 定义好数据
  data () {
    return {
      tags: [ '中餐', '粤菜', '烧腊' ]
    }
  },
  // provide出去
  provide () {
    return {
      tags: this.tags
    }
  }
}
```

旧版的 `provide` 用法和 `data` 类似，都是配置为一个返回对象的函数。

3.x 的新版 `provide`， 和 2.x 的用法区别比较大。

:::tip
在 3.x ， `provide` 需要导入并在 `setup` 里启用，并且现在是一个全新的方法。

每次要 `provide` 一个数据的时候，就要单独调用一次。
:::

每次调用的时候，都需要传入 2 个参数：

参数|类型|说明
:--|:--|:--
key|string|数据的名称
value|any|数据的值

来看一下如何创建一个 `provide`：

```ts
// 记得导入provide
import { defineComponent, provide } from 'vue'

export default defineComponent({
  // ...
  setup () {
    // 定义好数据
    const msg: string = 'Hello World!';

    // provide出去
    provide('msg', msg);
  }
})
```

操作非常简单对吧哈哈哈，但需要注意的是，`provide` 不是响应式的，如果你要使其具备响应性，你需要传入响应式数据，详见：[响应性数据的传递与接收](#响应性数据的传递与接收-new)

### 接收 inject

也是先来回顾一下 2.x 的用法：

```ts
export default {
  inject: [
    'tags'
  ],
  mounted () {
    console.log(this.tags);
  }
}
```

旧版的 `inject` 用法和 `props` 类似，3.x 的新版 `inject`， 和 2.x 的用法区别也是比较大。

:::tip
在 3.x， `inject` 和 `provide` 一样，也是需要先导入然后在 `setup` 里启用，也是一个全新的方法。

每次要 `inject` 一个数据的时候，就要单独调用一次。
:::

每次调用的时候，只需要传入 1 个参数：

参数|类型|说明
:--|:--|:--
key|string|与 `provide` 相对应的数据名称

来看一下如何创建一个 `inject`：

```ts
// 记得导入inject
import { defineComponent, inject } from 'vue'

export default defineComponent({
  // ...
  setup () {
    const msg: string = inject('msg') || '';
  }
})
```

也是很简单（写 TS 的话，由于 `inject` 到的值可能是 `undefined`，所以要么加个 `undefined` 类型，要么给变量设置一个空的默认值）。

### 响应性数据的传递与接收

之所以要单独拿出来说， 是因为变化真的很大 - -

在前面我们已经知道，provide 和 inject 本身不可响应，但是并非完全不能够拿到响应的结果，只需要我们传入的数据具备响应性，它依然能够提供响应支持。

我们以 `ref` 和 `reactive` 为例，来看看应该怎么发起 `provide` 和接收 `inject`。

先在 `Grandfather.vue` 里 `provide` 数据：

```ts
export default defineComponent({
  // ...
  setup () {
    // provide一个ref
    const msg = ref<string>('Hello World!');
    provide('msg', msg);

    // provide一个reactive
    const userInfo: Member = reactive({
      id: 1,
      name: 'Petter'
    });
    provide('userInfo', userInfo);

    // 2s 后更新数据
    setTimeout(() => {
      // 修改消息内容
      msg.value = 'Hi World!';

      // 修改用户名
      userInfo.name = 'Tom';
    }, 2000);
  }
})
```

在 `Grandsun.vue` 里 `inject` 拿到数据：

```ts
export default defineComponent({
  setup () {
    // 获取数据
    const msg = inject('msg');
    const userInfo = inject('userInfo');

    // 打印刚刚拿到的数据
    console.log(msg);
    console.log(userInfo);

    // 因为 2s 后数据会变，我们 3s 后再看下，可以争取拿到新的数据
    setTimeout(() => {
      console.log(msg);
      console.log(userInfo);
    }, 3000);

    // 响应式数据还可以直接给 template 使用，会实时更新
    return {
      msg,
      userInfo
    }
  }
})
```

非常简单，非常方便！！！

:::tip
响应式的数据 `provide` 出去，在子孙组件拿到的也是响应式的，并且可以如同自身定义的响应式变量一样，直接 `return` 给 `template` 使用，一旦数据有变化，视图也会立即更新。

但上面这句话有效的前提是，不破坏数据的响应性，比如 ref 变量，你需要完整的传入，而不能只传入它的 `value`，对于 `reactive` 也是同理，不能直接解构去破坏原本的响应性。

切记！切记！！！
:::

### 引用类型的传递与接收

> 这里是针对非响应性数据的处理

provide 和 inject 并不是可响应的，这是官方的故意设计，但是由于引用类型的特殊性，在子孙组件拿到了数据之后，他们的属性还是可以正常的响应变化。

先在 `Grandfather.vue` 里 `provide` 数据：

```ts
export default defineComponent({
  // ...
  setup () {
    // provide 一个数组
    const tags: string[] = [ '中餐', '粤菜', '烧腊' ];
    provide('tags', tags);

    // provide 一个对象
    const userInfo: Member = {
      id: 1,
      name: 'Petter'
    };
    provide('userInfo', userInfo);

    // 2s 后更新数据
    setTimeout(() => {
      // 增加tags的长度
      tags.push('叉烧');

      // 修改userInfo的属性值
      userInfo.name = 'Tom';
    }, 2000);
  }
})
```

在 `Grandsun.vue` 里 `inject` 拿到数据：

```ts
export default defineComponent({
  setup () {
    // 获取数据
    const tags: string[] = inject('tags') || [];
    const userInfo: Member = inject('userInfo') || {
      id: 0,
      name: ''
    };

    // 打印刚刚拿到的数据
    console.log(tags);
    console.log(tags.length);
    console.log(userInfo);

    // 因为 2s 后数据会变，我们 3s 后再看下，能够看到已经是更新后的数据了
    setTimeout(() => {
      console.log(tags);
      console.log(tags.length);
      console.log(userInfo);
    }, 3000);
  }
})
```

引用类型的数据，拿到后可以直接用，属性的值更新后，子孙组件也会被更新。

:::warning
由于不具备真正的响应性，`return` 给模板使用依然不会更新视图，如果涉及到视图的数据，请依然使用 [响应式 API](component.md#响应式数据的变化-new) 。
:::

### 基本类型的传递与接收

> 这里是针对非响应性数据的处理

基本数据类型被直接 `provide` 出去后，再怎么修改，都无法更新下去，子孙组件拿到的永远是第一次的那个值。

先在 `Grandfather.vue` 里 `provide` 数据：

```ts
export default defineComponent({
  // ...
  setup () {
    // provide 一个数组的长度
    const tags: string[] = [ '中餐', '粤菜', '烧腊' ];
    provide('tagsCount', tags.length);

    // provide 一个字符串
    let name: string = 'Petter';
    provide('name', name);

    // 2s 后更新数据
    setTimeout(() => {
      // tagsCount 在 Grandson 那边依然是 3
      tags.push('叉烧');

      // name 在 Grandson 那边依然是 Petter
      name = 'Tom';
    }, 2000);
  }
})
```

在 `Grandsun.vue` 里 `inject` 拿到数据：

```ts
export default defineComponent({
  setup () {
    // 获取数据
    const name: string = inject('name') || '';
    const tagsCount: number = inject('tagsCount') || 0;

    // 打印刚刚拿到的数据
    console.log(name);
    console.log(tagsCount);

    // 因为 2s 后数据会变，我们 3s 后再看下
    setTimeout(() => {
      // 依然是 Petter
      console.log(name);

      // 依然是 3
      console.log(tagsCount);
    }, 3000);
  }
})
```

很失望，并没有变化。

:::tip
那么是否一定要定义成响应式数据或者引用类型数据呢？

当然不是，我们在 `provide` 的时候，也可以稍作修改，让它能够同步更新下去。
:::

我们再来一次，依然是先在 `Grandfather.vue` 里 `provide` 数据：

```ts
export default defineComponent({
  // ...
  setup () {
    // provide 一个数组的长度
    const tags: string[] = [ '中餐', '粤菜', '烧腊' ];
    provide('tagsCount', (): number => {
      return tags.length;
    });

    // provide 字符串
    let name: string = 'Petter';
    provide('name', (): string => {
      return name;
    });

    // 2s 后更新数据
    setTimeout(() => {
      // tagsCount 现在可以正常拿到 4 了
      tags.push('叉烧');

      // name 现在可以正常拿到 Tom 了
      name = 'Tom';
    }, 2000);
  }
})
```

再来 `Grandsun.vue` 里修改一下 `inject` 的方式，看看这次拿到的数据：

```ts
export default defineComponent({
  setup () {
    // 获取数据
    const tagsCount: any = inject('tagsCount');
    const name: any = inject('name');

    // 打印刚刚拿到的数据
    console.log(tagsCount());
    console.log(name());

    // 因为 2s 后数据会变，我们 3s 后再看下
    setTimeout(() => {
      // 现在可以正确得到 4
      console.log(tagsCount());

      // 现在可以正确得到 Tom
      console.log(name());
    }, 3000);
  }
})
```

这次可以正确拿到数据了，看出这2次的写法有什么区别了吗？

:::tip
基本数据类型，需要 `provide` 一个函数，将其 `return` 出去给子孙组件用，这样子孙组件每次拿到的数据才会是新的。

但由于不具备响应性，所以子孙组件每次都需要重新通过执行 `inject` 得到的函数才能拿到最新的数据。
:::

按我个人习惯来说，使用起来挺别扭的，能不用就不用……

:::warning
由于不具备真正的响应性，`return` 给模板使用依然不会更新视图，如果涉及到视图的数据，请依然使用 [响应式 API](component.md#响应式数据的变化-new) 。
:::

## 兄弟组件通信

兄弟组件是指两个组件都挂载在同一个 `Father.vue` 下，但两个组件之间并没有什么直接的关联，先看看他们的关系：

```
Father.vue
├─Brother.vue
└─LittleBrother.vue
```

既然没有什么直接关联， ╮(╯▽╰)╭ 所以也没有什么专属于他们的通信方式。

如果他们之间要交流，目前大概有这两类选择：

1. 【不推荐】先把数据传给 `Father.vue`，再通过 [父子组件通信](#父子组件通信) 的方案去交流

2. 【推荐】借助 [全局组件通信](#全局组件通信) 的方案才能达到目的。

## 全局组件通信

全局组件通信是指，两个任意的组件，不管是否有关联（e.g. 父子、爷孙）的组件，都可以直接进行交流的通信方案。

举个例子，像下面这样，`B2.vue` 可以采用全局通信方案，直接向 `D2.vue` 发起交流，而无需经过他们的父组件。

```
A.vue
├─B1.vue
├───C1.vue
├─────D1.vue
├─────D2.vue
├───C2.vue
├─────D3.vue
└─B2.vue
```

常用的方法有：

方案|发起方|接收方|对应章节传送门
:--|:--|:--|:--
EventBus|emit|on|[点击查看](#eventbus-new)
Vuex|-|-|-
Pinia|-|-|-

## EventBus

`EventBus` 通常被称之为 “全局事件总线” ，它是用来在全局范围内通信的一个常用方案，它的特点就是： “简单” 、 “灵活” 、“轻量级”。

:::tip
在中小型项目，全局通信推荐优先采用该方案，事件总线在打包压缩后不到 200 个字节， API 也非常简单和灵活。
:::

### 回顾 Vue 2

在 2.x，使用 EventBus 无需导入第三方插件，直接在自己的 `libs` 文件夹下创建一个 `bus.ts` 文件，暴露一个新的 Vue 实例即可。
 
```ts
import Vue from 'vue';
export default new Vue;
```

然后就可以在组件里引入 bus ，通过 `$emit` 去发起交流，通过 `$on` 去监听接收交流。

旧版方案的完整案例代码可以查看官方的 [2.x 语法 - 事件 API](https://v3.cn.vuejs.org/guide/migration/events-api.html#_2-x-%E8%AF%AD%E6%B3%95)

### 了解 Vue 3

Vue 3 移除了 `$on` 、 `$off` 和 `$once` 这几个事件 API ，应用实例不再实现事件触发接口。

根据官方文档在 [迁移策略 - 事件 API](https://v3.cn.vuejs.org/guide/migration/events-api.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5) 的推荐，我们可以用 [mitt](https://github.com/developit/mitt) 或者 [tiny-emitter](https://github.com/scottcorgan/tiny-emitter) 等第三方插件来实现 `EventBus` 。

### 创建 3.x 的 EventBus

这里以 `mitt` 为例，示范如何创建一个 Vue 3 的 `EventBus` 。

首先，需要安装 `mitt` ：

```
npm install --save mitt
```

然后在 `libs` 文件夹下，创建一个 `bus.ts` 文件，内容和旧版写法其实是一样的，只不过是把 Vue 实例，换成了 mitt 实例。

```ts
import mitt, { Emitter } from 'mitt'
type Events = {
  sayHi: string
}
const mitter: Emitter<Events> = mitt()
export default mitter
```

然后就可以定义发起和接收的相关事件了，常用的 API 和参数如下：

方法名称|作用
:--|:--
on|注册一个监听事件，用于接收数据
emit|调用方法发起数据传递
off|用来移除监听事件

`on` 的参数：

参数|类型|作用
:--|:--|:--
type|string \| symbol|方法名
handler|function|接收到数据之后要做什么处理的回调函数

这里的 `handler` 建议使用具名函数，因为匿名函数无法销毁。

`emit` 的参数：

参数|类型|作用
:--|:--|:--
type|string \| symbol|与 on 对应的方法名
data|any|与 on 对应的，允许接收的数据

`off` 的参数：

参数|类型|作用
:--|:--|:--
type|string \| symbol|与 on 对应的方法名
handler|function|要删除的，与 on 对应的 handler 函数名

更多的 API 可以查阅 [插件的官方文档](https://github.com/developit/mitt) ，在了解了最基本的用法之后，我们来开始配置一对交流。

### 创建和移除监听事件

在需要暴露交流事件的组件里，通过 `on` 配置好接收方法，同时为了避免路由切换过程中造成事件多次被绑定，多次触发，需要在适当的时机 `off` 掉：

```ts
import { defineComponent, onBeforeUnmount } from 'vue'
import bus from '@libs/bus'

export default defineComponent({
  setup () {
    // 定义一个打招呼的方法
    const sayHi = (msg: string = 'Hello World!'): void => {
      console.log(msg);
    }

    // 启用监听
    bus.on('sayHi', sayHi);

    // 在组件卸载之前移除监听
    onBeforeUnmount( () => {
      bus.off('sayHi', sayHi);
    })
  }
})
```

### 调用监听事件

在需要调用交流事件的组件里，通过 `emit` 进行调用：

```ts
import { defineComponent } from 'vue'
import bus from '@libs/bus'

export default defineComponent({
  setup () {
    // 调用打招呼事件，传入消息内容
    bus.emit('sayHi', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈');
  }
})
```

### 旧项目升级 EventBus

在 [Vue 3 的 EventBus](#创建-3-x-的-eventbus-new)，我们可以看到它的 API 和旧版是非常接近的，只是去掉了 `$` 符号。

如果你要对旧的项目进行升级改造，因为原来都是使用了 `$on` 、 `$emit` 等旧的 API ，一个一个组件去修改成新的 API 肯定不现实。

我们可以在创建 `bus.ts` 的时候，通过自定义一个 `bus` 对象，来挂载 `mitt` 的 API 。

在 `bus.ts` 里，改成以下代码：

```ts
import mitt from 'mitt';

// 初始化一个 mitt 实例
const emitter = mitt();

// 定义一个空对象用来承载我们的自定义方法
const bus: any = {};

// 把你要用到的方法添加到 bus 对象上
bus.$on = emitter.on;
bus.$emit = emitter.emit;

// 最终是暴露自己定义的 bus
export default bus;
```

这样我们在组件里就可以继续使用 `bus.$on` 、`bus.$emit` 等以前的老 API 了，不影响我们旧项目的升级使用。

## 全局 API 的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })

    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0 中对这些 API 做出了调整：

  - 将全局的 API，即：`Vue.xxx`调整到应用实例（`app`）上

    | 2.x 全局 API（`Vue`）    | 3.x 实例 API (`app`)                        |
    | ------------------------ | ------------------------------------------- |
    | Vue.config.xxxx          | app.config.xxxx                             |
    | Vue.config.productionTip | <strong style="color:#DD5145">移除</strong> |
    | Vue.component            | app.component                               |
    | Vue.directive            | app.directive                               |
    | Vue.mixin                | app.mixin                                   |
    | Vue.use                  | app.use                                     |
    | Vue.prototype            | app.config.globalProperties                 |

