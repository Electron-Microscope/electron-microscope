#!/bin/sh

if [ $TRAVIS_TAG ]
then
  echo "Building distribution packages"
  TAG=$(echo $TRAVIS_TAG | sed 's/v//g')
  npm run build:prod
  npm run package:linux && npm run package:mac
else
  echo "Omitting packaging"
fi
