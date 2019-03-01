# 【VueJS】AxiosによるAPI通信共通化

# 目的
AxiosというライブラリVueのアプリケーションに統合の方法を理解してもらう。

# Axiosについて
フロントエンドでは非同期処理に関する作業を行う場合はよく使われる純粋なJavascriptの「Fetch」という関数を使用する。しかし、Axiosという素晴らしいサードパーティのライブラリがあり、私たちがその作業をはるかに簡単にするのに役立つ。

## Axiosとは？
Axiosは、HTTP通信を簡単に行うことができるJavascriptライブラリである。フロントエンドばかりでなく、Node.JS でも利用できる。
<span style="color:red">「フロントエンドばかりでなく、Node.JS でも利用できる。」はどういう意味か </span>

## Axiosの特徴
- XML HttpRequestを簡単に生成できる
- Promiseベースである。Mozillaによると、Promiseオブジェクトは非同期処理の最終的な完了処理（もしくは失敗）およびその結果の値を表現する。
- カスタムヘッダーやBasic認証など、いろいろなオプションが手軽にできる。
- 内蔵XSRF保護

AxiosのGithub: [oembed https://github.com/axios/axios]

# Axiosの使い方
例として、APIにアクセスしてユーザとアルバム情報を取得するコードを記載します。

Url（ダミーです）： https://some-domain.com/api/  
リソース： users, albums

## インストール
```
npm install axios
```

## Axiosの基本的な使い方
```
import axios from 'axios'

// Axiosのインスタンスを作成する
const myAxios = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})

// リクエストの実行する
myAxios.get('/users?id=12345')
    .then(response => { // 成功時にデータを処理する })
    .catch(error => { // ハンドルエラー })
    .then(_ => { // 常に実行される })

myAxios.get('/albums?id=12345')
    .then(response => { // 成功時にデータを処理する })
    .catch(error => { // ハンドルエラー })
    .then(_ => { // 常に実行される })
```

## Axiosの基本的な使い方の問題
基本的な使い方でプログラムする場合、リソース（users, albums）ごとにハンドルを書く必要がある。アプリケーションが小さい場合は、それは大きな問題ではないが、プロジェクトが少し大きくなると、各APIポートでより多くのロジックを書くことになるので、コードが長くて、メンテナンスが難しくなる。

この問題を解決するため、解決を探して以下のように書いた。

## 問題解決
- 上記の問題を解決するため、APIというクラスを作成して、柔軟にHTTP通信の管理を支援する。

```
class API {
    constructor (axios) {
        this.axios = axios
        this.endpoints = {}
    }

    /**
    * 単一のエンティティのエンドポイントを作成して保存する。
    * @param {エンティティオブジェクト} entity
    */
    createEntity (entity) {
        this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
    }

    /**
    * CRUD操作の基本エンドポイントハンドラを作成する。
    * @param {エンティティオブジェクト} entity
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

- APIクラスの使い方

```
import axios from 'axios'

// Axiosのインスタンスを作成する
const myAxios = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})

// APIのインスタンスとリソースのエンドポイントを作成する
const myApi = new API(myAxios)
const users = myApi.createEntity({ name: 'users' })
const albums = myApi.createEntity({ name: 'albums' })

// リクエストの実行する
users.getAll({ id=12345 })
    .then(response => { // 成功時にデータを処理する })
    .catch(error => { // ハンドルエラー })
    .then(_ => { // 常に実行される })

albums.get({ id=12345 })
    .then(response => { // 成功時にデータを処理する })
    .catch(error => { // ハンドルエラー })
    .then(_ => { // 常に実行される })
```


## Vueのアプリケーションに統合する
<span style="color:red">Block ở trên và dưới không liên kết với nhau.
thêm vài dòng vào dẫn người đọc để họ hiểu là mình đang làm gì.
</span>

### Vueの中にあるAxiosの表
![Vueの中にあるAxiosの表](/knowledge/open.file/download?fileNo=1156)
### 統合プロセス
Vueのアプリケーションをモジュールに分ける。各モジュールはアプリケーションの機能を担当する。
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

- APIクラスを「api/API.js」に置く。

```
class API {
    // コード
}

export default API
```

- 「api/apis.js」にAPIクラスのインスタンスを作成する。

```
import axios from 'axios'

const myAxios = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})

export myApi = new API(myAxios)
```

- 「modules/moduleB/_api/index.js」に、リソースを作成する。

```
import { myApi } from '@/api/apis'

const userResource = 'users'
const albumResource = 'albums'
myApi.createEntity({ name: userResource })
myApi.createEntity({ name: albumResource })

export const users = myApi.endpoints[userResource]
export const albums = myApi.endpoints[albumResource]
```

- 「modules/moduleB/_store/action.js」に、上記のリソースを使用してvueのアクションを作成できる。

```
import { users, albums } from '../_api/index'

const getUsers = async context => {
    try {
        userData = await users.getAll()
        // ミューテーションをコミットする
    } catch (err) { 
        // ハンドルエラー
    }
}

const getAlbums = async context => {
    try {
        albumData = await albums.getAll()
        // ミューテーションをコミットする
    } catch (err) { 
        // ハンドルエラー
    }
}

const actions = {
    getUsers,
    getAlbums
}

export default actions
```

# まとめ
<span style="color:red"> suy nghĩ thêm chút cho cái kết thúc bài.</span>

- これから、Axiosによって、APIリクエストの管理を支援するAPIというクラスを作成の方法を理解してもらう。
- プロジェクトが大きくなり、より多くのAPIポートを使用する必要がある場合は、「api/apis.js」に新しいAPIクラスのインスタンスを作成しよう。

# デモ
全世界の国々の国旗を当てるクイズウェブアプリケーションを作成した。アプリケーションには上記のAxiosによるAPIクラスを使って、[REST Countries](https://restcountries.eu)というAPIにアクセスし世の中の国と地域の情報を取得している。

- ライブ: [oembed https://flag.surge.sh]
![flag game screenshot](/knowledge/open.file/download?fileNo=1102)

- Github: [oembed https://github.com/SIlevanlinh/sint-knowledge-vue]

# 参考
- Axios https://github.com/axios/axios
- Vuejs https://vuejs.org
- Vuex https://vuex.vuejs.org
