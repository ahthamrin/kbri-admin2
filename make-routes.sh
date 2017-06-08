#!/bin/bash
cp -R src/routes/Counter src/routes/$1
mv src/routes/$1/components/Counter.js src/routes/$1/components/$1.js
mv src/routes/$1/containers/CounterContainer.js src/routes/$1/containers/${1}Container.js
mv src/routes/$1/modules/Counter.js src/routes/$1/modules/$1.js

vim -c ":bufdo %s/counter/$2/ge | update" -c ":bufdo %s/COUNTER/$3/ge | update" -c ":bufdo %s/Counter/$1/ge | update" `find src/routes/$1 -type f`
