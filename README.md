# Đồ án đa ngành hướng CNPM
## Ý tưởng đồ án
Hệ thống IOT giúp quản lý kho nông sản, theo dõi các thông số nhiệt độ độ ẩm trong kho một các trực quan và kiểm tra tình trạng của các hàng hóa qua camera AI.
## Danh sách thành viên
- Đặng Gia Thịnh - Leader
- Hoàng Kim Cương
- Lê Hoàng Ngọc Phát
- Võ Thái Toàn 
## CI/CD Script
Để chạy được dự án đầu tiên cần phải clone dự án từ github về máy
```bash
   git clone https://github.com/tona3922/monitor_tracking.git
```
Sau khi đã có dự án tiến hành cài đặt tất cả các package cần có trong một dự án
```bash
  npm install
```
Tiếp đến tiến hành chạy 2 module **frontend** và **backend**
- Frontend:
```bash
  npm run dev
  //or
  yarn dev
```
- Backend: thay đổi đường dẫn vào thư mục **backend**
```bash
  cd backend
  yarn start
  //or
  npm run start
```
Sau khi đã khởi động dự án, tiến hành thay đổi đường dẫn đến thư mục **thingsboard_service** để có thể chạy dữ liệu ảo ở gateway được viết bằng python gửi lên Thingsboard Server
```bash
  cd thingsboard_service
  python3 thingsboard-connect--randomdata.py
```
Dữ liệu sẽ được cập nhật từ thingsboard sang webapp một cách realtime

Để chạy module cameraAI cần thay đổi đường dẫn đến thư mục **yolov8_counting_webcam**

```bash
   cd yolov8_counting_webcam
   python3 train.py
```
Một số hình ảnh về dự án
![alt text](https://github.com/tona3922/monitor_tracking/blob/master/description_images/home.png)


