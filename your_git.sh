#!/bin/sh
#
# DON'T EDIT THIS!
#
# CodeCrafters uses this file to test your code. Don't make any changes here!
#
# DON'T EDIT THIS!
cp $(dirname $0)/package.json .
cp $(dirname $0)/package-lock.json .
cp $(dirname $0)/app/* .
exec node main.js "$@"
