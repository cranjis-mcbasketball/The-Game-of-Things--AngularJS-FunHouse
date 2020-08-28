import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    console.log('getTitleText app.po.ts', element(by.css('app-root h1')).getText() as Promise<string>)
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
