import { browser, logging } from 'protractor';
import { ProductsPage } from './products.po';

describe('ProductsPage', () => {
  let productsPage: ProductsPage;
  let initialPizzasCount = 0;

  beforeEach(() => {
    productsPage = new ProductsPage();
    productsPage.navigateTo();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should show pizza items', () => {
    const pizzaItems = productsPage.getPizzaItems();
    expect(pizzaItems.isPresent()).toBeTruthy();
    pizzaItems.then(items => initialPizzasCount = items.length);
  });

  it('should create new pizza', () => {
    productsPage.navigateTo('/#/products/new');

    const nameInput = productsPage.getPizzaNameInput();
    expect(nameInput.isPresent()).toBeTruthy();

    nameInput.clear().then(() => {
      nameInput.sendKeys('Protractor e2e pizza').then(() => {

        // select odd toppings
        const oddToppings = productsPage.getOddToppings();
        oddToppings.each(item => item.click());
        productsPage.getActiveToppings().then(items => {
          expect(items.length).toEqual(6);
        });

        productsPage.takeScreenshot();

        // save
        const btnOk = productsPage.getBtnOk();
        expect(btnOk.isPresent()).toBeTruthy();
        productsPage.btnOkClick();
      });
    });

  });

  it('ensure pizzas quantity updated', () => {
    const pizzaItems = productsPage.getPizzaItems();
    expect(pizzaItems.isPresent()).toBeTruthy();
    pizzaItems.then(items => {
      expect(items.length).toEqual(initialPizzasCount + 1);
    });
  });

  it('should update existing pizza', () => {

    productsPage.navigateToLatestPizza();

    const nameInput = productsPage.getPizzaNameInput();
    expect(nameInput.isPresent()).toBeTruthy();
    expect(nameInput.getAttribute('value')).toMatch('Protractor e2e pizza');

    // update pizza's name
    nameInput.clear().then(() => {
      nameInput.sendKeys('Protractor e2e pizza updated').then(() => {
        expect(nameInput.getAttribute('value')).toMatch('Protractor e2e pizza updated');

        productsPage.takeScreenshot();
      });
    });

    // deselect odd toppings
    const oddToppings = productsPage.getOddToppings();
    oddToppings.each(item => item.click());
    productsPage.getActiveToppings().then(items => {
      expect(items.length).toEqual(0);

      // select even toppings
      const evenToppings = productsPage.getEvenToppings();
      evenToppings.each(item => item.click());

      productsPage.getActiveToppings().then(activeItems => {
        expect(activeItems.length).toEqual(6);

        // update
        productsPage.btnOkClick();
      });

    });

  });

  it('ensure pizzas name updated', () => {
    const pizzaItems = productsPage.getPizzaItems();
    expect(pizzaItems.isPresent()).toBeTruthy();
    productsPage.getLastPizzaName().getText().then(name => {
      expect(name).toEqual('Protractor e2e pizza updated');
    });
  });

  it('should remove latest pizza', () => {

    productsPage.navigateToLatestPizza();

    // remove
    productsPage.btnWarningClick();

    const dialog = productsPage.getConfirmationDialog();
    dialog.accept();
  });

  it('ensure pizzas quantity equals to initial state', () => {
    const pizzaItems = productsPage.getPizzaItems();
    expect(pizzaItems.isPresent()).toBeTruthy();
    pizzaItems.then(items => {
      expect(items.length).toEqual(initialPizzasCount);
    });
  });
});
