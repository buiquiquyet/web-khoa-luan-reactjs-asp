import classNames from "classnames/bind";
import styles from './Date.module.scss'
import { useState, useEffect } from "react";
const cx = classNames.bind(styles)
function DayOfWeek() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    useEffect(() => {
        const interval = setInterval(() => {
        const now = new Date();
        if (now.getDate() !== currentDate.getDate()) {
            setCurrentDate(now);
        }
        }, 1000);

        return () => {
        clearInterval(interval);
        };
    }, [currentDate]);
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
    const year = currentDate.getFullYear();

    return (
        <div className={cx('wrapper')}>
            <span> {dayOfWeek},  </span>
            <span>{day}/</span>
            <span>{month}/</span>
            <span>{year}</span>
        </div>
    );
}

export default DayOfWeek;