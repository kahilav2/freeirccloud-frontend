// ### PackageFactory class ###

/**
 *  package-factory.js
 */

export default class {
  constructor(serverURL, syncVersion) {
    this.serverURL = serverURL;
    this.syncVersion = syncVersion;
  }

  createPackage(command, othersAsJSON) {
    const json = {
      serverURL: this.serverURL,
      command,
      syncVersion: this.syncVersion,
    };
    for (const key of Object.keys(othersAsJSON)) {
      json[key] = othersAsJSON[key];
    }
    return json;
  }
}
