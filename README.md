# Website

Website/
├── app/
│   ├── layout.tsx              # 全局版面與主題 Provider
│   ├── page.tsx                # 工具導覽首頁
│   ├── globals.css             # Tailwind v4 配置
│   ├── lottery/
│   │   └── page.tsx            # 抽籤工具實作
│   └── password-generator/
│       └── page.tsx            # 密碼生成工具實作
├── components/                 # 包含 Navbar, Footer, ThemeProvider
├── lib/
│   ├── lottery.ts              # 抽籤核心邏輯
│   └── password.ts             # 密碼生成與強度評估邏輯
├── postcss.config.mjs          # Tailwind v4 解析配置
└── tsconfig.json               # TypeScript 設定
