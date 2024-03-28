#!/bin/sh
#
# DON'T EDIT THIS!
#
# CodeCrafters uses this file to test your code. Don't make any changes here!
#
# DON'T EDIT THIS!
cp $(dirname $0)/app/ . -r
ls -l
exec node main.js "$@"
