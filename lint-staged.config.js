module.exports = {
  "*.{ts,tsx}": [
    "yarn format:fix",
    "yarn lint",
    "yarn test --bail --watchAll=false --findRelatedTests --passWithNoTests",
  ],
};
