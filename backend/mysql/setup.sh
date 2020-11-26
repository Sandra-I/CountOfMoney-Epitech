#!/bin/sh

mysql -u $MYSQL_USER --password=$MYSQL_PASSWORD $MYSQL_DATABASE < /setup.sql
