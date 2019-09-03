import { basename, join } from 'path';

import each from 'async/each';
import moveFile from 'move-file';
import trash from 'trash';

import deepScanDir from 'deep-scan-dir/lib/deepScanDir';

async function main({ from = './', to = './', exclude = {} }) {
  const { files, dirs } = await deepScanDir({
    from,
    exclude,
  });

  await mv({ files, to });
  await trash(dirs);

  return { files, dirs };
}

async function mv({ files, to }) {
  await each(files, async (file) => {
    const done = await moveFile(file, join(to, basename(file)));
    return done;
  });
}

export default main;
