@echo off
cd views\project\assets
start compass watch
cd ..\..\..\..\..\Deployment\Workstation\HTML
start _apiServer.bat
start _DemoServer.bat
start _StartServer.bat