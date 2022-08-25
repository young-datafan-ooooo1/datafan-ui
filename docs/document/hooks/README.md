# Hooks（vue3）

## Hook 的概念

 Hook 这个概念是在 React 中被提出的，vue3借鉴React中hook概念做实现

钩子编程（hooking），也称作“挂钩”，**是计算机程序设计术语，指通过拦截软件模块间的函数调用、消息传递、事件传递来修改或扩展操作系统、应用程序或其他软件组件的行为的各种技术**。**处理被拦截的函数调用、事件、消息的代码，被称为钩子**（hook）

`Hook`原意是指`钩子`，它表示的就是在某个函数的上下文做自定义的处理来实现我们想要的`黑科技`

在`vue3`中的hooks其实是函数的写法，就是将文件的一些单独功能的js代码进行抽离出来，放到单独的js文件中，把一些复杂的逻辑或一些常用的逻辑封装成一个个hook来进行调用。这样其实和我们在`vue2`中学的`mixin`比较像

## React，hooks由来

vue3组件使用

vben-admin案例

```vue2
<template>
    <!-- html tags -->
</template>


<script>
export default {
    name: 'textCompontent',
    props: {
        // ...
    },
    data() {
        return { 
            // ...
        }
    },
    methods: {
        // ...
    },
    computed: {
        // ...
    }
}
</script>
```

```React
class Clock extends React.Component {
    construtor(props) {
        super(props);   
        this.state = {
            count: 1
            // ...
        };
    }

    componentDidMount() {
        // ...
    }

    setCount = () => {
        const { count } = this.state
        this.setState({ count: count++ })
        // React通过管理状态实现对组件的管理，当this.setState()被调用的时候
        // React会重新调用render方法来重新渲染UI。
    }

    render() {
        return {
            <div>
                <p onClick={this.setCount}>hello world</p>
            </div>
        }
    }
}
```

参考大家熟知的 Vue 2 代码结构，我们看到：React 整体使用 `Class` 来封装一个组件；设计了一个 `state` 来管理变量，相当于 Vue 2 中的 `data`；同样拥有生命周期和自定义方法；模板部分借助 `JSX` 写进一个渲染函数。如果需要更新视图，必须通过 `setState` 方法更新 `state` 中的变量，然后视图上的数据才随之更新，不能直接通过更新视图来更新数据。

可以看出，和 Vue 不同，它是一个单向的数据流。Vue 的读音是视图的 "view"，而 "state"，就是状态的意思。如果说 Vue 是视图导向，React 就是状态导向。

既然 React 是用 Class 实现组件，那么问题就随之而来：在 Class 内必须注意 `this` 的指向问题；而且在组件发生复用和嵌套时，对每一层组件的 `props` 都要进行操作，逻辑复杂。

于是函数组件诞生，为 React 实现了状态（state）分离

## 小案例（Vue3）

### 1. 计数

```目录结构
目录结构
demo_01
   hooks                      // 各式各样的hook
      useCount.ts
      ...
   types                      // 类型
      countTyping.ts
      ...
   index.vue                  // 目标页面
```

```ts
<!--
 * @Description: 测试案例_demo_01
 * @Date: 2022-08-07 13:14:54
-->
<template>
  <div class="demo_01">
    <h1>当前计数为：{{ count }}</h1>
    <a-button @click="increment">点击自增</a-button>
    <a-button @click="decrement">点击自减</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { useCount } from './hooks/useCount';

  const [count, { increment, decrement }] = useCount();


    const count = ref<number>(0)
    const increment = () => {
        count.value++;
    }
    const decrement = () => {
        count.value--;
    }
</script>
<style lang="less" scoped>
  .demo_01 {
    padding: 10px 20px 20px;
  }
</style>
```

```ts
/*
 * @Description: 计数hook（可进行加减操作）
 * @Date: 2022-08-07 13:38:27
 */
import { ref } from 'vue';
import type { CountInstance, UseCountReturnType } from '../types/countTyping';

export function useCount(): UseCountReturnType {
  const count = ref(0);

  const methods: CountInstance = {
    // 自增
    increment: () => {
      count.value++;
    },

    // 自减
    decrement: () => {
      count.value--;
    },
  };

  return [count, methods];
}
```

