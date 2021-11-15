module.exports = {
  "*.{ts,tsx}": [
    "yarn format:fix",
    "yarn lint",
    "yarn type:check",
    "yarn test --bail --watchAll=false --findRelatedTests --passWithNoTests",
  ],
};
