@echo off
call grunt --gruntfile %~dp0Gruntfile.js --base .
if not %errorlevel% == 0 goto error
goto end

:error
echo Error accoured compress assets...
pause

:end
exit