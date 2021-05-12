const puppetteer = require("puppeteer")
const INTERVAL = 1000 * 20
const alertUser = (message) => console.log(message);
var count = 0

async function launch () {
    const browser = await puppetteer.launch({headless:false})
    var alertBool = false
    const page = await browser.newPage()
    await page.goto('https://www.cowin.gov.in/home')   
    // await page.screenshot({path:'example.png'})
    await page.waitForSelector("#mat-input-0")
    await console.log('Found input field')
    await page.type("#mat-input-0", "421201")
    await page.click("body > app-root > div > app-home > div.maplocationblock.bs-section > div > appointment-table > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > form > div > div > div:nth-child(2) > div > div > button")
    await console.log('Loading available options')
    await page.waitForSelector("body > app-root > div > app-home > div.maplocationblock.bs-section > div > appointment-table > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > form > div > div > div.col-padding.matlistingblock > div > div li")
    const response = await page.$$("body > app-root > div > app-home > div.maplocationblock.bs-section > div > appointment-table > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > form > div > div > div.col-padding.matlistingblock > div > div li")
    response.forEach(async element => {
        const result = await element.$eval("a", el => el.innerText)
        // console.log(result);
        if(result != "Booked" && result != "NA"){
            alertBool = true
        } else { 
            alertBool = false
        }
    })
    await alertBool ? alertUser("Slot available!!!") : alertUser("Not yet")
    // await console.log(arr)
    browser.close()
    await page.close()
}


setInterval(launch, INTERVAL)



/*
document.querySelectorAll("body > app-root > div > app-home > div.maplocationblock.bs-section > div > appointment-table > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > form > div > div > div.col-padding.matlistingblock > div > div li")
*/