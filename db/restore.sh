DATE=`date +"%Y%m%d"`

DATEBASE="huohua_market"
FILE="$DATEBASE$DATE.sql"

mysql -uroot -proot $DATEBASE < $FILE