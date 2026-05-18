FROM public.ecr.aws/docker/library/node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm","start"]
