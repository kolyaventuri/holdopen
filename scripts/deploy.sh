#!/bin/sh
eval "$(ssh-agent -s)"
openssl aes-256-cbc -K $encrypted_ea482d0fbc94_key -iv $encrypted_ea482d0fbc94_iv -in .travis/deploy.key.enc -out .travis/deploy.key -d
chmod 600 ./.travis/deploy.key
ssh-add ./.travis/deploy.key
ssh-keyscan kvstage.cloud >> ~/.ssh/known_hosts
git remote add deploy dokku@kvstage.cloud:holdopen
git config --global push.default simple
git push deploy master
