# !bin/bash

#set -e
#
#source envname/bin/activate


# pip freeze > requirements.txt

#git add .

#git commit -m 'deploy'

#
 cd ./Backend

 eb deploy hfl-backend-four



#npm run build
##
#aws s3 cp Backend/frontend/static/frontend/main.js s3://hfl-static-backend/static/frontend/staging/main.js --acl public-read
