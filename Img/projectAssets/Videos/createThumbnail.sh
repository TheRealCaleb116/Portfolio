#!/bin/bash

# setup
FILES=*.webm
SEEK_POINT=00:00:05
IMG_FORMAT=png
FRAME_SIZE=1280X720
DEST=Thumbnails

for f in $FILES
do
  echo "Generating thumbnail for $f ..."
  ffmpeg -i $f -y -an -ss $SEEK_POINT -vcodec $IMG_FORMAT -r 1 -vframes 1 -s $FRAME_SIZE $DEST/_$f.$IMG_FORMAT 
  echo "===================================================="
done

echo "Press any key to close"

read -s -n 1

