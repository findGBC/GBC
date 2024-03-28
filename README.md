# Blueberry UI

Master [![Typecheck](https://github.com/CryptoOda/blueberry-ui/actions/workflows/typecheck.yml/badge.svg)](https://github.com/CryptoOda/blueberry-ui/actions/workflows/typecheck.yml) [![Build](https://github.com/CryptoOda/blueberry-ui/actions/workflows/build.yml/badge.svg)](https://github.com/CryptoOda/blueberry-ui/actions/workflows/build.yml) [![Lint](https://github.com/CryptoOda/blueberry-ui/actions/workflows/lint.yml/badge.svg)](https://github.com/CryptoOda/blueberry-ui/actions/workflows/lint.yml)

Develop [![Typecheck](https://github.com/CryptoOda/blueberry-ui/actions/workflows/typecheck.yml/badge.svg?branch=develop)](https://github.com/CryptoOda/blueberry-ui/actions/workflows/typecheck.yml) [![Build](https://github.com/CryptoOda/blueberry-ui/actions/workflows/build.yml/badge.svg?branch=develop)](https://github.com/CryptoOda/blueberry-ui/actions/workflows/build.yml) [![Lint](https://github.com/CryptoOda/blueberry-ui/actions/workflows/lint.yml/badge.svg?branch=master)](https://github.com/CryptoOda/blueberry-ui/actions/workflows/lint.yml)

## [Website - Scroll this Online!](https://www.findgbc.com/)
## [Dapp - Scroll this Online!](https://app.findgbc.com/)

<img src="src/assets/img/landingpage.png" />

This is the official repository of the Blueberry UI code.

- [Eslint-Typescript](https://github.com/typescript-eslint/typescript-eslint) and [Prettier](https://prettier.io/) integration.
- [TailWindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Github Actions](https://github.com/features/actions)

## Installation

### npm

```sh
cd myapp
npm install
npm run validate
npm run dev
```

### yarn

```sh
cd myapp
yarn install
yarn validate
yarn dev
```

### Commands

```sh
yarn dev       # start development server
yarn validate  # run test,lint,build,typecheck concurrently
yarn test      # run jest
yarn lint      # run eslint
yarn lint:fix  # run eslint with --fix option
yarn typecheck # run TypeScript compiler check
yarn build     # build production bundle to 'dist' directly
yarn prettier  # run prettier for json|yml|css|md|mdx files
yarn clean     # remove 'node_modules' 'yarn.lock' 'dist' completely
yarn serve     # launch server for production bundle in local
```

### Use Typesafe-i18n

```sh
npm run typesafe-i18n
```

Edit [English](https://github.com/CryptoOda/blueberry-ui/blob/develop/src/i18n/en/index.ts) file

More details : [Typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n)

### Use sanity 
```sh
npm install --global sanity@latest
cd apps/landing/blog
yarn run dev
```

# License

MIT Licence

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/CryptoOda">
        <img
          src="https://avatars.githubusercontent.com/u/102867384?v=4"
          width="100px;"
          alt=""
        />
        <br />
        <sub>
          <b>CryptoOda</b>
        </sub>
      </a>
      <br />
    </td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
