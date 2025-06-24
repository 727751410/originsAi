# 族谱管理系统

基于Spring Boot + MySQL的族谱管理系统，支持丈夫和配偶信息的管理和持久化存储。

## 功能特性

- 丈夫信息管理
- 多配偶信息管理（支持动态添加）
- 完整的个人信息字段（姓名、排行、婚配类型、生日、学历、工作等）
- 头像上传功能
- 日期选择器（支持公历、农历、自定义格式）
- 数据持久化到MySQL数据库
- 响应式Web界面

## 技术栈

- **后端**: Spring Boot 2.7.0, Spring Data JPA, MySQL
- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **数据库**: MySQL 8.0+
- **构建工具**: Maven

## 环境要求

- JDK 8+
- Maven 3.6+
- MySQL 8.0+
- Web浏览器 (推荐Chrome/Firefox)

## 快速开始

### 1. 数据库准备

首先在MySQL中创建数据库：

```sql
CREATE DATABASE genealogy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. 配置数据库连接

确认 `src/main/resources/application.properties` 中的数据库配置：

```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/genealogy?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=root
```

### 3. 编译和运行

#### 方式1: 使用Maven (推荐)
如果系统已安装Maven:
```bash
mvn clean compile
mvn spring-boot:run
```

#### 方式2: 使用Maven Wrapper (无需安装Maven)
```bash
# Windows
.\mvnw.cmd spring-boot:run

# 或使用提供的批处理文件
.\run.bat
```

#### 方式3: 使用IDE
1. 导入项目到IDE (如IntelliJ IDEA, Eclipse)
2. 运行 `GenealogyManagerApplication.java` 主类

#### 方式4: 使用预编译JAR
如果提供了预编译的JAR文件:
```bash
java -jar genealogy-manager-1.0.0.jar
```

### 4. 访问应用

应用启动后，打开浏览器访问：
- 主页: http://localhost:8081/genealogy/
- 直接访问族谱管理: http://localhost:8081/genealogy/genealogy_manager.html  
- API健康检查: http://localhost:8081/genealogy/api/persons/health

**注意**: 默认端口为8081，如端口冲突可在`application.properties`中修改

## 数据库表结构

系统会自动创建 `persons` 表，包含以下字段：

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | BIGINT | 主键，自增 |
| person_type | VARCHAR(50) | 人员类型 (husband/spouse) |
| spouse_id | VARCHAR(50) | 配偶标识 (spouse, spouse2, spouse3...) |
| surname | VARCHAR(50) | 姓 |
| firstname | VARCHAR(100) | 名 |
| mother | VARCHAR(100) | 母亲 |
| ranking | VARCHAR(100) | 排行 |
| marriage_type | VARCHAR(50) | 婚配类型 |
| living_status | BOOLEAN | 是否在世 |
| age | INT | 享年 |
| birthday | VARCHAR(200) | 生日 |
| deathday | VARCHAR(200) | 歿于 |
| burial_place | VARCHAR(500) | 安厝地 |
| school | VARCHAR(200) | 学校 |
| education | VARCHAR(200) | 学历 |
| company | VARCHAR(200) | 单位 |
| position | VARCHAR(200) | 职务 |
| origin_place | VARCHAR(200) | 祖籍地 |
| current_address | VARCHAR(200) | 现居地 |
| phone | VARCHAR(200) | 电话 |
| wechat | VARCHAR(200) | 微信 |
| introduction | VARCHAR(600) | 简介 |
| photo_path | VARCHAR(500) | 头像路径 |
| created_time | DATETIME | 创建时间 |
| updated_time | DATETIME | 更新时间 |

## API接口

### 保存人员信息
- **URL**: `/api/persons/save`
- **方法**: POST
- **请求体**: JSON格式的丈夫和配偶信息

### 获取所有人员信息
- **URL**: `/api/persons/all`
- **方法**: GET

### 获取丈夫信息
- **URL**: `/api/persons/husband`
- **方法**: GET

### 获取所有配偶信息
- **URL**: `/api/persons/spouses`
- **方法**: GET

### 获取特定配偶信息
- **URL**: `/api/persons/spouse/{spouseId}`
- **方法**: GET

### 删除配偶
- **URL**: `/api/persons/spouse/{spouseId}`
- **方法**: DELETE

## 使用说明

### 添加丈夫信息
1. 在"赵万辅"标签页中填写丈夫的各项信息
2. 点击头像区域可以上传照片
3. 使用日期选择器设置生日和忌日

### 添加配偶信息
1. 点击"添加配偶"按钮创建新的配偶标签页
2. 在配偶标签页中填写配偶信息
3. 可以设置婚配类型（娶、继娶、妣等）
4. 支持多个配偶的管理

### 保存信息
1. 填写完所有信息后，点击"保存信息"按钮
2. 系统会将所有丈夫和配偶信息保存到数据库
3. 保存成功后会显示提示信息

### 标签页管理
- 可以点击标签名称编辑配偶名字
- 可以点击"×"删除配偶标签页
- 配偶标签页之间可以通过"⇄"符号互换位置

## 开发说明

### 项目结构
```
src/
├── main/
│   ├── java/
│   │   └── com/genealogy/
│   │       ├── GenealogyManagerApplication.java  # 启动类
│   │       ├── controller/                       # 控制器
│   │       ├── entity/                          # 实体类
│   │       ├── repository/                      # 数据访问层
│   │       └── service/                         # 业务逻辑层
│   └── resources/
│       ├── application.properties               # 配置文件
│       └── static/
│           └── genealogy_manager.html          # 前端页面
```

### 扩展开发
- 可以添加子女信息管理功能
- 可以增加族谱图表生成功能
- 可以添加数据导入导出功能
- 可以集成文件上传服务处理头像存储

## 故障排除

### Maven相关问题
1. **Maven未安装**: 使用Maven Wrapper (`.\mvnw.cmd`) 或在IDE中运行
2. **网络问题**: 检查网络连接，Maven需要下载依赖包
3. **权限问题**: 确保有足够权限下载和运行程序

### 数据库连接问题
1. **MySQL未启动**: 确保MySQL服务正在运行
2. **数据库不存在**: 运行 `setup-database.sql` 脚本创建数据库
3. **连接参数错误**: 检查 `application.properties` 中的数据库配置

### 端口冲突
1. **8081端口被占用**: 修改 `application.properties` 中的 `server.port`
2. **检查端口**: 使用 `netstat -an | findstr 8081` 检查端口状态

### 常用命令
```bash
# 检查Java版本
java -version

# 检查端口占用
netstat -an | findstr 8081

# 查看Java进程
tasklist | findstr java
```

## 许可证

此项目仅供学习和研究使用。 