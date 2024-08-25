import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const Knowledge = () => {
  return (
    <>
      <div>
        <div
          style={{
            backgroundImage:
              "url('https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/blog/list-blog-heading-background.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "200px",
          }}
          className="relative flex items-center justify-start"
        >
          <div className="container flex flex-col items-start gap-6">
            <p className="text-4xl font-bold text-[#009643]">
              Hành trang nghề nghiệp
            </p>
            <p className="text-sm">
              Nơi cập nhật các thông tin mới nhất về công nghệ, tài liệu, mẫu
              đơn từ,... giúp bạn phát triển bản thân và thăng tiến nhanh trong
              sự nghiệp.
            </p>
          </div>
          <div
            style={{
              backgroundImage:
                "url('https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/blog/list-blog-heading-overlay.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100px",
            }}
            className="absolute bottom-0 left-0 right-0 z-50"
          ></div>
          <div
            style={{
              backgroundImage:
                "url('https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/blog/toppy-reading-3d.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "150px",
              height: "200px",
            }}
            className="absolute right-14 top-0"
          ></div>
        </div>

        <div className="container my-6">
          <div>
            <p className="text-3xl font-bold">Bài viết nổi bật</p>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <div className="group col-span-1 cursor-pointer overflow-hidden rounded-md bg-[#f4f5f6] transition-all">
                <div
                  style={{
                    backgroundImage:
                      "url('https://cdn-new.topcv.vn/unsafe/600x/https://static.topcv.vn/cms/cong-viec-nganh-logistic-topcv4.jpg65e02e7f558a5.jpg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "400px",
                  }}
                ></div>
                <div className="px-4 py-2">
                  <p className="mt-2 text-base font-bold transition-all duration-200 group-hover:text-[#ff7d55]">
                    Tổng quan về công việc ngành Logistics
                  </p>
                  <p className="my-4 text-sm">
                    Trong bối cảnh nền kinh tế hàng hóa ngày càng phát triển
                    mạnh mẽ, Logistics ra đời như một giải pháp cho nhu cầu sản
                    xuất và phân phối sản phẩm đến tay người tiêu dùng thuận
                    tiện và nhanh chóng nhất. Do đó, mặc dù ra đời chưa lâu
                    nhưng Logistics đã dần khẳng định được vai trò to lớn của
                    mình đối với nền kinh tế của nhiều nước trên thế giới, trong
                    đó có Việt Nam. Vậy thì Logistics là làm gì? Công việc ngành
                    Logistics sau khi ra trường như thế nào? Cách xin việc ngành
                    Logistics ra sao? Tất cả sẽ được làm rõ trong bài viết này.
                  </p>
                  <div>
                    <span className="text-sm text-[#757575]">
                      KIẾN THỨC CHUYÊN NGÀNH
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-rows-3 gap-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    className="group flex cursor-pointer flex-row-reverse overflow-hidden rounded-md bg-[#f4f5f6] transition-all"
                    key={index}
                  >
                    <div
                      style={{
                        backgroundImage:
                          "url('https://cdn-new.topcv.vn/unsafe/600x/https://static.topcv.vn/cms/hanh-chinh-nhan-su.jpg664db0f03d14f.jpg')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "33.33%",
                        height: "100%",
                      }}
                    ></div>
                    <div className="w-2/3 px-4 py-2">
                      <p className="mt-2 line-clamp-2 text-base font-bold transition-all duration-200 group-hover:text-[#ff7d55]">
                        Nhân viên hành chính nhân sự là gì? Mô tả công việc và
                        kỹ năng cần có{" "}
                      </p>
                      <p className="my-4 line-clamp-3 text-sm">
                        Nhân viên hành chính nhân sự là gì? Công việc cụ thể của
                        bộ phận hành chính nhân sự là làm gì? Trong bài viết hôm
                        nay, TopCV sẽ giúp bạn giải đáp một số thông tin xoay
                        quanh bộ phận hành chính nhân sự và mô tả chi tiết công
                        việc hành chính nhân sự.
                      </p>
                      <div>
                        <span className="text-sm text-[#757575]">
                          KIẾN THỨC CHUYÊN NGÀNH
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="container my-12 py-6">
          <p className="pb-4 text-3xl font-bold">Bài viết nổi bật</p>
          <div className="mt-4 grid gap-8 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                className="group cursor-pointer overflow-hidden rounded-md transition-all duration-300 hover:scale-105"
                key={index}
              >
                <div
                  style={{
                    backgroundImage:
                      "url('https://cdn-new.topcv.vn/unsafe/300x/https://static.topcv.vn/cms/viec-lam-e-commerce-executive-topcv.jpg64c77a5860a63.jpg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "200px",
                  }}
                  className="rounded-md"
                ></div>
                <div className="py-2">
                  <p className="mt-2 text-base font-bold transition-all duration-200 group-hover:text-sky-500">
                    Ông Hoàng Nam Tiến: "Không nhất thiết phải làm gà mới biết
                    nước sôi là nóng"
                  </p>
                  <p className="my-4 text-sm">
                    Theo ông Hoàng Nam Tiến, các bạn trẻ, đặc biệt là GenZ nếu
                    như gặp được những người này thì sẽ rút ngắn được rất nhiều
                    thời gian trong hành ...
                  </p>{" "}
                  <div>
                    <span className="text-sm text-[#757575]">
                      “Bắt mạch” Công Sở
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination className="mt-10">
            <PaginationContent className="list-none">
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Knowledge;
