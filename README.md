This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

このプロジェクトでは、随所で HTTPS による通信を必要とするため、ローカル環境でも SSL 証明書を発行しています。開発を始める前に以下の手順に従って SSL 証明書を作成してください。

### 1. mkcert をインストール ※Mac 環境の場合

https://github.com/FiloSottile/mkcert

※ Mac 以外の OS を使用している場合は、同様の動作をするツールを適宜探してみてください。

※ brew を使用している場合: インストールを行う

```bash
brew install mkcert
```

プロジェクトのルートディレクトリにて、以下のコマンドを実行

```bash
mkcert localhost
```

localhost.pem 及び localhost-key.pem が作成されるのをご確認ください。

### 2. 開発サーバの立ち上げ

HTTPS で開発サーバを立ち上げるには、以下のコマンドを実行してください。

```bash
yarn dev:proxy
```

## Git についての注意点

このプロジェクトでは、main ブランチ及び develop ブランチへの直接コミットを禁止しています。変更を行う際は、必ずトピックブランチを作成し、develop ブランチへのプルリクエストを提出するようにしてください。

また、ローカルレベルで各ブランチへの誤コミットを防止するため、コミット前に対象のブランチ名をチェックするスクリプトを用意しています。

ルートディレクトリで以下のコマンドを実行し、実行権限を与えておいてください。

```bash
chmod a+x .git/hooks/pre-commit
```

## Typedoc

このリポジトリでは、ドキュメント作成を自動化するツール(Typedoc: https://typedoc.org/ )を導入しています。

ソースコードと記載したコメントによって動的に内容が変化するため、必要に応じてドキュメントの生成・確認を行なってください。

**ドキュメント生成**

```bash
yarn typedoc
```

**ドキュメントをブラウザで表示**

```bash
open docs/index.html
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
