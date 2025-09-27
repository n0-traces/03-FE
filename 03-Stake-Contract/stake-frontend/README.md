# Stake Frontend

## 📖 项目概述

Stake Frontend 是一个基于 Web3 的去中心化质押应用前端，为用户提供直观易用的界面来与 Stake 智能合约进行交互。用户可以通过此应用进行代币质押、解除质押、领取奖励等操作。

UI 设计风格：要求界面简约科技风

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/stake-frontend.git
cd stake-frontend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 文件

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## ✨ 项目特性

- 🔗 **多钱包支持** - MetaMask、WalletConnect、Coinbase Wallet 等
- ⚡ **实时数据** - 自动更新质押状态和奖励信息
- 🎨 **现代 UI** - 基于 Tailwind CSS 的响应式设计
- 🔒 **安全可靠** - 完整的错误处理和交易确认
- 📱 **移动友好** - 完美适配移动设备
- 🌐 **多网络** - 支持主网和测试网切换
- ⚙️ **TypeScript** - 完整的类型安全支持
- 🚀 **高性能** - 优化的代码分割和缓存策略

## 🎯 核心功能

### 1. 钱包连接

- 支持 MetaMask、WalletConnect 等主流钱包
- 自动检测网络并提示切换到正确网络
- 显示用户钱包地址和余额

### 2. 质押池管理

- 展示所有可用的质押池
- 显示池的详细信息（APY、总质押量、最小质押金额等）
- 实时更新池状态和奖励信息

### 3. 质押操作

- **质押代币**: 用户可以选择质押池并输入质押数量
- **解除质押**: 申请解除质押并显示锁定期倒计时
- **领取奖励**: 一键领取已累积的 MetaNode 奖励
- **提取代币**: 锁定期结束后提取解质押的代币

### 4. 用户仪表板

- 显示用户在各个池中的质押情况
- 实时显示待领取奖励
- 展示解质押请求状态和剩余锁定时间
- 历史交易记录

### 5. 管理员面板（仅管理员可见）

- 添加新的质押池
- 更新现有池的配置
- 暂停/恢复合约操作
- 系统状态监控

## 📖 用户使用指南

### 1. 连接钱包

1. 点击页面右上角的"Connect Wallet"按钮
2. 在 RainbowKit 弹窗中选择钱包类型：
   - MetaMask（推荐）
   - WalletConnect
   - Coinbase Wallet
   - 其他支持的钱包
3. 确认连接并切换到 Sepolia 测试网
4. 授权应用访问钱包地址

### 2. 查看质押池

1. 在首页或质押池页面查看可用池
2. 查看每个池的 APY、总质押量等信息
3. 选择合适的池进行质押

### 3. 进行质押

1. 点击"质押"按钮
2. 输入质押数量
3. 确认授权（首次质押需要）
4. 确认质押交易

### 4. 管理质押

1. 在仪表板查看质押状态
2. 随时领取累积奖励
3. 申请解除质押（需等待锁定期）
4. 锁定期结束后提取代币

## 🛠️ 技术栈

- **前端框架**: Next.js 14+
- **Web3 库**: ethers.js v6
- **钱包连接**: RainbowKit + wagmi
- **UI 组件库**: Tailwind CSS + Headless UI
- **状态管理**: Zustand / React Context
- **样式**: Tailwind CSS
- **构建工具**: Next.js (内置 Webpack)

## 📁 页面结构

```
src/
├── components/          # 通用组件
│   ├── WalletConnect/   # 钱包连接组件
│   ├── PoolCard/        # 质押池卡片
│   ├── StakeModal/      # 质押弹窗
│   └── ...
├── pages/               # 页面组件
│   ├── Home/            # 首页
│   ├── Pools/           # 质押池列表
│   ├── Dashboard/       # 用户仪表板
│   └── Admin/           # 管理员面板
├── hooks/               # 自定义 Hooks
│   ├── useContract/     # 合约交互
│   ├── useWallet/       # 钱包状态
│   └── ...
├── utils/               # 工具函数
│   ├── contract.js      # 合约配置
│   ├── format.js        # 数据格式化
│   └── ...
└── constants/           # 常量配置
    ├── contracts.js     # 合约地址
    ├── networks.js      # 网络配置
    └── ...
```

## 🔧 主要功能模块

### 钱包连接模块

```javascript
// 连接钱包
const connectWallet = async () => {
  // 连接逻辑
};

// 切换网络
const switchNetwork = async (chainId) => {
  // 网络切换逻辑
};
```

### 合约交互模块

```javascript
// 质押操作
const stake = async (poolId, amount) => {
  // 质押逻辑
};

// 解除质押
const unstake = async (poolId, amount) => {
  // 解质押逻辑
};

// 领取奖励
const claimReward = async (poolId) => {
  // 领取奖励逻辑
};
```

### 数据获取模块

```javascript
// 获取池信息
const getPoolInfo = async (poolId) => {
  // 获取池信息逻辑
};

// 获取用户信息
const getUserInfo = async (poolId, userAddress) => {
  // 获取用户信息逻辑
};
```

