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
  /**
   * Create and store a single entity's endpoints
   * @param {A entity Object} entity
   */
  createEntity (entity) {
    this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
  }

  createEntities (arrayOfEntity) {
    arrayOfEntity.forEach(this.createEntity.bind(this))
  }
  /**
   * Create the basic endpoints handlers for CRUD operations
   * @param {A entity Object} entity
   */
  createBasicCRUDEndpoints ({name}) {
    var endpoints = {}

    const resourceURL = `${name}`

    endpoints.getAll = (query = {}) => this.axios.get(`${resourceURL}/`, { params: query, requestAt: new Date() })

    endpoints.getOne = ({ id }) => this.axios.get(`${resourceURL}/${id}`)

    endpoints.create = (toCreate) => this.axios.post(resourceURL, toCreate)

    endpoints.update = (toUpdate) => this.axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate)

    endpoints.patch = ({id}, toPatch) => this.axios.patch(`${resourceURL}/${id}/`, toPatch)

    endpoints.multiPatch = (query = {}, toPatch) => this.axios.patch(`${resourceURL}/multi/`, toPatch, { params: query })

    endpoints.delete = ({ id }) => this.axios.delete(`${resourceURL}/${id}`)

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
```
modules
│ 
└───flagGame
    │   index.vue
    │   meta.js
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

![actions in app](/knowledge/open.file/download?fileNo=1102)

動的にモジュールを登録する
```Javascripts
// index.vue

beforeCreate () {
    if (!(STORE_KEY in this.$store._modules.root._children)) {
        this.$store.registerModule(STORE_KEY, store)
    }
}

// STORE_KEY = 'flagGame'
```

モジュールがマウントされると、APIを呼び出すようにアクションをディスパッチします
```
// action.js

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
}
```

以下はすべてのmutationsである
```
// mutation-types.js

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
  COUNTRY_GET_ALL: createAsyncMutation('COUNTRY_GET_ALL'),
  SHUFFLE_COUNTRIES: 'SHUFFLE_COUNTRIES',
  INCREASE_SCORE: 'INCREASE_SCORE',
  INCREASE_CURRENT_COUNTRY: 'INCREASE_CURRENT_COUNTRY',
  CHANGE_LOCALE: 'CHANGE_LOCALE'
}
```

パズルのためのクラスを作成します。
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

モジュールがマウントされているとき、または「次」ってボタンがクリックされたとき、createPuzzleメソッドが呼び出されます
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
    createPuzzle () {},
    checkAnswer (country) {},
    nextPuzzle () {}
}
```

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