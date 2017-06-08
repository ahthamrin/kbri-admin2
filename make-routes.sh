#!/bin/bash
if [ -z $3 ]; then
	echo "$0 MyRoute myRoute MY_ROUTE"
	exit
fi
cp -R src/routes/Template src/routes/$1
mv src/routes/$1/components/Login.js src/routes/$1/components/$1.js
mv src/routes/$1/containers/LoginContainer.js src/routes/$1/containers/${1}Container.js
mv src/routes/$1/modules/login.js src/routes/$1/modules/$2.js

vim -c ":bufdo %s/login/$2/ge | update" -c ":bufdo %s/LOGIN/$3/ge | update" -c ":bufdo %s/Login/$1/ge | update" `find src/routes/$1 -type f`
