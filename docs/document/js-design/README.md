<!--
 * @Description: 
-->
## 简介

### 什么是设计模式
::: tip
- 假设有一个空房间，我们要日复一日地往里面放一些东西。最简单的办法当然是把这些东西 直接扔进去，但是时间久了，就会发现很难从这个房子里找到自己想要的东西，要调整某几样东西的位置也不容易。所以在房间里做一些柜子也许是个更好的选择，虽然柜子会增加我们的成本，但它可以在维护阶段为我们带来好处。使用这些柜子存放东西的规则，或许就是一种模式。【javaScript设计模式与开发实践】

- 学习设计模式，有助于写出可复用和可维护性高的程序
- 设计模式的原则是“找出程序中变化的地方，并将变化封装起来”，它的关键是意图，而不是结构。
- 不过要注意，使用不当的话，可能会事倍功半。
:::

### 设计原则

#### 单一职责原则（SRP）
  一个对象或方法只做一件事情。如果一个方法承担了过多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。 
应该把对象或方法划分成较小的粒度

#### 最少知识原则（LKP)
  一个软件实体应当尽可能少地与其他实体发生相互作用
应当尽量减少对象之间的交互。如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的 相互联系，可以转交给第三方进行处理

#### 开放-封闭原则（OCP)
  软件实体（类、模块、函数）等应该是可以扩展的，但是不可修改
当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，尽量避免改动程序的源代码，防止影响原系统的稳定

### 工厂模式
  ::: tip 
  - 工厂模式是用来创建对象的一种最常用的设计模式。所谓工厂模式就是将创建对象的过程单独封装。

  工厂模式根据抽象程度的不同可以分为:

  - 简单工厂模式（Simple Factory）
  - 工厂方法模式（Factory Method）
  - 抽象工厂模式（Abstract Factory）
  :::

#### 简单工厂模式
  简单工厂模式也叫静态工厂模式，用一个工厂对象创建同一类对象类的实例。
  ```js
  class User {
    constructor(opt) {
      this.name = opt.name;
      this.viewPage = opt.viewPage;
    }
    static getInstance(role) {
      switch (role) {
        case 'superAdmin':
          return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] });
          break;
        case 'admin':
          return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] });
          break;
        case 'user':
          return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] });
          break;
        default:
          throw new Error('参数错误, 可选参数:superAdmin、admin、user')
      }
    }
  }

  console.log(User.getInstance('superAdmin'))
  console.log(User.getInstance('admin'))
  console.log(User.getInstance('user'))
 ```
 ::: tip
  - 以简单工厂模式只能作用于创建的对象比较少，对象的创建逻辑不复杂时使用。
 :::

 #### 工厂方法模式

  工厂方法模式的本意是将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类。
  ```js
  class User {
    constructor(name = '', viewPage = []) {
      if(new.target === User) { // ES6也没有实现abstract，但是我们可以使用new.target来模拟出抽象类。new.target指向直接被new执行的构造函数，我们对new.target进行判断，如果指向了该类则抛出错误来使得该类成为抽象类。 ts可以直接使用abstract定义抽象类
        throw new Error('抽象类不能实例化!');
      }
      this.name = name;
      this.viewPage = viewPage;
    }
  }
  class UserFactory extends User {
    constructor(name, viewPage) {
      super(name, viewPage)
    }
    create(role) {
      switch (role) {
        case 'superAdmin': 
          return new UserFactory( '超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理']);
          break;
        case 'admin':
          return new UserFactory( '普通用户', ['首页', '通讯录', '发现页']);
          break;
        case 'user':
          return new UserFactory( '普通用户', ['首页', '通讯录', '发现页']);
          break;
        default:
          throw new Error('参数错误, 可选参数:superAdmin、admin、user')
      }
    }
  }
  let userFactory = new UserFactory();
  console.log('superadmin-----',userFactory.create('superAdmin'));
  console.log('admin-----',userFactory.create('admin'));
  console.log('user-----',userFactory.create('user'));

```

