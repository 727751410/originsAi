@echo off
echo 正在启动族谱管理系统...
echo.
echo 请确保MySQL数据库已启动，并且存在名为'genealogy'的数据库
echo 数据库连接信息: 127.0.0.1:3306, 用户名: root, 密码: root
echo.
echo 启动中，请稍候...
echo.

.\mvnw.cmd spring-boot:run

echo.
echo 应用程序已停止
pause 