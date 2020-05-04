## git 基本操作

    git init初始化
    git add .
    git commit -m '解释'
    git push origin master推送远端
    git config --global credential.helper store (记住用户和密码)
    git pull origin master如果远程代码有修改, 要拉取到本地仓库
    git clone url 克隆
    git checkout -b dev创建本地分支
    git push origin origin dev 并推送到远程
    git pull  (如果分支是在clone后创建的才需要执行)
    git checkout -b dev origin/dev拉取远程新分支到本地
    git checkout master将dev分支合并到master
    git merge dev

## 路由跳转与传参

1. 跳转路由的 2 种基本方式
   声明式: <router-link to="" replace>
   编程式: this.\$router.push()/replace()
2. 跳转路由携带参数的类型
   params 参数
   query 参数
3. 携带参数的 2 种方式
   字符串方式: 将参数手动拼接到 path 中
   `/search/${this.keyword}?keyword2=${this.keyword.toUpperCase()}`
   对象方式: (在开发中用得比较多)
   this.\$router.push({
   name: 'search',
   params: { keyword: this.keyword },
   query: { keyword2: this.keyword.toUpperCase() }
   })
   注意:
   一旦指定带:号的路径, 必须指定 name 属性来标识当前路由
   params 只能与 name 组合使用
   query 可以与 name 或者 path 组合使用

## 面试问题

1.  指定 params 参数时可不可以用 path 和 params 配置的组合?
    不可以用 path 和 params 配置的组合, 只能用 name 和 params 配置的组合
    query 配置可以与 path 或 name 进行组合使用
2.  如何指定 params 参数可传可不传?  
    path: '/search/:keyword?'
3.  如果指定 name 与 params 配置, 但 params 中数据是一个""空, 无法跳转
    解决 1: 不指定 params
    解决 2: 指定 params 参数值为 undefined
4.  路由组件能不能传递 props 数据?
    可以: 可以将 query 或且 params 参数映射成 props 传递给路由组件对象
    实现: props: route=>({keyword1:route.params.keyword, keyword2: route.query.keyword })
5.  编程式路由跳转到当前路由(参数不变), 会抛出 NavigationDuplicated 的警告错误
    面试问题: 在做项目时有没有遇到比较难的问题?
    我的问题:我在上一个项目时没有问题, 后面再做一个新的项目时就有了问题
    原因分析:
    如果没有直接指定回调函数, push 方法返回值为 promise
    如果指定的是当前路由路径且参数数据不变化, push 内部就会抛出一个失败的 promise
    解决办法:
    解决 1: 在跳转时指定成功或失败的回调函数, 也可以 catch()处理抛出的错误 promise
    解决 2: 修正 Vue 原型上的 push 和 replace 方法
