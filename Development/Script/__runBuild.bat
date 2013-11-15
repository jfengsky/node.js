@echo off
Call %~dp0Environment\InitVSVars.bat
MSBuild.exe Build.targets /nologo /target:%1 /fileLogger /fileLoggerParameters:LogFile=%1.log;Verbosity=normal;Encoding=UTF-8 %2
if not %errorlevel% == 0 pause
