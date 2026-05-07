const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("正在打开页面...");
    // 增加等待时间直到网络空闲
    await page.goto('https://www.zo.computer/signup?handle=ttt0090', { waitUntil: 'networkidle' });

    // 尝试更通用的选择器：直接找第一个 input 标签
    // 或者根据该网站特征，它可能是一个 placeholder 包含 "email" 的框
    const emailInput = page.locator('input'); 
    
    console.log("正在等待输入框出现...");
    await emailInput.waitFor({ timeout: 15000 });

    console.log("正在输入邮箱...");
    await emailInput.fill('ttt0090@gmail.com');

    console.log("正在尝试提交 (回车)...");
    await page.keyboard.press('Enter');

    // 等待 5 秒观察结果
    await page.waitForTimeout(5000);
    
    // 截图保存，方便你检查是否成功
    await page.screenshot({ path: 'result.png' });
    console.log("任务完成，截图已保存为 result.png");

  } catch (err) {
    console.error("运行出错:", err);
    await page.screenshot({ path: 'error.png' });
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
