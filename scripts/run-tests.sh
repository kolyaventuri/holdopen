#!/bin/sh
set -ev

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  npm test
fi
