## 简介
::: tip
-  promise是一个对象，用来解决解决异步编程，提供统一的API，解决各种异步操作, 从Promise中可以获得异步操作的消息。
-  promise的特点：
      1. 对象状态不受外界影响。Promise对象有三种状态：pending、fulfilled、rejected。只有异步操作的结果可以决定Promise的状态。
      2. 一旦状态改变，就不会再变。Promise对象拥只有两种状态改变：pending ->fulfilled、pending ->rejected。
      3. 一旦新建Promise就会立即执行，无法中断。如果不设置回调函数，Promise内部抛出的错误无法反应到外部。
::: 
## 基本用法
-  Es6规定了Promise对象是一个用来生成`Promise实例`的构造函数。
-  Promise构造函数接受一个函数作为参数，该函数接收`resolve`和`reject`两个参数。
    1. resolve函数将Promise对象的状态从pending变为resolved（即fulfilled），异步操作执行成功，传递结果。
    2. reject函数将Promise对象的状态从pending变为rejected，意味着异步操作失败，并报出错误。
-  Promise实例生成后，可以用`then()`方法指定resolved和rejected状态的回调函数。
    1. then()方法接收两个回调函数作为参数，第一个参数当Promise对象的状态为resolved时调用，第二个参数当Promise对象的状态为rejected时调用。这两个函数都是可选的，不一定要提供。它们都接受Promise对象传出的值作为参数。
    ```js
    const promise = new Promise(function(resolve, reject) {
      if('异步操作成功') {
        resolve(value)
      }else {
        reject(error)
      }
    });
                                
    promise.then(function(value) {
      //success
    }, function(error) {
      //failure
    });


    //示例1
    function timeout(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
      })
    }

    timeout(1000).then((value) => {
      console.log(value);
    });
    // done

    //示例2
    let promise = new Promise(function(resolve, reject) {
      console.log('Promise');
      resolve();
    });

    promise.then(function() {
      console.log('resolved.');
    });

    console.log('Hi!');

    // Promise
    // Hi!
    // resolved
-  调用resolve或者reject并不会终结Promise的参数函数执行。立即resolved的Promise是在`本轮事件循环末尾执行`，总是晚于本轮循环的同步任务
      ```js
      new Promise((resolve, reject) => {
        resolve(1);
        console.log(2);
      }).then(r => {
        console.log(r);
      });
      // 2
      // 1


      new Promise((resolve, reject) => {
        return resolve(1);
        // 后面的语句不会执行
        console.log(2);
      })


## Promise.prototype.then()
-  then方法实际上是定义在原型对象Promise.prototype上的，为Promise实例添加状态改变时的回调函数。
-  因为then方法返回一个新的Promise实例，所以可以采用`then().then()`的链式写法。
    ```js
    return new Promise((resolve, reject) => {
        return resolve(message)
      })
    }

    thenPromise('hihihi').then((value) => {
      return `${value}, giao!`
    }).then((data) => {
      console.log(data)
    })
    //hihihi, giao!


## Promise.prototype.catch()
-  Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
-  当Promise对象的状态变为rejected时，就会调用catch()方法指定的回调函数。reject()方法等同于抛出错误。
-  如果then()方法指定的回调函数在运行中抛出错误，也会被catch方法捕获。
-  如果Promise对象的状态已经变成了resolved，再抛出错误是无效的。
    ```js
    function thenPromise(message) {
        return new Promise((resolve, reject) => {
          // return resolve(message)
          return reject('错了错了' )
        })
      }

      thenPromise().then((value) => {
        console.log('right')
      }).catch(error => {
        console.log(error)
      })
    //错了错了


    const promise = new Promise(function(resolve, reject) {
      resolve('ok');
      throw new Error('test');
    });
    promise
      .then(function(value) { console.log(value) })
      .catch(function(error) { console.log(error) });
    // ok

