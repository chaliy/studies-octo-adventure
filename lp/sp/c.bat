@echo off

if exist z:\autoexec.bat goto dos
if exist c:\autoexec.bat goto dos

:win
jwasm\jwasm.exe -mz %1
goto end

:dos
jwasm\jwasmd.exe -mz %1

:end 