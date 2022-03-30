# PageHandle 页面处理器

列表页面的处理器组件，左右区分筛选区域及功能操作区域，且规范各自区域的样式。

## 基本用法

适用大部分列表页面

::: demo

```html
<template>
    <DPageHandle>
      <!-- 筛选项 -->
      <div slot="filters">
        <DPageHandleItem>
          <a-input v-model="value" allow-clear placeholder="请输入检索内容"/>
        </DPageHandleItem>
        <DPageHandleItem>
          <a-button class="search-btn" type="primary">查询</a-button>
        </DPageHandleItem>
      </div>
      <!-- 操作项 -->
      <div slot="actions">
        <DPageHandleItem>
          <a-button type="primary" ghost>上传</a-button>
        </DPageHandleItem>
        <DPageHandleItem>
          <a-button type="primary" ghost>下载</a-button>
        </DPageHandleItem>
        <DPageHandleItem>
          <a-button type="primary" ghost>批量删除</a-button>
        </DPageHandleItem>
      </div>
    </DPageHandle>
  </template> 

  <script>
    export default {
      data(){
        return {
          value: ''
        }
      }
    }
  </script>

```
:::


## FiltersPopover 复杂筛选

适用于超过两个及以上的搜索条件时（可自定义筛选条件 `单选｜多选｜单个日期｜日期范围｜时间范围等条件` ）

::: demo

```html
<template>
  <DPageHandle>
    <!-- 筛选项 -->
    <div slot="filters">
      <DPageHandleItem>
        <a-input v-model="filters.code" allow-clear placeholder="请输入编码"/>
      </DPageHandleItem>
      <DPageHandleItem>
        <a-input v-model="filters.title" allow-clear placeholder="请输入标题"/>
      </DPageHandleItem>
      <DPageHandleItem>
        <!-- DFiltersPopover 过滤筛选框 -->
        <DFiltersPopover>
          <DFiltersPopoverItem label="运行状态">
            <a-select v-model="filters.status" placeholder="运行状态" allow-clear>
                <a-select-option v-for="(item,index) in 10" :key="index" :value="item" :label="item">
                  选项：{{ item }}
                </a-select-option>
              </a-select>
          </DFiltersPopoverItem>
          <DFiltersPopoverItem label="用户名">
            <a-input v-model="filters.userName" placeholder="用户名"/>
          </DFiltersPopoverItem>
          <DFiltersPopoverItem label="内容">
            <a-input v-model="filters.content" placeholder="内容"/>
          </DFiltersPopoverItem>
          <template slot="footer">
            <a-button ghost type="primary" @click="reset">
              重置
            </a-button>
          </template>
        </DFiltersPopover>
      </DPageHandleItem>
      <DPageHandleItem>
        <a-button class="search-btn" type="primary">查询</a-button>
      </DPageHandleItem>
    </div>
  </DPageHandle>
</template> 

  <script>
    const GET_FILTERS = function() {
      return {
        code: '',
        title: '',
        content: '',
        status: undefined,
        userName: ''
      }
    }
    export default {
      data() {
        return {
          filters: GET_FILTERS()
        }
      }, 
      methods: {
        reset() {
          this.filters = GET_FILTERS()
        }
      }
    }
  </script>

```
:::


::: warning 注意事项
此处查询按钮为内置样式 `class="search-btn"`
:::

## API

### Slots

|名称|说明|默认值|
|---|---|---|
|filters|筛选项区域|-|
|actions|操作项区域|-|

