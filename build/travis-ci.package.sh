#!/bin/sh

if [ $TRAVIS_TAG ]
then
  echo "Building distribution packages"
  TAG=$(echo $TRAVIS_TAG | sed 's/v//g')
  npm run package:all
else
  echo "Omitting packaging"
fi
