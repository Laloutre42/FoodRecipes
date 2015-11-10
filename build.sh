# Build foodrecipes-client
gulp build --env=prod
docker build -t laloutre42/docker-foodrecipes .

# Run foodrecipes-client
docker stop foodrecipes-client
docker rm foodrecipes-client
docker run --name foodrecipes-client -d -p 80:80 laloutre42/docker-foodrecipes