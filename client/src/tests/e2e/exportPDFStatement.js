const { Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const assert = require('assert');


describe('Web Application Full Workflow Test', function() {
    this.timeout(60000);
    let driver;
    const downloadDir = path.join(__dirname, 'downloads');

    before(async function() {
        const chromeOptions = new chrome.Options();
        chromeOptions.setUserPreferences({
            'download.default_directory': downloadDir,
            'download.prompt_for_download': false,
            'download.directory_upgrade': true,
            'plugins.always_open_pdf_externally': true 
        });

        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        await driver.get('http://localhost:3000/login');
    });

    after(async function() {
        await driver.quit();
        fs.rm(downloadDir, { recursive: true }, (err) => {
            if (err) {
                console.error('Failed to remove download directory:', err);
            }
        });
    });

    it('should login successfully', async function() {
        await driver.findElement(By.id('email')).sendKeys('TestAccount@test.com');
        await driver.findElement(By.id('password')).sendKeys('Testing123$');
        await driver.sleep(5000);

        await driver.findElement(By.id('login-button')).click();
        await driver.sleep(5000);


    });

    it('should be able to download a statement from the year end statement as a PDF', async function() {
        await driver.findElement(By.id('year-end-btn')).click();
        await driver.sleep(10000);

        await driver.wait(until.elementLocated(By.id('pdf-download-btn')), 15000); 
        const PDFDownloadButton = await driver.findElement(By.id('pdf-download-btn'));
        console.log('PDFDownloadButton:', PDFDownloadButton.getText());
        await PDFDownloadButton.click();
        await driver.sleep(5000);

        // Check that the PDF has been downloaded
        const files = fs.readdirSync(downloadDir);
        const pdfFile = files.find(file => file.endsWith('.pdf'));
        assert.ok(pdfFile, 'No PDF file downloaded');
        await driver.sleep(5000);

        console.log('PDF downloaded successfully:', pdfFile);
    });
});
