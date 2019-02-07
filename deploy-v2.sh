# !bin/bash

#set -e
#
#source envname/bin/activate


# pip freeze > requirements.txt

#git add .

#git commit -m 'deploy'

npm run build

aws s3 cp Backend/frontend/static/frontend/main.js s3://hfl-static-backend/static/frontend/main.js --acl public-read


#  cd ./Backend

#  eb deploy hfl-server-side-two