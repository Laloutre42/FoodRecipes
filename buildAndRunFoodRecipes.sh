#!/usr/bin/env bash

# Build and run foodrecipes
gulp build --env=qlf && \
docker build -t laloutre42/docker-foodrecipes . && \
docker stop foodrecipes-client && \
docker rm foodrecipes-client && \
docker run --name foodrecipes-client -p 81:80 laloutre42/docker-foodrecipes
