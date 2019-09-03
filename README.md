[![Maintainability](https://api.codeclimate.com/v1/badges/60a65a826cc523425518/maintainability)](https://codeclimate.com/github/iTonyYo/flatten-folder/maintainability) [![Known Vulnerabilities](https://snyk.io/test/github/itonyyo/flatten-folder/badge.svg)](https://snyk.io/test/github/itonyyo/flatten-folder) [![Build Status](https://travis-ci.org/iTonyYo/flatten-folder.svg?branch=master)](https://travis-ci.org/iTonyYo/flatten-folder) [![Coverage Status](https://coveralls.io/repos/github/iTonyYo/flatten-folder/badge.svg?branch=master)](https://coveralls.io/github/iTonyYo/flatten-folder?branch=master)

# flatten-folder

递归扁平化指定文件夹内所有文件。

## 安装

```shell
# 使用 NPM
$ npm i flatten-folder

# 使用 Yarn
$ yarn add flatten-folder
```

## flattenFolder({from, to, exclude})

- `from` {String} 目标文件夹，**默认：** `./`
- `to` {String} 结果文件夹，**默认：** `./`
- `exclude` {Object}
  - `dirs` {Array} 被操作的文件夹
  - `files` {Array} 被操作的文件

**使用**

```javascript
import { realpathSync } from 'fs';
import flattenFolder from 'flatten-folder';

(async () => {
  const from = realpathSync(process.cwd());
  const to = from;

  const { dirs, files } = await flattenFolder({
    from,
    to,
    exclude: {
      dir: ['scripts', 'src'],
    },
  });
})();
```

## 贡献指南

仔细查阅 [CONTRIBUTING.md][贡献指南] 以了解详情。

[贡献指南]: https://github.com/iTonyYo/flatten-folder/blob/master/CONTRIBUTING.md

## 证书

[`flatten-folder`][flatten-folder] 获得了 MIT 许可，仔细查阅 [LICENSE.md][证书] 以了解详情。

[证书]: https://github.com/iTonyYo/flatten-folder/blob/master/LICENSE.md



[flatten-folder]: https://github.com/iTonyYo/flatten-folder
