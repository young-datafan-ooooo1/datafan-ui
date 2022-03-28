# 表单正则校验

## 基础用法

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
    <a-form-model-item ref="fieldA" label="field A" prop="fieldA">
      <a-input v-model="form.fieldA" placeholder="input placeholder" />
    </a-form-model-item>
    <a-form-model-item ref="fieldB" label="field B" prop="fieldB">
      <a-input v-model="form.fieldB" placeholder="input placeholder" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> 确定 </a-button>
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
          fieldA: undefined,
          fieldB: undefined,
        },
        rules: {
          fieldA: [
            {
              validator: this.$Srules.regEngNumLine,
              trigger: 'blur',
            },
          ],
          fieldB: [
            {
              validator: this.$Srules.regLength,
              trigger: 'blur',
            },
          ],
        },
      }
    },
    methods: {
      onSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
  }
</script>
:::
## 修改提示语、最大长度、最小长度

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
    <a-form-model-item ref="fieldA" label="field A" prop="fieldA">
      <a-input v-model="form.fieldA" placeholder="input placeholder" />
    </a-form-model-item>
    <a-form-model-item ref="fieldB" label="field B" prop="fieldB">
      <a-input v-model="form.fieldB" placeholder="input placeholder" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> 确定 </a-button>
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
          fieldA: undefined,
          fieldB: undefined,
        },
        rules: {
          fieldA: [
            {
              validator: this.$Srules.regEngNumLine,
              trigger: 'blur',
              message:'自定义提示语'
            },
          ],
          fieldB: [
            {
              validator: this.$Srules.regLength,
              trigger: 'blur',
              min:2,
              max:5,
            },
          ],
        },
      }
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

## Methods

|方法名|说明|参数|
|---|---|---|
|regEngNumLine|只包含英文、数字、下划线|-|
|regEngStarNumLine|以英文开头，只包含英文、数字、下划线|-|
|regIsChinese|只能输入中文|-|
|regIsEnglish|只能输入英文|-|
|regIsNumber|只能输入正整数|-|
|regLength|校验字符长度,默认0-50|-|
|regSpecialCharacter|不能包含特殊字符|-|


