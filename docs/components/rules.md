# Rules 表单正则校验

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
      <a-input v-model="form.fieldA" placeholder="请输入英文、数字、下划线" />
    </a-form-model-item>
    <a-form-model-item ref="fieldB" label="field B" prop="fieldB">
      <a-input v-model="form.fieldB" placeholder="请输入中文" />
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
              validator: this.$rules.regEngNumLine,
              trigger: 'blur',
            },
          ],
          fieldB: [
            {
              validator: this.$rules.regIsChinese,
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
## 输入框长度校验
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
    <a-form-model-item  label="名称" prop="name">
      <a-input v-model="form.name" placeholder="长度不超过50个字符" />
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
          name: undefined,
        },
        rules: {
          name: [
            {
              validator: this.$rules.regTextLength,
              trigger: ['blur', 'change'] ,
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
## 备注长度校验
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
    <a-form-model-item  label="备注" prop="desc">
      <a-textarea v-model="form.desc" placeholder="长度不超过200个字符" />
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
          desc: undefined,
        },
        rules: {
          desc: [
            {
              validator: this.$rules.regDesc,
              trigger: ['blur', 'change'] ,
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
## 输入框多重校验
必传，以英文开头，只包含英文、数字、下划线，长度不超过50个字符
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
    <a-form-model-item  label="名称" prop="name">
      <a-input v-model="form.name" placeholder="请输入名称" />
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
          name: undefined,
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            {
              validator: this.$rules.regEngStartNumLine,
              trigger: 'blur',
            },
            {
              validator: this.$rules.regTextLength,
              trigger: ['blur', 'change'] ,
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
    <a-form-model-item  label="field A" prop="fieldA">
      <a-input v-model="form.fieldA" placeholder="不能包含特殊字符" />
    </a-form-model-item>
    <a-form-model-item  label="field B" prop="fieldB">
      <a-input v-model="form.fieldB" placeholder="长度在2～5个字符" />
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
              validator: this.$rules.regSpecialCharacter,
              trigger: 'blur',
              message:'自定义提示语'
            },
          ],
          fieldB: [
            {
              validator: this.$rules.regLength,
              trigger:  ['blur', 'change'] ,
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
|regTextLength|校验普通输入框长度（不超过50）|-|
|regDesc|校验备注长度（不超过200）|-|
|regLength|校验字符长度,默认不校验,可配置最小值（min）、最大值（max）|-|
|regEngNumLine|只包含英文、数字、下划线|-|
|regEngStartNumLine|以英文开头，只包含英文、数字、下划线|-|
|regIsChinese|只能输入中文|-|
|regIsEnglish|只能输入英文|-|
|regIsPositiveInteger|只能输入正整数|-|
|regIsNumber|只能输入数字,允许负数、小数|-|
|regNonZeroDigit|非零开头的正整数|-|
|regSpecialCharacter|不能包含特殊字符|-|
|regEngNumSpecial|只支持输入英文、数字、_、-、/|-|
|regChineseEngStartNumline|只支持输入汉字、英文、数字、下划线，且只能以英文和汉字开头|-|
|regIsPhoneNumber|校验是否是手机号码|-|


