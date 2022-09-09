import { Page } from "@playwright/test";
import { CommonPage } from "./Page";

export type InforLogin={
    email:string;
    password:string;

}
export class Login extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
    async enterLoginInfo(info:InforLogin){
        await this.page.locator("//input[@id='email']").fill(info.email);
        await this.page.locator("//input[@id='password']").fill(info.password);
        await this.page.locator("//button//span[contains(text(),'Sign in')]").click();
    }
    async chooseNameShop(shopName:string){
       await Promise.all([ 
        this.page.locator(`//*[contains(text(),'${shopName}')]`).click(),
        this.page.waitForNavigation(),
      ]);
    }
}