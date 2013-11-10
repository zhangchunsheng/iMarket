@echo off
if "%1"=="test" (
	php test.php
) else if "%1"=="testBcs" (
	php testBcs.php
) else if "%1"=="getMyappCategory" (
	php getMyappCategory.php
) else if "%1"=="getMyappBanner" (
	php getMyappBanner.php
) else if "%1"=="help" (
	echo hh command:
	echo hh test
	echo usable command:
	echo     test
	echo     testBcs
	echo     getMyappCategory
	echo     getMyappBanner
) else (
	echo wrong command
)