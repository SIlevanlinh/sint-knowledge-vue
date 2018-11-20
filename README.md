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

```vuejs
// router.js

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


```
// getters.js

const getters = {}

export default getters
```

```
// actions.js

const actions = {}

export default actions
```

```
// mutations.js

const mutations = {}

export default mutations
```

```
// index.js
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
日本語と英語の2つの言語をサポートします。
ページタイトルと「次」ってボタンの内容を翻訳する必要があります。
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

```
// ja.json

{
    "message": {
        "company": "システムインテグレータ",
        "next": "次"
    }
}
```

```
// en.json

{
    "message": {
        "company": "System Integrator",
        "next": "next"
    }
}
```

```
// index.js

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
```
// main.js

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


## API
ゲームを作成するには、世界のすべての国と地域のデータが必要です。

「restcountries.eu」というウェブサイトからのデータを使います。

データ: [oembed https://restcountries.eu/rest/v2/all]

そちらからデータを取得するために、AxiosというJavascriptライブラリを使用します。
```nodejs
npm install axios
```

以下のフォルダとファイルを作成します。
```
api
│   API.js
│   apis.js
```

API というCLASS を作ります。
```
// API.js

class API {
  constructor ({ axios }) {
    this.axios = axios
    this.endpoints = {}
  }

  createEntity (entity) {
    this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
  }

  createBasicCRUDEndpoints ({name}) {
    var endpoints = {}

    const resourceURL = `${name}`

    endpoints.getAll = (query = {}) => this.axios.get(`${resourceURL}/`, { params: query })

    // getOne
    // create
    // update
    // patch
    // delete

    return endpoints
  }
}

export default API
```

「apis.js」ってモジュール内には、APIクラスのインスタンスをたくさん作成することができます。
```
// apis.js

import axios from 'axios'
import API from './API'

const restcountriesPath = 'https://restcountries.eu/rest/v2/'

const restcountriesAxios = axios.create({
  baseURL: restcountriesPath
})

export const restcountriesApi = new API({ axios: restcountriesAxios })
```

## Flag Game
これはアプリケーションの主要部分です。
これを別のモジュールに分割して、特定の機能を持つ特別なコンポーネントとして扱います。
```
modules
│ 
└───flagGame
    │   index.vue
    │   puzzle.js
    │
    └───_api
    │  │   index.js
    │
    └───_components
    │
    └───_store
       │   index.js
       │   getter.js
       │   action.js
       │   mutation.js
       │   mutation-types.js
       │   async-utils.js
```

後は以下のようにこれをViewのHomeに入れられます。
```
// Home.vue

<template>
  <div class="home">
    <FlagGame/>
  </div>
</template>

<script>
import FlagGame from '@/modules/flagGame'

export default {
  name: 'home',
  components: {
    FlagGame
  }
}
</script>
```

これから、残りの部分は、アプリケーションの他の部分に触れることなくこのモジュールを構築することです。

モジュールには「index.vue」というメインファイルがあります。
テンプレートとライフサイクルフックはここに入れています。

モジュールには独自のローカルストア、コンポーネント、APIがありますのでアンダースコアでこれらを示します。
「_store」、「_components」、「_api」のようです。

さっき「https://restcountries.eu/rest/v2/」からデータを取得するためのAPIクラスのインスタンスを作成しました。
今、国と地域のリソースを作成する必要があります。
```Javascripts
// _api/index.js

import { restcountriesApi } from '@/api/apis'

const countryResource = 'all'
restcountriesApi.createEntity({ name: countryResource })

export const countries = restcountriesApi.endpoints[countryResource]
```

次はモジュールのストアーについて
モジュールの状態です。
```
// _store/index.js

const state = {
    score: 0,                       // ゲームの得点
    currentCountry: -1,             // 現在パズルにある国や地域のインデックス
    response: {                     // APIから応答されたデータ
        countryGetAllPending        // APIリクエストの送信中かどうか
        countryGetAllStatusCode     // HTTP レスポンス状態コード
        countryGetAllData           // レスポンスのデータ
    }
}
```

APIからデータを取得するときにに、多くの「mutations」を使用して状態を更新します。
コードの重複や再利用を避けるのために、以下のようなmutation-typesのパターンを使用します。
```
// _store/mutation-types.js

import _ from 'lodash'

const createAsyncMutation = (type) => ({
  BASE: `${type}`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
  PENDING: `${type}_PENDING`,
  UPDATE_REQUEST_AT: `${type}_UPDATE_REQUEST_AT`,
  loadingKey: `${_.camelCase(type)}Pending`,
  statusCode: `${_.camelCase(type)}StatusCode`,
  stateKey: `${_.camelCase(type)}Data`,
  requestAt: `${_.camelCase(type)}RequestAt`
})

export default {
  COUNTRY_GET_ALL: createAsyncMutation('COUNTRY_GET_ALL')
}
```

```
// _store/mutations.js

import Vue from 'vue'
import types from './mutation-types'
import _ from 'lodash'

const mutations = {}

Object.keys(types).forEach(type => {
    mutations[types[type].BASE] = (state, payload) => {
      switch (payload.type) {
        case types[type].PENDING:
          return Vue.set(state.response, types[type].loadingKey, payload.value)
  
        case types[type].SUCCESS:
          Vue.set(state.response, types[type].statusCode, payload.statusCode)
          return Vue.set(state.response, types[type].stateKey, payload.data)
  
        case types[type].FAILURE:
          return Vue.set(state.response, types[type].statusCode, payload.statusCode)
  
        case types[type].UPDATE_REQUEST_AT:
          return Vue.set(state.response, types[type].requestAt, payload.requestAt)
      }
    }
})
```

モジュールがマウントされると、APIを呼び出すようにアクションをディスパッチします。
```
// action.js
import { countries } from '../_api/index'
import asyncUtil from './async-utils'
import types from './mutation-types'

const getCountries = async context => {
    let api = {
      name: countries.getAll,
      params: []
    }
    let mutationTypes = types.COUNTRY_GET_ALL
  
    return asyncUtil.doAsync(context, api, mutationTypes, true)
}
```

リクエスト後に非同期リクエストと状態更新を行うための関数を作成します。
```
// async-utils.js

const doAsync = async (context, api, mutationTypes) => {
  // API コール
  // 状態を更新する
  // 詳細については、チェックしてください。
  // https://github.com/SIlevanlinh/sint-knowledge-vue/blob/master/src/modules/flagGame/_store/async-utils.js
}
```

簡単にgetters を作成できますがコードベースを参照してください。
```
// _store/getters.js
// https://github.com/SIlevanlinh/sint-knowledge-vue/blob/master/src/modules/flagGame/_store/getters.js
```

次は動的にモジュールを登録します。
```Javascripts
// index.vue
const STORE_KEY = 'flagGame'
import store from './_store'

beforeCreate () {
    if (!(STORE_KEY in this.$store._modules.root._children)) {
        this.$store.registerModule(STORE_KEY, store)
    }
}
```

mountedにAPIからデータを取得するアクションをディスパッチします。
```
mounted () {
    this.getCountries()                     // mapActionsの使用
    .then(data => {
        this.shuffleCountries()             // mapmutationsの使用
        this.puzzle = this.createPuzzle()   // パズルを作成します
})
```

パズルのためのクラスを作成します。
パズルには四つのオプションがあります。一つは正解、それ以外は間違っています。
```
// puzzle.js

class Puzzle {
    constructor(answerCountry, fakeCountries) {
        this.answerCountry = answerCountry
        fakeCountries.push(answerCountry)
        this.options = _.shuffle(fakeCountries)
        console.log(this.options)
    }
  
    checkAnswer (country) {
        return country == this.answerCountry
    }
}
```

![actions in app](/knowledge/open.file/download?fileNo=1115)

モジュールがマウントされているとき、または「次」ってボタンがクリックされたとき、
createPuzzleメソッドが呼び出して、パズルインスタンスを作成します。
「次」ってボタンがクリックされたとき、私は「checkAnswer」ってメソッドを呼び出して答えをチェックします。
一度だけ答えて戻れないことに注意してください。
正解であれば1点を得ます。
できるだけ多くの人が答えるようにしてください。

```
// index.vue

methods: {
    ...mapActions({
        getCountries: STORE_KEY + '/getCountries'
    }),
    ...mapMutations({
        increaseCurrentCountry: STORE_KEY + '/' + types.INCREASE_CURRENT_COUNTRY,
        increaseScore: STORE_KEY + '/' + types.INCREASE_SCORE,
        shuffleCountries: STORE_KEY + '/' + types.SHUFFLE_COUNTRIES
    }),
    createPuzzle () {
        this.increaseCurrentCountry()
        this.temp = [...Array(this.countryGetAllData.length).keys()]
        let currentIndex = this.currentCountry
        let answerCountry = this.countryGetAllData[currentIndex]
        this.temp.splice(currentIndex, 1)
        let fakeCountries = []
        for (let i = 0; i < 3; i++) {
            let ranIndex = _.random(0, this.temp.length)
            fakeCountries.push(this.countryGetAllData[ranIndex])
            this.temp.splice(ranIndex, 1)
        }
        return new Puzzle(answerCountry, fakeCountries)
    },
    checkAnswer (country) {
        this.answerDisabled = true
        let isCorrect = this.puzzle.checkAnswer(country)
        if (isCorrect) {
            this.increaseScore()
            this.resultIcon = this.correctIcon
            return
        }
        this.resultIcon = this.incorrectIcon
    },
    nextPuzzle () {
        this.resultIcon = this.earthIcon
        this.puzzle = this.createPuzzle()
        this.answerDisabled = false
    }
}
```
今、flagGameモジュールは終わりです。
コードが長いので、ここですべてをカバーすることができるので、私のgithubを参照してください。

# デモ
- Github: [oembed https://github.com/SIlevanlinh/sint-knowledge-vue]
- ライブデモ: [oembed https://flag.surge.sh]
![flag game screenshot](/knowledge/open.file/download?fileNo=1102)

# 参考文献
- Large-scale Vuex application structures https://medium.com/3yourmind/large-scale-vuex-application-- structures-651e44863e2f
- 世界の国と地域のデータ API https://restcountries.eu/
- Vuejs https://vuejs.org/index.html
- Vuex https://vuex.vuejs.org/
- Bootstrap-Vue https://bootstrap-vue.js.org/
- Vue-I18n https://kazupon.github.io/vue-i18n/
- Axios https://github.com/axios/axios