#!/bin/bash
(cd minsky-one; tar czvf /home/travis/install-${TAGNAME}.tar.gz install)
(cd minsky-one/target; echo "${TAGNAME} `date`" > minskyOne-release.txt)
(cd minsky-one/target; zip /home/travis/minskyOne-${TAGNAME}.zip minskyOne-0.2.war minskyOne-release.txt)
