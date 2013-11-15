@echo off
set d=%~dp0
cd ..\Deployment\Workstation\HTML
start _StartServer %d%HTML\_Building.bat
cd %d%