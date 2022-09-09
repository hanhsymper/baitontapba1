import { Page } from "@playwright/test";
import { CommonPage } from "./Page";
import { Collection } from "./Collection";
import {ViewProduct} from "./ViewProduct"
export class Home extends CommonPage{
    constructor(domain:string,page:Page){
        super(domain,page);
    }
    async gotoHome(){
        await this.gotoPath("");
        await this.page.waitForNavigation();
    }
    async gotoProductURL(path:string){
        // https://au-abandoned-prodtest.onshopbase.com/products/urban-girl-t-shirt
             await this.page.goto(`https://${this.domain}/${path}`);
             await this.page.waitForNavigation();
             return new ViewProduct(this.domain,this.page)   
         }
    async gotoCollection(name:string){
        await this.gotoPath(`collections/${name}`);
        await this.page.waitForLoadState('domcontentloaded');
        return new Collection(this.domain,this.page)
    }
    // async gotoCartWithIcon(){

    // }
}