#### 抽象工厂模式
通过对类的工厂抽象使其业务用于产品类簇的创建，而不负责创建某一类产品的实例。抽象工厂其实是实现子类继承父类的方法。
抽象工厂模式包含 4 种角色：抽象产品类，具体产品，抽象工厂，具体工厂


 ```js
  // 定义抽象产品类
  class Car {
    drive () {
        throw new Error('不能调用抽象方法，请自己实现');
    }
  }
// 定义具体产品类
  class BenzCar extends Car {
    drive() {
      console.log('Benz drive')
    }
  }

  class AudiCar extends Car {
    drive() {
      console.log('Audi drive')
    }
  }
  // 创建汽车厂商的抽象工厂（抽象类）
 class AutomakerFactory {
    createCar () {
      throw new Error('不能调用抽象方法，请自己实现');
    }
  }

// 奔驰具体工厂
class BenzFactory extends AutomakerFactory {
  createCar () {
    return new BenzCar();
  }
}
// 奥迪具体工厂
class AudiFactory extends AutomakerFactory {
  createCar () {
    return new AudiCar();
  }
}

let benz = new BenzFactory()
let benzCar = benz.createCar()

let audi = new AudiFactory();
let audiCar = audi.createCar();

benzCar.drive();
audiCar.drive()
 ```
 缺点：
 - 添加新产品时，需要编写新的具体产品类,一定程度上增加了系统的复杂度
 - 考虑到系统的可扩展性，需要引入抽象层，在客户端代码中均使用抽象层进行定义，增加了系统的抽象性和理解难度

 ### 单例模式
 顾名思义，单例模式中Class的实例个数最多为1。当需要一个对象去贯穿整个系统执行某些任务时，单例模式就派上了用场。而除此之外的场景尽量避免单例模式的使用，因为单例模式会引入全局状态，而一个健康的系统应该避免引入过多的全局状态。
 ::: tip
 - 如何确定Class只有一个实例?
 - 如何访问Class的唯一实例?
 - Class如何控制实例化的过程?
 - 如何将Class的实例个数限制为1?
 :::
 通过：
 - 1.隐藏构造函数，避免多次实例化。
 - 2.暴露一个getInterface()方法创建/获取唯一实例
 ```js
 // 使用IIFE(立即执行函数)创建局部作用域
 const FooServiceSingleton = (function () {
  // 隐藏的Class的构造函数
  function FooService() {}

  // 未初始化的单例对象
  let fooService;

  return {
    // 创建/获取单例对象的函数 使用闭包保存局部作用域中的单例对象并返回
    getInstance: function () {
      if (!fooService) {
        fooService = new FooService();
      }
      return fooService;
    }
  }
})();

const fooService1 = FooServiceSingleton.getInstance()
const fooService2 = FooServiceSingleton.getInstance()
console.log(fooService1 === fooService2)
 ```
 - 由于单例模式提供的是一种单点访问，所以它有可能导致模块间的强耦合 从而不利于单元测试。无法单独测试一个调用了来自单例的方法的类，而只能把它与那个单例作为一个单元一起测试。


 ### 策略模式
