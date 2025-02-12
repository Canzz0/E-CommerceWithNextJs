FROM node:18

WORKDIR /app
# Paketleri yükle
COPY package*.json ./
# TypeScript bağımlılıklarını ekle
RUN npm install
# Uygulama kodunu kopyala
COPY . .
RUN npx prisma migrate dev --schema=./prisma/schema.prisma

EXPOSE 3000
CMD ["npm", "run", "dev"]