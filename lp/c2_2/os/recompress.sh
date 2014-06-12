#!/bin/bash
echo Dowload selected file
wget -O tmp_file.zip $1

echo Make tempfolder
mkdir tmp_archive

echo Unzip file to temp folder
unzip tmp_file.zip -d tmp_archive

echo Remove temp file
rm tmp_file.zip -f

echo Tar content of the temp folder

tar --directory tmp_archive -cz -f result.tar.gz .

echo Remove temp folder
rm tmp_archive -fr
