// Script kiểm tra UUID từ danh sách GitHub
const allowedListUrl = "https://raw.githubusercontent.com/haonguyenworld3-spec/haonguyenpremium-ios/main/allowed_uuids.txt";

$httpClient.get(allowedListUrl, function(error, response, data) {
    if (error) {
        $done({}); // Nếu lỗi mạng thì tạm thời cho qua để không ngắt kết nối
        return;
    }
    
    // Lấy UUID gửi lên từ Header của ứng dụng
    const userUuid = $request.headers["X-User-UUID"] || $request.headers["User-UUID"] || $request.headers["uuid"];
    
    if (userUuid && data.includes(userUuid)) {
        $done({}); // UUID hợp lệ -> Cho phép truy cập
    } else {
        // UUID không có trong danh sách -> Chặn truy cập
        $done({ 
            response: { 
                status: 403, 
                headers: { "Content-Type": "text/plain; charset=utf-8" },
                body: "TRUY CẬP BỊ TỪ CHỐI: UUID của bạn chưa được cấp phép hoặc đã bị khóa!" 
            } 
        });
    }
});
