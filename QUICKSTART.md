# 🚀 Quick Start Guide

## Khởi động Backend Services

### 1. Start genzy-auth (Authentication Service)
```bash
cd c:\Source\genzy\services\genzy-auth
dotnet run
```
Service sẽ chạy tại: `http://localhost:5000`

### 2. Start enspace-content (Content Management Service)
```bash
cd c:\Source\genzy\services\enspace-content
dotnet run
```
Service sẽ chạy tại: `http://localhost:5001`

### 3. Start enspace-progress (Progress Tracking Service)
```bash
cd c:\Source\genzy\services\enspace-progress
dotnet run
```
Service sẽ chạy tại: `http://localhost:5002`

## Khởi động Frontend (Next.js)

### 4. Install dependencies (chỉ lần đầu)
```bash
cd c:\Source\genzy\services\enspace-web
npm install --legacy-peer-deps
```

### 5. Start development server
```bash
npm run dev
```
Web app sẽ chạy tại: `http://localhost:3000`

## 🔑 Đăng nhập

### Tạo tài khoản mới
1. Mở `http://localhost:3000/login`
2. Nhập email và password
3. Click "Sign In" (nếu chưa có tài khoản, hệ thống sẽ tự tạo - hoặc cần implement register endpoint)

### Hoặc đăng nhập bằng Google
1. Click "Sign in with Google"
2. Chọn tài khoản Google
3. Cho phép quyền truy cập

## 📚 Sử dụng ứng dụng

### 1. Chọn Topic
- Sau khi đăng nhập, bạn sẽ thấy danh sách các topics
- Click vào topic để xem các lessons

### 2. Học từ vựng
- Chọn lesson trong learning path
- Click "Start" để bắt đầu quiz

### 3. Làm Quiz
- Đọc câu hỏi và chọn đáp án
- Nhận feedback ngay lập tức
- Tích lũy XP và duy trì streak

### 4. Theo dõi tiến độ
- Xem stats ở header (Streak, XP, Hearts, Rank)
- Xem leaderboard (click vào icon Trophy)

## 🛠️ Troubleshooting

### Backend không kết nối được
```bash
# Kiểm tra ports
netstat -ano | findstr :5000
netstat -ano | findstr :5001
netstat -ano | findstr :5002
```

### Frontend không build được
```bash
# Xóa cache và reinstall
rm -rf .next node_modules
npm install --legacy-peer-deps
```

### Lỗi CORS
- Kiểm tra CORS settings trong backend
- Đảm bảo frontend URL được thêm vào allowed origins

### Token hết hạn
- Clear cookies trong browser
- Đăng nhập lại

## 📝 API Endpoints

### Authentication API (Port 5000)
- POST `/auth/register` - Đăng ký
- POST `/auth/login` - Đăng nhập
- POST `/auth/refresh-token` - Refresh token
- GET `/auth/google-login` - Google OAuth
- GET `/auth/me` - Get user info

### Content API (Port 5001)
- GET `/api/Topics` - Get all topics
- GET `/api/Lessons?topicId={id}` - Get lessons by topic
- GET `/api/Words?lessonId={id}` - Get words by lesson

### Progress API (Port 5002)
- GET `/api/Me/stats` - Get user statistics
- POST `/api/Study/learn` - Track learning progress
- POST `/api/Study/review` - Track review session
- GET `/api/Study/due` - Get due words for review

## 🎯 Features đã implement

✅ Authentication (Login/Logout/Google OAuth)
✅ Protected Routes
✅ Topic Selection
✅ Learning Path
✅ Quiz Game với câu hỏi từ API
✅ Progress Tracking
✅ XP System
✅ Streak Tracking
✅ User Profile với Avatar
✅ Responsive Design

## 📱 Test trên mobile

```bash
# Get local IP
ipconfig

# Cập nhật .env với local IP
NEXT_PUBLIC_API_AUTH_URL=http://192.168.x.x:5000
NEXT_PUBLIC_API_CONTENT_URL=http://192.168.x.x:5001
NEXT_PUBLIC_API_PROGRESS_URL=http://192.168.x.x:5002
```

Sau đó truy cập: `http://192.168.x.x:3000` từ điện thoại

## 🎨 Customization

### Thay đổi màu sắc
Edit file: `app/globals.css`

### Thêm component mới
```bash
# Sử dụng shadcn CLI
npx shadcn@latest add [component-name]
```

### Update API clients
```bash
# Regenerate API clients khi backend thay đổi
npx openapi --input http://localhost:5000/openapi/v1.json --output api/genzy-auth --client axios --useOptions
npx openapi --input http://localhost:5001/openapi/v1.json --output api/enspace-content --client axios --useOptions
npx openapi --input http://localhost:5002/openapi/v1.json --output api/enspace-progress --client axios --useOptions
```

---

**Happy Learning! 🚀📚**
