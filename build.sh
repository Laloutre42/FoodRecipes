#!/bin/bash

# Build foodrecipes-client
gulp build --env=prod
docker build -t laloutre42/docker-foodrecipes .
docker login --username=laloutre42 --password=Maximus42 --email=Laloutre42@gmail.com
docker push laloutre42/docker-foodrecipes

# Deploy in OpenShift local cluster
#oc deploy docker-foodrecipes --latest -n default

# Run foodrecipes-client
#docker stop foodrecipes-client && docker rm foodrecipes-client && docker run --name foodrecipes-client -d -p 81:80 laloutre42/docker-foodrecipes

#docker login -u laloutre42 -e laloutre42@gmail.com -p 0ejbMI52S7Up-0d6NpLYlYabtDOJ4EZPBFrhi5znfGY 172.30.99.242:5000