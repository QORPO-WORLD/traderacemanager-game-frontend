#!/bin/bash

set -e # exit on err
echo "Preparing target S3 bucket: $1 ..."
aws s3 rm --recursive "s3://$1/"
echo "Target S3 bucket prepared"
