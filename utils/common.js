export function isJsonObject(object) {
  try {
    JSON.stringify(object);
  } catch (e) {
    return false;
  }
  return true;
}

export function isIRCCommand(input) {
  return input.startsWith('/');
}

export function isJsonString(string) {
  try {
    JSON.stringify(string);
  } catch (e) {
    return false;
  }
  return true;
}

export function deepCopyJson(object) {
  return JSON.parse(JSON.stringify(object));
}

export function getDomainURL() {
  const protocol = process.env.usesHTTPS ? 'https://' : 'http://';
  return protocol + process.env.canonicalURL;
}

export function no(array) {
  return array.length === 0;
}

export function any(array) {
  return array.length > 0;
}

export function isValidChannel(channelName) {
  return /^#([a-zA-Z0-9.^\-_=&äöå<>+$!@#ü']){1,64}$/.test(channelName);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// borrowed and modified from:
// https://stackoverflow.com/questions/30672861/find-the-lowest-unused-number-in-an-array-using-javascript
export function lowestUnusedNumberInArray(sequence, startingFrom) {
  const arr = sequence.slice(0);
  arr.sort((a, b) => a - b);

  return arr.reduce((lowest, num, i) => {
    const seqIndex = i + startingFrom;
    return num !== seqIndex && seqIndex < lowest ? seqIndex : lowest;
  }, arr.length + startingFrom);
}

// borrowed and modified from:
// https://stackoverflow.com/questions/25456013/javascript-deepequal-comparison/25456134
export function deepEqual(x, y) {
  if (x === y) {
    return true;
  }
  if ((typeof x === 'object' && x != null) && (typeof y === 'object' && y != null)) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false;
    }

    for (const prop in x) {
      // eslint-disable-next-line no-prototype-builtins
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }
  return false;
}

export function getNestedProperty(targetJson, path) {
  return path.split('.').reduce((subJson, prop) => subJson[prop], targetJson);
}

export function modulo(n, m) {
  return ((n % m) + m) % m;
}
