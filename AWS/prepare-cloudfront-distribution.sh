#!/bin/bash

set -e # exit on err
echo "Preparing cloudfront distribution invalidation: $1 ..."
aws cloudfront create-invalidation --distribution-id $1 --paths "/*"
