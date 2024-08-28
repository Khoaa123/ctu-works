import Image from "next/image";
import React from "react";
import imageQuestion1 from "@images/interview-q-1.png";
import imageQuestion2 from "@images/interview-q-2.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const InterViewQuestions = () => {
  return (
    <>
      <div>
        <div
          style={{
            backgroundImage:
              "url('https://images.vietnamworks.com/wealth/Banner.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "400px",
          }}
          className="flex items-center justify-center gap-3"
        >
          <div className="flex flex-1 items-end justify-center">
            <Image
              src={imageQuestion1}
              alt="interview"
              height={280}
              width={200}
            />
          </div>
          <div className="flex flex-auto flex-col items-center justify-center gap-3">
            <p className="text-3xl font-bold uppercase text-white">
              Những câu hỏi phỏng vấn việc làm thường gặp
            </p>
            <div className="mt-4 flex w-full items-center justify-center gap-3">
              <input
                type="text"
                placeholder="Nhập chức danh"
                className="w-full max-w-lg rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
              <button className="rounded-md bg-amber-600 px-4 py-2 text-white transition duration-300 hover:bg-amber-700">
                Tìm kiếm
              </button>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-center">
            <Image
              src={imageQuestion2}
              alt="interview"
              height={200}
              width={200}
            />
          </div>
        </div>
        <div className="bg-[#F7F8FA] py-4">
          <div className="container">
            <div className="mb-4 rounded-md bg-sky-100 p-5">
              <p className="text-lg font-bold text-black">
                Những câu hỏi phỏng vấn việc làm thường gặp & cách trả lời hay
                nhất bằng tiếng Anh và tiếng Việt
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    1. Giới thiệu sơ lược về bản thân bạn? (Could you briefly
                    Introduce yourself?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Hầu hết nhà tuyển dụng đều dùng câu hỏi này để bắt đầu câu
                    chuyện với ứng viên. Mục đích câu hỏi này là để đánh giá
                    phong thái và cách trình bày của ứng viên. Lúc này, tùy
                    thuộc vào câu trả lời của ứng viên mà nhà tuyển dụng sẽ đánh
                    giá đây có phải là một ứng viên phù hợp hay không và đưa ra
                    các câu hỏi tiếp theo để đánh giá kỹ năng, tính cách và kinh
                    nghiệm làm việc.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Để trả lời tốt câu hỏi này, bạn cần đưa ra khái quát
                    những thông tin về cá nhân có liên quan, hữu ích cho vị trí
                    mà mình ứng tuyển như: công việc hiện tại, trình độ học vấn,
                    mục tiêu sự nghiệp,… Bạn nên cân nhắc giới thiệu bản thân
                    theo trình tự thời gian quá khứ, hiện tại và tương lai cũng
                    như gói gọn trong tối đa 2 phút. Chia sẻ ngắn về sở thích,
                    tính cách cũng là một cách thu hút nhà tuyển dụng, tuy nhiên
                    cũng không nên nói quá nhiều về những vấn đề này với nhà
                    tuyển dụng.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt:{" "}
                    <br></br> "Trước khi giới thiệu về bản thân mình, em/tôi xin
                    gửi lời cảm ơn chân thành tới anh/chị khi đã tạo cơ hội cho
                    em/tôi để được trao đổi về vị trí ứng tuyển của quý công ty.
                    Em chào anh/ chị, tên em là Mai, họ tên đầy đủ của em là
                    Trịnh Thị Tuyết Mai. Em là sinh viên mới ra trường của
                    Trường đại học X, trong thời gian làm sinh viên em đã từng
                    tham gia một số công việc bán thời gian nhưng không thật sự
                    ấn tượng, vì các công việc em làm khá đơn giản, tuy vậy
                    thông qua chúng em học được tính kiên nhẫn và tỉ mỉ. Thông
                    qua các hoạt động này, em có kinh nghiệm hơn trong việc nắm
                    bắt tâm lý người khác, có thêm những kỹ năng như quan sát,
                    có khả năng chịu áp lực cao. Và em tin những điều này sẽ có
                    ích đối với vị trí này. Qua tìm hiểu kỹ về vị trí công việc
                    và môi trường làm việc bên mình cũng như những kinh nghiệm
                    và sở trường em đang có, em thực sự mong muốn được có cơ hội
                    được làm việc cùng anh chị tại công ty Y với vị trí nhân
                    viên tư vấn khách hàng."
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh:{" "}
                    <br></br>
                    "Before I introduce myself, I would like to thank you very
                    much for giving me / me the opportunity to talk about the
                    position of your company. / sister, my name is Mai, my full
                    name is Trinh Thi Tuyet Mai. I am a fresh graduate of
                    University X, when I was a student, I used to have some
                    part-time jobs but none is not really significant, because
                    the work I did was quite simple. Nonetheless I learned to be
                    patient and meticulous. Through these jobs, I have more
                    experience in interpersonal skills, observation, and high
                    pressure tolerance. I believe these will be useful for this
                    position through understanding carefully about the job
                    position and working environment For me, I really want to
                    have the opportunity to work with you at company Y as a
                    client consultant. "
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    2. Bạn có thể mô tả sơ lược về những công việc bạn đã làm?
                    Nhiệm vụ chính ở công việc gần đây nhất của bạn là gì? (Can
                    you briefly describe the work you have done? What was the
                    main tasks at your most recent job?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Hầu hết nhà tuyển dụng đều dùng câu hỏi này để bắt đầu câu
                    chuyện với ứng viên. Mục đích câu hỏi này là để đánh giá
                    phong thái và cách trình bày của ứng viên. Lúc này, tùy
                    thuộc vào câu trả lời của ứng viên mà nhà tuyển dụng sẽ đánh
                    giá đây có phải là một ứng viên phù hợp hay không và đưa ra
                    các câu hỏi tiếp theo để đánh giá kỹ năng, tính cách và kinh
                    nghiệm làm việc.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Để trả lời tốt câu hỏi này, bạn cần đưa ra khái quát
                    những thông tin về cá nhân có liên quan, hữu ích cho vị trí
                    mà mình ứng tuyển như: công việc hiện tại, trình độ học vấn,
                    mục tiêu sự nghiệp,… Bạn nên cân nhắc giới thiệu bản thân
                    theo trình tự thời gian quá khứ, hiện tại và tương lai cũng
                    như gói gọn trong tối đa 2 phút. Chia sẻ ngắn về sở thích,
                    tính cách cũng là một cách thu hút nhà tuyển dụng, tuy nhiên
                    cũng không nên nói quá nhiều về những vấn đề này với nhà
                    tuyển dụng.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt:{" "}
                    <br></br>
                    "Trước khi giới thiệu về bản thân mình, em/tôi xin gửi lời
                    cảm ơn chân thành tới anh/chị khi đã tạo cơ hội cho em/tôi
                    để được trao đổi về vị trí ứng tuyển của quý công ty. Em
                    chào anh/ chị, tên em là Mai, họ tên đầy đủ của em là Trịnh
                    Thị Tuyết Mai. Em là sinh viên mới ra trường của Trường đại
                    học X, trong thời gian làm sinh viên em đã từng tham gia một
                    số công việc bán thời gian nhưng không thật sự ấn tượng, vì
                    các công việc em làm khá đơn giản, tuy vậy thông qua chúng
                    em học được tính kiên nhẫn và tỉ mỉ. Thông qua các hoạt động
                    này, em có kinh nghiệm hơn trong việc nắm bắt tâm lý người
                    khác, có thêm những kỹ năng như quan sát, có khả năng chịu
                    áp lực cao. Và em tin những điều này sẽ có ích đối với vị
                    trí này. Qua tìm hiểu kỹ về vị trí công việc và môi trường
                    làm việc bên mình cũng như những kinh nghiệm và sở trường em
                    đang có, em thực sự mong muốn được có cơ hội được làm việc
                    cùng anh chị tại công ty Y với vị trí nhân viên tư vấn khách
                    hàng."
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh:{" "}
                    <br></br>
                    "Before I introduce myself, I would like to thank you very
                    much for giving me / me the opportunity to talk about the
                    position of your company. / sister, my name is Mai, my full
                    name is Trinh Thi Tuyet Mai. I am a fresh graduate of
                    University X, when I was a student, I used to have some
                    part-time jobs but none is not really significant, because
                    the work I did was quite simple. Nonetheless I learned to be
                    patient and meticulous. Through these jobs, I have more
                    experience in interpersonal skills, observation, and high
                    pressure tolerance. I believe these will be useful for this
                    position through understanding carefully about the job
                    position and working environment For me, I really want to
                    have the opportunity to work with you at company Y as a
                    client consultant. "
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    3. Những thành tựu nào đã đạt được trong công việc khiến bạn
                    tự hào nhất? (What achievements in your job are you most
                    proud of?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Mục đích câu hỏi này là để nhà tuyển dụng biết được mức độ
                    thành thạo trong công việc của ứng viên và năng suất làm
                    việc của họ như thế nào.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Bạn cần liệt kê những thành tựu trong cả quãng thời
                    gian đi học: bạn đạt được những giải thưởng gì, bạn tham gia
                    cuộc thi gì,... lý do là để bạn dẫn dắt nhà tuyển dụng vào
                    những thành tích của mình theo một chuỗi những hoạt động từ
                    ngày bạn đi học, thể hiện bạn là một ứng viên xuất sắc, tham
                    gia hoạt động nhiệt tình, kỹ năng mềm rất tốt. Khi nói về
                    các thành tích trong công việc, hãy kể về các thành tích bạn
                    đã đạt được trong các dự án trước đây, những giá trị mang
                    lại cho công ty, kể về vai trò của bạn trong dự án, những
                    công việc đã thực hiện hay cả những khó khăn đã gặp phải
                    trong quá trình thực hiện. Hãy thể hiện sự tâm huyết với
                    công việc, kể cả với công việc ở công ty cũ, bạn nên nêu cảm
                    xúc khi bạn đạt được những thành tựu và những bài học tích
                    cực bạn rút ra được từ những lần đó.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Tôi từng được bầu chọn làm nhân viên của tháng chỉ trong
                    vòng hai tháng đầu làm việc – điều rất ít người đạt được tại
                    công ty X. Thành tựu này đến từ việc áp dụng chuẩn service
                    trong chương trình học vào một nơi có hoạt động chuyên
                    nghiệp như công ty X. Điều này tuy không đem lại lợi thế tài
                    chính nhưng có giá trị tinh thần rất lớn với tôi"
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "I was nominated as the employee of the month in just the
                    first two months of my job - something very few people
                    achieve at company X. This achievement comes from applying
                    service standards in the curriculum to a place where there
                    are professional activities like Company X. This does not
                    bring financial advantages, but it is of great spiritual
                    value to me "
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    4. Tình huống khó khăn nhất trong công việc bạn từng gặp là
                    gì? Cách bạn giải quyết vấn đề khó khăn đó như thế nào?
                    (What was the toughest job situation you've ever
                    encountered? How do you solve that difficult problem?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Khi hỏi câu này, NTD muốn biết bạn có khả năng tư duy để tìm
                    ra giải pháp cho tất cả vấn đề bạn gặp phải hay không.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Ngay cả khi vấn đề của bạn là không có đủ thời gian để
                    học tập, nghiên cứu, bạn cũng cần cho NTD thấy cách bạn đã
                    điều chỉnh thứ tự ưu tiên trong lịch làm việc của mình để
                    giải quyết nó. Việc này chứng tỏ bạn là người có tinh thần
                    trách nhiệm và có thể tự mình tìm ra giải pháp cho vấn đề
                    gặp phải. <br />
                    Bạn có thể trả lời bằng cách nêu lên các khó khăn gặp phải
                    khi thực hiện công việc, đảm bảo tuân thủ các kế hoạch, hoàn
                    thành đúng thời hạn và quản lý nguồn ngân sách. Hãy sử dụng
                    đại từ “tôi” và nhấn mạnh các yếu tố quan trọng (dựa trên
                    nhu cầu và văn hoá của công ty).
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Trong quá trình làm công việc chăm sóc khách hàng, tôi từng
                    gặp trường hợp khách hàng phàn nàn về sản phẩm của công ty
                    một cách rất khó chịu và thậm chí họ lớn tiếng với tôi. Điều
                    đầu tiên tôi làm chính là xin lỗi khách hàng vì đã có những
                    điều chưa hài lòng khi sử dụng sản phẩm của công ty. Sau đó
                    tôi đã cố gắng tìm hiểu nguyên do vì khách hàng khó chịu
                    đồng thời hỏi ý kiến của cấp trên về những chính sách ưu đãi
                    cho khách hàng này"
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "In the process of customer care, I have encountered a
                    customer who complained about the company's products in a
                    very annoying way and they even raised their voice at me.
                    The first thing I did was apologize for their
                    dissatisfaction when using the company's products. After
                    that, I tried to find out the reason why the customers were
                    upset and consulted with superiors about preferential
                    policies for customers."
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    5. Hãy kể về một trường hợp mà bạn cảm thấy hối tiếc trong
                    cuộc sống/công việc. Vì sao bạn cảm thấy hối tiếc về điều
                    đó? Nếu có thể làm lại, bạn nghĩ mình sẽ làm điều gì để có
                    kết quả tốt hơn? (Talk about a situation where you regretted
                    your life / work. Why do you regret that? If you could do it
                    again, what do you think you would do to get better
                    results?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Với các câu hỏi phỏng vấn dạng này, nhà tuyển dụng muốn biết
                    bạn đã từng gặp tình huống nào khó khăn nhất, và bạn đã giải
                    quyết tình huống đó như thế nào, rút ra được những bài học
                    kinh nghiệm gì cho tương lai.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: khi trả lời phỏng vấn câu hỏi này bạn cần khẳng định rõ
                    mình xử lý tình huống đó như thế nào, bạn rút được những
                    kinh nghiệm gì từ tình huống đó, bạn là một người kiên trì
                    luôn cố gắng giải quyết vấn đề đến cùng. Một khi bạn làm
                    được điều này thì nhà tuyển dụng chắc chắn sẽ đánh giá rất
                    cao về bạn.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Tôi đã từng đánh giá sai về một sản phẩm cao cấp cho một
                    khách hàng mới. Khách hàng thấy đó là một thỏa thuận tốt và
                    chúng tôi ngay lập tức bắt đầu tiến hành việc mua bánvà tôi
                    nhận ra mình đã báo giá sai khi dán mã sản phẩm vào hệ
                    thống. Tôi không biết liệu khách hàng vẫn đồng ý mua hàng
                    hay không sau khi biết chi phí thực của mặt hàng. Vì vậy,
                    thay vì báo luôn giá thực tế và có nguy cơ bị khách hủy đơn
                    hàng, tôi yêu cầu khách hàng chờ đợi trong khi tôi nói
                    chuyện với người giám sát của tôi. Tôi thừa nhận là mình đã
                    mắc sai lầm và yêu cầu sự giúp đỡ, thú thực rằng tôi không
                    chắc là nên để cho đơn hàng bị hủy hay nên bán hàng với giá
                    thấp như thế. Người giám sát của tôi đã giúp tôi giải thích
                    sai lầm với khách hàng và cho phép tôi sử dụng mức giảm giá
                    dành cho cấp quản lý của ông ấy. Tôi vẫn có được đơn hàng
                    thành công và học được một bài học quý giá trong việc kiểm
                    tra lại giá cả, cũng như tin tưởng vào người giám sát của
                    mình. "
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "I used to misjudge a premium product to a new customer. The
                    client found it to be a good deal and we immediately started
                    making a purchase and I realized I made a false quote when
                    paste the product code into the system I don't know if the
                    customer still agrees to buy after knowing the actual cost
                    of the item, so instead of quoting the actual price and risk
                    of customer canceling the order I ask the client to wait
                    while I speak to my supervisor I admit I made a mistake and
                    ask for help, confessing I'm not sure I should let the order
                    be canceled or should I sell at such a low price. My
                    supervisor helped me explain the mistake to a client and
                    allowed me to use his management discount and learned a
                    valuable lesson in checking prices and trusting your
                    supervisor. "
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-6"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    6. Bạn nghĩ mình có những tố chất/ kỹ năng nào phù hợp với
                    công việc này? (What qualities / skills do you think you
                    have that are right for this job?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Qua câu hỏi này nhà tuyển dụng có thể hiểu rõ hơn về năng
                    lực của ứng viên và đánh giá họ có những tố chất phù hợp với
                    vị trí tuyển dụng hay không.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Hãy đưa những thế mạnh của mình dựa trên tính cách cá
                    nhân như: Trung thực, có tính kỷ luật cao, chăm chỉ....Đó có
                    thể là những điểm tốt thuộc về chuyên môn hoặc tính cách
                    liên quan đến công việc bạn đang nộp đơn vào.
                    <br />
                    Người phỏng vấn bạn sẽ quan tâm tới một số chi tiết về kỹ
                    năng thực hiện công việc, về tính cách có nhanh nhẹn, hòa
                    đồng với đồng nghiệp, do đó hãy cho họ các thông tin trên.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Tôi sẽ mô tả bản thân mình là một người luôn chăm chỉ và
                    lạc quan, biết cách kiểm soát cảm xúc của mình và giữ bình
                    tĩnh trong những tình huống mà người khác không thể. Tôi
                    muốn đem lại những giá trị tốt nhất cho khách hàng, truyền
                    đạt niềm đam mê và niềm tin vào sản phẩm để đảm bảo rằng
                    khách hàng cảm thấy họ đang đưa ra lựa chọn tốt nhất"
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "I would describe myself as a hardworking and optimistic
                    person who knows how to control my emotions and stay calm in
                    situations where others cannot. I want to bring out the best
                    in value for customers, imparting passion and trust in the
                    product to make sure that the customer feels they are making
                    the best choice "
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-7"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    7. Nếu người quản lý của bạn yêu cầu bạn làm điều gì đó mà
                    bạn không đồng ý, bạn sẽ làm gì? (If your manager asked you
                    to do something that you disagree with, what would you do?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Mục đích của câu hỏi này để đánh giá về chính kiến của ứng
                    viên và cách mà bạn xử lý tình huống như thế nào?
                    <br />
                    Một số công ty đánh giá cao các nhân viên góp ý, xây dựng,
                    sẵn sàng đưa ra ý kiến cá nhân về định hướng phát triển của
                    công ty.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Trong trường hợp người quản lý yêu cầu điều gì đó mà
                    bạn không đồng ý, nếu nó liên quan tới vấn đề công việc bạn
                    có thể trao đổi trực tiếp với sếp một cách thẳng thắn, người
                    lãnh đạo sáng suốt sẽ biết cách sử dụng các thông tin có
                    ích, tránh việc trao đổi, to tiếng trong cuộc họp hay khi
                    sếp đang nóng giận.
                    <br />
                    Nếu yêu cầu của người quản lý không phù hợp với chính sách
                    và pháp lý của công ty, bạn có thể từ chối.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    “Nếu tôi và sếp của tôi bất đồng ý kiến, trước tiên tôi sẽ
                    suy nghĩ lại thật kỹ xem bản thân mình có điều gì chưa đúng
                    hay không, tôi đang bị sai hoặc nhầm chỗ nào. Nếu như tôi
                    thấy ý tưởng, ý kiến của mình không hề sai, thì tôi sẽ tiếp
                    tục xem xét đến ưu điểm và nhược điểm trong ý tưởng của sếp.
                    Nếu sếp chưa đúng, tôi sẽ trình bày cho sếp một cách rõ ràng
                    về kế hoạch, ý tưởng của mình, từ đó nhận những lời góp ý
                    của sếp, kết hợp với những ưu điểm trong kế hoạch của sếp để
                    tổng hợp lại thành một kế hoạch, một ý tưởng tuyệt vời nhất
                    có thể.”
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    “If me disagree with my boss, I will first rethink carefully
                    whether something is wrong or not. If I see that my ideas
                    and opinions are not wrong, I will continue to consider the
                    advantages and disadvantages of my boss's ideas. If the boss
                    is not right, I will present to the boss clearly my plan and
                    ideas, from which to receive the boss's suggestions, along
                    with the advantages of the boss's plan to generate a new
                    plan - the best idea possible. ”
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-8"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    8. Điểm bạn cần cải thiện trong thời điểm này là gì? Bạn có
                    kế hoạch để cải thiện những điểm này chưa? (What are things
                    you need to improve at this point? Do you have a plan for
                    the improvements?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Điều mà nhà tuyển dụng mong chờ khi hỏi câu này chính là khả
                    năng tự nhìn nhận, đánh giá bản thân của ứng viên cũng như
                    khiến nhà tuyển dụng nhìn nhận thêm về cách ứng viên xử lý
                    những tình huống bất ngờ, thậm chí là không thoải mái lắm.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Việc trả lời câu hỏi về yếu điểm của bản thân yêu cầu
                    chúng ta phải vô cùng sáng suốt và biết cân nhắc lời nói. Vì
                    thế, thay vì trả lời những câu hỏi như: “Tôi không có điểm
                    yếu nào”, bạn hãy lựa chọn 1 – 2 vấn đề mà bản thân thật sự
                    chưa tốt để chia sẻ. Và đừng chỉ dừng lại ở việc nói về điểm
                    yếu của bản thân mà hãy chia sẻ thêm về cách bạn sẽ cải
                    thiện nó trong tương lai. Bạn nên chia câu trả lời ra làm 2
                    phần: 1 phần là sự thú nhận, 1 phần là cách khắc phục điểm
                    yếu. Khi áp dụng cách này bạn cần phải cho nhà tuyển dụng
                    thấy được:
                    <br />
                    Những điểm yếu đó ảnh hưởng đến bạn như thế nào?
                    <br />
                    Hướng giải quyết của bạn ra sao nhằm bộc lộ được tính cách
                    và phẩm chất cần thiết cho công việc.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Tôi nhận thấy yếu điểm của bản thân mình là kỹ năng thuyết
                    trình trước đám đông, và tôi biết kỹ năng này rất cần thiết
                    cho công việc của tôi. Do vậy, tôi đã tham gia 1 khóa đào
                    tạo về kỹ năng mềm, đến nay tôi đã có thể hoàn toàn tự tin
                    khi phát biểu bất kỳ điều gì trước mọi người”
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    “I find my weak point in public speaking, and I know this
                    skill is essential to my work. Therefore, I have
                    participated in a training course on soft skills, so far I
                    can fully confidently say anything in front of people ”
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-9"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    9. Điều gì ở đồng nghiệp cũ/ người quản lý cũ làm bạn khó
                    chịu? (What is it about your former coworker / former
                    manager that annoys you?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Qua câu hỏi này, nhà tuyển dụng muốn biết cách bạn giao tiếp
                    và đối xử với đồng nghiệp hoặc người quản lý ở công ty cũ
                    như thế nào? <br /> Bạn và đồng nghiệp/ có gặp vấn đề gì
                    trong quá trình làm việc hay không? Cách bạn việc đội nhóm
                    có phù hợp với môi trường công ty mới không?
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Hãy đưa ra những nhận xét tích cực về công ty hay sếp
                    cũ, bạn cũng học hỏi được những bài học trong quá trình làm
                    việc tại đây, rằng bạn đã được giúp đỡ và hướng dẫn nhiều
                    trong thời gian đầu và bạn vẫn giữ liên lạc với họ một cách
                    tích cực.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Đồng nghiệp/ người quản lý cũ của tôi đã giúp đỡ và hướng
                    dẫn tôi rất nhiều trong thời gian tôi làm việc tại công ty
                    X. Trong lúc làm việc đôi khi không tránh khỏi sự bất đồng
                    quan điểm, nhưng chúng tôi luôn tìm cách để giải quyết vấn
                    đề một cách thỏa đáng nhất. Hiện tại tôi và đồng nghiệp vẫn
                    luôn giữ liên lạc tốt."
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "My former colleague / manager helped and guided me a lot
                    during my time at company X. Although disagreements were
                    inevitable at work, we always sought how to solve the
                    problem in the most satisfactory way. Now, my colleagues and
                    I still keep in good contact. "
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-10"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    10. Nếu tôi muốn hỏi bạn thân nhất của bạn để mô tả về bạn,
                    họ sẽ nói gì? (If I were to ask your best friend to describe
                    you, what would they say?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Bạn có thể thân với bạn bè nhưng bạn vẫn không chia sẻ cùng
                    một ý. Trong trường hợp này, người phỏng vấn đang kiểm tra
                    liệu bạn có thể chấp nhận điều này, và tôn trọng quan điểm
                    của họ. Ngoài ra, người phỏng vấn cũng mong muốn biết về
                    cách bạn đối xử với mọi người xung quanh kể cả trong cuộc
                    sống và công việc.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Hãy thành thật đưa ra những nét tính cách hoặc những ưu
                    điểm của bạn có trong mắt bạn bè. Khi nhận câu trả lời, nhà
                    tuyển dụng sẽ biết được rằng điểm tốt nhất đó liệu có phù
                    hợp với văn hóa công ty hay không?
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Bạn bè của tôi thường nhận xét tôi là một người lạc quan,
                    luôn biết lắng nghe và có tinh thần trách nhiệm cao. Thông
                    thường tôi và họ không quá thường xuyên gặp nhau vì tính
                    chất công việc khác nhau, nhưng khi họ có vấn đề khó khăn
                    cần giải quyết thì tôi sẽ luôn sẵn sàng lắng nghe và giải
                    quyết vấn đề cùng họ."
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "My friends often comment that I am an optimistic person,
                    always listen and have a high sense of responsibility.
                    Usually we do not meet too often because of different nature
                    of work, but when they have difficulty, I am always ready to
                    listen and solve their problems."
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-11"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    11. Bạn nghĩ mình là người có khả năng làm việc độc lập tốt
                    hay làm việc nhóm tốt? Bạn có thể chia sẻ một trường hợp cụ
                    thể không? (Do you think you have good ability to work
                    independently or as a team? Can you share a specific case?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Câu hỏi này nhằm đánh giá sự nhìn nhận bản thân và nhà tuyển
                    dụng sẽ quan tâm đến mức độ hợp tác của bạn trong đội nhóm
                    và cách làm việc theo từng yếu tố sẽ như thế nào?
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Khi gặp câu hỏi phỏng vấn xin việc này, bạn không nên
                    nói là tôi chỉ thích làm việc độc lập, hoặc theo nhóm. Một
                    ứng viên đa năng sẽ có thể tham gia làm việc theo nhóm và
                    làm việc độc lập ổn, không phải chỉ giỏi một khía cạnh. Bởi
                    làm việc độc lập hay theo nhóm thì đều quan trọng cả, nếu
                    bạn chưa giỏi về cái nào thì hãy nói với nhà tuyển dụng rằng
                    bạn sẽ cải thiện thêm, hoàn thiện để trở nên tốt hơn.
                    <br />
                    Khả năng làm việc theo nhóm hay làm việc độc lập đều quan
                    trọng, các công ty sẽ mong muốn bạn có khả năng làm việc một
                    mình hay phối hợp với đồng nghiệp tốt, bạn có thể trả lời là
                    cách làm việc theo nhóm hay độc lập đều quan trọng, do đó để
                    công việc hiệu quả cần có sự kết hợp cả hai.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Tôi nghĩ cả hai cách làm việc này đều bổ trợ cho tôi khi
                    hoàn thành một nhiệm vụ được giao. Khi làm việc độc lập, tôi
                    tập trung tốt hơn và trong quá trình làm việc nhóm, tôi sẽ
                    cùng mọi người phối hợp hoàn thành công việc hiệu quả với
                    một cách nhanh chóng hơn."
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "I think both ways of doing things work for me when
                    completing a given task. When I work independently, I focus
                    better and during teamwork, I work together and achieve
                    successful quickly. "
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-12"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    12. Thời gian rảnh bạn thường làm gì? (What do you usually
                    do in your free time?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Qua câu hỏi này, nhà tuyển dụng muốn biết xem sở thích, thói
                    quen của bạn có phần nào đó gắn liền với công việc mà bạn
                    đang ứng tuyển hay không, bạn có thực sự đam mê với công
                    việc này không, câu trả lời phỏng vấn của bạn sẽ thể hiện
                    một phần nào đó.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Bạn nên liệt kê những sở thích hoặc thói quen thường
                    ngày liên quan đến kỹ năng cần thiết cho công việc hiện tại.
                    Liên kết câu trả lời của bạn với các năng lực được vạch ra
                    trong mô tả công việc. Chỉ ra cách mà các kỹ năng và năng
                    lực phù hợp được phản ánh trong các hoạt động bạn thích.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Tôi rất thích tìm hiểu về tâm lý học nên thời gian rảnh tôi
                    thường tìm thêm những tài liệu phân tích về tâm lý hoặc đăng
                    kí những khóa học tìm hiểu về bản thân và cách phán đoán
                    hành vi xác định tính cách như DISC"
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "I love to learn about psychology so in my free time I often
                    look for more psychological analysis materials or take
                    courses on self-understanding and behavioral judgment like
                    DISC"
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-13"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    13. Bạn hay bị stress trong những trường hợp nào? Cách bạn
                    vượt qua nó là gì? (Under what circumstances are you
                    stressed? What is the way to get over it?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Câu hỏi câu hỏi phỏng vấn này, nhà tuyển dụng muốn biết về
                    cách tổ chức công việc của bạn như thế nào, những điều nào
                    sẽ làm ảnh hưởng đến động lực cũng như kết quả công việc của
                    bạn. Thông qua câu trả lời này cũng có thể đánh giá bạn là
                    một người làm việc khoa học.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Cách trả lời phỏng vấn câu hỏi này là hãy cho thấy bạn
                    đã từng đối mặt với áp lực và bạn nắm được những phương pháp
                    cân bằng và biết cách vượt qua nó. Nếu áp lực do công việc
                    chưa hiệu quả, gặp khó khăn trong việc tìm ra giải pháp,
                    cách xử lý của bạn sẽ là tập trung và cố gắng hơn để đáp ứng
                    được công việc, nhờ tới sự trợ giúp của đồng nghiệp, bạn bè.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    “Khi bị áp lực, tôi sẽ chậm lại và bắt đầu sắp xếp thứ tự ưu
                    tiên trong công việc. Sau đó tôi hoàn thành từng đầu việc
                    theo thứ tự đó. Tôi thấy áp lực chính là cách tạo ra những
                    sản phẩm tốt và sáng tạo nhất. Tôi cảm thấy hào hứng khi làm
                    việc trong một môi trường năng động, tôi yêu thích cuộc sống
                    bận rộn hơn là một cuộc sống tẻ nhạt. Thực ra tôi thấy áp
                    lực không hề tệ. Khi căng thẳng, tôi sẽ tập trung vào một
                    nhiệm vụ được ưu tiên nhất và hoàn thành từng nhiệm vụ một
                    để tránh bị rối loạn.”
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    “When I'm under pressure, I slow down and start prioritizing
                    work. Then I finished job in that order. I see pressure as
                    the way to make the best and most creative products. I feel
                    excited about working in a dynamic environment, I love the
                    busy life rather than the boring one. Actually, I do not
                    feel the pressure is bad. When I'm stressed, I will focus on
                    one task with highest priority and complete one task at a
                    time to avoid confusion.”
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-14"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    14. Bạn có sẵn sàng làm việc tăng ca hoặc đi công tác xa
                    không? (Are you willing to work overtime or go on business
                    trip?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Các câu hỏi phỏng vấn dạng này nhà tuyển dụng muốn biết thái
                    độ và trách nhiệm của bạn so với gia đình là như thế nào,
                    mức độ ưu tiên của bạn so với công việc, bạn nên biết là
                    việc đi công tác là yêu cầu của công việc, giúp công ty hoàn
                    thành các mục tiêu đặt ra, trừ các trường hợp lý do có quan
                    trọng nào đó bạn có thể xin miễn đi công tác, được chọn đi
                    công tác cho thấy bạn đang có vai trò quan trọng, được công
                    ty tín nhiệm.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Bạn sẵn sàng cho việc đi công tác, hoàn thành các mục
                    tiêu đặt ra của công ty nên là câu trả lời cho câu hỏi trên,
                    tuy nhiên bạn cũng nên đặt ra câu hỏi về mật độ đi công tác
                    của công ty, thời gian đi công tác như thế nào, để cân bằng
                    với cuộc sống gia đình riêng
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    “Tôi nghĩ đôi khi làm tăng ca hay công tác xa cũng là điều
                    hoàn toàn bình thường – nhất là khi vào mùa kinh doanh của
                    doanh nghiệp. Nếu tăng ca hoặc công tác xa có thể giúp công
                    ty hoàn thành mục tiêu, tôi nghĩ mọi người đều sẽ chấp thuận
                    điều này.”
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    “I think sometimes it's perfectly normal to work overtime or
                    go on business trip - especially during the business season.
                    If overtime or business trip can help the company achieve
                    its goals, I think everyone will accept this.”
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-15"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    15. Vì sao bạn quyết định tìm công việc mới tại thời điểm
                    này? (Why did you decide to find a new job at this time?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Đây là câu hỏi để Nhà tuyển dụng tìm hiểu lý do bạn nghỉ ở
                    công ty cũ và động lực của bạn khi muốn tìm việc mới. Qua đó
                    Nhà tuyển dụng có thể đánh giá được động lực của bạn có phù
                    hợp với vị trí tuyển dụng của công ty không
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Khi trả lời câu hỏi này, điều quan trọng nhất là bạn
                    nên đưa ra một câu trả lời tích cực, rõ ràng, thể hiện được
                    mục tiêu trong tương lai của bạn. Một số yếu tố khách quan
                    như muốn tìm việc gần nhà hơn, lương ở công ty cũ thấp… vẫn
                    có thể được chấp nhận. Nhưng tránh nói lý do “việc cũ nhàm
                    chán”, “áp lực”, “sếp khó tính”. Điều này sẽ làm nhà tuyển
                    dụng có cảm giác bạn không có nhiều động lực trong công việc
                    và không thể gắn bó lâu dài với công ty.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Em làm công ty cũ đã 3 năm nhưng sự phát triển và thăng
                    tiến không được như kỳ vọng, vì vậy em muốn tìm một môi
                    trường mới thử thách hơn để có thể phát triển bản thân và
                    thăng tiến cấp bậc cao hơn" "Tôi không có cơ hội để vận dụng
                    hết các kiến thức và kinh nghiệm của mình trong công việc
                    cũ. Tôi muốn được đóng góp nhiều hơn"
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "I have been working at my old company for 3 years but the
                    development and promotion are not as expected, so I want to
                    find a new and more challenging environment so that I can
                    develop myself and advance to a higher level"
                    <br />
                    "I don't have chance to use all my knowledge and experience
                    in my old job. I want to contribute more."
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-16"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    16. Định hướng nghề nghiệp của bạn trong 1 năm/ 3 năm tới sẽ
                    như thế nào? (What will your career orientation for the next
                    1 year / 3 years be?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Đây là câu hỏi để nhà tuyển dụng hiểu thêm về định hướng
                    nghề nghiệp, tham vọng của bạn, liệu bạn có gắn bó lâu dài
                    với công ty, và lộ trình thăng tiến tại công ty có phù hợp
                    với bạn hay không.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Hãy nói về mục tiêu (tính chất công việc mong muốn) và
                    cách để bạn đạt được mục tiêu đó. Hãy lồng ghép các chi tiết
                    phù hợp với mô tả công việc bạn đang phỏng vấn. Tránh nhắc
                    đến những chi tiết liên quan đến khả năng cam kết lâu dài
                    với công ty; tất cả chỉ là dự định của bạn, không có gì đảm
                    bảo chắc chắn cho những kế hoạch này
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    "Mục tiêu ngắn hạn của em sẽ được học và phát triển bản thân
                    mình với những kế hoạch công việc của công ty. Và mục tiêu
                    dài hạn của em sẽ được đảm nhận những công việc khó hơn để
                    có thể thăng tiến lên cấp bậc cao hơn, để đạt được mục tiêu
                    này thì kế hoạch của em sẽ tham gia các khóa học về luật lao
                    động, tâm lý học hành vi, và cách quản lý con người."
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    "My short-term goal will be to learn and develop myself with
                    the company's work plans. And my long-term goal will be
                    taking on the harder jobs to advance to higher levels. To
                    achieve this goal, my plan is to take courses in labor law,
                    behavioral psychology, and people management."
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-17"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    17. Bạn đã tìm hiểu gì về công việc, vị trí mà bạn đang ứng
                    tuyển? (What have you researched about the job or position
                    that you are applying for?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Mục đích của nhà tuyển dụng khi hỏi câu này là để tìm hiểu
                    nguyện vọng cũng như những gì bạn biết về công ty. Đây là cơ
                    hội để bạn thể hiện cho nhà tuyển dụng thấy sự quan tâm,
                    nhiệt huyết với công ty. Việc tìm hiểu trước về công ty cũng
                    giúp bạn có thể nhiều thông tin để so sánh, đối chiếu và
                    biết được đâu là nơi phù hợp với bản thân trong trường hợp
                    nhận được nhiều lời đề nghị làm việc khác nhau.
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Trước tiên, hãy thể hiện mình là người đã có quan tâm
                    và nghiên cứu trước về công ty và vị trí ứng tuyển trước khi
                    nộp đơn xin việc. Điều này giúp cho nhà ứng tuyển thấy được
                    mong muốn và khát khao của bạn cho công việc, chứ không phải
                    là chỉ nộp đơn chơi. Bạn có thể đưa ra một số hiểu biết của
                    mình về công ty như thời gian bắt đầu hoạt động, những ấn
                    tượng của cá nhân về cách mà công ty đã vượt qua khó khăn để
                    tồn tại trên thị trường và kế hoạch cụ thể cho tương lai.
                    <br />
                    Việc cho nhà tuyển dụng thấy mình đã có tìm hiểu về công ty
                    và công việc trong suốt cuộc phỏng vấn là không hề thừa, vì
                    nhà tuyển dụng cần người hiểu về công việc và sản phẩm của
                    họ. Có thể những tìm hiểu của bạn là không đủ hoặc có thể
                    hơi sai lệch một chút, nhưng nó vẫn thể hiện hứng thú của
                    bạn cho công ty và tạo cơ hội cho nhà tuyển dụng có thể bổ
                    sung và điều chỉnh lại những kiến thức cho bạn khi vào công
                    ty để bạn biết rõ hơn.
                  </AccordionContent>
                  <AccordionContent>
                    Hãy là người chủ động tìm hiểu thông tin về công ty trước
                    buổi phỏng vấn, liệt kê những điều bản thân còn thắc mắc
                    trong công việc lẫn cả văn hóa công ty để có thể trao đổi
                    thêm với nhà tuyển dụng. Bên cạnh việc tìm hiểu bản mô tả
                    công việc, hãy liên kết nó với tình trạng công ty theo quan
                    sát của bạn. Từ những gợi ý này bạn hoàn toàn có thể đoán ra
                    rất rõ các công việc sắp tới mình phải làm. Lời khuyên là
                    hãy đưa lý do kèm những dẫn chứng cụ thể vì sao công ty lại
                    đặc biệt đối với bạn. Lưu ý: Không nên nói ra những lý do có
                    thể gây mâu thuẫn với lý do bạn rời công ty cũ.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-18"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    18. Công việc này có điểm nào làm bạn thấy hứng thú nhất?
                    (What is the most interesting part of this job?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Mục đích của nhà tuyển dụng khi hỏi câu này là để tìm hiểu
                    bạn có thật sự quan tâm nhiều đến vị trí này và đây có phải
                    là công việc bạn mong ước
                    <br />
                    Chúng ta có thể có các lý do khác nhau để xin một công việc
                    nhưng đó có phải là lý do đủ thuyết phục để giúp bạn được
                    tuyển dụng ngay lập tức
                  </AccordionContent>
                  <AccordionContent>
                    1. Thể hiện vị trí này phù hợp với kế hoạch nghề nghiệp của
                    bạn như thế nào <br />
                    Tip: Một trong những cách tốt nhất để cho thấy rằng bạn là
                    một người thích hợp cho một vị trí công việc là chỉ ra nó
                    liên quan đến mục tiêu nghề nghiệp tương lai của bạn như thế
                    nào. Điều này để lại ấn tượng rằng bạn là một người có đầu
                    tư , học hỏi và có tầm nhìn trong vai trò vị trí công việc.
                    Những nhà tuyển dụng luôn tìm kiếm điều này ở ứng viên. Nêu
                    bật việc tuyển dụng bạn sẽ là hợp tác cùng có lợi cho bạn và
                    cả công ty như thế nào. Bởi vì cuối cùng, dù công việc là gì
                    đi nữa, bạn cũng đang làm việc cho chính mình mà thôi.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    (Đối với một vị trí xuất bản tạp chí): “Mục tiêu cuối cùng
                    của tôi là trở thành một giám đốc biên tập cho một tạp chí
                    đời sống. Tôi biết đây vẫn còn là một chặng đường dài đối
                    với tôi trong khi còn là một sinh viên mới tốt nghiệp nhưng
                    tôi muốn bắt đầu bằng những bước đi đúng đắn. Đó là lý do
                    tại sao tuyển dụng vị trí trợ lý biên tập thu hút tôi ngay
                    lập tức. Tôi biết rằng các kỹ năng học hỏi được ở đây sẽ
                    giúp tôi tiến gần hơn tới giấc mơ của mình.”
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    (For a magazine publishing position): “My ultimate goal is
                    to become an editorial director for a life magazine. I know
                    this is still a long way to go as a graduate student but I
                    want to start with the right steps. That's why hiring for an
                    editorial assistant position immediately attracted me. I
                    know the skills learned here will help me move closer to my
                    dream. ”
                  </AccordionContent>
                  <AccordionContent>
                    2. Nói về niềm đam mê và sở thích của bạn, và chỉ ra nó liên
                    quan đến công việc như thế nào <br />
                    Tip: Dưới đây là một cách khác để bạn có thể vượt qua câu
                    hỏi người phỏng vấn: truyền đạt sự nhiệt tình của bạn đối
                    với công việc bằng cách liên hệ với sở thích của mình. Người
                    tuyển dụng muốn mọi người sẽ hứng thú với vị trí vai trò mà
                    họ đang tuyển dụng, vì thế hãy thể hiện cho họ thấy đó là
                    công việc bạn muốn làm dù có được trả lương hay không.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    (Cho công việc tại một nhà hàng): “Tôi lớn lên trong một gia
                    đình có khả năng nấu nướng tuyệt vời. Niềm đam mê đó ngấm
                    sâu trong tôi từ lâu lắm rồi. Được thưởng thức và chuẩn bị
                    đồ ăn mang lại niềm vui cho tôi, đó là lý do tại sao tôi
                    ngay lập tức nắm lấy cơ hội xin vị trí đăng tuyển này. Tôi
                    sẽ rất hạnh phúc khi được trở thành đầu bếp cho quý nhà
                    hàng.”
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    (For a job at a restaurant): “I grew up in a family with
                    great cooking skills. That passion permeates me for a long
                    time. It was fun to enjoy and prepare food. This is why I
                    immediately seized the opportunity to apply for this post. I
                    will be very happy to be the chef for your restaurant. ”
                  </AccordionContent>
                  <AccordionContent>
                    3. Thể hiện sự nhiệt tình của bạn mong muốn trở thành một
                    phần của công ty <br />
                    Tip: Khen ngợi có thể giúp bạn tiến xa trong con đường tìm
                    kiếm công việc mình yêu thích. Khi thể hiện một cách chân
                    thành, điều này có thể làm tăng cơ hội của bạn giành được vị
                    trí công việc. Hơn nữa, điều này truyền tải sự quan tâm và
                    nhiệt tình mà nhà tuyển dụng tìm kiếm ở ứng viên. Sử dụng
                    phương pháp này, thể hiện bạn sẽ là một lựa chọn tuyển dụng
                    tốt hơn so với một người nào đó chỉ chọn công việc vì tiền
                    lương, hoặc tệ hơn, một ứng viên không hề có ý tưởng gì về
                    những việc công ty làm.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    (Đối với vị trí phát triển sản phẩm): “Tôi đã ngưỡng mộ dịch
                    vụ của quý công ty kể từ khi công ty ra mắt. Công ty nổi bật
                    hơn tất cả các trang web âm nhạc trực tuyến hiện có trong
                    việc cung cấp các nghệ sĩ vô danh không nằm trong sưu tập
                    của các trang web khác tại thời điểm đó. Là một fan âm nhạc
                    lớn, tôi đánh giá cao việc quý công ty nắm bắt cơ hội lựa
                    chọn âm nhạc của mình. Đó là lý do tại sao tôi đã rất vui
                    mừng khi nghe nói rằng quý công ty đem lại cơ hội cho những
                    người ủng hộ được trở thành một phần trong đội ngũ phát
                    triển. Tôi có một số ý tưởng tuyệt vời giúp đem lại trải
                    nghiệm tốt hơn nhiều cho người dùng trang web mình.”
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    (As for the product development position): “I have admired
                    your service since its launch. The company stood out from
                    all the existing online music sites in providing anonymous
                    artists who were not in the collections of other sites at
                    that time. As a big music fan, I appreciate the company
                    taking the opportunity to choose its music. That's why I was
                    delighted to hear that your company offers your backers the
                    opportunity to be part of the development team. I have some
                    great ideas for a much better experience for my website's
                    users. "
                  </AccordionContent>
                  <AccordionContent>
                    4. Thể hiện giá trị và sứ mệnh của công ty tương tự như của
                    bạn như thế nào <br />
                    Tip: Mọi người đều muốn được làm việc với những người có
                    cùng lý tưởng và tầm nhìn. Nếu bạn may mắn tìm được một công
                    ty có lý tưởng và tầm nhìn phù hợp với mình, hãy sử dụng
                    chúng để làm cho mình nổi bật hơn so với các đối thủ trong
                    buổi phỏng vấn. Nhà tuyển dụng sẽ thấy bạn là một đồng minh
                    hỗ trợ có thể biến các mục tiêu của công ty trở thành kết
                    quả. Bằng cách nghiên cứu về công ty đang ứng tuyển, bạn có
                    thể nhận ra giá trị phản ánh của riêng mình.
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: <br />
                    (Cho vị trí nguồn nhân lực ): “Trong khi thực hiện nghiên
                    cứu về công ty, tôi phát hiện ra rằng một trong những tầm
                    nhìn của quý công ty là giúp nâng cao cuộc sống của người
                    dân bằng cách tạo ra cơ hội việc làm tuyệt vời. Đó là lý do
                    thúc đẩy tôi và là điều khiến tôi muốn mình trở thành một
                    phần của công ty. Tôi thực sự tin rằng đây là những gì xã
                    hội của chúng ta đang cần để trở thành nơi tốt đẹp hơn cho
                    mọi người. Tôi tin tưởng rằng, tôi sẽ trở thành một phần của
                    sứ mệnh đáng trân trọng này.”
                  </AccordionContent>
                  <AccordionContent>
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Anh: <br />
                    (For Human Resource Position): “While doing research on your
                    company, I discovered that one of your company's visions is
                    to help improve people's lives by creating job
                    opportunities. That's what drives me and what makes me want
                    to be a part of the company. I truly believe this is what
                    our society needs to be a better place for everyone. I
                    believe that I will become a part of this cherished mission.
                    "
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-19"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    19. Hãy miêu tả quy trình làm việc của bạn khi nhận được một
                    nhiệm vụ công việc. Từ mô tả công việc cho vị trí này, bạn
                    nghĩ mình sẽ làm gì hàng ngày? (Describe your workflow when
                    receiving a job assignment. From the job description for the
                    position, what do you think you'll be doing on a daily
                    basis?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Mục đích của nhà tuyển dụng là để tìm hiểu về kỹ năng, tư
                    duy, cách làm việc và cách sắp xếp công việc của bạn như thế
                    nào, có phù hợp với vị trí tuyển dụng hay không
                  </AccordionContent>
                  <AccordionContent>
                    Tip: Hãy mô tả chi tiết kế hoạch làm việc của bạn, bạn sẽ
                    sắp xếp công việc như thế nào cho hiệu quả, những việc quan
                    trọng và khẩn cấp nên làm trước, sau đó đến những công việc
                    ít quan trọng và ít khẩn cấp hơn. Bên cạnh đó nêu lý do vì
                    sao bạn chọn quy trình làm việc như vậy, ý nghĩa và hiệu quả
                    của nó. Hãy thể hiện sự thông minh trong việc sắp xếp công
                    việc một cách khoa học
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-20"
                  className="mb-4 rounded-xl border border-solid px-3 data-[state=open]:bg-[#f8f9fa]"
                >
                  <AccordionTrigger className="text-start hover:no-underline">
                    20. Bạn nghĩ bạn sẽ gặp khó khăn gì trong công việc này nếu
                    chúng tôi tuyển dụng bạn? (What difficulty do you think you
                    will face in this job if we hire you?)
                  </AccordionTrigger>
                  <AccordionContent>
                    Tip: Nghĩ về những khó khăn mà bạn sẽ gặp phải nhưng chỉ
                    trong ngắn hạn và kèm theo kế hoạch để bạn khắc phục những
                    khó khăn đó một cách nhanh chóng nhất <br />
                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt: "Thời
                    gian đầu chưa quen việc nên có thể thực hiện công việc mới
                    chưa trôi chảy và hiệu quả cao. Tuy nhiên, em sẽ cố gắng học
                    tập đồng nghiệp, tự mình dành nhiều thời gian hơn để nghiên
                    cứu và luyện tập"
                  </AccordionContent>
                  <AccordionContent>
                    Tip: các khó khăn mà bạn có thể gặp phải <br />
                    1. Quá tải thông tin <br />
                    Một trong những khía cạnh khó khăn nhất khi bắt đầu công
                    việc mới là phải nhanh chóng bắt kịp các thành viên còn lại
                    trong nhóm của bạn, đặc biệt nếu bạn đang thay thế ai đó.
                    Mặc dù đồng nghiệp và người quản lý hiểu rằng sẽ cần thời
                    gian để bạn thích nghi những công việc không thể chờ đợi
                    bạn. <br />
                    Vì vậy, bạn có thể thấy mình bị quá tải với quá nhiều thông
                    tin. Những gì bạn có thể làm để giảm bớt căng thẳng là ghi
                    chú tất cả những điều bạn nghe và những gì bạn được mong
                    đợi, hỏi nhiều câu hỏi và làm rõ các thắc mắc. Điều này
                    không chỉ giúp bạn nắm bắt tốt thông tin mà còn nhận được sự
                    tin tưởng của người quản lý.
                  </AccordionContent>
                  <AccordionContent>
                    2. Không có nhiều việc để làm <br />
                    Trong khi một số nhân viên mới phải đối mặt với tình trạng
                    quá tải công việc thì cũng có nhiều người khác rơi vào
                    trường hợp ngược lại: không có nhiều việc để làm. Nếu người
                    quản lý hoặc các thành viên trong nhóm có lịch trình đặc
                    biệt bận rộn vào thời gian bạn bắt đầu làm việc, có nhiều
                    khả năng bạn sẽ phải làm những công việc phụ trợ không liên
                    quan nhiều đến nhiệm vụ chính của mình. Nhìn về mặt tích
                    cực, bạn sẽ học hỏi được rất nhiều điều từ các nhiệm vụ nhỏ
                    này bởi nó giúp bạn hiểu thêm về hoạt động bên trong của một
                    doanh nghiệp mà có thể bạn sẽ không bao giờ biết được nếu
                    không làm. <br />
                    Nhưng nếu bạn cảm thấy không đủ việc để làm, đừng ngại chủ
                    động yêu cầu được giao thêm việc. Chờ đợi thụ động chỉ khiến
                    bạn bị đánh giá thấp mà thôi. Trong trường hợp mọi người quá
                    bận thì hãy sử dụng thời gian “chết” của bạn một cách hiệu
                    quả như cập nhật các thông tin mới về ngành nghề, xem lại
                    các tài liệu về sản phẩm/dịch vụ của công ty hoặc thực hành
                    các phần mềm mới...
                  </AccordionContent>
                  <AccordionContent>
                    3. Phù hợp với văn hóa công ty <br />
                    Mỗi nơi làm việc đều có văn hóa riêng và có thể bạn đã biết
                    sơ qua về văn hóa công ty trong quá trình phỏng vấn, nhưng
                    nghe nói và thực tế là hai điều khác nhau. Khi bắt đầu công
                    việc, bạn cần hòa nhập vào văn hóa công ty để thực sự là một
                    phần của đội nhóm. <br />
                    Một thái độ lịch sự và thái độ làm việc cởi mở, tích cực
                    tham gia vào các cuộc trò chuyện nhóm hoặc bất kỳ sự kiện
                    nào sẽ giúp bạn hòa nhập một cách dễ dàng. Trái lại, nếu
                    không hòa đồng với các thành viên trong nhóm hoặc tỏ ra xa
                    cách với người quản lý có thể khiến bạn kiệt sức cả về thể
                    chất lẫn tinh thần. <br />
                    Câu hỏi này nhằm đánh giá mức độ thích ứng của bạn đối với
                    môi trường mới, công việc mới như thế nào. Bạn có phải là
                    người dễ thích nghi, hòa nhập với môi trường và sẵn sàng học
                    hỏi cái mới. Bắt đầu công việc mới đồng nghĩa với việc mở
                    đầu một chương mới trong sự nghiệp của bạn. Mặc dù sự chuyển
                    tiếp này hứa hẹn nhiều điều thú vị nhưng đồng thời nó cũng
                    tạo cho bạn khá nhiều áp lực
                  </AccordionContent>
                  <AccordionContent>
                    4. Cân bằng giữa tự tin và kiêu ngạo <br />
                    Khi bạn hào hứng với công việc mới của mình thì việc đóng
                    góp ý tưởng ngay lập tức là điều tự nhiên. Nhiệt tình tham
                    gia ngay từ đầu cho thấy rằng bạn quan tâm đến việc hợp tác
                    với các đồng nghiệp và tăng thêm giá trị cho công ty. Thế
                    nhưng, nếu không có kiến thức cơ bản về quy trình, các quy
                    tắc và mục tiêu của đội nhóm thì việc liên tục đưa ra các ý
                    kiến đóng góp có thể khiến bạn bị hiểu lầm. Đưa ra các ý
                    tưởng cho thấy sự tự tin của bạn nhưng nếu tâm huyết quá
                    mức, bạn sẽ bị đánh giá là người kiêu ngạo. Và thực tế là,
                    các nhân viên cũ có xu hướng sẽ không thích một người mới
                    nghĩ rằng họ đã biết tất cả mọi thứ về công ty khi chỉ mới
                    bắt đầu.
                  </AccordionContent>
                  <AccordionContent>
                    5. Quản lý thời gian <br />
                    Thử thách này theo tất cả mọi người từ công việc cũ đến nghề
                    nghiệp mới. Quản lý thời gian hiệu quả là yếu tố rất quan
                    trọng và để bắt kịp tất cả các thông tin trong khi vẫn kiểm
                    soát được thời gian thực hiện nhiệm vụ là điều hết sức khó
                    khăn. Một trong những cách để giảm bớt áp lực này là viết ra
                    tất cả các nhiệm vụ và sắp xếp các ưu tiên hợp lý. Bằng cách
                    tập cho mình một thói quen tốt ngay từ đầu, bạn sẽ rèn luyện
                    được kỹ năng quản lý thời gian hiệu quả hơn và công việc của
                    bạn cũng sẽ trở nên dễ dàng hơn.
                  </AccordionContent>
                  <AccordionContent>
                    6. Xây dựng mối quan hệ với đồng nghiệp mới <br />
                    Có thể nhiều đồng nghiệp của bạn sẽ thân thiện và tự giới
                    thiệu với bạn trong ngày đầu tiên, nhưng nếu muốn hình thành
                    mối quan hệ lâu dài với họ trong văn phòng, bạn sẽ phải duy
                    trì việc giao tiếp. Việc ghi nhớ được hàng loạt tên và khuôn
                    mặt là rất khó, chưa nói đến bất kỳ chi tiết cá nhân nào về
                    các đồng nghiệp mới của bạn. Do đó, hãy ghi chú một số thông
                    tin sơ bộ bạn có được về họ như sở thích hay nơi ở. <br />
                    Điều này sẽ giúp bạn bắt đầu cuộc trò chuyện một cách tự
                    nhiên nhất có thể vào lần tới khi bạn gặp họ và từ đó xây
                    dựng được mối quan hệ lâu dài.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterViewQuestions;
