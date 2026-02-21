# 修复文档发布功能问题

## 问题描述
在使用文档管理系统时，点击"发布于博客"或"保存文档"按钮会报错：
```
Failed to load resource: the server responded with a status of 400 ()
保存文档到 Supabase 失败: Error: Update failed: 400 - {"code":"PGRST204","details":null,"hint":null,"message":"Could not find the 'published' column of 'documents' in the schema cache"}
```

## 问题原因
数据库中的 `documents` 表缺少 `published` 字段。代码中期望这个字段用于控制文档是否发布到博客页面，但实际数据库表结构中没有这个字段。

## 解决方案

### 方法 1：在 Supabase 仪表板执行 SQL（推荐）

1. 登录到 [Supabase 仪表板](https://app.supabase.com/)
2. 打开你的项目
3. 在左侧菜单中点击 **SQL Editor**（SQL 编辑器）
4. 点击 **New query** 创建新查询
5. 复制并粘贴以下 SQL 代码：

```sql
-- 为 documents 表添加 published 字段（如果不存在）
ALTER TABLE documents ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;
```

6. 点击 **Run** 按钮执行 SQL
7. 执行成功后，刷新页面测试功能

### 方法 2：重新创建表（不推荐，会丢失数据）

如果你没有重要数据，可以重新创建表：

```sql
-- 删除旧表（会删除所有数据）
DROP TABLE IF EXISTS documents;

-- 创建包含 published 字段的新表
CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL DEFAULT '未命名文档',
    content TEXT NOT NULL DEFAULT '',
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published BOOLEAN NOT NULL DEFAULT false
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at);
CREATE INDEX IF NOT EXISTS idx_documents_updated_at ON documents(updated_at);
CREATE INDEX IF NOT EXISTS idx_documents_slug ON documents(slug);

-- 启用 RLS 策略
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户读写（使用 IF NOT EXISTS 避免重复创建）
CREATE POLICY IF NOT EXISTS "Allow anonymous read access" ON documents
    FOR SELECT
    USING (true);

CREATE POLICY IF NOT EXISTS "Allow anonymous write access" ON documents
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

## 验证修复

1. 执行 SQL 后，重新打开 `doc.html`
2. 输入密码登录（默认为 `147896325`）
3. 选择一个文档，点击"发布于博客"
4. 然后打开 `blog.html` 查看是否显示该文档
5. 如果一切正常，说明修复成功

## 后续建议

1. 建议在开发过程中定期备份数据库
2. 如果需要修改表结构，先在开发环境测试
3. 重要操作前请备份数据

## 联系支持

如果问题仍未解决：
1. 检查浏览器控制台的详细错误信息
2. 查看 Supabase 项目的 **Logs** 页面
3. 检查网络请求是否正常