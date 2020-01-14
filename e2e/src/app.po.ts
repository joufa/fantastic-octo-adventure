import { browser, by, element, ExpectedConditions } from 'protractor';

export class AppPage {
  EC = ExpectedConditions;

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitle() {
    return element(by.id('title')).getText() as Promise<string>;
  }

  sendKeysToInput(keys: string) {
    const input = element(by.id('intepreter'));
    browser.wait(this.EC.visibilityOf(input));
    input.sendKeys(keys);
  }
}
