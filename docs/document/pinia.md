# Pinia 新一代状态管理

## 为什么要使用状态管理?
::: tip 


1.对于用户信息，比较固定的数据字典，菜单路由等数据，为了避免重复从服务器获取，便于后续使用以及页面响应，通常希望可以在页面初始化后将这些数据存储起来；

2.对于简单组件，我们要实现状态共享可以**提取状态到父组件**，但是页面较复杂时，跨组件状态共享变得力不从心。而且随着组件增多，嵌套层级加深，复杂度也越来越高。比如：

 - 组件层级太深，需要共享状态，此时状态要层层传递。
 - 子组件更新一个状态，可能有多个父组件，兄弟组件共用，实现困难。

为了解决上述问题，Vue 提供 [Vuex](https://next.vuex.vuejs.org/)。
::: 

<!-- 状态管理[Vuex](https://next.vuex.vuejs.org/)，其实可以理解为**全局状态管理**，这里的状态不同于组件内部的状态，它是独立于组件单独维护的，然后再通过某种方式与需要该状态的组件关联起来。 -->


[Pinia](https://pinia.vuejs.org/) 和 [Vuex](https://vuex.vuejs.org/) 都是Vue.js 应用程序的全局状态管理工具。由于 Vuex 4.x 版本只是个过渡版，Vuex 4 对 TypeScript 和 Composition API 都不是很友好，虽然官方团队在 GitHub 已有讨论 Vuex 5 的开发提案，但从 2022-02-07 在 Vue 3 被设置为默认版本开始， [Pinia](https://pinia.vuejs.org/)  已正式被官方推荐作为全局状态管理的工具。

## 为什么要使用 Pinia？

[Pinia](https://pinia.vuejs.org/) （发音为 /piːnjʌ/）支持 Vue 3 和 Vue 2 ，对 TypeScript 也有很完好的支持，与 `Vuex` 相比，`Pinia` 提供了一个更简单的 API，提供了 `Composition-API` 风格的 API，最重要的是，在与 TypeScript 一起使用时具有可靠的类型推断支持。状态管理弃用了 vuex 而采用Pinia 的 5个重要条件：
::: tip 


+ Pinia 的 API 设计非常接近 Vuex 5 的提案。（作者是 Vue 核心团队成员）
+ 无需像 Vuex 4 自定义复杂的类型来支持 typescript，天生具备完美的类型推断。
+ 模块化设计，你引入的每一个 store 在打包时都可以自动拆分他们。
+ 无嵌套结构，但你可以在任意的 store 之间交叉组合使用。
+ Pinia 与 Vue devtools 挂钩，不会影响 Vue 3 开发体验。
::: 
### 与 Vuex 3.x/4.x 的比较

Pinia API 与 Vuex ≤4 有很大不同，即：
::: tip 


+ `mutations 不再存在`。他们经常被认为是非常冗长。他们最初带来了 devtools 集成，但这不再是问题。
+ 更好的TypeScript支持。无需创建自定义复杂包装器来支持 TypeScript，所有内容都是类型化的，并且 API 的设计方式尽可能利用 TS 类型推断。
+ 不再需要注入、导入函数、调用函数、享受自动完成功能！
+ 无需动态添加 Store，默认情况下它们都是动态的，您甚至都不会注意到。请注意，您仍然可以随时手	动使用 Store 进行注册，但因为它是自动的，您无需担心。
+ `不再有 modules 的嵌套结构`。您仍然可以通过在另一个 Store 中导入和 使用 来隐式嵌套 Store，但 Pinia 通过设计提供平面结构，同时仍然支持 Store 之间的交叉组合方式。 您甚至可以拥有 Store 的循环依赖关系。
+ `没有命名空间模块`。鉴于 Store 的扁平架构，“命名空间” Store 是其定义方式所固有的，您可以说 所有 Store 都是命名空间的。
:::

有关如何将现有 Vuex ≤4 项目转换为使用 Pinia 的更详细说明，请参阅 [从Vuex 迁移指南](https://pinia.vuejs.org/cookbook/migration-vuex.html)。

### 状态树的结构

| 作用     | Vue Component | Vuex                | Pinia   |
| :------- | ------------- | ------------------- | ------- |
| 数据管理 | data          | state               | state   |
| 数据计算 | computed      | getters             | getters |
| 行为方法 | methods       | mutations / actions | actions |

可以看到 Pinia 的结构和用途都和 Vuex 与 Component 非常相似，并且 Pinia 相对于 Vuex ，在行为方法部分`去掉了 mutations （同步操作）和 actions （异步操作）的区分`，更接近组件的结构，入门成本会更低一些。

## 安装和启用

Pinia 目前还没有被广泛的默认集成在各种脚手架里，所以如果你原来创建的项目没有 Pinia ，则需要手动安装它。

```yaml
yarn add pinia
# 或者使用 npm
npm install pinia
```

查看你的` package.json `，看看里面的 dependencies 是否成功加入了 Pinia 和它的版本号（下方是示例代码，以实际安装的最新版本号为准）：

```json
{
  "dependencies": {
    "pinia": "^2.0.12"
  },
}
```

创建一个 pinia（根存储）并将其传递给应用程序：

 ```ts
import { createPinia } from 'pinia'

app.use(createPinia())
 ```

 如果您使用的是 Vue 2，您还需要安装一个插件并将创建的 pinia 注入应用程序的根目录：

 ```javascript
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // 其他选项...
  // 注意同一个 `pinia` 实例可以在多个 Vue 应用程序中使用
  pinia,
})
 ```

## Store

和 Vuex 一样， Pinia 的核心也是称之为 Store 。参照 Pinia 官网推荐的项目管理方案，我们也是先在 src 文件夹下创建一个 stores 文件夹，并在里面添加一个 `index.ts `文件，然后我们就可以来添加一个最基础的 Store 。

### 定义Store


Store 是通过 `defineStore` 方法来创建的，它有两种入参形式：

#### 形式 1 ：接收两个参数

接收两个参数，第一个参数是 Store 的唯一 ID （即容器名称：可根据具体业务命名），第二个参数是 Store 的选项：

```ts
// Pinia
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  /*
  *	类似组件的data,用于存储全局状态
  */

  state:（）=>{  //state必须是箭头函数：更好的TS类型推导
    return {}
  },
  /*
  *	类似组件的computed,用来封装计算属性
  */
  getters:{
    //...
  },
  /*
  *	类似组件的methods,封装修改逻辑，修改state
  */
  actions:{
    //...
  }
})


// Vuex
const store = createStore({
  //pinia使用箭头函数
  state: {
    //...
  },
  
  getters:{
     //...
  },
  //pinia无mutations
  mutations: {
   //...
  },
  actions:{
      //...
  }
})
```

 #### 形式 2 ：接收一个参数

```ts
import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'main',//
  state:（）=>{
    return {}
  },
  getters:{},
  actions:{}
})
```
::: tip 
<!-- > **<span style="color:black">TIP</span>** -->
 不论是哪种创建形式，都必须为 Store 指定一个` 唯一ID `，Pinia会把所有容器挂载到根容器
::: 

### 添加 state

大多数时候，state 是 store 的核心部分。 我们通常从定义应用程序的状态开始。 在 Pinia 中，状态被定义为返回初始状态的函数。

```tsx
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
```

如果您使用的是 Vue 2，您在 state 中创建的数据遵循与 Vue 实例中的 data 相同的规则，即 state 对象必须是普通的，并且您需要在以下情况下调用 Vue.set() 为其添加新的属性。

### 访问 state✨    

用法上和 Vuex 很相似，但有一点区别是，数据直接是挂在 `store` 上的，而不是 `store.state` 上面！

默认情况下，您可以通过 store 实例访问状态来直接读取和写入状态：

```tsx
const store = useStore()
store.counter++
```

::: tip 
Vuex 是 `store.state.counter++` ， Pinia 是 `store.counter++`
:::



### 更新state

除了直接用` store.counter++` 修改 store，你还可以调用` $patch` 方法。 它允许您使用部分state对象同时应用多个更改：

```typescript
store.$patch({
  counter: store.counter + 1,
  name: 'Abalam',
})
```

但是，使用这种语法应用某些突变非常困难或代价高昂：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要您创建一个新集合。 正因为如此，`$patch `方法也接受一个函数来批量修改集合内部分对象的情况：

```typescript
cartStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

这里的主要区别是`$patch()` 允许您将批量更改的日志写入开发工具中的一个条目中。 注意两者，state 和 \$patch() 的直接更改都出现在 devtools 中，并且可以进行 time travelled（在 Vue 3 中还没有）。


### 重置state

您可以通过调用 store 上的 `$reset()` 方法将状态 重置 到其初始值：

```tsx
const store = useStore()
store.$reset()
```


### 订阅 state

可以通过 store 的 `$subscribe()` 方法查看状态及其变化，类似于 Vuex 的 subscribe 方法。 与常规的 `watch() `相比，使用` $subscribe() `的优点是 **subscriptions 只会在 patches 之后触发一次**。

```typescript
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  /**
   * type：用于记录这次数据变化是通过什么途径，主要有三个分别是：
   *        “direct” ：通过 action 变化的
   *        ”patch object“ ：通过 $patch 传递对象的方式改变的
   *        “patch function” ：通过 $patch 传递函数的方式改变的
  **/
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 与 cartStore.$id 相同
  mutation.storeId // 'cart'
  // 仅适用于 mutation.type === 'patch object'
  mutation.payload // 补丁对象传递给 to cartStore.$patch()

  // 每当它发生变化时，将整个状态持久化到本地存储
  localStorage.setItem('cart', JSON.stringify(state))
})
```

默认情况下，`state subscriptions` 绑定到添加它们的组件（如果 store 位于组件的 setup() 中）。 意思是，当组件被卸载时，它们将被自动删除。 如果要在卸载组件后保留它们，请将` { detached: true }` 作为第二个参数传递给 detach 当前组件的 `state subscription`：

```typescript
export default {
  setup() {
    const someStore = useSomeStore()

    // 此订阅将在组件卸载后保留
    someStore.$subscribe(callback, { detached: true })
    // ...
  },
}
```



## getters
### 添加getter

Getter 完全等同于 Store 状态的 计算值。 它们可以用 `defineStore() `中的 `getters` 属性定义。 他们接收`state`作为第一个参数以鼓励箭头函数的使用：


```typescript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
})
```

大多数时候，getter 只会依赖状态，但是，他们可能需要使用其他 getter。 正因为如此，我们可以在定义常规函数时通过 this 访问到 整个 store 的实例， 但是需要定义返回类型（在 TypeScript 中）。 这是由于 TypeScript 中的一个已知限制，并且不会影响使用箭头函数定义的 getter，也不会影响不使用 this 的 getter：


```typescript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // 自动将返回类型推断为数字
    doubleCount(state) {
      return state.counter * 2
    },
    // 返回类型必须明确设置
    doublePlusOne(): number {
      return this.counter * 2 + 1
    },
  },
})
```

然后你可以直接在 store 实例上访问 getter：


```typescript
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
export default {
  setup() {
    const store = useStore()

    return { store }
  },
}
</script>
```



### 访问其他 getter

与计算属性一样，您可以组合多个 getter。 通过 this 访问任何其他 getter。 


```typescript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // 类型是自动推断的，因为我们没有使用 `this`
    doubleCount: (state) => state.counter * 2,
    /**
     * 返回计数器值乘以二加一。
     */
    doubleCountPlusOne() {
      return this.doubleCount + 1
    },
  },
})
```

### 将参数传递给 getter

Getters 只是幕后的 computed 属性，因此无法向它们传递任何参数。 但是，您可以从 getter 返回一个函数以接受任何参数：


```typescript
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})

