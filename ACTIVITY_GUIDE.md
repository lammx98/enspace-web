# Hướng Dẫn Tạo và Lưu Activity

## Tổng Quan

Activity là các bài tập tương tác trong một Lesson. Mỗi Activity có:
- **Level**: Mức độ khó (1, 2, 3, ...)
- **Type**: Loại activity (enum)
- **Data**: Dữ liệu JSON lưu trữ nội dung của activity (lưu dạng `jsonb` trong PostgreSQL)

## Các Loại Activity

Hệ thống hỗ trợ 7 loại activity:

1. **WORD_TO_MEANING** (1): Từ vựng → Nghĩa
2. **MEANING_TO_WORD** (2): Nghĩa → Từ vựng
3. **WORD_TO_IMAGE** (3): Từ vựng → Hình ảnh
4. **IMAGE_TO_WORD** (4): Hình ảnh → Từ vựng
5. **FILL_BLANK** (5): Điền vào chỗ trống
6. **REARRANGE_SENTENCE** (6): Sắp xếp lại câu
7. **LISTEN_AND_CHOOSE** (7): Nghe và chọn

## Cấu Trúc Data Mẫu

### 1. WORD_TO_MEANING

**Mô tả**: Hiển thị từ vựng, học viên chọn nghĩa đúng.

```json
{
  "question": "apple",
  "options": [
    { "text": "quả táo" },
    { "text": "quả cam" },
    { "text": "quả chuối" }
  ],
  "correctIndex": 0
}
```

**Trường dữ liệu**:
- `question` (string, required): Từ vựng cần hỏi
- `options` (array, required): Danh sách các lựa chọn nghĩa
  - `text` (string, required): Nội dung nghĩa
- `correctIndex` (number, required): Index của đáp án đúng trong mảng `options` (bắt đầu từ 0)

---

### 2. MEANING_TO_WORD

**Mô tả**: Hiển thị nghĩa, học viên chọn từ vựng đúng.

```json
{
  "question": "quả táo",
  "options": [
    { "text": "apple" },
    { "text": "orange" },
    { "text": "banana" }
  ],
  "correctIndex": 0
}
```

**Trường dữ liệu**:
- `question` (string, required): Nghĩa cần hỏi
- `options` (array, required): Danh sách các lựa chọn từ vựng
  - `text` (string, required): Từ vựng
- `correctIndex` (number, required): Index của đáp án đúng trong mảng `options` (bắt đầu từ 0)

---

### 3. WORD_TO_IMAGE

**Mô tả**: Hiển thị từ vựng, học viên chọn hình ảnh đúng.

```json
{
  "question": "apple",
  "options": [
    { "image": "apple.png", "text": "Apple" },
    { "image": "orange.png", "text": "Orange" },
    { "image": "banana.png", "text": "Banana" }
  ],
  "correctIndex": 0
}
```

**Trường dữ liệu**:
- `question` (string, required): Từ vựng cần hỏi
- `options` (array, required): Danh sách các hình ảnh
  - `image` (string, required): URL hoặc tên file hình ảnh
  - `text` (string, optional): Nhãn mô tả hình ảnh
- `correctIndex` (number, required): Index của đáp án đúng trong mảng `options` (bắt đầu từ 0)

---

### 4. IMAGE_TO_WORD

**Mô tả**: Hiển thị hình ảnh, học viên chọn từ vựng đúng.

```json
{
  "image": "apple.png",
  "options": [
    { "text": "apple" },
    { "text": "orange" },
    { "text": "banana" }
  ],
  "correctIndex": 0
}
```

**Trường dữ liệu**:
- `image` (string, required): URL hoặc tên file hình ảnh
- `options` (array, required): Danh sách các lựa chọn từ vựng
  - `text` (string, required): Từ vựng
- `correctIndex` (number, required): Index của đáp án đúng trong mảng `options` (bắt đầu từ 0)

---

### 5. FILL_BLANK

**Mô tả**: Điền từ vào chỗ trống trong câu.

```json
{
  "sentence": "I eat an ___ every day",
  "correctAnswer": "apple"
}
```

