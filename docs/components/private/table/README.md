# Table 表格

基于 `vxe-grid` 组件高度封装的表格，包含常用的表格展示、列宽拖拽、自动获取api数据、自动分页等功能；`vxe-grid` 本身的属性&事件均可正常使用，详见官方属性配置: 
[vxe-grid](https://xuliangzhan_admin.gitee.io/vxe-table/#/grid/api)

## 组件依赖
组件基于`vxe-grid`封装，请确保已经安装相关依赖并引用；为保证组件正常使用，请与如下版本保持一致：

### 安装版本
``` json
// package.json

"vxe-table": "^3.3.12",
"xe-utils": "^3.3.2",
```
### 使用依赖
``` js
// main.js

import 'xe-utils'
import VXETable from 'vxe-table'
// vxe-grid表格样式覆盖
import '@sense70/common-component-vue/assets/page-table.scss'
Vue.use(VXETable)
```

## 基本用法

适用大部分表格数据展示场景，使用内置数据代理及分页功能。

![avatar](./table.jpg)

```html
<template>
  <DTable ref="DTable" v-bind="tableOptions" />
</template>

<script>
  import { getList } from '@/api'

  export default {
    data() {
      return {
        // v-bind绑定表格配置项；也可直接绑定在组件上如：<DTable height="auto">
        tableOptions: {
          // 获取数据的API（由组件内代理获取数据&分页，无需再处理data、loading）
          api: getList,
          // 表格高度，与vxe-grid配置一致
          height: 'auto',
          // 筛选条件
          filters: {
            param1: '',
            param2: ''
          },
          // 表格列配置
          columns: [
            { type: 'seq', title: '序号', width: 80 }, 
            { field: 'account', title: '账号', minWidth: 120 },
            { field: 'type', title: '认证方式', minWidth: 120 },
          ]
        }
      },
      methods: {
        // 使用内置数据代理时，查询表格数据方法
        onSearch() {
          // 通过ref调用内置search方法，根据筛选条件重新查询数据
          this.$refs.DTable.search() 
        }
      }
    }
  }
</script>
```

## 组件传参
当内置数据代理及分页功能不满足需求时，可使用传统参数配置方式，配置loading、data、pagerConfig等参数及处理分页功能。

```html
<template>
  <DTable   
    :columns="columns"
    :data="tableData"
    :loading="isLoading"
    :pager-config="pagination"
    height="auto"
    @sort-change="sortChange"
    @page-change="pageChange"
  />
</template>

<script>
  import { getList } from '@/api'

  export default {
    data() {
      return {
        // 表格加载状态
        isLoading: false,
        // 表格数据源
        tableData: [],
        // 筛选条件
        filters: {
          searchText: '',
          sorts: 'lastModifiedTime:DESC' // 字段排序
          // ...
        },
        // 分页信息
        pagination: {
          pageSize: 10,
          currentPage: 1,
          total: 0,
        },
        // 表格列配置
        columns: [
          { type: 'seq', title: '序号', width: 80 }, 
          { field: 'account', title: '账号', minWidth: 120 },
          { field: 'type', title: '认证方式', minWidth: 120 },
        ]
      },
      methods: {
        /**
         * @description: 查询
         */
        onSearch() {
          this.pagination.current = 1
          this.fetchList()
        },
        /**
         * @description: 修改分页参数
         */
        pageChange({ currentPage, pageSize }) {
          this.pagination.current = currentPage
          this.pagination.pageSize = pageSize
          this.fetchList()
        },
        /**
         * @description: 表格排序
         * @param {array} sortList 排序字段列表
         */
        sortChange({ sortList }) {
          this.filters.sorts = sortList.map((item) => `${item.property}:${item.order.toUpperCase()}`).join(',')
          this.onSearch()
          // 内置数据代理时更新查询，可用 this.$refs.DTable.search()
        },
        /**
         * @description: 分页获取列表
         */
        fetchList() {
          this.isLoading = true
          // 分页参数
          const { current, pageSize } = this.pagination
          // 自定义查询参数
          const { searchText, sorts } = this.filters
          const params = {
            page: current,
            pageSize,
            content: searchText,
            sorts
          }
          // 请求API
          getList(params)
            .then((res) => {
              const { list, total } = res?.data?.content
              this.tableData = list
              this.pagination.total = total
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      }
    }
  }
</script>
```


## 表格列
1. 列插槽 `slots: { default: 'custom' }` 用于自定义列内容，`columns` 中设置slots后，在 `DTable` 下使用定义的具名插槽。
2. 操作列建议最多展示三个功能图标，超过三个时使用 [MorePopover 更多操作弹层](/components/more-popover)组件来展示更多。
3. 列/功能权限判断，详见：[鉴权工具：Permission](/components/private/permission)
4. 列状态设置，详见：[内置样式：状态颜色](/components/built-in-style)
::: warning 列宽设置
为使表格列布局更为合理及美观，将已知的列最大宽度设置且居中对齐，如：日期时间列：`width: 180px, align: center`、操作栏：`width:120px, align: center`
，其他不确定列宽的列设置列最小宽度 `minWidth: 120px` 即可。
:::


![avatar](./more-popover.jpg)

``` html
<template>
 <DTable ref="DTable" v-bind="tableOptions">
    <!-- 列slot自定义配置 -->
    <template #pwdOrSecret="{ row }">
      <span>{{ row.type === 'pwd'? '密码' : '秘钥' }}</span>
    </template> 
    <!-- 操作列 -->
    <template #operate="{ row }">
      <a-tooltip title="编辑">
        <a-icon 
          v-permission="'Edit'"
          class="icon-btn"
          type="form"
          @click="onEdit(row)"
        />
      </a-tooltip>
      <a-tooltip title="删除">
        <a-icon
          v-permission="'Delete'"
          class="icon-btn"
          type="delete"
          @click="onDelete(row)"
        />
      </a-tooltip>
      <!-- 更多操作功能 -->
      <DMorePopover v-permission="['ResetPassword', 'Grant']">
        <DMorePopoverItem v-permission="'ResetPassword'">
          <a-button type="link">重置密码</a-button>
        </DMorePopoverItem>
        <DMorePopoverItem v-permission="'Grant'">
          <a-button type="link">用户授权</a-button>
        </DMorePopoverItem>
      </DMorePopover>
  </DTable>
</template>
<script>
  // 引用鉴权方法
  import { matchPermission } from '@sense70/common-component-vue'

  export default {
    data() {
      return {
        // 表格配置项
        tableOptions: {
          // ...
          // 表格列
          columns: [
            {
              field: 'type',
              title: '认证方式',
              minWidth: 120,
              slots: { default: 'pwdOrSecret' }
            }, 
            {
              title: '操作',
              width: 120,
              align: 'center',
              fixed: 'right',
              slots: { default: 'operate' },
              // 匹配全部权限，如无任何权限，隐藏操作栏
              visible: matchPermission(['Edit', 'Delete','ResetPassword', 'Grant'])
            }
          ],
          // ...
        }
      }
    }
  }
</script>

```


### 列功能图标
操作列图标按钮建议

::: demo
``` html
<template>
  <!-- 授权/分配等按钮图标 -->
  <div>
    <a-tooltip title="授权/分配">
      <a-icon class="icon-btn" type="branches"/>
    </a-tooltip>
    <span style="font-size: 14px;color: #666;"> -- 授权/分配等功能图标</span>
  </div>
  <!-- 编辑按钮图标 -->
  <div>
    <a-tooltip title="编辑">
      <a-icon class="icon-btn" type="form"/>
    </a-tooltip>
    <span style="font-size: 14px;color: #666;"> -- 编辑功能图标</span>
  </div>
  <!-- 删除按钮图标 -->
  <div>
    <a-tooltip title="删除">
      <a-icon class="icon-btn" type="delete"/>
    </a-tooltip>
    <span style="font-size: 14px;color: #666;"> -- 删除功能图标</span>
  </div>
  <!-- 查看/详情等按钮图标 -->
  <div>
    <a-tooltip title="查看">
      <a-icon class="icon-btn" type="file-search"/>
    </a-tooltip>
    <span style="font-size: 14px;color: #666;"> -- 查看/详情等功能图标</span>
  </div>
</template>

```
:::

## API

### Props

|参数|说明|类型|默认值|
|---|---|---|---|
|api|字典类型|`Promise`|-|
|autoLoad|传入api后，是否自动加载数据|`Boolean`|true|
|filters|查询过滤参数|`Object`|-|
|hidePager|是否隐藏分页器|`Boolean`|false|
|autoHidePager|少于最小页面展示条数时，自动隐藏分页器|`Boolean`|false|
|pagerConfig|分页器配置|`Object`|-|
|emptyConfig|空数据模板配置|`Boolean`|-|

### Events

|事件名|说明|参数|
|---|---|---|
|page-change|分页发生改变时触发|`{ currentPage, pageSize }`|
|sort-change|排序条件发生变化时触发|`{ currentPage, pageSize }`|
|checkbox-change|只对 type=checkbox 有效，当手动勾选并且值发生改变时触发|`{ checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }`|
|checkbox-all|只对 type=checkbox 有效，当手动勾选全选时触发|`{ checked, $event }`|
