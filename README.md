
# WebUI Automated Acceptance Test using Selenium WebDriver + Javascript

**If you have WebDriver APIs in your test methods, You're Doing It Wrong.** 
*-- Simon Stewart.*

[![Build Status](https://travis-ci.org/jagadeeshshetty/selenium-webdriver-demo.svg?branch=master)](https://travis-ci.org/jagadeeshshetty/selenium-webdriver-demo)

## Release Notes:

### 1.6.0
- Explicit waits support.
- Debug support.

### 1.5.0
- Optimize - Page Object support
    - Abstract selenium common actions into a `BasePage` central place.

### 1.4.0
- Page Object support
- Test cases update
    - 'with valid credentials'
    - 'with invalid credentials'
    
### 1.3.0
- Add Travis CI support

### 1.2.0
- Added `loginTest.js` test case
    - Scenario
        - Valid login
- Updated `npm run test` script to run `mocha` test.

### 1.1.0
- Install
    - dependencies `npm i mocha mocha-jenkins-reporter selenium-webdriver system-sleep chromedriver geckodriver`
    - devDependencies `npm i -D mocha-simple-html-reporter mochawesome`
- Add gitignore
    - node_modules
    
### 1.0.0
- Initial project setup
