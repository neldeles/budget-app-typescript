module.exports = {
  "*.{ts,tsx}": [
    "yarn format:fix",
    "yarn test --bail --watchAll=false --findRelatedTests --passWithNoTests",
  ],
};
