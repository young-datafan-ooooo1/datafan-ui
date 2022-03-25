
# s-input-lengthlimit

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
## 修改最小长度、最大长度、提示语

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