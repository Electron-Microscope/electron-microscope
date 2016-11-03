#!/bin/sh

if [ $TRAVIS_TAG ]
then
  echo "Deploying distribution packages to BinTray"
  TAG=$(echo $TRAVIS_TAG | sed 's/v//g')

  ls -al packages
  
  for package in ./packages/*; do
    [ -d "$package" ] || continue # if not a directory, skip

    dirname="$(basename "${package}")"
    tar -czf "$dirname.tar.gz" $package
    zip "$dirname.zip" $package

    curl -T "$dirname.tar.gz" -udevwurm:$BINTRAY_API_KEY "https://api.bintray.com/content/electron-microscope/electron-micrsocope/electron-microscope-stable/$TAG/$dirname.tar.gz?publish=1?override=1"
    curl -T "$dirname.zip" -udevwurm:$BINTRAY_API_KEY "https://api.bintray.com/content/electron-microscope/electron-micrsocope/electron-microscope-stable/$TAG/$dirname.zip?publish=1?override=1"
  done

else
  echo "Omitting deployment because it is not a tagged commit"
fi
