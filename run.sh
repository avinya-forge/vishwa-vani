#!/bin/bash
if [ "$1" == "--test" ]; then
  npm run test -- --passWithNoTests
elif [ "$1" == "--deploy" ]; then
  npm run build
else
  echo "Usage: ./run.sh --test | --deploy"
fi
