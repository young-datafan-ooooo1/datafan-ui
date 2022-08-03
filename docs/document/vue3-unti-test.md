# Vue单元测试指北

## 单元测试的作用

测试有助于确保你的应用程序能够按照预期工作。

具有高测试覆盖率的软件项目永远不会是完美的，但它是软件质量的一个良好的初始指标。此外，可测试的代码通常是一个良好的软件架构的标志，这就是为什么先进的开发人员在整个开发生命周期中都会考虑到测试。

测试可以从三个层面考虑

- 单元测试
- 集成测试
- 端到端测试

单元测试是测试独立的代码单元的功能，与它的依赖关系隔离。

单元测试是测试驱动开发（TDD）过程的一个基本部分。

单元测试提高了代码的可维护性。

### 测试的重点

- **输入：** data、props、用户交互、生命周期、用户存储、路由等
- **输出：** 页面渲染、事件、数据返回、数据存储更新等

## 工具

### Vue Unit Test

Vue Test Utils（VTU）是一套旨在简化Vue.js组件测试的实用工具库。它提供一系列的方法来挂载组件与组件交互。

### Vitest

Vitest 是一个由 Vite 提供支持的极速单元测试框架。

### 安装

```
pnpm add -S -D vitest @vue/test-utils happy-dom
```

### 配置

`package.json`的`scripts`中添加`"test": "vitest"`

`vite.config.js`中添加

```js
	test: {
    environment: 'happy-dom'
  },
```

### 运行

```
npx vitest // 默认以watch模式运行

或

pnpm run test
```



### 文件目录

```
├── node_modules
├── public
├── src
    ├── assets
    └── components
        └── __tests__
```

### 命名规则

`Component.spec.js`   测试文件应与组件名称一致。

## 渲染组件

在`src/compoents`中创建`Greeting.vue`。组件唯一的内容就是渲染`greeting`内容

```vue
<template>
  <div>
    {{ greeting }}
  </div>
</template>
<script setup>
import {ref} from 'vue'
const greeting = ref('Hello')
</script>
```

在`src`下创建`__test__/components`文件夹，并创建`Greeting.spec.js`文件

```js
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Greeting from '@/components/Greeting.vue'

describe('Greeting', () => {
  let wrapper = null
  it('测试Greeting', () => {
    wrapper = shallowMount(Greeting)
    expect(wrapper.find('div').text()).toBe('Hello')
  })
})
```

### shallowMount

`shallowMount`是VTU提供的工具函数，用来创建组件实例。

### describe | it | expect

- `describe`是一个将多个相关的测试组合在一起的块。
  - `describe(name, fn)` 
    - `name`：描述
    - `fn`：测试内容
- `it`是测试具体的功能或函数。
  - `it(name, fn, timeout)`
    - `name` 描述
    - `fn` 测试内容
    - `timeout`指定该测试套件每次运行的最长时间，默认为5秒
- `expect`断言，判断值是否满足条件，通常搭配匹配器来使用。



**`expect`常用匹配器**

- Booleans:
  - `toBeTruthy()` - 检查一个变量/语句是否为真
  - `toBeFalsy()` - 检查一个变量/语句是否为假
- Defined:
  - `toBeNull()` - 检查一个变量/语句是否为null
  - `toBeUndefined()` -检查一个变量/语句是否为真`undefined`
  - `toBeDefined()` - 检查一个变量/语句是否为真 `defined`
- Numbers:
  - `toBeGreaterThan()` - 检查一个数字是否大于指定值
  - `toBeGreaterThanOrEqual()` - 检查一个数字是否大于或等于指定的值
  - `toBeLessThan()` - 检查一个数字是否小于指定的值
  - `toBeLessThanOrEqual()` - 检查一个数字是否小于或等于指定的值。
- Strings:
  - `toMatch()` - 检查一个字符串是否匹配指定的值
- Arrays:
  - `toContain()` - 检查一个数组是否包含指定的值
- `toBe()` and `toEqual()` - 检查一个值是否与指定的值相同。

修饰符`not`可与上面的匹配器一起使用

````js
expect(wrapper.text()).not.toMatch('Vue Project')
````

