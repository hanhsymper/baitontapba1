import {Page} from "@playwright/test";
export class CommonPage{
    page:Page;
    domain:string;
    constructor(domain:string,page:Page){
        this.domain=domain;
        this.page=page;
    }
    async gotoPath(path:string) {
        await this.page.goto(`https://${this.domain}/${path}`);
        await this.page.waitForLoadState("load");
    }
}