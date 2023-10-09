## 简介

X6 是 AntV 旗下的图编辑引擎，提供了一系列开箱即用的交互组件和简单易用的节点定制能力，方便我们快速搭建流程图、DAG 图、ER 图等图应用。


### 特性

- 🌱　极易定制：支持使用 SVG/HTML/React/Vue 定制节点样式和交互；
- 🚀　开箱即用：内置 10+ 图编辑配套扩展，如框选、对齐线、小地图等；
- 🧲　数据驱动：基于 MVC 架构，用户更加专注于数据逻辑和业务逻辑；
- 💯　事件驱动：可以监听图表内发生的任何事件。


## 快速上手

### 安装

通过 npm 或 yarn 命令安装 X6。

```shell
# npm
$ npm install @antv/x6 --save

# yarn
$ yarn add @antv/x6
```

安装完成之后，使用 `import` 或 `require` 进行引用。

```ts
import { Graph } from '@antv/x6';
```

如果是直接通过 `script` 标签引入，可以使用下面三个 CDN 中的任何一个，默认返回 X6 的最新版：

- https://unpkg.com/@antv/x6/dist/x6.js
- https://cdn.jsdelivr.net/npm/@antv/x6/dist/x6.js
- https://cdnjs.cloudflare.com/ajax/libs/antv-x6/1.3.20/x6.js (不支持获取最新版)

```html
<script src="https://unpkg.com/@antv/x6/dist/x6.js"></script>
```

对于生产环境，我们推荐使用一个明确的版本号，以避免新版本造成的不可预期的破坏：

- https://unpkg.com/@antv/x6@1.1.1/dist/x6.js
- https://cdn.jsdelivr.net/npm/@antv/x6@1.1.1/dist/x6.js
- https://cdnjs.cloudflare.com/ajax/libs/antv-x6/1.1.1/x6.js

```html
<script src="https://unpkg.com/@antv/x6@1.1.1/dist/x6.js"></script>
```

### 开始使用

接下来我们就一起来创建一个最简单的 `Hello --> World` 应用。

#### Step 1 创建容器

在页面中创建一个用于容纳 X6 绘图的容器，可以是一个 `div` 标签。

```html
<div id="container"></div>
```

#### Step 2 准备数据

X6 支持 JSON 格式数据，该对象中需要有节点 `nodes` 和边 `edges` 字段，分别用数组表示：

```ts
const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
  ],
};
```

#### Step 3 渲染画布

首先，我们需要创建一个 `Graph` 对象，并为其指定一个页面上的绘图容器，通常也会指定画布的大小。

```ts
import { Graph } from '@antv/x6';
// 使用 CDN 引入时暴露了 X6 全局变量
// const { Graph } = X6

const graph = new Graph({
  container: document.getElementById('container'),
  width: 800,
  height: 600,
});
```

如果是通过 `script` 标签引入方式，我们的 `Graph` 对象是挂载在 `X6` 这个全局变量下面：

```html
<script src="https://unpkg.com/@antv/x6/dist/x6.js"></script>
<script>
  const graph = new X6.Graph({
    container: document.getElementById('container'),
    width: 800,
    height: 600,
  });
</script>
```

然后，我们就可以使用刚刚创建的 `graph` 来渲染我们的节点和边。

```ts
graph.fromJSON(data)
```

到此，我们就得到一个最简单的 `Hello --> World` 示例，看下面的完整代码。

<iframe src="https://x6.antv.vision/demos/tutorial/getting-started/helloworld/" style="width: 100%;height:375px; border: 0;"></iframe>

### 画布

#### 背景和网格

接下来，我们来给画布设置一个背景颜色和网格，另外还支持背景图片、网格类型等配置，点击查看完整的[背景配置](basic/background)和[网格配置](basic/grid)。

```ts
import { Graph } from '@antv/x6';

const graph = new Graph({
  container: document.getElementById('container'),
  width: 800,
  height: 600,
  background: {
    color: '#fffbe6', // 设置画布背景颜色
  },
  grid: {
    size: 10,      // 网格大小 10px
    visible: true, // 渲染网格背景
  },
});
```

