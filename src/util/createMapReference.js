// used for conditional tailwind classes

export function createMapReference(obj) {
  const output = {};

  for (var key in obj) {
    output[key] = key;
  }

  return output;
}
