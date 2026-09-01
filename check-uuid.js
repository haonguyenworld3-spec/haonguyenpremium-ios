// Script kiểm tra UUID từ danh sách GitHub
const allowedListUrl = "https://raw.githubusercontent.com/haonguyenworld3-spec/haonguyenpremium-ios/refs/heads/main/allowed_uuids.txt";

$httpClient.get(allowedListUrl, function(error, response, data) {
    if (error) {
        $done({}); // Lỗi mạng tạm cho qua để không ngắt kết nối
        return;
    }
    
    // Lấy UUID từ Header
    const userUuid = $request.headers["X-User-UUID"] || $request.headers["User-UUID"] || $request.headers["uuid"];
    
    if (userUuid && data.includes(userUuid)) {
        $done({}); // Hợp lệ -> Cho phép kết nối
    } else {
        // Không hợp lệ -> Bị chặn
        $done({ 
            response: { 
                status: 403, 
                headers: { "Content-Type": "text/plain; charset=utf-8" },
                body: "TRUY CẬP BỊ TỪ CHỐI: UUID của bạn chưa được cấp phép hoặc đã bị khóa!" 
            } 
        });
    }
});
