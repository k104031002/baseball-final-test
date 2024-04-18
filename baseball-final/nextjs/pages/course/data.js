import React, { useEffect, useRef } from 'react';

function Calendar() {
  const btnMonthPrevRef = useRef(null);
  const btnMonthNextRef = useRef(null);

  useEffect(() => {
    const handleMonthPrevClick = () => handleMonthChange(-1);
    const handleMonthNextClick = () => handleMonthChange(1);

    // 添加事件监听器
    if (btnMonthPrevRef.current) {
      btnMonthPrevRef.current.addEventListener('click', handleMonthPrevClick);
    }
    if (btnMonthNextRef.current) {
      btnMonthNextRef.current.addEventListener('click', handleMonthNextClick);
    }

    // 在组件卸载时清除事件监听器
    return () => {
      if (btnMonthPrevRef.current) {
        btnMonthPrevRef.current.removeEventListener('click', handleMonthPrevClick);
      }
      if (btnMonthNextRef.current) {
        btnMonthNextRef.current.removeEventListener('click', handleMonthNextClick);
      }
    };
  }, []);

  function handleMonthChange(direction) {
    // 处理月份切换的逻辑
  }

  return (
    <div className="calendar">
      <button ref={btnMonthPrevRef}>Prev</button>
      <button ref={btnMonthNextRef}>Next</button>
      {/* 其他日历内容 */}
    </div>
  );
}

export default Calendar;
