import "../../style/news.css";
import NewsList from "./content/newsList";

export default function News() {
    const newslist = [
        {
            thumbnail: "https://assets.digilink.vn/uploads/2021/11/BEN-DAM-e1637722800902-750x465.jpg",
            modifiedDate: "2021-11-24T08:55:42.430Z",
            title: "KINH NGHIỆM ĐẾN THIÊN ĐƯỜNG DU LỊCH CÔN ĐẢO",
            description:
                "Sau kỳ nghỉ lễ dài ngày tại Côn Đảo, Quang Long 1998 cùng nhóm bạn Sài Gòn chia sẻ bài tư vấn chi tiết cho chuyến du lịch hòn đảo thiên đường này. Long và…",
            slug: "kinh-nghiem-den-thien-duong-du-lich-con-dao"
        },
        {
            thumbnail: "https://assets.digilink.vn/uploads/2021/10/1-e1633884806911-750x465.jpg",
            modifiedDate: "2021-11-24T08:55:42.430Z",
            title: "CÙNG HỘI BẠN CHECK-IN SANG CHẢNH HẾT NẤC Ở HẠ LONG",
            description:
                "Sở hữu vịnh biển kỳ quan cùng một nhịp sống hiện đại, Hạ Long là điểm đến hấp dẫn không thể bỏ qua dành cho du khách trẻ năng động. Dưới đây là lịch trình…",
            slug: "tranh-thu-cuoi-tuan-troi-thu-mat-me-cung-hoi-ban-check-in-sang-chanh-het-nac-o-ha-long"
        }
    ];

    return (
        <div className="news-page">
            <NewsList data={newslist} />
        </div>
    );
}
