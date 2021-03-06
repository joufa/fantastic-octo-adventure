#!/bin/sh

RUNDATA="`ss -tulw | grep 4200`"
CONSOLES="`(cd src ; grep -r -l console.log)`"
TODOS="`(cd src ; grep -r -l TODO)`"

if [ "$TODOS" != "" ];
then
  echo "\e[93mWarning: TODO's found:"
  echo "\e[35m$TODOS"
fi

if [ "$CONSOLES" != "" ];
then
  echo "\e[93mWarning: console.logs found in the following files:"
  echo "\e[35m$CONSOLES"
fi
echo "\e[39m"
if [ "$RUNDATA" = "" ];
then
  set -e
  ng lint --fix
  npx jest
  ng e2e --webdriver-update=false
  ng build --prod --build-optimizer=false
  echo "\e[32mAll set!"
else
  echo "\e[91mApp is running, not excuting script"
fi
