FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/app

FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --frozen-lockfile

FROM deps AS builder

COPY . .

RUN pnpm run build

FROM node:20-alpine AS runner

WORKDIR /usr/app

USER node

COPY --from=deps /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/dist ./dist

CMD [ "node", "./dist/main" ]
