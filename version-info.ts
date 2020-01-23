export const versionInfo = (() => {
  try {
    // tslint:disable-next-line:no-var-requires
    return require('git-version.json');
  } catch {
    return { tag: 'v0.0.0', hash: 'dev' };
  }
})();
