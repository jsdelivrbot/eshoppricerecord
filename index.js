const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://eshop-checker.xyz/beta/#/');
  await page.waitForSelector('.item-detail-price')
  await page.waitForSelector('.item-detail-region')
  await page.waitForSelector('.square-img')
  console.log('页面加载完成')
  await page.screenshot({ path: 'example.png' });
  let gameList = await page.$$('.item-container.item')
  // console.log(gameList)
  let price = gameList.map(gameNode => {
    return gameNode.$eval('.item-visible-container', node => {
      let img = node.getElementsByClassName('square-img')[0] // 当时无此div?
      let isOnSale = node.getElementsByClassName('on-sale')[0] ? true : false
      let title = node.getElementsByClassName('item-detail-title')[0].innerText
      let release = node.getElementsByClassName('item-detail-release')[0].innerText
      let region = node.getElementsByClassName('item-detail-region')[0].innerText
      let price = node.getElementsByClassName('item-detail-price')[0].innerText
      return {
        img,
        isOnSale,
        title,
        release,
        region,
        price
      }
    })
  })
  console.log('抽取游戏列表')
  let priceList = await Promise.all(price)
  console.log(priceList[0])
  // console.log(priceList.map(val=>val.innerHTML))

  await browser.close();
})();