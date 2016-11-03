#!/bin/sh

if [ $TRAVIS_TAG ]
then
  echo "Deploying distribution packages to BinTray"
  TAG=$(echo $TRAVIS_TAG | sed 's/v//g')

  ls -al packages
  
  for package in ./packages/*; do
    [ -d "$package" ] || continue # if not a directory, skip

    dirname="$(basename "${path}")"
    tar -czf "$dirname.tar.gz" $path
    zip "$dirname.zip" $path

    curl -T "$path.tar.gz" -udevwurm:$BINTRAY_API_KEY "https://api.bintray.com/content/electron-microscope/electron-micrsocope/electron-microscope-stable/$TAG/$dirname.tar.gz"
    curl -T "$path.zip" -udevwurm:$BINTRAY_API_KEY "https://api.bintray.com/content/electron-microscope/electron-micrsocope/electron-microscope-stable/$TAG/$dirname..zip"
  done

else
  echo "Omitting deployment because it is not a tagged commit"
fi
