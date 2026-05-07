const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("正在访问页面...");
    await page.goto('https://www.zo.computer/signup?handle=ttt0090', { waitUntil: 'networkidle' });

    // 1. 先点击 "Email me a link" 按钮
    console.log("正在点击 'Email me a link' 按钮...");
    // 使用文字匹配点击按钮
    await page.click('text="Email me a link"');

    // 2. 等待输入框出现
    console.log("等待邮箱输入框渲染...");
    const emailInput = page.locator('input');
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });

    // 3. 输入邮箱
    console.log("正在输入邮箱...");
    await emailInput.fill('ttt0090@gmail.com');

    // 4. 提交 (按回车)
    console.log("提交请求...");
    await page.keyboard.press('Enter');

    // 5. 等待并截图验证结果
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'result.png' });
    console.log("执行完毕，截图已保存。");

  } catch (err) {
    console.error("操作失败:", err);
    await page.screenshot({ path: 'error.png' });
    process.exit(1);
  } finally {
    await browser.close();
  }
})();