**Trường dữ liệu**:
- `sentence` (string, required): Câu có chỗ trống (ký hiệu `___`)
- `correctAnswer` (string, required): Từ đúng để điền vào chỗ trống

**Ví dụ khác**:
```json
{
  "sentence": "She likes to ___ books in the library",
  "correctAnswer": "read",
  "hint": "verb"
}
```

**Trường dữ liệu mở rộng**:
- `sentence` (string, required): Câu có chỗ trống
- `correctAnswer` (string, required): Từ đúng để điền vào chỗ trống
- `hint` (string, optional): Gợi ý về loại từ (verb, noun, adjective, ...)

---

### 6. REARRANGE_SENTENCE

**Mô tả**: Sắp xếp lại các từ để tạo thành câu đúng.

```json
{
  "words": ["I", "eat", "an", "apple", "every", "day"],
  "correctOrder": [0, 1, 2, 3, 4, 5]
}
```

**Trường dữ liệu**:
- `words` (array, required): Danh sách các từ cần sắp xếp
- `correctOrder` (array, required): Thứ tự đúng của các từ (mảng các index trong mảng `words`, bắt đầu từ 0)

**Ví dụ khác**:
```json
{
  "words": ["apple", "an", "I", "eat", "every", "day"],
  "correctOrder": [2, 1, 3, 0, 4, 5]
}
```

**Lưu ý**: `correctOrder` là mảng các index chỉ ra thứ tự đúng. Ví dụ `[2, 1, 3, 0, 4, 5]` nghĩa là:
- Vị trí 0: `words[2]` = "I"
- Vị trí 1: `words[1]` = "an"
- Vị trí 2: `words[3]` = "eat"
- Vị trí 3: `words[0]` = "apple"
- Vị trí 4: `words[4]` = "every"
- Vị trí 5: `words[5]` = "day"

---

### 7. LISTEN_AND_CHOOSE

**Mô tả**: Nghe audio và chọn đáp án đúng.

```json
{
  "audio": "apple.mp3",
  "question": "What do you hear?",
  "options": [
    { "text": "apple" },
    { "text": "orange" },
    { "text": "banana" }
  ],
  "correctIndex": 0
}
```

**Trường dữ liệu**:
- `audio` (string, required): URL hoặc tên file audio
- `question` (string, optional): Câu hỏi (có thể để trống nếu chỉ cần nghe)
- `options` (array, required): Danh sách các lựa chọn
  - `text` (string, required): Nội dung lựa chọn
- `correctIndex` (number, required): Index của đáp án đúng trong mảng `options` (bắt đầu từ 0)

---

## API Endpoints

### 1. Tạo Lesson với Activities (Admin)

**Endpoint**: `POST /api/v1/content/lessons/with-activities`

**Request Body**:
```json
{
  "topicId": 1,
  "title": "Food",
  "order": 1,
  "activities": [
    {
      "level": 1,
      "type": 1,
      "data": {
        "question": "apple",
        "options": [
          { "text": "quả táo" },
          { "text": "quả cam" },
          { "text": "quả chuối" }
        ],
        "correctIndex": 0
      }
    },
    {
      "level": 2,
      "type": 4,
      "data": {
        "image": "apple.png",
        "options": [
          { "text": "apple" },
          { "text": "orange" },
          { "text": "banana" }
        ],
        "correctIndex": 0
      }
    },
    {
      "level": 3,
      "type": 5,
      "data": {
        "sentence": "I eat an ___ every day",
        "correctAnswer": "apple"
      }
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "lessonId": 1,
    "title": "Food",
    "activities": [
      {
        "id": 1,
        "level": 1,
        "type": "WORD_TO_MEANING",
        "data": {
          "question": "apple",
          "options": [
            { "text": "quả táo" },
            { "text": "quả cam" },
            { "text": "quả chuối" }
          ],
          "correctIndex": 0
        }
      },
      {
        "id": 2,
        "level": 2,
        "type": "IMAGE_TO_WORD",
        "data": {
          "image": "apple.png",
          "options": [
            { "text": "apple" },
            { "text": "orange" },
            { "text": "banana" }
          ],
          "correctIndex": 0
        }
      },
      {
        "id": 3,
        "level": 3,
        "type": "FILL_BLANK",
        "data": {
          "sentence": "I eat an ___ every day",
          "correctAnswer": "apple"
        }
      }
    ]
  }
}
```

