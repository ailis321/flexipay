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

    it('should perform customer name search functionality', async function() {
        await driver.findElement(By.id('view-customers')).click();
        await driver.sleep(10000);

        const customerHeading = await driver.findElement(By.id('customer-list-heading'));

        assert.ok(await customerHeading.isDisplayed(), 'Customer list heading is not displayed');

        const searchInput = await driver.findElement(By.id('search-bar'));
        assert.ok(await searchInput.isDisplayed(), 'Search input is not displayed');
        await searchInput.sendKeys('John');
        await driver.sleep(5000);

        const customerList = await driver.findElement(By.id('customer-results-table'));
        assert.ok(await customerList.isDisplayed(), 'Customer list is not displayed');

        const customerListText = await customerList.getText();
        assert.ok(customerListText.includes('John'), 'The customer list does not contain the search term "John"');
        console.log('Search functionality test completed successfully.');

    });
});

