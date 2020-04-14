module.exports = {
        "parserOptions": {
            "ecmaVersion": 6, 				// 支持es6
            "sourceType": "module"			// 使用es6模块化
        },
        "env": { 							// 设置环境
            "browser": true,   				// 支持浏览器环境： 能够使用window上的全局变量
            "node": true       				// 支持服务器环境:  能够使用node上global的全局变量
        },
        "globals": {						// 声明使用的全局变量, 这样即使没有定义也不会报错了
            "$": "readonly",					// $ 不允许重写变量
            "age": "writable",
            "Promise": "readonly"
        },
        "rules": {  						// eslint检查的规则  0 忽略 1 警告 2 错误
            "no-console": 0, 				// 不检查console
            "eqeqeq": 0,					// 用 == 而不用 === 就报错
            "no-alert": 0, 					// 不能使用alert
            "no-unused-vars": 0
        },
        "extends": "eslint:recommended" 	// 使用eslint推荐的默认规则
    }