```ts
/*
 * @Description: 计数类型
 * @Date: 2022-08-07 13:47:51
 */
import { Ref } from 'vue';

export interface CountInstance {
  increment(): void; // 自增
  decrement(): void; // 自减
}

// 定义返回时的类型
export type Register = Ref<number>;
export type UseCountReturnType = [Register, CountInstance];
```

### 2. 鼠标位置

```html index.vue
<!--
 * @Description: 
 * @Date: 2022-08-10 20:56:34
-->
<template>
  <div class="demo_02"> {{ x }} {{ y }} </div>
</template>

<script lang="ts" setup>
  import { useMouse } from './hooks/useMouse'

  const { x, y } = useMouse()
</script>
<style lang="less" scoped>
  .demo_02 {
    padding: 10px 20px 20px;
  }
</style>

```

```typescript useMouse.ts
/*
 * @Description: 监听鼠标移动
 * @Date: 2022-08-10 20:45:26
 */
import { reactive, toRefs, onMounted, onUnmounted } from 'vue'
// 鼠标位置侦听
export function useMouse() {
  // 数据响应
  const state = reactive({
    x: 10,
    y: 10,
  })

  //  事件更新
  const update = (e) => {
    state.x = e.pageX
    state.y = e.pageY
  }

  // 已经加载
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  //卸载
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  //转换所有key为响应式数据
  return {
    ...toRefs(state),
    update,
  }
}

```

## 为何使用hook

vue官方解释：[组合式 API 常见问答 | Vue.js](https://staging-cn.vuejs.org/guide/extras/composition-api-faq.html#more-flexible-code-organization)

### 更灵活的代码组织

许多用户都喜欢选项式 API，因为在默认情况下就能够写出有组织的代码：任何东西都有其对应的选项来管理。然而，选项式 API 在单个组件的逻辑复杂到一定程度时，也面临了一些无法忽视的限制。这些限制主要体现在需要处理多个**逻辑关注点**的组件中，在许多 Vue 2 已经上线的生产应用中可以看到这一点。

我们以 Vue CLI GUI 中的文件浏览器组件为例：这个组件承担了以下几个逻辑关注点：

- 追踪当前文件夹的状态，展示其内容
- 处理文件夹的相关操作 (打开、关闭和刷新)
- 支持创建新文件夹
- 可以切换到只展示收藏的文件夹
- 可以开启对隐藏文件夹的展示
- 处理当前工作目录中的变更

这个组件[最原始的版本](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404)是由选项式 API 写成的。如果我们为相同的逻辑关注点标上一种颜色，那将会是这样：（[图片选自vue官网](https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png)）

<img title="" src="https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png" alt="folder component before" data-align="inline">

你可以看到，处理相同逻辑关注点的代码被强制拆分在了不同的选项中，位于文件的不同部分。在一个几百行的大组件中，要读懂代码中的一个逻辑关注点，只能在文件中反复上下滚动，可这件事不应该这么困难。另外，如果我们还想要将一个逻辑关注点抽离到一个可重用的工具函数中，需要从文件的不同部分中寻找到所需的正确片段。

而如果[用组合式 API 重构](https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e)这个组件，将会变成：([图片选自vue官网](https://user-images.githubusercontent.com/499550/62783026-810e6180-ba89-11e9-8774-e7771c8095d6.png)）

![](https://user-images.githubusercontent.com/499550/62783026-810e6180-ba89-11e9-8774-e7771c8095d6.png)

现在与同一个逻辑关注点相关的代码被归为了一组：我们无需再为了一个逻辑关注点在不同的选项块间来回滚动切换。此外，我们现在可以不费吹灰之力地将这一组代码移动到一个外部文件中，不再需要为了抽象而重新组织代码，大大降低了重构成本，这在长期维护的大型项目中非常关键。

## 结语

vben-admin代码中组件其实运用了hooks思想，如有需要可根据vben-admin中component源码阅读其设计理念
