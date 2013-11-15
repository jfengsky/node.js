@echo off
call node %~dp0build.js
if not %errorlevel% == 0 goto error
goto end

:error
echo Error accoured extracting html pages...
pause

:end
exit