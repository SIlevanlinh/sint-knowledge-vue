# 目的
どうやって「VueJS」というフレームワークで早くて簡単でウェブのアプリケーションを作成が理解できるため。

# 目標
国の旗を推測のため小さいゲームのウェブアプリケーションを作成する。

# 前提条件
- HTML、CSS
- JavaScript

# ビジネスの論理
- 世界の中には250の国と地域がある。
- 1つの国の旗が画面にランダムに表示される。
- 4つの選択肢の中から1つ正しいものを選ぶ。
- 正解であれば、１ポイントを獲得する。

![Screen Mockup](/knowledge/open.file/download?fileNo=1103)

# テクニカル
- Vue：JavaScriptのフレームワーク
- Vuex：状態管理
- Vue-i18n：国際化
- Bootstrap-vue：UI ライブラリ

# プロジェクト
## プロジェクトの初期化
```nodejs
npm install -g @vue/cli
vue create sint-knowledge-vue
cd sint-knowledge-vue
npm run serve
```
続きを読む：[oembed https://cli.vuejs.org]

## プロジェクト構造
```
sint-knowledge-vue
│
└───dist
│
└───public
│
│   package.json
│   README.md
│
└───src
    │   App.vue
    │   main.js
    │   router.js
    └───store
    │  │   index.js
    │  │   getters.js
    │  │   actions.js
    │  │   mutations.js
    │  │   mutation-types.js
    │
    └───lang
    │  │   index.js
    │  └───locales
    │     │   ja.json
    │     │   en.json
    │
    └───api
    │   API.js
    │   apis.js
    │
    └───assets
    │  │   logo.png
    │  └───static
    │
    └───components
    │
    └───modules
    │   └───otherModule
    │   │   
    │   └───flagGame
    │       │   index.vue
    │       │   meta.js
    │       │   puzzle.js
    │       │
    │       └───_api
    │       │  │   index.js
    │       │
    │       └───_components
    │       │
    │       └───_store
    │          │   index.js
    │          │   getter.js
    │          │   action.js
    │          │   mutation.js
    │          │   mutation-types.js
    │          │   async-utils.js
    │
    └───views
        │   Home.vue
        │   OtherView.vue

```
続きを読む：[oembed https://medium.com/3yourmind/large-scale-vuex-application-- structures-651e44863e2f]

## 層スタック

![Layer stack](/knowledge/open.file/download?fileNo=1104)

# デモ
- Github: [oembed https://github.com/SIlevanlinh/sint-knowledge-vue]
- ライブデモ: [oembed https://flag.surge.sh]
![flag game screenshot](/knowledge/open.file/download?fileNo=1102)

# 参考文献
- Large-scale Vuex application structures https://medium.com/3yourmind/large-scale-vuex-application-- structures-651e44863e2f
- Countries in the world Restfull API https://restcountries.eu/
- Vuejs https://vuejs.org/index.html
- Vuex https://vuex.vuejs.org/