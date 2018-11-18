# 目的
どうやって「VueJS」というフレームワークで早くて簡単でウェブのアプリケーションを作成が理解できるため。

# 目標
国の旗を推測のため小さいゲームのウェブアプリケーションを作成する。

# 前提条件
- HTML、CSS
- JavaScript
- Vue、Vuexの基本知識

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

### ルーター
インストールするには、これを行う！
```nodejs
npm install vue-router
```

「router.js」に、
```vuejs
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
```

### Vuex

インストールするには、
```nodejs
npm install vuex
```

「store」というフォルダと以下のファイルを作成します。
```
store
│   index.js
│   getters.js
│   actions.js
│   mutations.js
```

「getters.js」に、
```
const getters = {}

export default getters
```
「actions.js」に、
```
const actions = {}

export default actions
```
「mutations.js」に、
```
const mutations = {}

export default mutations
```
「index.js」に、
```
import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {}

const store = {
    state,
    getters,
    mutations,
    actions
}

export default new Vuex.Store(store)
```
### UI
「Bootstrap-Vue」って使ってUIを作ります。
```
npm install bootstrap-vue
```

### 国際化
国際化のために、「Vue-i18n」って使います。
```
npm install vue-i18n
```
以下のフォルダとファイルを作成します。
```
lang
│   index.js
└───locales
    │   ja.json
    │   en.json
```

「ja.json」に、
```
{
    "message": {
        "company": "システムインテグレータ",
        "next": "次"
    }
}
```

「en.json」に、
```
{
    "message": {
        "company": "System Integrator",
        "next": "next"
    }
}
```

「index.js」に、
```
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './locales/en.json'
import ja from './locales/ja.json'

Vue.use(VueI18n)

const messages = {
    en,
    ja
}

const i18n = new VueI18n({
    locale: 'ja', // set locale
    fallbackLocale: 'en',
    messages, // set locale messages
})

export default i18n
```

### main.js
「main.js」に、
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import i18n from './lang'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
```

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