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

    it('should perform search functionality', async function() {
        await driver.findElement(By.id('statement-search-btn')).click();
        await driver.sleep(10000);

        const startDatePicker = await driver.findElement(By.id('start-date-picker'));

        await startDatePicker.sendKeys(Key.COMMAND, "a"); 

     
        await startDatePicker.sendKeys('26 March, 2024');

        await startDatePicker.sendKeys(Key.ENTER);

        await driver.sleep(5000);

        const table = await driver.findElement(By.id('statement-table'));
        assert.ok(await table.isDisplayed(), 'Statement table is not displayed');

        const tableText = await table.getText();
        assert.ok(tableText.includes('26/03/2024'), 'The table does not contain the search date');

        console.log('Test completed successfully. The table contains the search date.');
    });
});