对象有某个行为，但是在不同的场景中，该行为有不同的实现算法。
```js
 // 创建公民对象
const strategies = {
  FirstStrategy() {
    console.log("Called FirstStrategy");
  },
  SecondStrategy() {
    console.log("Called SecondStrategy");
  },
  ThirdStrategy() {
    console.log("Called ThirdStrategy");
  }
}

function execute(strategy) {
  return strategies[strategy]
}

execute('FirstStrategy')
execute('SecondStrategy')
execute('ThirdStrategy')
```
- 表单校验：
```html
<html>
<head>
    <title>策略模式-校验表单</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
</head>
<body>
    <form id = "registerForm" method="post" action="http://xxxx.com/api/register">
        用户名：<input type="text" name="userName">
        密码：<input type="text" name="password">
        手机号码：<input type="text" name="phoneNumber">
        <button type="submit">提交</button>
    </form>
    <script type="text/javascript">
        // 策略对象
        const strategies = {
          isNoEmpty: function (value, errorMsg) {
            if (value === '') {
              return errorMsg;
            }
          },
          isNoSpace: function (value, errorMsg) {
            if (value.trim() === '') {
              return errorMsg;
            }
          },
          minLength: function (value, length, errorMsg) {
            if (value.trim().length < length) {
              return errorMsg;
            }
          },
          maxLength: function (value, length, errorMsg) {
            if (value.length > length) {
              return errorMsg;
            }
          },
          isMobile: function (value, errorMsg) {
            if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
              return errorMsg;
            }                
          }
        }
        
        // 验证类
        class Validator {
          constructor() {
            this.cache = []
          }
          add(dom, rules) {
            for(let i = 0, rule; rule = rules[i++];) {
              let strategyAry = rule.strategy.split(':')
              let errorMsg = rule.errorMsg
              this.cache.push(() => {
                let strategy = strategyAry.shift()
                strategyAry.unshift(dom.value)
                strategyAry.push(errorMsg)
                return strategies[strategy].apply(dom, strategyAry)
              })
            }
          }
          start() {
            for(let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
              let errorMsg = validatorFunc()
              if (errorMsg) {
                return errorMsg
              }
            }
          }
        }

        // 调用代码
        let registerForm = document.getElementById('registerForm')

        let validataFunc = function() {
          let validator = new Validator()
          validator.add(registerForm.userName, [{
            strategy: 'isNoEmpty',
            errorMsg: '用户名不可为空'
          }, {
            strategy: 'isNoSpace',
            errorMsg: '不允许以空白字符命名'
          }, {
            strategy: 'minLength:2',
            errorMsg: '用户名长度不能小于2位'
          }])
          validator.add(registerForm.password, [ {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于6位'
          }])
          validator.add(registerForm.phoneNumber, [{
            strategy: 'isMobile',
            errorMsg: '请输入正确的手机号码格式'
          }])
          return validator.start()
        }

        registerForm.onsubmit = function() {
          let errorMsg = validataFunc()
          if (errorMsg) {
            alert(errorMsg)
            return false
          }
        }
    </script>
</body>
</html>
```

### 迭代器模式
:::tip
 迭代器解决了以下问题:
  - 1.提供一致的遍历各种数据结构的方式，而不用了解数据的内部结构
  - 2.提供遍历容器（集合）的能力而无需改变容器的接口

一个迭代器通常需要实现以下接口：  
  - hasNext()：判断迭代是否结束，返回Boolean
  - next()：查找并返回下一个元素
:::
```js
const item = [1, 'red', false, 3.14];

function Iterator(items) {
  this.items = items;
  this.index = 0;
}

Iterator.prototype = {
  hasNext: function () {
    return this.index < this.items.length;
  },
  next: function () {
    return this.items[this.index++];
  }
}

const iterator = new Iterator(item);

while(iterator.hasNext()){
  console.log(iterator.next());
}

```

### 观察者模式
 观察者模式又称发布订阅模式（Publish/Subscribe Pattern），是我们经常接触到的设计模式，日常生活中的应用也比比皆是，比如你订阅了某个up的频道，当有内容更新时会收到推送；又比如JavaScript中的事件订阅响应机制。观察者模式的思想用一句话描述就是：__被观察对象（subject）维护一组观察者（observer），当被观察对象状态改变时，通过调用观察者的某个方法将这些变化通知到观察者__。
```js
// 被观察者
function Subject() {
  this.observers = [];
}

Subject.prototype = {
  // 订阅
  subscribe: function (observer) {
    this.observers.push(observer);
  },
  // 取消订阅
  unsubscribe: function (observerToRemove) {
    this.observers = this.observers.filter(observer => {
      return observer !== observerToRemove;
    })
  },
  // 事件触发
  fire: function () {
    this.observers.forEach(observer => {
      observer.call();
    });
  }
}
const subject = new Subject();
function observer1() {
  console.log('Observer 1 Firing!');
}

function observer2() {
  console.log('Observer 2 Firing!');
}

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.fire();

// subject.unsubscribe(observer2);
// subject.fire()
```

