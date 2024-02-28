import { Link } from "react-router-dom";
import styles from './Home.module.scss'
import classNames from "classnames/bind";
import intro1Img from '../../../Image/intro1.jpg';
import intro2Img from '../../../Image/intro2.jpg';
import intro3Img from '../../../Image/intro3.jpg';
import postImg from '../../../Image/post.jpg';
import { DateIcon, EyeIcon, DowIcon } from "../../../Icon";
import * as ServiceProjectApi from './../../../apiServieces/ProjectListApi'
import { useEffect, useState } from "react";
import slide1Img from '../../../Image/silde1.jpg'
import slide2Img from '../../../Image/slide2.jpg'
import slide3Img from '../../../Image/slide3.jpg'
import { useRef } from "react";
import { PrevIcon, NextIcon } from "../../../Icon";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 

const cx = classNames.bind(styles)

function Home() {
    const [watchDataBig, setWatchDataBig] = useState(null)
    const [downloadDataBig, setdownloadDataBig] = useState(null)
    const swiperRef = useRef(null);
    const goNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slidePrev();
        }
    };
    const slide_img = [
         slide1Img, slide2Img, slide3Img
      ];
    const fecthProjectGetThreeDataBig = async () => {
        const rs = await ServiceProjectApi.GetThreeDataBig()
        setWatchDataBig(rs)
    }
    const fecthProjectGetThreeDataBigDownload = async () => {
        const rs = await ServiceProjectApi.GetThreeDataBigDownload()
        setdownloadDataBig(rs)
    }
    useEffect(() => {
        fecthProjectGetThreeDataBig()
        fecthProjectGetThreeDataBigDownload()
    },[])
    return ( 
        <div className={cx('content')}>  
            <div className={cx('content-slide')}>
                <Swiper
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={1}
                    coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: false,
                    }}
                    spaceBetween={0}
                    pagination={true}
                    autoplay={{ delay: 2000 }}
                    className={cx('swiper')}
                    ref={swiperRef}
                >
                    {slide_img.map((img, i) => {
                    return (
                        <SwiperSlide className={cx('swiper-slide')} key={i}>
                            <img  src={img} alt="" />
                        </SwiperSlide>
                    );
                    })}
                </Swiper>
                <button className={cx('buttonSlidePrev')} onClick={goPrev}><PrevIcon classsName={cx('iconSlide')}/></button>
                <button className={cx('buttonSlideNext')} onClick={goNext}><NextIcon classsName={cx('iconSlide')}/></button>
                 
            </div>
            <div className={cx('content-introduce')}>
                <div className={cx('introduce-text')}>
                    <h3>GIỚI THIỆU</h3>
                    <span>Website khóa luận tốt nghiệp và diễn đàn trao đổi cho sinh viên </span>
                </div>
                <div className={cx('introduce-content')}>
                    <Link to={'/forum'} className={cx('introduce-img')} >
                        <img src={intro1Img} alt=""/>
                        <span>Trao đổi thông tin</span>
                    </Link>
                    <Link to={'/forum'} className={cx('introduce-img')}>
                        <img src={intro2Img} alt=""/>
                        <span>Chia sẻ kinh nghiệm</span>
                    </Link>
                    <Link to={'/forum'} className={cx('introduce-img')}>
                        <img src={intro3Img} alt=""/>
                        <span>Định hướng nghiên cứu</span>
                    </Link>
                </div>
            </div>
            <div className={cx('content-news')}>
                <div className={cx('news-tab')}>
                    <div className={cx('news-tabLabel')}><h2>Xem nhiều nhất</h2></div>
                    <Link  to={'/projects'} className={cx('news-tabAll')}>Xem tất cả</Link>
                </div>
                <div className={cx('newsAll')}>
                    {
                        watchDataBig && watchDataBig.length > 0 && 
                        watchDataBig.map((item, index) => (
                            <Link key={index}  to={`/projectPost/${item.ProjectListId}/${item.UserName}`} className={cx('news-info')}>
                                <div className={cx('news-left')}>
                                    <img src={postImg} alt="img"/>
                                </div>
                                <div className={cx('news-right')}>
                                    <div className={cx('newsRight-lable')}>
                                        {item.Name}        
                                    </div>
                                    <div className={cx('newsRight-introduce')}>
                                        <div className={cx('newsRight-name')}>{item.UserName}</div>
                                        <div><EyeIcon width="1.8rem"/> {item.Watched}</div>
                                        <div><DowIcon width="1.8rem"/> {item.Download}</div>
                                    </div>
                                    <div className={cx('newsRight-date')}>
                                        <DateIcon width="1.2rem"/>
                                        <span>{new Date(item.CreatedDate).toLocaleDateString()}</span>
                                        
                                    </div>
                                    <div className={cx('newsRight-info')} 
                                        dangerouslySetInnerHTML={{ __html: item.Discriptions }} 
                                    />
                                     
                                </div>
                            </Link>
                        ))
                    }  
                </div>
            </div>
            <div className={cx('content-news')}>
                <div className={cx('news-tab')}>
                    <div className={cx('news-tabLabel')}><h2>Tải nhiều nhất</h2></div>
                    <Link  to={'/projects'} className={cx('news-tabAll')}>Xem tất cả</Link>
                </div>
                <div className={cx('newsAll')}>
                    {
                        downloadDataBig && downloadDataBig.length > 0 && 
                        downloadDataBig.map((item, index) => (
                            <Link key={index}  to={`/projectPost/${item.ProjectListId}/${item.UserName}`} className={cx('news-info')}>
                                <div className={cx('news-left')}>
                                    <img src={postImg} alt="img"/>
                                </div>
                                <div className={cx('news-right')}>
                                    <div className={cx('newsRight-lable')}>
                                        {item.Name}        
                                    </div>
                                    <div className={cx('newsRight-introduce')}>
                                        <div className={cx('newsRight-name')}>{item.UserName}</div>
                                        <div><EyeIcon width="1.8rem"/> {item.Watched}</div>
                                        <div><DowIcon width="1.8rem"/> {item.Download}</div>
                                    </div>
                                    <div className={cx('newsRight-date')}>
                                        <DateIcon width="1.2rem"/>
                                        <span>{new Date(item.CreatedDate).toLocaleDateString()}</span>
                                        
                                    </div>
                                    <div className={cx('newsRight-info')} 
                                        dangerouslySetInnerHTML={{ __html: item.Discriptions }} 
                                    />
                                     
                                </div>
                            </Link>
                        ))
                    }
                    
                </div>
                
            </div>
        </div>
     );
}

export default Home;