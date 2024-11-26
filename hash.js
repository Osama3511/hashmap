function hashMap() {
  let capacity = 16;
  const loadFactor = 0.75;
  const buckets = new Array(capacity);

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function resize() {
    const oldBuckets = buckets;
    capacity *= 2;
    buckets = new Array(capacity).fill(undefined);

    // reset the hashmap because we changed the size;
    for (let i = 0; i < oldBuckets.length; i++) {
      const bucket = oldBuckets[i];
      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          const [key, value] = bucket[j];
          set(key, value);
        }
      }
    }
  }

  function set(key, value) {
    if (length() > capacity * loadFactor) {
      resize();
    }

    const index = hash(key);
    let bucket = buckets[index];

    if (!bucket) {
      bucket = [];
      bucket.push([key, value]);
      buckets[index] = bucket;

      return;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;

        return;
      }
    }

    bucket.push([key, value]); // collision handling if the keys dont match and they have the same hash
  }

  function get(key) {
    const bucket = buckets[hash(key)];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) return bucket[i][1];
      }
    }

    return null;
  }

  function has(key) {
    return get(key) !== null;
  }

  function remove(key) {
    const bucket = buckets[hash(key)];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i] = undefined;
          return;
        }
      }
    }
  }

  function length() {
    let mapLength = 0;
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      if (bucket) {
        mapLength += bucket.length;
      }
    }

    return mapLength;
  }

  function clear() {
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];

      if (bucket) {
        buckets[i] = undefined;
      }
    }
  }

  function keys() {
    const mapKeys = [];
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];

      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          mapKeys.push(bucket[j][0]);
        }
      }
    }

    return mapKeys;
  }

  function values() {
    const mapValues = [];
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];

      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          mapValues.push(bucket[j][1]);
        }
      }
    }

    return mapValues;
  }

  function entries() {
    const mapEntries = [];
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];

      if (bucket) {
        mapEntries.push(bucket);
      }
    }

    return mapEntries;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

module.exports = { hashMap };