<iframe src="https://x6.antv.vision/demos/tutorial/getting-started/background" style="width: 100%;height:375px; border: 0;"></iframe>

#### 缩放和平移

创建画布后，可以调用 `graph.zoom(factor: number)` 和 `graph.translate(tx: number, ty: number)` 来缩放和平移画布。

```ts
graph.zoom(-0.5)
graph.translate(80, 40)
```

<iframe src="https://x6.antv.vision/demos/tutorial/getting-started/transform" style="width: 100%;height:375px; border: 0;"></iframe>

### 节点

#### 使用图形

在上面示例中，我们使用了默认图形 `rect` 来渲染节点，除此之外，我们在 X6 中也内置了 `circle`、`ellipse`、`polygon` 等[基础图形](basic/cell#内置节点)，可以通过 `shape` 属性为节点指定渲染的图形，如果你对 SVG 图形还不熟悉，可以参考 [SVG 图像入门教程](https://www.ruanyifeng.com/blog/2018/08/svg.html) 

```ts
const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect', // 使用 rect 渲染
      x: 100,
      y: 200,
      width: 80,
      height: 40,
      label: 'hello',
    },
    {
      id: 'node2',
      shape: 'ellipse', // 使用 ellipse 渲染
      x: 300,
      y: 200,
      width: 80,
      height: 40,
      label: 'world',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};
```

<iframe src="https://x6.antv.vision/demos/tutorial/getting-started/node-shape" style="width: 100%;height:375px; border: 0;"></iframe>

#### 定制样式

在创建节点或准备节点数据时，我们可以通过 `attrs` 对象来配置节点样式，该对象的 Key 是节点 SVG 元素的选择器(Selector)，对应的值是应用到该 SVG 元素的 [SVG 属性值](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute)(如 [fill](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill) 和 [stroke](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke))，如果你对 SVG 属性还不熟悉，可以参考 MDN 提供的[填充和边框](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Fills_and_Strokes)入门教程。

我们对 `'rect'` 图形中定义了 `'body'`(代表 `<rect>` 元素) 和 `'label'`(代表 `<text>` 元素) 两个选择器(Selector)，每种图形都有属于自己的选择器定义，X6 内置图形[参考这里](basic/cell#attrs-1)。

```ts
const data = {
  nodes: [
    {
      id: 'node1',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      attrs: {
        body: {
          fill: '#2ECC71',
          stroke: '#000',
          strokeDasharray: '10,2',
        },
        label: {
          text: 'Hello',
          fill: '#333',
          fontSize: 13,
        }
      }
    },
    {
      id: 'node2',
      x: 180,
      y: 240,
      width: 100,
      height: 40,
      attrs: {
        body: {
          fill: '#F39C12',
          stroke: '#000',
          rx: 16,
          ry: 16,
        },
        label: {
          text: 'World',
          fill: '#333',
          fontSize: 18,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};
```

<iframe src="https://x6.antv.vision/demos/tutorial/getting-started/node-style" style="width: 100%;height:375px; border: 0;"></iframe>

### 边

#### 使用图形

在上面示例中，我们使用了默认图形 `edge` 来渲染边，除此之外，在 X6 中还内置了 `double-edge` 和 `shadow-edge` 两种图形，可以通过 `shape` 属性为边指定渲染的图形，例如： 

```ts
const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 100,
      y: 100,
      width: 80,
      height: 40,
      label: 'hello',
    },
    {
      id: 'node2',
      shape: 'ellipse',
      x: 240,
      y: 300,
      width: 80,
      height: 40,
      label: 'world',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      shape: 'double-edge',
    },
  ],
}
```

<iframe src="https://x6.antv.vision/demos/tutorial/getting-started/edge-shape" style="width: 100%;height:375px; border: 0;"></iframe>

#### 定制样式

与[定制节点样式](#定制样式)一样，我们使用 `attrs` 对象来配置边的样式，默认的 `edge` 图形定义了 `'line'`（`<path>` 元素） 和 `'wrap'`（透明的 `<path>` 元素，更宽但不可见，为了方便交互）两个选择器(Selector)，我们像下面这样来定制边的样式。

```ts
const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 100,
      y: 100,
      width: 80,
      height: 40,
      label: 'hello',
    },
    {
      id: 'node2',
      shape: 'ellipse',
      x: 240,
      y: 300,
      width: 80,
      height: 40,
      label: 'world',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
  ],
}
```

<iframe src="https://x6.antv.vision/demos/tutorial/getting-started/edge-style" style="width: 100%;height:375px; border: 0;"></iframe>


## 基本教程

在 X6 中，Graph 是图的载体，它包含了图上的所有元素（节点、边等），同时挂载了图的相关操作（如交互监听、元素操作、渲染等）。

###  画布 Graph 平移、缩放、居中

#### 画布平移

普通画布(未开启 [scroller](/zh/docs/tutorial/basic/scroller) 模式)通过开启 `panning` 选项来支持拖拽平移。

```ts
const graph = new Graph({
  panning: true,
})

// 等同于
const graph = new Graph({
  panning: {
    enabled: true,
  },
})
```

拖拽可能和其他操作冲突，此时可以设置 `modifiers` 参数，设置修饰键后需要按下修饰键并点击鼠标才能触发画布拖拽。

```ts
const graph = new Graph({
  panning: {
    enabled: true,
    modifiers: 'shift',
  },
})
```

还可以配置 `eventTypes` 来设置触发画布拖拽的行为，支持 `leftMouseDown`、 `rightMouseDown`、`mouseWheel`，默认为 `['leftMouseDown']` 。

```ts
const graph = new Graph({
  panning: {
    enabled: true,
    eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel']
  },
})
```

可以通过以下 API 来启用/禁止画布平移：

```ts
graph.isPannable() // 画布是否可以平移
graph.enablePanning() // 启用画布平移
graph.disablePanning() // 禁止画布平移
graph.togglePanning() // 切换画布平移状态
```

#### 画布缩放

普通画布(未开启 [scroller](/zh/docs/tutorial/basic/scroller) 模式)通过开启 [mousewheel](/zh/docs/tutorial/basic/mousewheel) 选项来支持画布缩放。这里说明怎么通过代码来进行画布缩放：

```ts
graph.zoom() // 获取缩放级别
graph.zoom(0.2) // 在原来缩放级别上增加 0.2
graph.zoom(-0.2) // 在原来缩放级别上减少 0.2
```

#### 内容居中

常用的就是将画布内容中心与视口中心对齐，使用方式：

```ts
graph.centerContent()
```

更多的居中方法可以查看 [Transform](/zh/docs/api/graph/transform)

### 导出

#### 导出 SVG

```ts
this.graph.toSVG((dataUri: string) => {
  // 下载
  DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg')
})
```

`toSVG` 方法还支持第二个参数：

```ts
interface ToSVGOptions {
  preserveDimensions?: boolean | Size
  viewBox?: Rectangle.RectangleLike
  copyStyles?: boolean
  stylesheet?: string
  serializeImages?: boolean
  beforeSerialize?: (this: Graph, svg: SVGSVGElement) => any
}
```

#### preserveDimensions

`preserveDimensions` 用来控制导出 `svg` 的尺寸, 如果不设置，`width` 和 `height` 默认为 `100%`；如果设置为 `true`, `width` 和 `height` 会自动计算为图形区域的实际大小。还可以通过以下方式自定义尺寸：

```ts
this.graph.toSVG((dataUri: string) => {
  // todo
}, {
  preserveDimensions: {
    width: 100,
    height: 100,
  }
})
```

##### viewBox

设置导出 `svg` 的 `viewBox`

#### copyStyles

是否复制外部样式表中的样式，默认是 `true`。开启 `copyStyles` 后，在导出过程中因为需要禁用所有样式表，所以页面可能会出现短暂的样式丢失现象。如果效果特别差，可以将 `copyStyles` 设置为 `false`。

#### stylesheet

自定义样式表

```ts
this.graph.toSVG((dataUri: string) => {
  // todo
}, {
  stylesheet: `
    rect {
      fill: red;
    }
  ` 
})
```

##### serializeImages

是否将 `image` 元素的 `xlink:href` 链接转化为 `dataUri` 格式

##### beforeSerialize

可以在导出 `svg` 字符串之前调用 `beforeSerialize` 来修改它。

#### 导出 PNG/JPEG

```ts
import { DataUri } from '@antv/x6'

this.graph.toPNG((dataUri: string) => {
  // 下载
  DataUri.downloadDataUri(dataUri, 'chart.png')
})
```

`toPNG/toJPEG` 方法第二个参数除了 `toSVG` 的所有参数外，还支持以下参数：

```ts
interface ToImageOptions {
  width?: number
  height?: number
  backgroundColor?: string
  padding?: NumberExt.SideOptions
  quality?: number
}
```

##### width

导出图片的宽度

##### height

导出图片的高度

##### backgroundColor

导出图片的背景色

##### padding

图片的 `padding`

```ts
this.graph.toPNG((dataUri: string) => {
  // 下载
  DataUri.downloadDataUri(dataUri, 'chart.png')
}, {
  padding: {
    top: 20,
    right: 30,
    bottom: 40,
    left: 50,
  },
})
```

##### quality

图片质量，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 `0.92`


### 销毁画布

我们可以调用 `graph.dispose()` 方法进行画布的销毁以及资源的回收。

## 项目中用到的方法

### draggable 

- 给需要拖拽的元素添加 draggable 属性并设置为 true，然后添加 ondrag 事件。
- 给接收拖拽元素的放置元素同时设置 ondragover 和 ondrop 事件，必须在里边阻止默认事件，因为浏览器对拖拽事件默认的处理方式是禁止拖拽

```ts
<template>
  <div
    ref="draggable"
    class="draggable-box"
    draggable="true"
    @dragstart="onDragstart"
    @drag="onDrag"
    @dragend="onDragend"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  const dragEmit = defineEmits(['onDragStart', 'onDrag', 'onDragEnd'])
  const onDragstart = (e: Event) => {
    dragEmit('onDragStart', e)
  }
  const onDrag = (e: Event) => {
    dragEmit('onDrag', e)
  }
  const onDragend = (e: Event) => {
    dragEmit('onDragEnd', e)
  }
</script>

 <div
  @dragenter.prevent
  @dragover.prevent
  @dragleave.prevent
  @drop.stop.prevent="onEmptyDrop"
/>
```
### 连线验证（validateConnection）

```ts
new Graph({
  validateConnection(data) {
    const {
      sourceMagnet,
      targetMagnet,
      sourceCell,
      targetCell,
      targetView,
      sourcePort,
      edge,
    } = data
    if (sourceCell && targetCell && sourceCell.isNode() && targetCell.isNode()) {
      // 起点不能是输入连接幢
      if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === X6_PORT_IN_NAME) {
        return false
      }

      // 目标链接幢只能是输入
      if (!targetMagnet || targetMagnet.getAttribute('port-group') !== X6_PORT_IN_NAME) {
        return false
      }

      // 输入连接幢 只能有一个连线
      const portId = targetMagnet.getAttribute('port')!
      const node: any = targetView!.cell
      const port = node.getPort(portId)
      if (port && port.connected) {
        return false
      }
      // 此处后续可添加 节点是否失效逻辑
    }

    if (sourcePort === FILTER_OUT_PORT_YES) {
      edge?.setLabels([
        {
          attrs: { label: { text: 'YES' } },
        },
      ])
    } else if (sourcePort === FILTER_OUT_PORT_NO) {
      edge?.setLabels([
        {
          attrs: { label: { text: 'NO' } },
        },
      ])
    }

    return true
  },
})
```

### 事件系统

#### 右键菜单及自定义事件
- 右键	cell:contextmenu	node:contextmenu	edge:contextmenu	blank:contextmenu
- 自定义事件 cell:customevent、node:customevent、edge:customevent

```ts
graph.value.on('cell:contextmenu', ({ cell, e }) => {
  nodeVariables.menuCell = cell as Cell
  nodeVariables.menuVisible = true
  nodeVariables.eventType = 'contextmenu'
  const pos = graph.value?.clientToGraph(e.pageX + 200, e.pageY + 80)
  nodeVariables.pageX = pos?.x as number
  nodeVariables.pageY = pos?.y as number
  graph.value?.lockScroller()
})
```
:::warning
自定义事件监听的并不是一个完整的点击事件，当鼠标按下那一刻，就触发了；这样就会导致一个问题，它与clickOutSide的触发时机问题
:::

### 节点/边

#### 添加/删除/修改

当节点/边被添加到画布时，触发以下事件：

- `added`
- `cell:added`
- `node:added`（仅当 cell 是节点时才触发）
- `edge:added`（仅当 cell 是边时才触发）

当节点/边被移除时，触发以下事件：

- `removed`
- `cell:removed`
- `node:removed`（仅当 cell 是节点时才触发）
- `edge:removed`（仅当 cell 是边时才触发）

当节点/边发生任何改变时，触发以下事件：

- `changed`
- `cell:changed`
- `node:changed`（仅当 cell 是节点时才触发）
- `edge:changed`（仅当 cell 是边时才触发）

可以在节点/边上监听：

```ts
cell.on('added', ({ cell, index, options }) => { })
cell.on('removed', ({ cell, index, options }) => { })
cell.on('changed', ({ cell, options }) => { })
```

或者在 Graph 上监听：

```ts
graph.on('cell:added', ({ cell, index, options }) => { })
graph.on('cell:removed', ({ cell, index, options }) => { })
graph.on('cell:changed', ({ cell, options }) => { })

graph.on('node:added', ({ node, index, options }) => { })
graph.on('node:removed', ({ node, index, options }) => { })
graph.on('node:changed', ({ node, options }) => { })

graph.on('edge:added', ({ edge, index, options }) => { })
graph.on('edge:removed', ({ edge, index, options }) => { })
graph.on('edge:changed', ({ edge, options }) => { })
```

#### change:xxx

当调用 `setXxx(val, options)` 和 `removeXxx(options)` 方法去改变节点/边的数据时，并且 `options.silent` 不为 `true` 时，都将触发对应的 `chang` 事件，并触发节点/边重绘。例如：

```ts
cell.setZIndex(2)
cell.setZIndex(2, { silent: false })
cell.setZIndex(2, { anyKey: 'anyValue' })
```

将触发 Cell 上的以下事件：

- `change:*`
- `change:zIndex`

和 Graph 上的以下事件：

- `cell:change:*`
- `node:change:*`（仅当 cell 是节点时才触发）
- `edge:change:*`（仅当 cell 是边时才触发）
- `cell:change:zIndex`
- `node:change:zIndex`（仅当 cell 是节点时才触发）
- `edge:change:zIndex`（仅当 cell 是边时才触发）

可以在节点/边上监听：
```ts
// 当 cell 发生任何改变时都将被触发，可以通过 key 来确定改变项
cell.on('change:*', (args: {
  cell: Cell    
  key: string   // 通过 key 来确定改变项
  current: any  // 当前值
  previous: any // 改变之前的值
  options: any  // 透传的 options
}) => { 
  if (key === 'zIndex') {
    // 
  }
})

cell.on('change:zIndex', (args: {
  cell: Cell
  current?: number  // 当前值
  previous?: number // 改变之前的值
  options: any      // 透传的 options
}) => { })
```

或者在 Graph 上监听：

```ts
graph.on('cell:change:*', (args: {
  cell: Cell    
  key: string   // 通过 key 来确定改变项
  current: any  // 当前值，类型根据 key 指代的类型确定
  previous: any // 改变之前的值，类型根据 key 指代的类型确定
  options: any  // 透传的 options
}) => { })

// 当 cell 为节点时触发
graph.on('node:change:*', (args: {
  cell: Cell    
  node: Node
  key: string   // 通过 key 来确定改变项
  current: any  // 当前值，类型根据 key 指代的类型确定
  previous: any // 改变之前的值，类型根据 key 指代的类型确定
  options: any  // 透传的 options
}) => { })

// 当 cell 为边时触发
graph.on('edge:change:*', (args: {
  cell: Cell    
  edge: Edge
  key: string   // 通过 key 来确定改变项
  current: any  // 当前值，类型根据 key 指代的类型确定
  previous: any // 改变之前的值，类型根据 key 指代的类型确定
  options: any  // 透传的 options
}) => { })

graph.on('cell:change:zIndex', (args: {
  cell: Cell
  current?: number  // 当前值
  previous?: number // 改变之前的值
  options: any      // 透传的 options
}) => { })

// 当 cell 为节点时触发
graph.on('node:change:zIndex', (args: {
  cell: Cell
  node: Node
  current?: number  // 当前值
  previous?: number // 改变之前的值
  options: any      // 透传的 options
}) => { })

// 当 cell 为边时触发
graph.on('edge:change:zIndex', (args: {
  cell: Cell
  edge: Edge        
  current?: number  // 当前值
  previous?: number // 改变之前的值
  options: any      // 透传的 options
}) => { })
```

其他 `change` 事件如下列表，回调函数的参数与上面提到的 `change:zIndex` 的参数结构一致。

- Cell
  - `change:*`
  - `change:attrs`
  - `change:zIndex`
  - `change:markup`
  - `change:visible`
  - `change:parent`
  - `change:children`
  - `change:view`
  - `change:data`
- Node
  - `change:size`
  - `change:angle`
  - `change:position`
  - `change:ports`
  - `change:portMarkup`
  - `change:portLabelMarkup`
  - `change:portContainerMarkup`
  - `ports:added`
  - `ports:removed`
- Edge
  - `change:source`
  - `change:target`
  - `change:terminal`
  - `change:router`
  - `change:connector`
  - `change:vertices`
  - `change:labels`
  - `change:defaultLabel`
  - `change:toolMarkup`
  - `change:doubleToolMarkup`
  - `change:vertexMarkup`
  - `change:arrowheadMarkup`
  - `vertexs:added`
  - `vertexs:removed`
  - `labels:added`
  - `labels:removed`

除了上述这些内置的 Key，我们也支持监听自定义的 Key，例如

```ts
cell.on('change:custom', ({ cell, current, previous, options}) => {
  console.log(current)
})
```

当通过 `cell.prop('custom', 'any data')` 方法修改 `custom` 属性的值时将触发 `change:custom` 事件。

#### isNode()

```sign
isNode(): boolean
```

检测实例是不是 [Node](/zh/docs/api/model/node) 实例，如果是 [Node](/zh/docs/api/model/node) 实例则返回 `true`，否则返回 `false`。所有继承自 [Node](/zh/docs/api/model/node) 的节点都返回 `true`。

```ts
if (cell.isNode()) {
  // do something if the cell is a node.
}
```
### Cell

#### isEdge()

```sign
isEdge(): boolean
```

检测实例是不是 [Edge](/zh/docs/api/model/edge) 实例，如果是 [Edge](/zh/docs/api/model/edge) 实例则返回 `true`，否则返回 `false`。所有继承自 [Edge](/zh/docs/api/model/edge) 的边都返回 `true`。

```ts
if (cell.isEdge()) {
  // do something if the cell is an edge.
}
```

#### 元素属性 attrs

属性 `attrs` 是一个[复杂对象](#attrs-1)，当修改 `attrs` 时，将触发 `'change:attrs'` 事件和画布重绘。

##### get attrs

获取属性。

```ts
const atts = cell.attrs
```

##### set attrs

设置属性，并触发 `'change:attrs'` 事件和画布重绘。

```ts
cell.atts = attrs
```

##### getAttrs()

```sign
getAttrs(): Attr.CellAttrs
```

获取属性。

```ts
const atts = cell.getAttrs()
```

##### setAttrs(...)

```sign
setAttrs(attrs: Attr.CellAttrs, options?: Cell.SetAttrOptions): this
```

设置属性，默认情况触发 `'change:attrs'` 事件和画布重绘。


| 名称              | 类型                                | 必选 | 默认值  | 描述                                                                                   |
|-------------------|-------------------------------------|:----:|---------|----------------------------------------------------------------------------------------|
| attrs             | Attr.CellAttrs \| null \| undefined |  ✓   |         |                                                                                        |
| options.overwrite | boolean                             |      | `false` | 为 `true` 时替换现有属性，否则根据 `options.deep` 选项进行深度或浅度 merge。             |
| options.deep      | boolean                             |      | `true`  | 当 `options.overwrite` 为 `false` 时有效， 为 `true` 时进行深度 merge，否则进行浅 merge。 |
| options.silent    | boolean                             |      | `false` | 为 `true` 时不触发 `'change:attrs'` 事件和画布重绘。                                |
| options...others  | object                              |      |         | 其他自定义键值对，可以在事件回调中使用。                                                 |

默认情况，指定的属性将与旧属性进行[深度 merge](https://www.lodashjs.com/docs/latest#_mergeobject-sources)：

```ts
console.log(cell.getAttrs())
// {
//   body: { fill: '#ffffff' },
//   label: { fill: '#333333' },
// }

cell.setAttrs({
  body: { fill: '#f5f5f5' },
  label: { text: 'My Label' },
})

console.log(cell.getAttrs())
// {
//   body: { fill: '#f5f5f5' },
//   label: { fill: '#333333', text: 'My Label' },
// }
```

当 `options.deep` 为 `false` 时，进行浅 merge：

```ts
console.log(cell.getAttrs())
// {
//   body: { fill: '#ffffff' },
//   label: { fill: '#333333' },
// }

cell.setAttrs(
  { label: { text: 'My Label' } }, 
  { deep: false },
)

console.log(cell.getAttrs())
// {
//   body: { fill: '#ffffff' },
//   label: { text: 'My Label' },
// }
```

当 `options.overwrite` 为 `true` 时，直接替换旧属性：

```ts
console.log(cell.getAttrs())
// {
//   body: { fill: '#ffffff' },
//   label: { fill: '#333333' },
// }

cell.setAttrs(
  { label: { text: 'My Label' } }, 
  { overwrite: true },
)

console.log(cell.getAttrs())
// {
//   label: { text: 'My Label' },
// }
```

当 `options.silent` 为 true 时不触发 `'change:attrs'` 事件和画布重绘。

```ts
cell.setAttrs(myAttrs, { silent: true })
```

在选项中支持其他自定义键值对，可以在事件回调用使用。

```ts
cell.setAttrs(myAttrs, { otherKey: 'otherValue', ... })
```


#### updateAttrs(...)

```sign
updateAttrs(attrs: Attr.CellAttrs, options: Cell.SetOptions = {}): this
```

使用浅 merge 更新属性，相当于调用 `setAttrs(attrs, { ...options, deep: false })`。


| 名称             | 类型                                | 必选 | 默认值  | 描述                                                    |
|------------------|-------------------------------------|:----:|---------|---------------------------------------------------------|
| attrs            | Attr.CellAttrs \| null \| undefined |  ✓   |         |                                                         |
| options.silent   | boolean                             |      | `false` | 为 `true` 时不触发 `'change:attrs'` 事件和画布重绘。 |
| options...others | object                              |      |         | 其他自定义键值对，可以在事件回调中使用。                  |

#### get data 

获取关联的数据。

#### set data 

设置关联的数据，并触发 `'change:data'` 事件和画布重绘。

#### getData()

```sign
getData(): any
```

获取关联的数据。

#### setData(...)

```sign
setData(data: any, options?: Cell.SetDataOptions): this
```

设置关联的业务数据。

默认情况触发 `'change:data'` 事件和画布重绘，当 `options.silent` 为 `true` 时不触发 `'change:data'` 事件和画布重绘。


| 名称              | 类型    | 必选 | 默认值  | 描述                                                                                   |
|-------------------|---------|:----:|---------|----------------------------------------------------------------------------------------|
| data              | any     |  ✓   |         |                                                                                        |
| options.overwrite | boolean |      | `false` | 为 `true` 时替换现有值，否则根据 `options.deep` 选项进行深度或浅度 merge。               |
| options.deep      | boolean |      | `true`  | 当 `options.overwrite` 为 `false` 时有效， 为 `true` 时进行深度 merge，否则进行浅 merge。 |
| options.silent    | boolean |      | `false` | 为 `true` 时不触发 `'change:data'` 事件和画布重绘。                                 |
| options...others  | object  |      |         | 其他自定义键值对，可以在事件回调中使用。                                                 |

默认与原数据进行[深度 merge](https://www.lodashjs.com/docs/latest#_mergeobject-sources)，并触发 `'change:data'` 事件和画布重绘：

```ts
cell.setData(data)
```

当 `options.overwrite` 为 `true` 时，替换旧数据：

```ts
cell.setData(data, { overwrite: true })
```

当 `options.deep` 为 `false` 时，与原数据进行浅 merge：

```ts
cell.setData(data, { overwrite: true })
```

当 `options.silent` 为 `true` 时，不触发 `'change:data'` 事件和画布重绘：

```ts
cell.setData(data, { silent: true })
```

在选项中支持其他自定义键值对，可以在事件回调用使用：

```ts
cell.setData(data, { otherKey: 'otherValue', ... })
```

#### updateData(...)

```sign
updateData(data: any, options: Cell.SetOptions = {}): this
```

通过浅 merge 来更新数据，相当于调用 `setData(data, { ...options, deep: false })`。

| 名称             | 类型    | 必选 | 默认值  | 描述                                                   |
|------------------|---------|:----:|---------|--------------------------------------------------------|
| data             | any     |  ✓   |         |                                                        |
| options.silent   | boolean |      | `false` | 为 `true` 时不触发 `'change:data'` 事件和画布重绘。 |
| options...others | object  |      |         | 其他自定义键值对，可以在事件回调中使用。                 |

### Model

#### getNeighbors(...)

```sign
getNeighbors(cell: Cell, options?: GetNeighborsOptions): Cell[]
```

获取邻居节点。

| 名称             | 类型    | 必选 | 默认值  | 描述                                                                                                                                  |
|------------------|---------|:----:|---------|-------------------------------------------------------------------------------------------------------------------------------------|
| cell             | Cell    |  ✓   |         | 节点/边。                                                                                                                              |
| options.incoming | boolean |      | -       | 是否包含输入侧的邻居节点，默认包含输入和输出侧的节点，`incoming` 和 `outgoing` 两个选项中，当 `incoming` 为 `true` 时只返回输入侧的节点。 |
| options.outgoing | boolean |      | -       | 是否包含输出侧的邻居节点，默认包含输入和输出侧的节点，`incoming` 和 `outgoing` 两个选项中，当 `outgoing` 为 `true` 时只返回输出侧的节点。 |
| options.deep     | boolean |      | `false` | 是否递归获取所有子节点/边，为 `true` 时将同时返回所有子孙节点/边的邻居节点。                                                            |
| options.indirect | boolean |      | `false` | 是否包含哪些间接连接的邻居节点，即中间包含多条边(边与边连接)的邻居。           


#### getPredecessors(...)

```sign
getPredecessors(cell: Cell, options?: GetPredecessorsOptions): Cell[]
```

返回节点的前序节点，即从根节点开始连接到指定节点的节点。


| 名称                 | 类型                                                  | 必选 | 默认值  | 描述                                                                       |
|----------------------|-------------------------------------------------------|:----:|---------|--------------------------------------------------------------------------|
| cell                 | Cell                                                  |  ✓   |         | 节点/边。                                                                   |
| options.breadthFirst | boolean                                               |      | `false` | 是否使用广度优先搜索算法，默认使用深度优先搜索算法。                         |
| options.deep         | boolean                                               |      | `false` | 是否递归获取所有子节点/边，为 `true` 时将同时返回所有子孙节点/边的前序节点。 |
| options.distance     | number \| number[] \| ((distance: number) => boolean) |      | -       | 距获取指定距离的前序节点，节点和节点之间相隔的边的数量为 `1` 个距离单位。    |

#### getSuccessors(...)

```sign
getSuccessors(cell: Cell, options?: GetPredecessorsOptions): Cell[]
```

获取所有后续节点，即从指定节点开始连接到叶子节点的节点。其中 `options` 选项与 [`getPredecessors(...)`](#getpredecessors) 方法的选项一致。