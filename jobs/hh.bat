@echo off
if "%1"=="test" (
	php test.php
) else if "%1"=="testBcs" (
	php testBcs.php
) else if "%1"=="getMyappChannel" (
	php getMyappNecessary.php
	php getMyappRecommend.php
) else if "%1"=="getMyappNecessary" (
	php getMyappNecessary.php
) else if "%1"=="getMyappRecommend" (
	php getMyappRecommend.php
) else if "%1"=="getMyappCategory" (
	php getMyappCategory.php
) else if "%1"=="getMyappBanner" (
	php getMyappBanner.php
) else if "%1"=="getMyappApp" (
	php getMyappApp.php
) else if "%1"=="getMyappGame" (
	php getMyappGame.php
) else if "%1"=="getMyappSubject" (
	php getMyappSubject.php
) else if "%1"=="getMyappSubjectDetail" (
	php getMyappSubjectDetail.php
) else if "%1"=="getMyappCategoryApp" (
	php getMyappCategoryApp.php
) else if "%1"=="getUpdateTencentApp" (
	php getUpdateTencentApp.php
) else if "%1"=="getMyappAppDetail" (
	php getMyappAppDetail.php
) else if "%1"=="help" (
	echo hh command:
	echo hh test
	echo usable command:
	echo     test
	echo     testBcs
	echo     getMyappChannel
	echo     getMyappNecessary
	echo     getMyappRecommend
	echo     getMyappCategory
	echo     getMyappBanner
	echo     getMyappApp
	echo     getMyappGame
	echo     getMyappSubject
	echo     getMyappSubjectDetail
	echo     getMyappCategoryApp
	echo     getUpdateTencentApp
	echo     getMyappAppDetail
) else (
	echo wrong command
)