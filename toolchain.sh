#!/bin/bash

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  NODE_URL=https://nodejs.org/dist/v12.14.1/node-v12.14.1-linux-x64.tar.xz
elif [[ "$OSTYPE" == "darwin"* ]]; then
  NODE_URL=https://nodejs.org/dist/v12.18.3/node-v12.18.3-darwin-x64.tar.gz
fi

# Cleanup
rm -rf toolchain

# Download and extract nodejs
mkdir -p toolchain/node
curl $NODE_URL | tar --strip-components=1 -C toolchain/node -Jxf -

# Add nodejs to PATH
export PATH=`pwd`/toolchain/node/bin:$PATH
