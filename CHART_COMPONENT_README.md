# 图表组件使用说明

## 概述

本图表组件用于显示项目下载量的趋势数据，支持按项目和平台筛选数据，并提供交互式控制功能。

## 配置步骤

### 1. 配置 Supabase

#### 1.1 获取 Supabase 项目信息

1. 登录 [Supabase 控制台](https://app.supabase.com)
2. 创建一个新项目或选择现有项目
3. 点击左侧菜单的 "Settings"（设置）-> "API"
4. 复制以下信息：
   - `SUPABASE_URL`：项目 URL（如：`https://abc123.supabase.co`）
   - `SUPABASE_ANON_KEY`：匿名访问密钥（如：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`）

#### 1.2 配置 Supabase 数据库

1. 在 Supabase 控制台中点击 "SQL" 按钮
2. 运行以下 SQL 脚本创建表和策略：

```sql
-- 创建下载统计数据表
CREATE TABLE IF NOT EXISTS project_download_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_name TEXT NOT NULL,
    platform TEXT NOT NULL,
    downloads INTEGER NOT NULL,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引以提高查询效率
CREATE INDEX idx_project_download_stats_project ON project_download_stats(project_name);
CREATE INDEX idx_project_download_stats_platform ON project_download_stats(platform);
CREATE INDEX idx_project_download_stats_recorded_at ON project_download_stats(recorded_at DESC);

-- 允许匿名用户读写数据
ALTER TABLE project_download_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access on project_download_stats"
    ON project_download_stats FOR SELECT
    USING (true);

CREATE POLICY "Allow anonymous write access on project_download_stats"
    ON project_download_stats FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow anonymous update access on project_download_stats"
    ON project_download_stats FOR UPDATE
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow anonymous delete access on project_download_stats"
    ON project_download_stats FOR DELETE
    USING (true);
```

### 2. 配置 dashboard.html

在 `dashboard.html` 文件中找到 Supabase 配置部分，并替换为你的实际项目信息：

```javascript
        // Supabase 配置
        const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL'; // 从 SUPABASE_CONFIG.md 复制
        const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_PUBLIC_KEY';
```

### 3. 配置项目列表

在 `MOD_CONFIG` 对象中添加或修改项目配置：

```javascript
        // 项目配置
        const MOD_CONFIG = {
            modrinth: [
                { id: 'hvnOGUOZ', name: 'Stardew HUD' },
                { id: '1QJ8nLvE', name: 'Every Single Day' },
                { id: 'gI6SaK3q', name: 'Lucky Fishing Rod' },
                { id: 'GFtuSNC2', name: 'Totem of Luck' },
                { id: '33haE7q6', name: 'Yos Coins' },
                { id: 'qOekRw8e', name: 'Yos Trade Post' },
            ],

            curseforge: [
                { id: 1418842, name: 'Stardew HUD' },
                { id: 1418852, name: 'Every Single Day' },
                { id: 1418181, name: 'Lucky Fishing Rod' },
                { id: 1418161, name: 'Totem of Luck' },
                { id: 1418846, name: 'Yos Coins' },
                { id: 1421959, name: 'Yos Trade Post' },
            ]
        };
```

## 使用说明

### 1. 图表控件

- **项目筛选**：点击项目名称按钮可以显示或隐藏该项目的数据
- **平台筛选**：点击平台名称按钮可以显示或隐藏该平台的数据
- **重置按钮**：点击重置按钮可以重置所有筛选条件

### 2. 图表功能

- **趋势图**：显示项目下载量的时间趋势
- **悬停效果**：鼠标悬停在数据点上会显示详细信息
- **响应式设计**：图表会根据屏幕尺寸自动调整大小

## 常见问题

### 问题 1：图表不显示数据

- 检查浏览器控制台是否有错误信息
- 确认 Supabase 配置是否正确
- 确认网络连接是否正常
- 检查数据库中是否有数据

### 问题 2：数据更新不及时

- 确认 `updateStats()` 函数是否正常工作
- 检查 Supabase 访问权限设置
- 确认网络请求是否成功

### 问题 3：图表加载慢

- 优化查询：确保 `project_download_stats` 表有适当的索引
- 减少数据量：可以限制查询的数据范围
- 检查网络：确保网络连接稳定

## 测试

### 测试页面

可以使用 `test-chart.html` 页面来测试图表组件的功能：

1. 在项目根目录启动服务器：
   ```bash
   python3 -m http.server 8000
   ```

2. 在浏览器中访问 `http://localhost:8000/test-chart.html`

3. 测试图表的各种功能

### 功能测试

测试页面包含以下功能测试：

1. **数据更新**：点击"更新数据"按钮可以模拟数据更新
2. **添加数据集**：点击"添加数据集"按钮可以添加新的测试数据
3. **重置图表**：点击"重置"按钮可以重置图表到初始状态

## 技术说明

### 图表库

- 使用 Chart.js 库渲染图表
- 支持折线图、柱状图等多种图表类型
- 提供丰富的配置选项和交互功能

### 数据存储

- 使用 Supabase 作为数据存储和查询服务
- 支持实时数据同步
- 提供安全的访问控制机制

### 数据格式

图表组件期望的数据格式如下：

```javascript
{
    labels: ['2024-01-01', '2024-01-02', '2024-01-03'],
    datasets: [
        {
            label: 'Project1 (Modrinth)',
            data: [100, 200, 300],
            borderColor: '#FF6B6B',
            backgroundColor: '#FF6B6B20'
        },
        // 更多数据集...
    ]
}
```

## 更新日志

### 2024-01-01

- 初始版本发布
- 支持按项目和平台筛选数据
- 提供交互式控制功能
- 添加响应式设计支持