@echo off

if exist "%VS100COMNTOOLS%" set vspath=%VS100COMNTOOLS%
if exist "%VS110COMNTOOLS%" set vspath=%VS110COMNTOOLS%

Call "%vspath%\..\..\VC\vcvarsall.bat" x86_amd64
