# Permission 鉴权工具
根据用户权限不同，区分展示/隐藏或只读指定功能模块。

## v-permission 指令
判断是否有权限来展示/隐藏目标功能模块，在目标标签中使用 `v-permission="权限标识"` 

``` html
<!-- 验证单个权限 -->
<a-button v-permission="'Delete'">删除</a-button>

<!-- 验证多个权限 -->
<DMorePopover v-permission="['ResetPassword', 'Grant']">
  <DMorePopoverItem v-permission="'ResetPassword'">
    <a-button type="link">重置密码</a-button>
  </DMorePopoverItem>
  <DMorePopoverItem v-permission="'Grant'">
    <a-button type="link">用户授权</a-button>
  </DMorePopoverItem>
</DMorePopover>
```

## v-permission-readonly 指令
判断是否有权限来只读目标功能模块，在目标标签中使用 `v-permission-readonly="权限标识"` 

``` html
<!-- 验证单个权限 -->
<a-button v-permission-readonly="'Delete'">删除</a-button>

<!-- 验证多个权限 -->
<a-card v-permission-readonly="['Detail','Query']">...</a-card>

```

## matchPermission 方法
根据参数判断是否存在任意一个权限，返回 `Boolean` 结果。

``` js
// 引用鉴权方法
import { matchPermission } from '@sense70/common-component-vue'

// 匹配验证单个权限
matchPermission('Delete')

// 匹配验证多个权限
matchPermission('Add', 'Delete', 'Update', 'Query')

// 在表格列中使用
columns: [
  {
    title: '操作',
    width: 120,
    align: 'center',
    fixed: 'right',
    slots: { default: 'operate' },
    // 匹配全部权限，如无任何权限，隐藏操作栏
    visible: matchPermission(['Edit', 'Delete','ResetPassword', 'Grant'])
  }
]

```