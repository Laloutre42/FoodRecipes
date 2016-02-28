#!/usr/bin/env bash

# Build and Push foodrecipes to Docker repository
docker build -t laloutre42/docker-foodrecipes . && \
docker login --username=laloutre42 --password=Maximus42 --email=Laloutre42@gmail.com && \
docker push laloutre42/docker-foodrecipes

