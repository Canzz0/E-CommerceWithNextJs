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
CMD ["sh", "-c", "npm run build && npm start"]
