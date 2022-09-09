import {test as base,} from "@playwright/test"

import {DATA} from "../data/product"
export const test=base.extend<{}>({
    page:async({page},use)=>{
        DATA.forEach((e)=>{
            console.log(e)
        });
    await use(page);

}
})