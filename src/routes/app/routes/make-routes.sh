#!/bin/bash
if [ -z $3 ]; then
	echo "$0 MyRoute myRoute MY_ROUTE"
	exit
fi
cp -R DataGraph $1
mv $1/components/DataGraph.js $1/components/$1.js
mv $1/containers/DataGraphContainer.js $1/containers/${1}Container.js
mv $1/modules/dataGraph.js $1/modules/$2.js

vim -c ":bufdo %s/dataGraph/$2/ge | update" -c ":bufdo %s/DATA_GRAPH/$3/ge | update" -c ":bufdo %s/DataGraph/$1/ge | update" `find $1 -type f`
