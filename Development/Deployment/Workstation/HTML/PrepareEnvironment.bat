@echo off
call gem install sass
if not %errorlevel% == 0 goto error
call gem install compass
if not %errorlevel% == 0 goto error
call npm install -g grunt-cli
if not %errorlevel% == 0 goto error
call npm install -g cheerio
if not %errorlevel% == 0 goto error
call npm install
if not %errorlevel% == 0 goto error
goto end

:error
echo Error accoured...
pause

:end
