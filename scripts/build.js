import { join, dirname } from 'path';

import pMap from 'p-map';
import fg from 'fast-glob';
import execa from 'execa';
import chalk from 'chalk';

import { resolveCwd } from './paths';

async function main() {
  await pMap(await getSrcs(), async (src) => {
    await build(src);
    return;
  }, { concurrency: 8 });

  console.log(chalk `{greenBright 构建成功!}`);
}

async function build(src) {
  await execa(
    'npx',
    [
      'babel',
      '-d',
      getDestPath(src),
      resolveCwd(src),
    ]
  );
}

function getDestPath(path) {
  return dirname(
    join(
      resolveCwd('lib'),
      path.substring('src/'.length, path.length),
    )
  );
}

async function getSrcs() {
  const srcs = await fg([
    'src/**/*.js',
    '!src/**/(*.)+(benchmark|test).js',
  ]);

  return srcs;
}

(async () => {
  try {
    await main();
  } catch (err) {
    throw(err);
  }
})();
