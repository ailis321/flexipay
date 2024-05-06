const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Web Application Full Workflow Test', function() {
    this.timeout(60000); 
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/login');
    });

    after(async function() {
        await driver.quit(); 
    });

    it('should login successfully', async function() {
        await driver.findElement(By.id('email')).sendKeys('TestAccount@test.com');
        await driver.findElement(By.id('password')).sendKeys('Testing123$');
        await driver.sleep(5000);

        await driver.findElement(By.id('login-button')).click();
        await driver.sleep(5000);

        await driver.wait(until.elementLocated(By.id('greeting')), 10000);

        const loggedInElement = await driver.findElement(By.id('greeting'));
        assert.ok(await loggedInElement.isDisplayed(), 'Greeting element is not displayed');
        const elementText = await loggedInElement.getText();
        assert.ok(elementText.includes('Hello'), 'The greeting text does not include "Hello"');
        console.log('Login successful!');
    });

    it('should be able to logout', async function() {
        await driver.findElement(By.id('logout-btn')).click();
        await driver.sleep(5000);

        await driver.wait(until.elementLocated(By.id('login-btn')), 10000);
        const loginButton = await driver.findElement(By.id('login-btn'));
        assert.ok(await loginButton.isDisplayed(), 'Login button is not displayed');
        await driver.sleep(5000);
        console.log('Logout successful!');
 

    });
});

