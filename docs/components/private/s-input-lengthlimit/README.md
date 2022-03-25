
# SInputLengthlimit

带长度校验的名称/备注输入框

## 基础用法

项目规范中名称类输入框最大长度50个字符，备注类输入框最大长度200个字符

::: demo
```html
<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
  <a-form-model-item ref="name" label="名称" prop="name">
        <s-input-lengthlimit :rules.sync="rules" prop="name" v-model="form.name"/>
    </a-form-model-item>
    <a-form-model-item ref="remarks" label="备注" prop="remarks">
        <s-input-lengthlimit :rules.sync="rules" prop="remarks" v-model="form.remarks" type="textarea"/>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        确定
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
  export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
      form: {
        name:undefined,
        remarks:undefined,
      },
      rules:{}
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
:::
## 配置最小长度、最大长度、提示语

项目规范中名称类输入框最大长度50个字符，备注类输入框最大长度200个字符

::: demo
```html
<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
  <a-form-model-item ref="name" label="名称" prop="name">
        <s-input-lengthlimit :rules.sync="rules" prop="name" :min="2" :max="5" message="自定义提示语" v-model="form.name"/>
    </a-form-model-item>
    <a-form-model-item ref="remarks" label="备注" prop="remarks">
        <s-input-lengthlimit :rules.sync="rules" prop="remarks" :min="2" :max="5" message="自定义提示语" v-model="form.remarks" type="textarea"/>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        确定
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
  export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
      form: {
        name:undefined,
        remarks:undefined,
      },
      rules:{}
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
:::
## 校验规则配置在Form.Item中

项目规范中名称类输入框最大长度50个字符，备注类输入框最大长度200个字符

::: demo
```html
<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
  <a-form-model-item ref="name" label="名称" prop="name" :rules="nameRules">
        <s-input-lengthlimit :rules.sync="nameRules" prop="name" ruleSetLocation="formItem"  v-model="form.name"/>
    </a-form-model-item>
    <a-form-model-item ref="remarks" label="备注" prop="remarks">
        <s-input-lengthlimit :rules.sync="rules" prop="remarks"  v-model="form.remarks" type="textarea"/>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        确定
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
  export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
      form: {
        name:undefined,
        remarks:undefined,
      },
      rules:{},
      nameRules:{}
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
:::

## API

### Props

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|validate|是否开启长度校验|Boolean|false / true |true|
|rules|表单验证规则|Object / Array|-|-|
|ruleSetLocation|表单规则设置位置|String|form / formItem|form|
|prop|表单域 model 字段|String|-|-|
|min|字符最小长度|Number|-|-|
|max|字符最大长度|Number|-|-|
|message|错误提示语|String|-|-|
|type|声明 input 类型|String|-|-|
