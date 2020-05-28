# React-Native

### 设置路径别名支持IDE跳转联想

- yarn add -D babel-plugin-root-import
- babel.config.js 添加 plugins

```
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathPrefix: '~',
            rootPathSuffix: 'src',
          },
        ],
      },
    ],
  ],
};
```

- 在项目根目录下添加jsconfig.json

```
{
  "compilerOptions": {
    "jsx": "react-native",
    "allowSyntheticDefaultImports": false,
    "experimentalDecorators": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- 在项目中愉快的使用

```
import env from '~/constants/env';
```

### 配置多环境

##### iOS

新增Configurations
![-w750](http://cdn.seebug.xyz/mweb/1590654275908815906546410158.jpg)

在对应的环境下新增APP_ENV宏
![-w750](http://cdn.seebug.xyz/mweb/1590654370408215906546410175.jpg)

桥接常量给RN端使用
![-w750](http://cdn.seebug.xyz/mweb/1590654423262615906546410187.jpg)

切换环境
当然也可以使用命令
`react-native run-ios --configuration "Staging"`
如果遇到library not found for -lBase64错误
重新 pod install
![-w750](http://cdn.seebug.xyz/mweb/1590657347072015906573669423.jpg)

##### Android

build.gradle 新增 releaseStaging 命名有要求哦 具体看[react.gradle](https://github.com/facebook/react-native/blob/e083f9a139b3f8c5552528f8f8018529ef3193b9/react.gradle#L79)
新增 matchingFallbacks = ['release'] 使第三方的library使用和release环境不需要依次去内部加releaseStaging
![-w680](http://cdn.seebug.xyz/mweb/1590658961161615906611756049.jpg)

桥接常量给RN端使用
![-w663](http://cdn.seebug.xyz/mweb/1590659179700115906611756064.jpg)

切换环境
![-w680](http://cdn.seebug.xyz/mweb/1590659222056815906611756077.jpg)

#### JS

导出常量
![-w715](http://cdn.seebug.xyz/mweb/1590659274663515906611756089.jpg)

切换到 Staging 看看
![Debug](http://cdn.seebug.xyz/mweb/Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202020-05-28%20at%2018.18.3515906611756107.png?imageView2/2/w/375)
