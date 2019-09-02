import execa from 'execa';

// npx nyc mocha --require @babel/register --no-opts 'src/**/?(*.)+(spec|test).[tj]s?(x)'
(async () => {
  try {
    const result = await execa('npx', [
      'nyc',
      '--require',
      '@babel/register',
      'mocha',
      '--require',
      '@babel/register',
      '--no-opts',
      'test/**/?(*.)+(spec|test).[tj]s?(x)',
    ]);

    console.log(result.stdout);
  } catch (error) {
    console.error(error.stderr);
  }
})();
