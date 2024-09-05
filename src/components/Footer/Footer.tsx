import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-[#001744]">
        <div className="container">
          <div className="grid grid-cols-1 gap-3 py-10 md:grid-cols-4">
            <div>
              <ul className="list-none">
                <li className="pb-2 text-white">CTU-Works</li>
                <li className="pb-2 text-[#b3ceff]">Về CTU-Works</li>
                <li className="pb-2 text-[#b3ceff]">Về CTU-Works inTECH</li>
                <li className="pb-2 text-[#b3ceff]">Liên Hệ</li>
                <li className="pb-2 text-[#b3ceff]">Hỏi Đáp</li>
              </ul>
            </div>
            <div>
              <ul className="list-none">
                <li className="pb-2 text-white">Dành cho Nhà tuyển dụng</li>
                <li className="pb-2 text-[#b3ceff]">Đăng tuyển dụng</li>
                <li className="pb-2 text-[#b3ceff]">Tìm kiếm hồ sơ</li>
                <li className="pb-2 text-[#b3ceff]">Sản phẩm Dịch vụ khác</li>
                <li className="pb-2 text-[#b3ceff]">Liên hệ</li>
              </ul>
            </div>
            <div>
              <ul className="list-none">
                <li className="pb-2 text-white">Việc làm theo khu vực</li>
                <li className="pb-2 text-[#b3ceff]">Hồ Chí Minh</li>
                <li className="pb-2 text-[#b3ceff]">Hà Nội</li>
                <li className="pb-2 text-[#b3ceff]">Hải Phòng</li>
                <li className="pb-2 text-[#b3ceff]">Đà Nẵng</li>
                <li className="pb-2 text-[#b3ceff]">Cần Thơ</li>
              </ul>
              <div>
                <p className="mt-4 text-[#b3ceff]">Xem tất cả khu vực</p>
              </div>
            </div>
            <div>
              <ul className="list-none">
                <li className="pb-2 text-white">Việc làm theo ngành nghề</li>
                <li className="pb-2 text-[#b3ceff]">Kế toán</li>
                <li className="pb-2 text-[#b3ceff]">Ngân hàng</li>
                <li className="pb-2 text-[#b3ceff]">IT Support / Help Desk</li>
                <li className="pb-2 text-[#b3ceff]">Phần mềm máy tính</li>
                <li className="pb-2 text-[#b3ceff]">Xây dựng</li>
              </ul>
              <div>
                <p className="mt-4 text-[#b3ceff]">Xem tất cả khu vực</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
