# !bin/bash
cd .. 

git add .

git commit -m 'backend-build'

cd Backend

source env/bin/activate

pip freeze > requirements.txt

eb deploy