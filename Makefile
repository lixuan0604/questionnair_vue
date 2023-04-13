
# 构建镜像
build:
	docker build -t questionnair-vue:1.0 .

# 拉起容器
up:
	docker compose up -d --build

# 删除容器
down:
	docker compose down

# 进入容器内部
exec:
	docker exec -it questionnair-vue bash

# 查看容器日志
log:
	docker compose logs -f compose-ps-plag-vue