### 外观模式
外观模式是最常见的设计模式之一，__它为子系统中的一组接口提供一个统一的高层接口，使子系统更容易使用。简而言之外观设计模式就是把多个子系统中复杂逻辑进行抽象，从而提供一个更统一、更简洁、更易用的API__。很多我们常用的框架和库基本都遵循了外观设计模式，比如JQuery就把复杂的原生DOM操作进行了抽象和封装，并消除了浏览器之间的兼容问题，从而提供了一个更高级更易用的版本。其实在平时工作中我们也会经常用到外观模式进行开发，只是我们不自知而已。
比如，我们可以应用外观模式封装一个统一的DOM元素事件绑定/取消方法，用于兼容不同版本的浏览器和更方便的调用：
```js
// 绑定事件
function addEvent(element, event, handler) {
  if (element.addEventListener) {
    element.addEventListener(event, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, handler);
  } else {
    element['on' + event] = fn;
  }
}

// 取消绑定
function removeEvent(element, event, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(event, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + event, handler);
  } else {
    element['on' + event] = null;
  }
}
```

### 代理模式
首先，一切皆可代理，不管是在实现世界还是计算机世界。现实世界中买房有中介、打官司有律师、投资有经纪人，他们都是代理，由他们帮你处理由于你缺少时间或者专业技能而无法完成的事务。类比到计算机领域，代理也是一样的作用，当访问一个对象本身的代价太高（比如太占内存、初始化时间太长等）或者需要增加额外的逻辑又不修改对象本身时便可以使用代理。ES6中也增加了 __Proxy__ 的功能。

代理模式可以解决以下的问题： 
- 1.增加对一个对象的访问控制
- 2.当访问一个对象的过程中需要增加额外的逻辑

要实现代理模式需要三部分：
- Real Subject：真实对象
- Proxy：代理对象
- Subject接口：Real Subject 和 Proxy都需要实现的接口，这样Proxy才能被当成Real Subject的“替身”使用

```js
// 股票价格的查询接口 （真实对象）
function StockPriceAPI() {
  // Subject Interface实现
  this.getValue = function (stock, callback) {
    console.log('Calling external API ... ');
    setTimeout(() => {
      switch (stock) {
        case 'GOOGL':
          callback('¥1265.23');
          break;
        case 'AAPL':
          callback('¥287.05');
          break;
        case 'MSFT':
          callback('¥173.70');
          break;
        default:
          callback('');
      }
    }, 2000);
  }
}
//我们不希望每次都去请求远程接口，而是增加缓存机制，当有缓存的时候就直接从缓存中获取，否则再去请求远程接口。我们可以通过一个proxy来实现：
// 代理对象
function StockPriceAPIProxy() {
  // 缓存对象
  this.cache = {};
  // 真实API对象
  this.realAPI = new StockPriceAPI();
  // Subject Interface实现 （subject接口）
  this.getValue = function (stock, callback) {
    const cachedPrice = this.cache[stock];
    if (cachedPrice) {
      console.log('Got price from cache');
      callback(cachedPrice);
    } else {
      this.realAPI.getValue(stock, (price) => {
        this.cache[stock] = price;
        callback(price);
      });
    }
  }
}

const api = new StockPriceAPIProxy();
api.getValue('GOOGL', (price) => { console.log(price) });
api.getValue('AAPL', (price) => { console.log(price) });
api.getValue('MSFT', (price) => { console.log(price) });

setTimeout(() => {
  api.getValue('GOOGL', (price) => { console.log(price) });
  api.getValue('AAPL', (price) => { console.log(price) });
  api.getValue('MSFT', (price) => { console.log(price) });
}, 3000)
```