-  Promise抛出的异常具有冒泡性质，即在then的链式调用里，不管哪一个promise对象抛出异常，都会被catch捕获。
    ```js
    function thenPromise(message) {
        return new Promise((resolve, reject) => {
          console.log(message)
          return resolve(message)
          // throw new Error('test');
        })
      }

    thenPromise('hihihi').then((value) => {
        return `${value}, giao!`
      }).then((data) => {
        throw new Error(`noNO!${data}`);
        console.log('value')
      }).catch(error => {
        console.log(error)
      })

    //hihihi
    // Error: noNO!hihihi, giao!
-  如果没被调用catch()方法处理错误的话，Promise对象抛出的异常是不会传递到代码外层的。也就是Promise内部执行错误，不会影响外部的代码执行。
-  catch方法返回的是一个Promise对象，因此后面也可以接着调用then方法
    ```js
    const someAsyncThing = function() {
      return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
      });
    };

    someAsyncThing().catch(function(error) {
      console.log('oh no', error);
    }).then(function() {
      console.log('carry on');
    });

    setTimeout(() => { console.log(123) }, 2000);
    // oh no [ReferenceError: x is not defined]
    // carry on
    //123


## Promise.prototype.finally() 
-  finally()方法用于指定不管Promise对象的最后状态如何，都会被执行的回调函数。
-  finally()方法不接受任何参数，finally里的操作不依赖于Promise的执行结果。
    ```js
    const p2 = new Promise((resolve, reject) => {
		    setTimeout(reject, 1000, 'p2');
		  })
			.catch(e => {
				console.log(e)
			})
			.finally(() => {
		  	console.log('work hard work fun')
		  })

    // p2
    // work hard work fun

## Promise.all()
-  Promise.all()方法将多个Promise实例包装成一个新的Promise实例。
-  Promise.all()的参数必须具有Iterator接口。
-  当Promise中任何一个实例的状态变为rejected，那么第一个被reject的实例的返回值就会传递给Promise.all()的回调函数。
      ```js
      const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
        return 	`Id is ${id}`;
      });

      Promise.all(promises).then((data) => {
        // ...
        console.log(data)
      }).catch(function(reason){
        // ...
      });

      //['Id is 2', 'Id is 3', 'Id is 5', 'Id is 7', 'Id is 11', 'Id is 13']


      const p1 = new Promise((resolve, reject) => {
        resolve('hello');
      })
      .then(result => result)
      .catch(e => e);

      const p2 = new Promise((resolve, reject) => {
        throw new Error('报错了');
      })
      .then(result => result)
      .catch(e => e);

      Promise.all([p1, p2])
      .then(result => console.log(result))
      .catch(e => console.log(e));
      // ["hello", Error: 报错了]

      //Error: 报错了

## Promise.race()
-  Promise.race()将多个Promise实例包装成一个新的Promise实例
-  Promise.race()接收的多个实例中，只要有一个实例的状态率先改变，则改变状态的实例的返回值就会传递给Promise.race()。
    ```js
    const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
              return 	`Id is ${id}`;
        });

        Promise.race(promises).then((data) => {
          // ...
          console.log(data)
        }).catch(function(reason){
          console.log(reason)
        });

    //Id is 2


## Promise.allSettled()
-  Promise.allSettled()方法，用来确定一组异步操作是否都结束了（不管成功或失败）。
-  接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），返回的 Promise 对象才会发生状态变更。
-  Promise.allSettled()的回调方法接收到的参数是一个数组，每一个成员都是一个固定格式的对象，对应异步操作的结果。
    ```js
    const p1 = new Promise((resolve, reject) => {
            setTimeout(resolve, 100, 'p1');
          })

        const p2 = new Promise((resolve, reject) => {
            setTimeout(reject, 1000, 'p2');
          })

        Promise.allSettled([p1, p2])
        .then(result => console.log(result))
        .catch(e => console.log(e));

    1s后
    // 0: {status: 'fulfilled', value: 'p1'}
    // 1: {status: 'rejected', reason: 'p2'}

## Promise.any()
- ES2021 引入了Promise.any()方法。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
    ```js
    const p1 = new Promise((resolve, reject) => {
            setTimeout(resolve, 1000, 'p1');
          })

        const p2 = new Promise((resolve, reject) => {
            setTimeout(reject, 1000, 'p2');
          })

        Promise.any([p1, p2])
        .then(result => console.log(result))
        .catch(e => console.log(e));

        //p1
- 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

- Promise.any()跟Promise.race()方法很像，只有一点不同，就是Promise.any()不会因为某个 Promise 变成rejected状态而结束，必须等到所有参数 Promise 变成rejected状态才会结束。