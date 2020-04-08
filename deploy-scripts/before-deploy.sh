#!/bin/bash
(cd minsky-one; tar czvf /home/travis/install-${TAGNAME}.tar.gz install)
(cd minsky-one; zip /home/travis/minskyOne-${TAGNAME}.zip target/minskyOne-0.2.war)
