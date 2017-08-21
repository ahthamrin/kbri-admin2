#!/bin/bash
cat LAPOR_DIRI_FORM_LIST.js LAPOR_DIRI_PELAJAR_FORM_LIST.js LAPOR_DIRI_PEKERJA_FORM_LIST.js |grep -E "^\s+name:"|grep -E -v "(divider|sub-)"|sed -e "s/name//; s/: //; s/'/\"/g; "
