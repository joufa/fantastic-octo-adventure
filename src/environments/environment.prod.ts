import { version as nodeVersion } from '../../package.json';
import { versionInfo } from '../../version-info';

const appVersion = (nodeVersion as string).concat('-').concat(versionInfo.hash);

export const environment = {
  production: true,
  version: appVersion
};
