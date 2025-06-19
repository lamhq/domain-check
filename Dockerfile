FROM node:22.12-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@9.15.1

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN mkdir -p /prod/web && mv /usr/src/app/apps/web/dist /prod/web/
RUN pnpm deploy --filter=api --prod /prod/api

FROM nginx:alpine AS web
# Install envsubst utility
RUN apk add --no-cache bash
COPY --from=build /prod/web/dist /usr/share/nginx/html
# Copy nginx configuration & entrypoint script
COPY apps/web/infra/nginx.conf /etc/nginx/nginx.conf
COPY apps/web/infra/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
CMD ["/docker-entrypoint.sh"]

FROM base AS api
COPY --from=build /prod/api /prod/api
WORKDIR /prod/api
# Copy entrypoint script for api
COPY apps/api/infra/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 3000
CMD [ "/docker-entrypoint.sh" ]