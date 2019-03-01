# 【VueJS】Vue-I18nによる多言語対応

# はじめに
Webサイトを作成するときには、Webサイトで日本語だけでなく外国語、英語とか、ベトナム語などもサポートできるようになりたい。  
Vuejsでどうやってやるの？  
「Vue-I18n」というVuejsのi18nプラグインを使って行く。  
Vue-I18nのGithub: [oembed https://github.com/kazupon/vue-i18n]

# インストール
NPMというNode.jsのモジュールを管理するツールによって、プロジェクトのパッケージにvue-i18nを追加する。
```
npm install vue-i18n
```
# 使い方
main.jsと同じレベルにlangという名前のディレクトリを作成します。
```
project-name
│
└───src
    │   main.js
    │   App.vue
    └───lang
    │   │   index.js
    │   └───locales
    │          │   en.json
    │          │   ja.json
```
langディレクトリでは、localesという名前の子ディレクトリが、欲しいさまざま言語を表すjsonファイルを含む場所である。

英語を表すため、en.jsonを作成する。
```
{
    "message": {
        "title": "Hello World"
    }
}
```

日本語を表すため、ja.jsonを作成する。
```
{
    "message": {
        "title": "今日は世界"
    }
}
```

langのindex.jsにはjsonファイルからデータを取り出し、VueI18nクラスのインスタンスを作成する。  
デフォルトのロケールとフォールバックのロケールを設定できる。
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
    locale: 'ja',
    fallbackLocale: 'en',
    messages
})

export default i18n
```

langのindex.js からちょっと前に作成したVueI18nのインスタンスをインポートし、Vueクラスのインスタンスを初期化するときにパラメータとして使用する。  
main.js
```
import Vue from 'vue'
import App from './App.vue'
import i18n from './lang'

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
```

App.vue
```
<template>
  <div id="app">
    <h1>{{ $t("message.title") }}</h1>
    <select v-model="$i18n.locale">
        <option value="en">English</option>
        <option value="ja">日本語</option>
    </select>
  </div>
</template>
```

# まとめ


# デモ
- ライブ: [oembed https://flag.surge.sh]
![flag game screenshot](/knowledge/open.file/download?fileNo=1102)

- Github: [oembed https://github.com/SIlevanlinh/sint-knowledge-vue]

# 参考
- Vue-I18n https://kazupon.github.io/vue-i18n/
- Vuejs https://vuejs.org