## ⚙️ 开发环境设置

### 前置要求

- Node.js >= 16.0.0
- npm 或 yarn
- 现代浏览器（支持 Web3）

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 环境配置

创建 `.env` 文件：

```env
REACT_APP_CHAIN_ID=11155111
REACT_APP_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
REACT_APP_STAKE_CONTRACT_ADDRESS=0x...
REACT_APP_METANODE_TOKEN_ADDRESS=0x...
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

应用将在 `http://localhost:3000` 启动

## 🚀 部署

### 一键部署到 Vercel

1. 点击上方的 "Deploy with Vercel" 按钮
2. 连接你的 GitHub 账户
3. 配置环境变量（见下方环境配置）
4. 点击部署，几分钟内即可上线

### 推荐：Vercel 部署（零配置）

#### 方法一：GitHub 集成（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 自动部署完成

#### 方法二：Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 部署到生产环境
vercel --prod
```

#### Vercel 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_METANODE_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### 其他部署选项

#### 构建生产版本

```bash
npm run build
npm run start
```

#### 静态导出（用于 IPFS/CDN）

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
module.exports = nextConfig;
```

```bash
npm run build
# 静态文件生成在 out/ 目录
```

## ⚠️ 错误处理

### 常见错误及解决方案

1. **钱包未连接**

   - 确保已安装并连接钱包

2. **网络错误**

   - 检查是否连接到正确的网络（Sepolia）

3. **余额不足**

   - 确保钱包中有足够的代币和 Gas 费

4. **授权失败**

   - 重新进行代币授权操作

5. **交易失败**
   - 检查 Gas 费设置
   - 确认合约参数正确

## 🔒 安全注意事项

1. **私钥安全**: 永远不要分享私钥或助记词
2. **网站验证**: 确保访问的是官方网站
3. **交易确认**: 仔细检查交易详情再确认
4. **定期备份**: 备份钱包和重要数据
5. **测试网使用**: 在主网使用前先在测试网测试

## 🌐 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ⚡ 性能优化

1. **代码分割**: 使用 React.lazy 进行路由级代码分割
2. **缓存策略**: 合理缓存合约数据和用户状态
3. **图片优化**: 使用 WebP 格式和懒加载
4. **Bundle 优化**: 移除未使用的代码和依赖

## 🧪 测试

### TypeScript 配置

确保 `tsconfig.json` 包含正确的路径映射：

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 运行测试

```bash
npm test
# 或
yarn test
```

### E2E 测试

```bash
npm run test:e2e
# 或
yarn test:e2e
```

## ❓ 常见问题

### Q: 钱包连接失败怎么办？

**A:** 请检查以下几点：

- 确保已安装 MetaMask 或其他支持的钱包
- 检查网络是否正确（Sepolia 测试网）
- 清除浏览器缓存并刷新页面
- 确保钱包已解锁

### Q: 交易一直处于待确认状态？

**A:** 可能的原因：

- Gas 费设置过低，可以在钱包中加速交易
- 网络拥堵，请耐心等待
- 检查钱包是否有足够的 ETH 支付 Gas 费

### Q: 无法看到质押余额？

**A:** 请确认：

- 钱包地址是否正确连接
- 是否在正确的网络上
- 合约地址配置是否正确
- 刷新页面重新连接钱包

### Q: Vercel 部署后环境变量不生效？

**A:** 解决方案：

- 确保环境变量以 `NEXT_PUBLIC_` 开头
- 在 Vercel 项目设置中正确配置环境变量
- 重新部署项目使环境变量生效

### Q: 本地开发时合约调用失败？

**A:** 检查项目：

- `.env.local` 文件是否正确配置
- 合约地址和 ABI 是否匹配
- 网络 RPC 端点是否可用
- 钱包是否有足够的测试代币

## 🔧 故障排除

### 常见错误及解决方案

#### 1. "Cannot read properties of undefined"

```bash
# 清除 Next.js 缓存
rm -rf .next
npm run dev
```

#### 2. "Module not found" 错误

```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

#### 3. 钱包连接问题

```javascript
// 检查 RainbowKit 配置
console.log("Wagmi Config:", wagmiConfig);
console.log("Chains:", chains);
```

#### 4. 合约交互失败

```javascript
// 验证合约配置
console.log("Contract Address:", STAKE_CONTRACT_ADDRESS);
console.log("Chain ID:", chainId);
```

## 📞 技术支持

如果遇到其他问题，请：

1. 查看浏览器控制台错误信息
2. 检查网络连接和钱包状态
3. 参考 [Next.js 文档](https://nextjs.org/docs)
4. 查看 [RainbowKit 文档](https://www.rainbowkit.com/docs)
5. 提交 GitHub Issue 获取帮助

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

MIT License

## 💬 支持

如有问题或建议，请通过以下方式联系：

- GitHub Issues
- Discord 社区
- Telegram 群组

## 📝 更新日志

### v1.0.0

- 初始版本发布
- 基础质押功能
- 钱包连接支持

### v1.1.0

- 添加管理员面板
- 优化用户体验
- 修复已知问题
