import {Page} from "@playwright/test";
import { CommonPage  } from "./Page";


export type ShippingAddress = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  phoneNumber: string;
};

export type Card = {
  number: string;
  holderName: string;
  expireDate: string;
  cvv: string;
};

export class Checkout  extends CommonPage {
  constructor(domain: string, page: Page) {
    super(domain, page);
  }

  async enterUserInfo(info: ShippingAddress) {
    await this.page.locator("//input[@name='email-address']").fill(info.email);
    await this.page.locator("//input[@name='first-name']").fill(info.firstName);
    await this.page.locator("//input[@name='last-name']").fill(info.lastName);
    await this.page.locator("//input[@name='street-address']").fill(info.address);
    await this.page.locator("//input[@name='zip-code']").fill(info.zipcode);
    await this.page.locator("//input[@name='city']").fill(info.city);
    await this.page.locator("//input[@name='phone-number']").fill(info.phoneNumber);

    await Promise.all([
      this.page.locator("(//button[normalize-space()='Continue to shipping method'])[1]").click(),
      this.page.waitForNavigation(),
    ]);
  }

  async enterCardInfo(info: Card) {
    await this.page
      .frameLocator(`//iframe[@title='Secure card number input frame']`)
      .locator("//input[@name='cardnumber']")
      .fill(info.number);
    await this.page
      .frameLocator(`//iframe[@title='Secure expiration date input frame']`)
      .locator("//input[@name='exp-date']")
      .fill(info.expireDate);
    await this.page
      .frameLocator(`//iframe[@title='Secure CVC input frame']`)
      .locator(`//input[@name='cvc']`)
      .fill(info.cvv);
    await this.page.locator("//input[@placeholder='Cardholder name']").fill(info.holderName);
  }


  async clickPlaceOrderBtn() {
    await this.page.locator(`//span[text()='Place Your Order']`).click();
  }

  
  async clickContinuePayment() {
    await Promise.all([
      this.page.locator("(//button[normalize-space()='Continue to payment method'])[1]").click(),
      this.page.waitForNavigation(),
    ]);
  }


  async clickCompleteOrder() {
    await Promise.all([
      this.page.locator("(//button[normalize-space()='Complete order'])[1]").click(),
      this.page.waitForNavigation(),
    ]);
  }

  async waitForThankyouPage() {
    await this.page.waitForSelector(`//h2[text()='Thank you!']`);
  }
}




