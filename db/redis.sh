docker run \
-d \
--name redis-cnn10-transcript-mirror \
-p 6381:6379 \
--rm \
-v ~/redis/cnn10-transcript-mirror/data:/data \
redis:latest \
redis-server --appendonly yes 
# https://hub.docker.com/_/redis
# https://redis.io/topics/persistence#append-only-file
