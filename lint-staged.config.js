module.exports = {
  "*.{ts,tsx}": (filenames) => [
    "yarn format:fix",
    "yarn test --bail --watchAll=false --findRelatedTests --passWithNoTests",
  ],
};
