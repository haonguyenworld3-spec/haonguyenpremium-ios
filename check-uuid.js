// Tự động kiểm tra UDID/UUID từ thiết bị với danh sách allowed_uuids.txt
const allowedListUrl = "https://raw.githubusercontent.com/haonguyenworld3-spec/haonguyenpremium-ios/refs/heads/main/allowed_uuids.txt";

$httpClient.get(allowedListUrl, function(error, response, data) {
    if (error || !data) {
        $done({}); // Cho phép kết nối nếu lỗi mạng tải file
        return;
    }

    // Tự động lấy tất cả các thông tin định danh gửi từ thiết bị
    const headers = $request.headers;
    const userAgent = headers["User-Agent"] || headers["user-agent"] || "";
    const customUuid = headers["X-User-UUID"] || headers["User-UUID"] || headers["uuid"] || "";

    // Làm sạch danh sách UDID/UUID trong file txt (bỏ dòng trống, khoảng trắng)
    const allowedUuids = data.split("\n").map(id => id.trim()).filter(id => id.length > 0 && !id.startsWith("#"));

    // Kiểm tra xem UDID/UUID có xuất hiện trong danh sách cho phép không
    const isAllowed = allowedUuids.some(uuid => {
        return customUuid.includes(uuid) || userAgent.includes(uuid) || $request.url.includes(uuid);
    });

    if (isAllowed || allowedUuids.length === 0) {
        $done({}); // Cho phép truy cập
    } else {
        $done({
            response: {
                status: 403,
                headers: { "Content-Type": "text/plain; charset=utf-8" },
                body: "TRUY CẬP BỊ TỪ CHỐI: UDID/UUID thiết bị của bạn chưa được kích hoạt!"
            }
        });
    }
});
