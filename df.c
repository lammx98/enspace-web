# Stage 1: Chạy production
FROM node:22-alpine AS runner

# Tạo thư mục làm việc
WORKDIR /app

# Copy file cần thiết (đã có bản build sẵn ngoài host)
COPY .next ./.next
COPY public ./public
COPY package.json ./
COPY next.config.ts ./
COPY node_modules ./node_modules

# Nếu bạn dùng .env.production hoặc tương tự
COPY .env .env

# Cấu hình biến môi trường
ENV NODE_ENV=production
ENV PORT=3000

# Mở cổng
EXPOSE 3000

# Lệnh chạy Next.js server
CMD ["yarn", "start"]
