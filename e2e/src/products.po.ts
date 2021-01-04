import { browser, by, element } from 'protractor';

export class ProductsPage {

  navigateTo(url = '/#/products') {
    browser.waitForAngularEnabled(true);
    browser.get(url);
    browser.sleep(1000);
    browser.waitForAngularEnabled(false);
  }

  getPizzaItems() {
    return element.all(by.css('.products__list app-pizza-item'));
  }

  getPizzaNameInput() {
    return element(by.css('.pizza-form__input--name'));
  }

  getOddToppings() {
    return element.all(by.css('.pizza-toppings > :nth-child(2n + 1)'));
  }

  getEvenToppings() {
    return element.all(by.css('.pizza-toppings > :nth-child(2n + 2)'));
  }

  getLastPizzaAnchor() {
    return element(by.css('.products__list > :last-child .pizza-item a'));
  }

  getLastPizzaName() {
    return element(by.css('.products__list > :last-child .pizza-item h4'));
  }

  getActiveToppings() {
    return element.all(by.css('.pizza-toppings .pizza-toppings-item.active'));
  }

  getBtnOk() {
    return element(by.css('.pizza-form__actions .btn.btn__ok'));
  }

  getBtnWarning() {
    return element(by.css('.pizza-form__actions .btn.btn__warning'));
  }

  getConfirmationDialog() {
    return browser.switchTo().alert();
  }

  btnOkClick() {
    this.getBtnOk().click();
    browser.sleep(1000);
  }

  btnWarningClick() {
    this.getBtnWarning().click();
    browser.sleep(1000);
  }

  takeScreenshot() {
    browser.takeScreenshot();
    browser.sleep(1000);
  }

  navigateToLatestPizza() {
    const anchor = this.getLastPizzaAnchor();
    anchor.getAttribute('href').then(href => {
      this.navigateTo(href);
    });
  }
}