```

并在组件中使用：


```typescript
<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
<script>
export default {
  setup() {
    const store = useStore()
    return { getUserById: store.getUserById }
  },
}
</script>
```

 **请注意：** 在执行此操作时，getter 不再缓存，它们只是您调用的函数。 但是，您可以在 getter 本身内部缓存一些结果，这并不常见，但应该证明性能更高：


```typescript
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

### 访问其他 Store 的getter

要使用其他存储 getter，您可以直接在 getter 内部使用它：


```typescript
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

### 与 setup() 一起使用

您可以 **直接访问** 任何 getter 作为 store 的属性（与 state 属性完全一样）：

```typescript
export default {
  setup() {
    const store = useStore()

    store.counter = 3
    store.doubleCount // 6
  },
}
```

### 使用选项 API

对于以下示例，您可以假设已创建以下 store：


```typescript
// Example File Path:
// ./src/stores/counterStore.js

import { defineStore } from 'pinia',

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCounter() {
      return this.counter * 2
    }
  }
})
```
#### 使用setup()

虽然` Composition API `并不适合所有人，但` setup() `钩子可以使在 `Options API `中使用 Pinia 更容易。 不需要额外的 map helpers 功能！


```typescript
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return counterStore.doubleCounter * 2
    },
  },
}
```

#### 没有setup()

您可以使用 previous section of state 中使用的相同 `mapState() `函数映射到 getter：

```typescript
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // 允许访问组件内的 this.doubleCounter
    // 与从 store.doubleCounter 中读取相同
    ...mapState(useCounterStore, ['doubleCount'])
    // 与上面相同，但将其注册为 this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCounter',
      // 您还可以编写一个访问 store 的函数
      double: store => store.doubleCount,
    }),
  },
}
```

## actions

### 添加action

`Actions` 相当于组件中的 methods。 它们可以使用 `defineStore() `中的 actions 属性定义，并且它们非常适合定义业务逻辑：

```typescript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})
```

与 getters 一样，操作可以通过 this 访问 整个 store 实例并提供完整类型（和自动完成）支持。 与它们不同，actions 可以是异步的，您可以在其中await 任何 API 调用甚至其他操作！ 这是使用 Mande 的示例。 请注意，只要您获得“Promise”，您使用的库并不重要，您甚至可以使用浏览器的“fetch”函数：


```typescript
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // 让表单组件显示错误
        return error
      }
    },
  },
})
```

你也可以完全自由地设置你想要的任何参数并返回任何东西。 调用 Action 时，一切都会自动推断！

Actions 像 methods 一样被调用：

```typescript
export default defineComponent({
  setup() {
    const main = useMainStore()
    // Actions 像 methods 一样被调用：
    main.randomizeCounter()

    return {}
  },
})
```

### 访问其他 store 操作

要使用另一个 store ，您可以直接在操作内部使用它：


```typescript
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // ...
  }),
  actions: {
    async fetchUserPreferences(preferences) {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

### 与 setup() 一起使用

您可以`直接调用`任何操作作为 store 的方法：


```typescript
export default {
  setup() {
    const store = useStore()

    store.randomizeCounter() //调用useStore中action的randomizeCounter（）
  },
}
```

::: tip 

 在 Pinia ,调用action不需要和 Vuex 一样执行 commit 或者 dispatch，像普通的函数一样使用即可

:::
### 使用选项 API

对于以下示例，您可以假设已创建以下 store：


```typescript
// Example File Path:
// ./src/stores/counterStore.js

import { defineStore } from 'pinia',

const useCounterStore = defineStore('counterStore', {
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++
    }
  }
})
```

#### 使用setup()

虽然 Composition API 并不适合所有人，但 setup() 钩子可以使在 Options API 中使用 Pinia 更容易。 不需要额外的 map helpers 功能！


```typescript
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  methods: {
    incrementAndPrint() {
      counterStore.increment()
      console.log('New Count:', counterStore.count)
    },
  },
}
```

#### 不使用 setup()

如果您根本不想使用 Composition API，可以使用 mapActions() 将操作属性映射为组件中的方法：


```typescript
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  methods: {
    // 允许在组件内部访问this.increment()
    // 与从store.increment()调用相同
    ...mapActions(useCounterStore, ['increment'])
    // 和上面一样，但注册为this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'doubleCounter' }),
  },
}
```
<!-- 
### 订阅 Actions

可以使用 `store.$onAction()` 订阅 action 及其结果。 传递给它的回调在 action 之前执行。 after 处理 Promise 并允许您在 action 完成后执行函数。 以类似的方式，onError 允许您在处理中抛出错误。 这是一个在运行 action 之前和它们 resolve/reject 之后记录的示例。


```typescript
const unsubscribe = someStore.$onAction(
  ({
    name, // action 的名字
    store, // store 实例
    args, // 调用这个 action 的参数
    after, // 在这个 action 执行完毕之后，执行这个函数
    onError, // 在这个 action 抛出异常的时候，执行这个函数
  }) => {
    // 记录开始的时间变量
    const startTime = Date.now()
    // 这将在 `store` 上的操作执行之前触发
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 如果 action 成功并且完全运行后，after 将触发。
    // 它将等待任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // 如果 action 抛出或返回 Promise.reject ，onError 将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// 手动移除订阅
unsubscribe()
```

默认情况下，`action subscriptions` 绑定到添加它们的组件（如果 store 位于组件的 setup() 内）。 意思是，当组件被卸载时，它们将被自动删除。 如果要在卸载组件后保留它们，请将 true 作为第二个参数传递给当前组件的` detach action subscription`：

```typescript
export default {
  setup() {
    const someStore = useSomeStore()

    // 此订阅将在组件卸载后保留
    someStore.$onAction(callback, true)

    // ...
  },
}
``` -->

## 添加多个 Store

到这里，对单个 Store 的配置和调用相信都已经清楚了，实际项目中会涉及到很多数据操作，还可以用多个 Store 来维护不同需求模块的数据状态。

::: tip 

 `多个Store 和 Vuex 的 Module比较相似`，目的都是为了避免状态树过于臃肿，但用起来会更为简单。
::: 
### 目录结构建议

建议统一存放在 src/stores 下面管理，根据业务需要进行命名，比如 user 就用来管理登录用户相关的状态数据。
```sh
# Pinia ------------------------------------------------------------------------------------
src
└── stores
    ├── index.js          # (Optional) Initializes Pinia, does not import stores
    ├── module1.js        # 'module1' id
    ├── nested-module2.js # 'nested/module2' id
    ├── nested-module3.js # 'nested/module3' id
    └── nested.js         # 'nested' id


# Vuex -------------------------------------------------------------------------------------
src
└── store
    ├── index.js           # Initializes Vuex, imports modules
    └── modules
        ├── module1.js     # 'module1' namespace
        └── nested
            ├── index.js   # 'nested' namespace, imports module2 & module3
            ├── module2.js # 'nested/module2' namespace
            └── module3.js # 'nested/module3' namespace
```

::: tip  
Pinia 的目录被建议为`stores`而不是`store`。这是为了强调 Pinia 使用多个store，便于理解
:::


里面暴露的方法就统一以 use 开头加上文件名，并以 Store 结尾，作为小驼峰写法，比如 user 这个 Store 文件里面导出的函数名就是：

```typescript
// src/stores/user.ts
export const useUserStore = defineStore('user', {
  // ...
})
```

然后以 index.ts 里作为统一的入口文件， index.ts 里的代码写为：

```typescript
export * from './user'
export * from './game'
export * from './news'
```

这样在使用的时候，只需要从 @/stores 里导入即可，无需写完整的路径，例如，只需要这样：

```typescript
import { useUserStore } from '@/stores'
```

而无需这样：

```typescript
import { useUserStore } from '@/stores/user'
```

### 在 Vue 组件 / TS 文件里使用

这里我以一个比较简单的业务场景举例，希望能够方便的理解如何同时使用多个 Store 。

假设目前有一个 userStore 是管理当前登录用户信息， gameStore 是管理游戏的信息，而 “个人中心” 这个页面需要展示 “用户信息” ，以及 “该用户绑定的游戏信息”，那么就可以这样：

```typescript
import { defineComponent, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
// 这里导入你要用到的 Store
import { useUserStore, useGameStore } from '@/stores'
import type { GameItem } from '@/types'

export default defineComponent({
  setup() {
    // 先从 userStore 获取用户信息（已经登录过，所以可以直接拿到）
    const userStore = useUserStore()
    const { userId, userName } = storeToRefs(userStore)

    // 使用 gameStore 里的方法，传入用户 ID 去查询用户的游戏列表
    const gameStore = useGameStore()
    const gameList = ref<GameItem[]>([])
    onMounted(async () => {
      gameList.value = await gameStore.queryGameList(userId.value)
    })

    return {
      userId,
      userName,
      gameList,
    }
  },
})

```
::: warning  
 不能直接通过 ES6 解构的方式（ e.g. const { message } = store ），那样会破坏数据的响应性。需要解构时可引用`storeToRefs`进行操作，Pinia会将state响应式处理
:::
再次提醒，`切记每个 Store 的 ID 必须不同，如果 ID 重复`，在同一个 Vue 组件 / TS 文件里定义 Store 实例变量的时候，会以先定义的为有效值，后续定义的会和前面一样。

如果先定义了 userStore :

```typescript
// 假设两个 Store 的 ID 一样
const userStore = useUserStore()  // 是想要的 Store
const gameStore = useGameStore()  // 得到的依然是 userStore 的那个 Store
如果先定义了 gameStore :

// 假设两个 Store 的 ID 一样
const gameStore = useGameStore()  // 是想要的 Store
const userStore = useUserStore()  // 得到的依然是 gameStore 的那个 Store
```

### Store 之间互相引用

如果在定义一个 Store 的时候，要引用另外一个 Store 的数据，也是很简单，回到那个 message 的例子，我们添加一个 getter ，它会返回一句问候语 ‘欢迎用户’ ：

```typescript
// src/stores/message.ts
import { defineStore } from 'pinia'

// 导入用户信息的 Store 并启用它
import { useUserStore } from './user'
const userStore = useUserStore()

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: 'Hello World',
  }),
  getters: {
    // 这里我们就可以直接引用 userStore 上面的数据了
    greeting: () => `Welcome, ${userStore.userName}!`,
  },
})
```

假设现在 userName 是 Petter ，那么你会得到一句对 Petter 的问候：

```typescript
const messageStore = useMessageStore()
console.log(messageStore.greeting)  // Welcome, Petter!
```


## 专属插件的使用

Pinia 拥有非常灵活的可扩展性，有专属插件可以开箱即用满足更多的需求场景。

### 数据持久化存储插件 

这里以` pinia-plugin-persistedstate `为例，这是一个让数据持久化存储的 Pinia 插件。
::: tip 
 数据持久化存储，指页面关闭后再打开，浏览器依然可以记录之前保存的本地数据，例如：浏览器原生的 localStorage 和 IndexedDB。
::: 

#### 安装

```yaml
# yarn
yarn add pinia-plugin-persistedstate
# npm
npm install pinia-plugin-persistedstate
```

安装成功，激活方法会涉及到 Pinia 的初始化过程调整，这里不局限于某一个插件，通用的插件用法如下（请留意代码注释）：

``` typeScript
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'//引入Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 导入 Pinia 插件

const pinia = createPinia()//创建
pinia.use(piniaPluginPersistedstate) // 激活 Pinia 插件
const app = createApp(App)

//挂载
app.use(pinia)
app.mount('#app')
```

### 使用前


Pinia 默认在页面刷新时会丢失当前变更的数据，没有在本地做持久化记录：

```typescript
import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
  state: () => { // 推荐使用 完整类型推断的箭头函数
    return {
      // 所有这些属性都将自动推断其类型
      counter: 2,
      name: 'murray',
      isAdmin: true,
    }
  },
  getters:{
    getCounter():number {
        return this.counter * 2
    }
  },
  actions:{
      add(){
        this.counter++
      }
  }
})
```

### 使用后


按照 `persistedstate` 插件的文档说明，我们在其中一个 Store 启用它，只需要添加一个` persist: true` 的选项即可开启：

```typescript
import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
  persist: true,// 这是按照插件的文档，在实例上启用了该插件，这个选项是插件特有的
//   persist: {
//     key: "给一个要保存的名称",
//     //保存的位置
//     storage: window.sessionStorage,//默认localstorage
//   },
  state: () => { // 推荐使用 完整类型推断的箭头函数
    return {
      // 所有这些属性都将自动推断其类型
      counter: 2,
      name: 'murray',
      isAdmin: true,
    }
  },
  getters:{
    getCounter():number {
        return this.counter * 2
    }
  },
  actions:{
      add(){
        this.counter++
      }
  }
})
```


在浏览器查看到` localStorage` 的存储变化，以 Chrome 浏览器为例，按 F12 ，打开 Application 面板，选择 `Local Storage` ，可以看到以当前` Store ID` 为 Key 的存储数据。 1