---

### 2. Cập Nhật Lesson với Activities (Admin)

**Endpoint**: `PUT /api/v1/content/lessons/{id}/with-activities`

**Request Body**: Tương tự như tạo mới

**Lưu ý**: Khi cập nhật, tất cả activities cũ sẽ bị xóa và thay thế bằng activities mới.

---

### 3. Lấy Lesson với Activities

**Endpoint**: `GET /api/v1/content/lessons/{id}/activities`

**Response**: Tương tự như response của tạo mới

---

## Lưu Ý Khi Tạo Activity

1. **Level**: Nên tăng dần từ 1, 2, 3... để thể hiện độ khó tăng dần
2. **Data JSON**: 
   - Phải là JSON hợp lệ
   - Các trường required phải có đầy đủ
   - Trường `data` sẽ được lưu dạng `jsonb` trong PostgreSQL, hỗ trợ query và index
3. **Type**: Sử dụng số từ 1-7 hoặc enum value tương ứng
4. **Options**: Thường có 3-4 lựa chọn, trong đó có 1 đáp án đúng
5. **Correct Answer**: 
   - Với các activity có `options`: **bắt buộc** phải có `correctIndex` (index của đáp án đúng, bắt đầu từ 0)
   - Với `FILL_BLANK`: **bắt buộc** phải có `correctAnswer` (từ đúng để điền)
   - Với `REARRANGE_SENTENCE`: **bắt buộc** phải có `correctOrder` (mảng các index chỉ thứ tự đúng)

---

## Ví Dụ Đầy Đủ

### Tạo Lesson với đầy đủ 7 loại Activity

```json
{
  "topicId": 1,
  "title": "Complete Food Lesson",
  "order": 1,
  "activities": [
    {
      "level": 1,
      "type": 1,
      "data": {
        "question": "apple",
        "options": [
          { "text": "quả táo" },
          { "text": "quả cam" },
          { "text": "quả chuối" }
        ],
        "correctIndex": 0
      }
    },
    {
      "level": 2,
      "type": 2,
      "data": {
        "question": "quả táo",
        "options": [
          { "text": "apple" },
          { "text": "orange" },
          { "text": "banana" }
        ],
        "correctIndex": 0
      }
    },
    {
      "level": 3,
      "type": 3,
      "data": {
        "question": "apple",
        "options": [
          { "image": "apple.png", "text": "Apple" },
          { "image": "orange.png", "text": "Orange" },
          { "image": "banana.png", "text": "Banana" }
        ],
        "correctIndex": 0
      }
    },
    {
      "level": 4,
      "type": 4,
      "data": {
        "image": "apple.png",
        "options": [
          { "text": "apple" },
          { "text": "orange" },
          { "text": "banana" }
        ],
        "correctIndex": 0
      }
    },
    {
      "level": 5,
      "type": 5,
      "data": {
        "sentence": "I eat an ___ every day",
        "correctAnswer": "apple"
      }
    },
    {
      "level": 6,
      "type": 6,
      "data": {
        "words": ["I", "eat", "an", "apple", "every", "day"],
        "correctOrder": [0, 1, 2, 3, 4, 5]
      }
    },
    {
      "level": 7,
      "type": 7,
      "data": {
        "audio": "apple.mp3",
        "question": "What do you hear?",
        "options": [
          { "text": "apple" },
          { "text": "orange" },
          { "text": "banana" }
        ],
        "correctIndex": 0
      }
    }
  ]
}
```

---

## Database Schema

Activity được lưu trong bảng `lesson_activities` với cấu trúc:

- `id` (ulong): ID duy nhất
- `lesson_id` (ulong): Foreign key đến bảng `lessons`
- `level` (int): Mức độ khó
- `type` (int): Loại activity (1-7)
- `data` (jsonb): Dữ liệu JSON của activity

**Lưu ý**: Khi xóa Lesson, tất cả Activities liên quan sẽ tự động bị xóa (Cascade Delete).
