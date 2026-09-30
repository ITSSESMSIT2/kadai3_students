# kadai3_students（提出課題③ 児童生徒 検索アプリ）

学校・学年・組・氏名・要フォローの条件で児童生徒を絞り込んで探すアプリ。
APIは使わず、データは `src/data/students.ts` の配列（架空データ40件）を使う。

## 技術スタック

| 種別           | 使用技術                                                        |
| -------------- | --------------------------------------------------------------- |
| フレームワーク | Vue 3（Composition API / `<script setup>`）                     |
| 言語           | TypeScript                                                      |
| ビルド         | Vite                                                            |
| ルーティング   | Vue Router                                                      |
| 静的解析       | ESLint / oxlint / Prettier                                      |
| Node           | 24.20.0（`.node-version` / `.nvmrc` で固定）                    |
| 公開           | GitHub Pages（main へのマージで GitHub Actions が自動デプロイ） |

## セットアップ

```bash
nvm use        # .nvmrc の 24.20.0 に切り替える
yarn install
```

## 開発コマンド

| コマンド          | 内容                           |
| ----------------- | ------------------------------ |
| `yarn dev`        | 開発サーバーを起動する         |
| `yarn build`      | 本番ビルド（型チェック込み）   |
| `yarn preview`    | ビルド結果をローカルで確認する |
| `yarn type-check` | 型チェックのみ                 |
| `yarn lint`       | ESLint + oxlint                |
| `yarn format`     | Prettier で整形する            |

## リポジトリ構成

```
.github/workflows/deploy.yml   main へのpushでビルドしGitHub Pagesへ公開
src/
  api/schoolApi.ts             getSchools() / getGrades(schoolIds) / getClasses(schoolIds, gradeId)
  api/studentApi.ts            getStudents()
  assets/styles/tokens.css     デザイントークン（色・余白・角丸・影）
  assets/main.css              トークンの読み込みと最小限のベーススタイル
  components/AppHeader.vue     共通ヘッダー
  constants/grades.ts          学年の表示名マスタ（GRADES）
  constants/classes.ts         組の表示名マスタ（CLASSES）
  data/schools.ts              学校3件
  data/schoolGrades.ts         学校に設置されている学年（15件）
  data/schoolGradeClasses.ts   学校の学年ごとのクラス編成（35件）
  data/students.ts             児童生徒40件（架空データ）
  router/index.ts              ルーティング
  types/                       common.ts / school.ts / student.ts
  views/HomeView.vue           トップページ
```

データの取得は `src/api/` の関数を通す。画面から `src/data/` を直接 import しない。
学年・組の選択肢は `getGrades(schoolIds)` / `getClasses(schoolIds, gradeId)` が返す。
在籍している児童生徒ではなく、学校に設置されている学年・クラス編成から決まる。

## スタイルの決まり

- 色・余白・角丸・影は `src/assets/styles/tokens.css` のCSS変数を `var(--…)` で参照する。値を直書きしない
- コンポーネントのスタイルは `<style scoped>` に閉じる

## 公開フロー

main にマージされると `.github/workflows/deploy.yml` が動き、ビルド結果が GitHub Pages に公開される。
サブパス配信のため `vite.config.ts` でビルド時のみ `base` を設定し、直リンクで404にならないよう `404.html` を生成している。

## 機能概要

<!-- TODO: 何ができるアプリか、画面と操作を書く -->

## 工夫した点

<!-- TODO: 設計上の判断や、なぜその書き方にしたかを書く -->

## 詰まった点・調べたこと

<!-- TODO: つまずいた箇所と、どう調べて解決したかを書く -->

【STEP1】

- v-forの利用<br>
  いざv-forの文章を書けはしたものの、呼び出したのちどう利用すればよいか迷ってしまった。
  一旦実直に{{}}(二重波括弧)の形で呼び出したが、より効率的な組み方があるように思える。<br>
  v-forの機能自体は、まとめたOneNoteの見返し、Vue公式の読み直し、Quiita記事の検索により調査。key属性に要素のうち一つを入れ、配列やオブジェクトに検索をかけて呼び出す。key属性を指定することで、配列やオブジェクトの内容が変わった際に予期せぬバグが発生するのを防ぐことができると理解している。
- 組がnullの場合の処理<br>
  TypeScriptの型指定により、'student.class'ではstudent配列のclassキーを持つオブジェクトを呼び出すことができなかった。class.nameを利用するところまでは理解できたが、if文の条件を型指定で乗り切ろうとしてしまった。<br>
  OJTに相談し、classキーを持つ値の型がSchoolClassかnullという条件だったので、nullの有無で条件分岐するようご指導いただいた。今回に限らず、Vueの開発においては複雑な操作を行う前にnullの条件分岐で余計な処理をあらかじめ弾くケースが多いとのことである。<br>
  また、型指定を複数行いたい場合は、｜を使うことも改めて学んだ。
- 予約語<br>
  上記組がnullの場合の処理を記述する際、仮の変数名に'class'を利用した。しかしながら、classは予約語にあたるのでエラーが発生した。<br>
  こちらも実装したコードをお見せしながらOJTよりご指導いただいた。
- import type{}from''<br>
  同じく、上記組がnullの場合の処理の際に、TypeScriptにおけるSchoolClass型を呼び出すために利用。実装方法のご相談中に問題が浮上した。<br>
  型をimportしたいとき、単に目的の型をimportするだけではエラーが発生する（JSへの変換（トランスパイル）時に、型情報はすべて一旦削除されてしまうため）。
  そのため、明示的にtypeをつける必要がある。
  OJTよりご指導いただき、https://azukiazusa.dev/blog/import-type-from-module/

を参照。

- CSSの設定<br>
  要素を表のようにきれいに並べる方法にまだ詰まっているため、PR5の際に再度調整する。

<li>を実装すべきか、flexをうまく活用すべきかまだ悩んでいる部分ではある。
