# !bin/bash

#set -e
#
#source envname/bin/activate


# pip freeze > requirements.txt

git add .

git commit -m 'deploy'

# echo "yes" | python manage.py collectstatic

eb deploy --profile hfl hfl-server-side