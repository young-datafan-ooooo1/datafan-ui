
# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基本用法

适用广泛的基础单选

::: demo
```html
<template>
  <!-- @change -->
  <a-select default-value="lucy" style="width: 120px" @change="handleChange">
    <a-select-option value="jack">
      Jack
    </a-select-option>
    <a-select-option value="lucy">
      Lucy
    </a-select-option>
    <a-select-option value="disabled" disabled>
      Disabled
    </a-select-option>
    <a-select-option value="Yiminghe">
      yiminghe
    </a-select-option>
  </a-select>
  <!-- disabled -->
  <a-select default-value="lucy" style="width: 120px" disabled>
    <a-select-option value="lucy">
      Lucy
    </a-select-option>
  </a-select>
  <!-- loading -->
  <a-select default-value="lucy" style="width: 120px" loading>
    <a-select-option value="lucy">
      Lucy
    </a-select-option>
  </a-select>
</template>

<script>
  export default {
    methods: {
      handleChange(value) {
        console.log(`selected ${value}`)
      }
    }
  }
</script>
:::