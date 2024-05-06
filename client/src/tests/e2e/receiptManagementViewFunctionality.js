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

    it('should be able to view receipts for transactions', async function() {
        await driver.findElement(By.id('payment-receipts-btn')).click();
        await driver.sleep(5000);

        const startDate = await driver.findElement(By.id('start-date'));
        await startDate.sendKeys(Key.COMMAND, "a"); 
        await startDate.sendKeys('26 March, 2024');
        await startDate.sendKeys(Key.ENTER);
        await driver.sleep(5000);

        const table = await driver.findElement(By.id('receipts-table'));
        assert.ok(await table.isDisplayed(), 'Receipts table is not displayed');

        const viewReceiptLink = await driver.findElement(By.linkText('View Receipt'));
        console.log('View Receipt Link is displayed:', await viewReceiptLink.getText());
        await viewReceiptLink.click();
        await driver.sleep(5000);

    
        const handles = await driver.getAllWindowHandles();
        assert.ok(handles.length > 1, 'No new tab was opened');
        await driver.switchTo().window(handles[1]);


        const currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);
        assert.ok(currentUrl.includes('receipt'), 'URL does not include the receipt identifier');


        const content = await driver.findElement(By.tagName('body')).getText();
        assert.ok(content.includes('Receipt from'), 'The content of the page does not include expected text.');


        await driver.close();
        await driver.switchTo().window(handles[0]);
    });
});
