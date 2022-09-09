import {test as base} from "@playwright/test";
const test=base.extend<{}>({
    page:async({page},use)=>{
        await page.goto("https://sinhvien.epu.edu.vn/Default.aspx");
        await use(page)

    }
})
export default test;