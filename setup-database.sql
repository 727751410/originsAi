-- 族谱管理系统数据库初始化脚本
-- 请在MySQL中执行此脚本来创建必要的数据库

-- 创建数据库
CREATE DATABASE IF NOT EXISTS genealogy 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE genealogy;

-- 显示创建结果
SELECT 'Database genealogy created successfully' AS Status;

-- 注意: 数据表会由Spring Boot自动创建
-- 表结构:
-- - id: 主键，自增
-- - person_type: 人员类型 (husband/spouse)
-- - spouse_id: 配偶标识 (spouse, spouse2, spouse3...)
-- - surname: 姓
-- - firstname: 名
-- - mother: 母亲
-- - ranking: 排行
-- - marriage_type: 婚配类型
-- - living_status: 是否在世
-- - age: 享年
-- - birthday: 生日
-- - deathday: 歿于
-- - burial_place: 安厝地
-- - school: 学校
-- - education: 学历
-- - company: 单位
-- - position: 职务
-- - origin_place: 祖籍地
-- - current_address: 现居地
-- - phone: 电话
-- - wechat: 微信
-- - introduction: 简介
-- - photo_path: 头像路径
-- - created_time: 创建时间
-- - updated_time: 更新时间 