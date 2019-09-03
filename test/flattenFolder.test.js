import { realpathSync } from 'fs';
import { resolve } from 'path';
import trash from 'trash';
import cpy from 'cpy';

import { assert } from 'chai';
import deepScanDir from 'deep-scan-dir/lib/deepScanDir';

import flattenFolder from '../src/flattenFolder';

const appDirectory = realpathSync(process.cwd());
const resolveCwd = (relativePath) => resolve(appDirectory, relativePath);

setTimeout(() => {
  suite('await flattenFolder({from, to, exclude})', async () => {
    let copiedDirsCount = 0;
    let copiedFilesCount = 0;

    suiteSetup(async () => {
      await cpy(
        [
          './scripts/*.js',
          './src/*.js',
        ],
        resolveCwd('test/case'),
        {
          cwd: appDirectory,
          parents: true,
        },
      );

      const { files, dirs } = await deepScanDir({
        from: resolveCwd('test/case'),
      });

      copiedDirsCount = dirs.length;
      copiedFilesCount = files.length;
    });

    test('支持忽略文件 / 文件夹', async () => {
      const { dirs } = await flattenFolder({
        from: resolveCwd('test/case'),
        to: resolveCwd('test/case'),
        exclude: {
          dir: ['scripts', 'src'],
        },
      });

      assert.isTrue(dirs.length === 0);
    });

    test('操作结果分别包括文件集合及文件夹集合', async () => {
      const { files, dirs } = await flattenFolder({
        from: resolveCwd('test/case'),
        to: resolveCwd('test/case'),
      });

      const total = files.length + dirs.length;

      assert.isFalse(total === (copiedFilesCount + copiedDirsCount));
    });

    suiteTeardown(async () => {
      await trash(resolveCwd('test/case'));
    });
  });

  run();
}, 0);
