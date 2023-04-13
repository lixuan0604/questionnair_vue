FROM node:14
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list
WORKDIR /app
COPY ./ /app
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive

RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/*



RUN npm config set registry https://registry.npm.taobao.org/
RUN npm install 
RUN npm run build

FROM nginx
RUN mkdir /app

COPY --from=0 /app/dist /app
