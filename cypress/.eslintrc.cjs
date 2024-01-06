module.exports = {
  extends: ["plugin:cypress/recommended"],
  "plugins": [ "no-only-tests" ]  ,
  "rules": {
    "no-only-tests/no-only-tests": "error"
  }  
};
