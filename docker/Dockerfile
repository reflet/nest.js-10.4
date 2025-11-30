############################################################################
# CREATE PROJECT
############################################################################
FROM node:22.12.0-alpine as create

ENV NODE_ENV development

# version: 11.0.14
RUN apk add bash \
    && npm update -g npm \
    && npm i -g @nestjs/cli@10.4.9

# check version.
#RUN nest -v

# create project. (npm, yarn, pnpm)
#RUN nest new --strict .

USER node
WORKDIR /usr/src/app


############################################################################
# DEVELOPMENT
############################################################################
FROM node:22.12.0-alpine as development

ENV NODE_ENV development

RUN apk add bash \
    && npm update -g npm \
    && npm i -g @nestjs/cli@10.4.9

COPY --chown=node:node ./src /usr/src/app

USER node
WORKDIR /usr/src/app

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start:dev" ]


############################################################################
# PRODUCTION
############################################################################

FROM node:22.12.0-alpine

ENV NODE_ENV production

RUN apk add bash \
    && npm update -g npm \
    && npm i -g @nestjs/cli@10.4.9

COPY --chown=node:node ./src /usr/src/app

USER node
WORKDIR /usr/src/app

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", "dist/main.js"]
