#!/bin/sh

eval "$(ssh-agent -s)"
chmod 600 .travis/deploy.key
ssh-add .travis/deploy.key
ssh-keyscan kvstage.cloud >> ~/.ssh/known_hosts
git remote add deploy dokku@kvstage.cloud:holdopen
git config --global push.default simple
git push deploy master
