#!/bin/bash

NODE_URL=https://nodejs.org/dist/v12.14.1/node-v12.14.1-linux-x64.tar.xz

# Cleanup
rm -rf toolchain

# Download and extract nodejs
mkdir -p toolchain/node
curl $NODE_URL | tar --strip-components=1 -C toolchain/node -Jxf -

# Add nodejs to PATH
export PATH=`pwd`/toolchain/node/bin:$PATH
