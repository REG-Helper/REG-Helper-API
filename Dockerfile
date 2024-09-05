FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/app

FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS builder

COPY . .
COPY --from=deps --chown=node:node /usr/app/node_modules ./node_modules

RUN pnpx prisma generate

RUN pnpm run build

FROM node:20-alpine AS runner

USER node

WORKDIR /usr/app

COPY --from=builder --chown=node:node /usr/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/app/dist ./dist

CMD [ "node", "./dist/main" ]