完整的 [Vitest API 列表](https://vitest.dev/api/#expect)

## 测试props

### beforeEach | afterEach

Vitest提供`beforeEach` 与 `afterEach` 用来处理组件初始化与测试完毕之后的要做的事。

- `beforeEach` 在执行测试之前被调用
  - `beforeEach(fn, timeout)`
    - `fn`函数，如果使用`async/await`，则测试内容会在全部`await`完成之后再执行
    - `timeout` 超时时间
- `afterEach` 在每一个测试执行结束后被调用
  - `afterEach(fn, timeout)`
    - `fn`函数，如果使用`async/await`，则`Vitest`在全部`await`完成之后再继续。
    - `timeout` 超时时间

### setProps

通过`setProps()`设置`props`传入数据，`flushPromises()`返回一个`promise`，表示组件更新完成。

```js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Greeting from '@/components/Greeting.vue'
import { flushPromises } from '@vue/test-utils'

describe('Greeting', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(Greeting, {
      propsData: {
        what: 'Wo'
      }
    })
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('测试Greeting', () => {
    expect(wrapper.find('div').text()).toBe('Hello, Wo')
  })
  it('测试props传入', async() => {
    // 组件初始化
    expect(wrapper.find('span').text()).toBe('Wo')

    // 设置props
    wrapper.setProps({
      what: 'World'
    })
    // 等待组件刷新完成
    await flushPromises()

    // 验证props传入与页面显示
    expect(wrapper.find('span').text()).toBe('World')
    expect(wrapper.find('div').text()).toBe('Hello, World')
  })
})
```

## 模拟用户输入与点击事件

新建文件`Weather.vue`

```vue
<template>
  <div><input v-model="temperature" type="number"> <button @click="setTemperature">温度 - 1</button></div>
  <div>今天的温度：{{temperature}}</div>
  <div>今天的天气：<span>{{status}}</span></div>
</template>
<script setup>
  import { ref, computed } from 'vue'
  const temperature = ref(20)
  const setTemperature = () => {
    temperature.value--
  }
  const status = computed(() => {
    return temperature.value < 30 ? '凉爽' : '热死'
  })
</script>
```

创建相应的测试文件`Weather.spec.js`

```js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Weather from '@/components/Weather.vue'
import { flushPromises } from '@vue/test-utils'

describe('Weather', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(Weather)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('测试用户输入', async() => {
    // 设置输入值
    wrapper.vm.temperature = 40
    // await wrapper.find('input[type="number"]').setValue(40)
    // 等待组件刷新
    await flushPromises()
    // 断言输入值
    expect(wrapper.find('input').element.value).toEqual(40)
    expect(wrapper.find('.temp').text()).toBe('40')
  })
  it('测试用户点击', async() => {
    // 设置输入值
    wrapper.vm.temperature = 40
    // 点击按钮
    wrapper.find('button').trigger('click')
    await flushPromises()
    // 断言输入值
    expect(wrapper.find('input').element.value).toEqual(39)
    expect(wrapper.find('.temp').text()).toBe('39')
  })
    it('测试computed', async() => {
    // 组件初始化
    wrapper.vm.temperature = 40
    await flushPromises()
    expect(wrapper.find('.status').text()).toBe('热死')
    // 修改数据
    wrapper.vm.temperature = 20
    await flushPromises()
    // 验证computed
    expect(wrapper.find('.status').text()).toBe('凉爽')
  })
})
```

### vm | setValue

VTU提供`vm`来获取组件实例，可通过它来获取组件内部变量值，或调用组件中定义的方法。可以通过`vm`直接改变组件中的变量，但需搭配`flushPromises()`等待组件刷新，或者查找组件，使用`setValue`搭配`await`来模拟用户输入。

### trigger

提供`trigger`来触发`click`,`select`,`keyup`等事件

### computed | watch

`computed`与`watch`的测试与普通函数一样

## 测试emit

新建`Emitter.vue` 和 `Emitter.spec.js`

```vue
// Emitter.vue
<template>
  <div></div>
</template>
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['myEmit'])
const emitEvent = () => {
  emit('myEmit', 'Emitted!')
}
</script>
```

```js
// Emitter.spec.js
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Emitter from '@/components/Emitter.vue'

describe('Emitter', () => {
  let wrapper = null
  it('Test Emit', () => {
    wrapper = shallowMount(Emitter)

    wrapper.vm.emitEvent()
    expect(wrapper.emitted()).toHaveProperty('myEmit')
    expect(wrapper.emitted().myEmit).toHaveLength(1)
    expect(wrapper.emitted().myEmit).toEqual([['Emitted!']])
  })
  it('Test Emitted twice', () => {
    wrapper = shallowMount(Emitter)

    // 触发两次
    wrapper.vm.emitEvent()
    wrapper.vm.emitEvent()

    expect(wrapper.emitted()).toHaveProperty('myEmit')
    expect(wrapper.emitted().myEmit).toHaveLength(2)
    expect(wrapper.emitted().myEmit).toEqual([['Emitted!'],['Emitted!']])
    expect(wrapper.emitted().myEmit[0]).toEqual(['Emitted!'])
  })
})
```

通过`vm`访问组件中的方法，触发`emit`事件

### emitted

VTU提供`emitted`的，返回组件中所有发生的`emit`事件，返回格式为数组。

## 验证元素是否可见

### isVisible

断言 `Wrapper` 是否可见。

如果有一个祖先元素拥有 `display: none` 或 `visibility: hidden` 样式则返回 `false`。

这可以用于断言一个组件是否被 `v-show` 所隐藏。

<font color='red'>`isVisible`在实际测试过程中发现返回的结果永远是true</font>

> [Issue地址](https://github.com/vuejs/vue-test-utils/issues/327)

### exists

断言 `Wrapper` 是否存在，与`v-is`搭配使用 。

使用方法：

```js
describe('isVisible', () => {
  let wrapper = null
  it('Test visible', async() => {
    wrapper = shallowMount(isVisible)
    
    // expect(wrapper.find('.useShow').isVisible()).toBe(false)
    expect(wrapper.find('.useIf').exists()).toBe(false)

    wrapper.vm.useIf = true

    await flushPromises()
    // expect(wrapper.find('.useShow').isVisible()).toBe(false)
    expect(wrapper.find('.useIf').exists()).toBe(true)
    expect(wrapper.find('.useIf').text()).toBe('If')
  })
})
```



## Mock数据

当单元测试中遇到涉及到接口调用的情况时，通常使用mock来代替实际的接口调用。

**优点**

- 不依赖网络请求
- API发生故障时，测试不会中断
- 运行速度快

需要引入`axios`，但不使用`axios`实际的调用接口，而是通过`vi.mock`创建它的模拟。

`vi` 是`Vitest`提供的工具函数。

`vi.mock`模拟传递模块的所有`imports`

`vi.fn`为函数创建一个监听。每次调用函数时，会存储它的参数、返回值和实例。

```js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import HttpRequestComponent from '@/components/Http.vue'
import axios from 'axios'

vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});
describe('HttpRequestComponent', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(HttpRequestComponent)
    const getResp = {
      data: {
        name: 'HZ',
        main: {
          temp: 30,
          temp_min: 20,
          temp_max: 40
        }
      }
    }
    axios.get.mockResolvedValue(getResp)
  })
  afterEach(() => {
    axios.get.mockReset()
  })
  it('test axios mock', async () => {
    wrapper.vm.searchCity()
    await flushPromises()
    // 验证是否发送请求
    expect(axios.get).toHaveBeenCalledTimes(1)
    // 验证返回结果
    expect(wrapper.findAll('li')[0].text()).toBe('名称：HZ')
    expect(wrapper.findAll('li')[1].text()).toBe('当前温度：30')
    expect(wrapper.findAll('li')[2].text()).toBe('最高温：40')
    expect(wrapper.findAll('li')[3].text()).toBe('最低温：20')
  })
})
```



## 查找元素与组件

- `find`

  - `find`基本上是`querySelector`，另外，还支持`ref`的方式查找

- `findAll`

  - 同上

- `findComponent`

  - | syntax         | example                       | details                                                      |
    | -------------- | ----------------------------- | ------------------------------------------------------------ |
    | querySelector  | `findComponent('.component')` | Matches standard query selector.                             |
    | Component name | `findComponent({name: 'a'})`  | matches PascalCase, snake-case, camelCase                    |
    | Component ref  | `findComponent({ref: 'ref'})` | Can be used only on direct ref children of mounted component |
    | SFC            | `findComponent(Component)`    | Pass an imported component                                   |

- `findAllComponents`

  - 同上，但<font color='red'>`findAllComponents` 不支持 ref 语法</font>。所有其查询语法均有效。

## 官网文档

[VueUnitTest](https://test-utils.vuejs.org/)

[Vitest](https://vitest.dev/)