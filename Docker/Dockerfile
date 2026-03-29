# Etapa 1: build con pnpm y Vite
FROM node:20-alpine AS build

WORKDIR /app

# Argumentos de construcción
ARG VITE_JSONBIN_BIN_ID
ARG VITE_JSONBIN_MASTER_KEY

# Convertir ARGs a variables de entorno
ENV VITE_JSONBIN_BIN_ID ${VITE_JSONBIN_BIN_ID}
ENV VITE_JSONBIN_MASTER_KEY ${VITE_JSONBIN_MASTER_KEY}

# Copiamos solo los archivos necesarios para instalar dependencias
COPY pnpm-lock.yaml package.json ./

# Instalamos pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Instalamos dependencias
RUN pnpm install --frozen-lockfile

# Copiamos el resto del proyecto
COPY . .

# DEBUG: Verificar variables antes del build
RUN printenv | grep VITE

# Construimos la app con Vite
RUN pnpm build

# Etapa 2: Nginx
FROM nginx:1.27.4
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:80 || exit 1
CMD ["nginx", "-g", "daemon off;"]