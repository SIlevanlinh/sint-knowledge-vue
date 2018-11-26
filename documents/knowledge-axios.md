# 【VueJS】AxiosというプロミスベースのHTTPのライブラリをVueのアプリケーションに統合する。

# 目的
AxiosというライブラリVueのアプリケーションに統合の方法を理解してもらう。

# 目標
APIのサーバーに要求を出して、データを取得するため、Axiosによって、APIクラスを作成する。

# Axiosとは？
https://github.com/axios/axios

# Axiosの使い方
## インストール
```
npm install axios
```

## インスタンスの作成
```
import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
})
```

## リクエストの実行
```
// 指定されたIDを持つユーザーをリクエストする

myAxios.get('/user?ID=12345')
  .then(function (response) {
    // 成功時にデータを処理する
    console.log(response)
  })
  .catch(function (error) {
    // ハンドルエラー
    console.log(error)
  })
  .then(function () {
    // 常に実行される
  })
```

## 問題
アプリケーションが小さく、わずか1または2 APIサーバーからのデータを使用する場合は、上記のAxiosまたは純粋なjavascriptを使用することができる。

しかし、アプリケーションで多数のAPIサーバーのデータを使用し、各APIサーバーには多くのリソースがあるとしたら、何が起こるのか？　管理が非常に複雑にならないんじゃない？

## 問題解決
上記の問題を解決するため、APIというクラスを作成して、APIリクエストの管理を支援しす。
```
class API {
    constructor (axios) {
        this.axios = axios
        this.endpoints = {}
    }

    createEntity (entity) {

    }
}
```
APIクラスの各インスタンスは、特定のAPIサーバー用だ。  
たとえば、アプリケーションは異なるAPIを使用する。  
各APIサーバーには多くのリソースがある。
- Restfulの偽のAPIデータ： https://jsonplaceholder.typicode.com/  
    リソース：
    - posts
    - albums
    - photos
    - todos
    - users

- 世の中の国と地域のデータ：　https://restcountries.eu/rest/v2/  
    リソース：
    - all
    - languages
    - currencies
    - capitals
    - ...

```
const jphPath = 'https://jsonplaceholder.typicode.com/'
const restcountriesPath = 'https://restcountries.eu/rest/v2/'

const jphAxios = axios.create({
  baseURL: jphPath
})
const restcountriesAxios = axios.create({
  baseURL: restcountriesPath
})

const jphApi = new API(jphAxios)
const restcountriesApi = new API(restcountriesAxios)

countries = restcountriesApi.createEntity({ name: 'all' })
countries.getAll()
    .then(function (response) {
        // 成功時にデータを処理する
        console.log(response)
    })
    .catch(function (error) {
        // ハンドルエラー
        console.log(error)
    })
    .then(function () {
        // 常に実行される
    })
```
これから、クラスAPIを実装する。
```
class API {
  constructor (axios) {
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

    endpoints.getAll = (query = {}) => this.axios.get(`${resourceURL}/`, { params: query })

    endpoints.getOne = ({ id }) => this.axios.get(`${resourceURL}/${id}`)

    endpoints.create = (toCreate) => this.axios.post(resourceURL, toCreate)

    endpoints.update = (toUpdate) => this.axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate)

    endpoints.patch = ({id}, toPatch) => this.axios.patch(`${resourceURL}/${id}/`, toPatch)

    endpoints.delete = ({ id }) => this.axios.delete(`${resourceURL}/${id}`)

    return endpoints
  }
}
```

## Vueのアプリケーションに統合する
```
project
│
└───src
    │
    └───api
    │   API.js
    │   apis.js
    │
    └───modules
    │   └───moduleA
    │   │   
    │   └───moduleB
    │       │   index.vue
    │       └───_api
    │       │  │   index.js
    │       │
    │       └───_store
    │          │   index.js
    │          │   getter.js
    │          │   action.js
    │          │   mutation.js
```
APIクラスを「api/API.js」に置く。
```
// api/API.js

class API {
    // コード
}

export default API
```
「api/apis.js」にAPIクラスのインスタンスを作成する。
```
//api/apis.js

import axios from 'axios'
import API from './API'

const jphPath = 'https://jsonplaceholder.typicode.com/'
const restcountriesPath = 'https://restcountries.eu/rest/v2/'

const jphAxios = axios.create({
  baseURL: jphPath
})
const restcountriesAxios = axios.create({
  baseURL: restcountriesPath
})

const jphApi = new API(jphAxios)
const restcountriesApi = new API(restcountriesAxios)

export const jphApi = new API(jphAxios)
export const restcountriesApi = new API(restcountriesAxios)
```
たとえば、アプリケーションにはモジュールが2つある。  
- AのモジュールにはRestfulの偽のAPIデータを使用。
- Bのモジュールには世の中の国と地域のデータを使用。  

「modules/moduleB/_api/index.js」に、リソースを作成する。
```
// modules/moduleB/_api/index.js

import { restcountriesApi } from '@/api/apis'

const countryResource = 'all'
restcountriesApi.createEntity({ name: countryResource })

export const countries = restcountriesApi.endpoints[countryResource]
```
今、上記のリソースを使用してvueのアクションを作成できる。
```
import { countries } from '../_api/index'

const getCountries = async context => {
    try {
        countriesData = await countries.getAll()
        // Mutation commit
    } catch (err) { 
        // ハンドルエラー
    }
}

const actions = {
    getCountries
}

export default actions
```

# 結論
- これから、Axiosによって、APIリクエストの管理を支援するAPIというクラスを作成の方法を理解してもらう。
- プロジェクトが大きくなり、より多くのAPIサーバーを使用する必要がある場合は、「api/apis.js」に新しいAPIクラスのインスタンスを作成しよう。

# デモ
国の旗を推測のため小さいゲームのウェブアプリケーションを作成した。
アプリケーションには上記のAxiosによるAPIクラスを使って、「[oembed https://restcountries.eu/rest/v2/]」というAPIの世の中の国と地域のデータを取得した。
- ライブデモ: [oembed https://flag.surge.sh]
![flag game screenshot](/knowledge/open.file/download?fileNo=1102)
- Github: [oembed https://github.com/SIlevanlinh/sint-knowledge-vue]

# 参考文献
- Vuejs https://vuejs.org/index.html
- Vuex https://vuex.vuejs.org/
- Axios https://github.com/axios/axios
- 世界の国と地域のデータ API https://restcountries.eu/