const { chromium } = require('playwright');

(async () => {
  // 启动浏览器
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. 打开目标网页
  await page.goto('https://www.zo.computer/signup?handle=ttt0090');

  // 2. 输入邮箱 (使用选择器找到输入框)
  // 这里使用了通用的 input[type="email"]，如果网页复杂可能需要更精确的选择器
  await page.fill('input[type="email"]', 'ttt0090@gmail.com');

  // 3. 点击提交按钮 (根据网页结构，通常是 type="submit" 的按钮)
  // 你也可以尝试使用 page.keyboard.press('Enter')
  await page.click('button[type="submit"]');

  // 等待一会儿确保请求发出
  await page.waitForTimeout(3000);

  console.log("任务完成：已输入邮箱并尝试提交。");
  await browser.close();
})();
