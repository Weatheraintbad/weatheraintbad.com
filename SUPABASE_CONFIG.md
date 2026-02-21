# Supabase 配置指南

本文档详细介绍如何在 Supabase 中配置项目，以便文档管理系统能够正常使用 Supabase 作为存储后端。

## 1. 创建 Supabase 项目

### 步骤 1：注册/登录 Supabase

1. 访问 [Supabase 官网](https://supabase.com/)
2. 点击 "Start your project" 或 "Sign in"
3. 使用 GitHub、GitLab、Google 账号或邮箱注册登录

### 步骤 2：创建新项目

1. 登录后，点击 "New Project" 按钮
2. 填写项目信息：
   - **Project name**: 输入项目名称（例如：`weatheraintbad-docs`）
   - **Database Password**: 设置数据库密码（请妥善保存）
   - **Region**: 选择离你最近的区域（例如：`East Asia`）
3. 点击 "Create new project"

### 步骤 3：获取 API 密钥和项目 URL

项目创建完成后：

1. 在项目仪表盘点击右上角的 "Settings"（设置）
2. 在左侧菜单选择 "API"
3. 复制以下信息（稍后会用到）：
   - **Project URL**: 项目的访问地址（例如：`https://abc123.supabase.co`）
   - **anon public**: 匿名访问密钥（例如：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`）

## 2. 创建文档表

### 步骤 1：打开 SQL 编辑器

1. 在项目仪表盘点击左侧的 "SQL Editor"（SQL 编辑器）
2. 点击 "New query" 创建新查询

### 步骤 2：创建 `documents` 表

将以下 SQL 代码复制到 SQL 编辑器中并执行：

```sql
-- 创建文档表
CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL DEFAULT '未命名文档',
    content TEXT NOT NULL DEFAULT '',
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published BOOLEAN NOT NULL DEFAULT false
);

-- 创建索引以提高查询效率
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at);
CREATE INDEX IF NOT EXISTS idx_documents_updated_at ON documents(updated_at);
CREATE INDEX IF NOT EXISTS idx_documents_slug ON documents(slug);

-- 启用行级安全策略（RLS）
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略，允许匿名用户读取文档
CREATE POLICY "Allow anonymous read access" ON documents
    FOR SELECT
    USING (true);

-- 创建 RLS 策略，允许匿名用户写入文档
CREATE POLICY "Allow anonymous write access" ON documents
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

**注意**：上述策略允许匿名用户读写所有文档。如果需要更严格的权限控制，可以修改 RLS 策略。

### 步骤 3：验证表创建成功

1. 点击 SQL 编辑器的 "Run" 按钮
2. 执行成功后，点击左侧的 "Table Editor"（表编辑器）
3. 确认 `documents` 表已成功创建

## 3. 配置前端代码

### 步骤 1：修改 `doc.html` 配置

打开 `/Users/apple/Desktop/Project Files/Dev/Repo/weatheraintbad.com/doc.html` 文件，找到以下代码：

```javascript
// Supabase 配置
// 请在 https://supabase.com/ 创建项目并获取以下信息
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_PUBLIC_KEY';
```

将 `YOUR_SUPABASE_PROJECT_URL` 和 `YOUR_SUPABASE_ANON_PUBLIC_KEY` 替换为你在步骤 1.3 中复制的实际值。

### 步骤 2：验证配置

1. 在浏览器中打开 `doc.html`（本地打开即可）
2. 输入访问密码（默认为 `147896325`）
3. 点击 "新建文档" 测试创建功能
4. 确认文档能够正常保存和加载

## 4. 高级配置（可选）

### 自定义权限控制

如果需要更严格的权限控制，可以修改 RLS 策略。例如：

1. 只允许特定用户访问
2. 限制文档修改权限
3. 添加文档所有者概念

### 数据备份

Supabase 提供自动备份功能：

1. 在项目仪表盘点击 "Settings" → "Database"
2. 查看 "Backup" 部分
3. 配置自动备份频率

### 监控和分析

Supabase 提供实时监控和分析：

1. 在项目仪表盘点击 "Analytics"（分析）
2. 查看数据库性能指标
3. 监控 API 请求和响应时间

## 5. 故障排除

### 常见问题

**问题 1：无法连接到 Supabase**

- 检查 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 是否正确
- 确认网络连接正常
- 检查 Supabase 项目状态（是否正常运行）

**问题 2：无法读取/写入文档**

- 确认 `documents` 表已正确创建
- 检查 RLS 策略是否允许读写操作
- 查看浏览器控制台的错误信息

**问题 3：数据不显示**

- 检查网络请求是否成功
- 确认表中是否有数据
- 查看浏览器控制台的错误信息

### 调试工具

1. **浏览器控制台**：查看网络请求和错误信息
2. **Supabase 日志**：在项目仪表盘点击 "Logs"（日志）查看详细请求日志
3. **SQL 查询**：使用 SQL 编辑器直接查询数据库确认数据

## 6. 迁移现有数据（可选）

如果你之前使用 GitHub Gist 存储了文档，可以使用以下步骤迁移数据：

### 步骤 1：导出 Gist 数据

1. 在浏览器中打开 `doc.html`
2. 按 `F12` 打开开发者工具
3. 在控制台中输入：
   ```javascript
   console.log(JSON.stringify(documents, null, 2));
   ```
4. 复制输出的 JSON 数据

### 步骤 2：导入到 Supabase

1. 在 Supabase SQL 编辑器中执行：
   ```sql
   INSERT INTO documents (id, title, content, slug, created_at, updated_at)
   VALUES
       -- 在这里粘贴从 Gist 导出的数据
       -- 例如：('123', '文档标题', '内容', 'slug', '2024-01-01', '2024-01-01')
   ```

**注意**：需要将导出的数据转换为 SQL 插入语句格式。

## 7. 安全注意事项

1. **API 密钥安全**：不要将 `SUPABASE_ANON_KEY` 暴露在公共代码库中
2. **权限控制**：根据需要调整 RLS 策略
3. **密码保护**：确保页面访问密码强度足够
4. **HTTPS**：在生产环境中使用 HTTPS 协议

## 联系支持

如果遇到无法解决的问题：

1. 查看 [Supabase 文档](https://supabase.com/docs)
2. 访问 [Supabase 社区论坛](https://github.com/supabase/supabase/discussions)
3. 检查项目的 "Issues" 页面