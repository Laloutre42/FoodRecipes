FOR %a IN (*.jpg) DO convert "%a" -auto-orient -interlace Plane -strip -resize 320x240 -quality 60 320-240/%a
FOR %a IN (*.jpg) DO convert "%a" -auto-orient -interlace Plane -strip -resize 165x124 -quality 60 165-124/%a
