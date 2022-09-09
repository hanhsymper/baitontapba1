import { expect } from "@playwright/test";
import {test} from "../fixture/to_do_cart"
test("test fixture",async({page})=>{
    await page.goto("https://github.com/hanhsymper/playwright");
    expect("abc").toEqual("abc");

})