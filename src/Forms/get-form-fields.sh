#!/bin/bash
cat $1 |grep -E "^\s+name:"|grep -E -v "(divider|sub-)"|sed -e "s/name//; s/: //; s/'/\"/g; "
