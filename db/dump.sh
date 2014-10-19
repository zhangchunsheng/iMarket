DATE=`date +"%Y%m%d"`

DATEBASE="huohua_market"
FILE="$DATEBASE$DATE.sql"

mysqldump -uroot -proot --databases $DATEBASE > $FILE