# !bin/bash

cd ..

git add .

git commit -m 'Frontend deploy'

cd Frontend

rm -rf build

npm run build 

aws s3 sync build/ s3://www.hflcharleston.com


