#!/bin/bash
cd /home/kavia/workspace/code-generation/online-snake-and-ladder-platform-156057/snake_and_ladder_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

