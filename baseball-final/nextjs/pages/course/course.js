import React, { useState, useEffect } from 'react'
import '@/node_modules/bootstrap/dist/css/bootstrap.min.css'
import styles from './course.module.css'
import Link from 'next/link'
import Script from 'next/script'
import DatePicker from 'react-datepicker'
import { DateRangePicker } from '@/pages/_app'



export default function Course() {
  const [courses, setCourses] = useState([])
  const [types, setTypes] = useState([])
  const [selectedTypeName, setSelectedTypeName] = useState('所有') // 初始化为 "所有"
  const [formData, setFormData] = useState({ inputValue: '' })
  const [selectedColor, setSelectedColor] = useState('#EE3E27') // 设置选中颜色状态
  const [courseCount, setCourseCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1) // 当前页码
  const pageSize = 4 // 每页显示的课程数量

  // 处理表单提交
  const handleSubmit = (event) => {
    event.preventDefault() // 阻止表单默认的提交行为

    // 收集表单数据
    const formData = new FormData(event.target)
    const inputValue = formData.get('inputName')

    // 更新表单数据状态
    setFormData({ inputValue })

    // 重置表单输入框
    event.target.reset()
  }

  // 获取课程数据
  useEffect(() => {
    let url = 'http://localhost:3005/api/course'

    if (formData.inputValue) {
      const encodedKeyword = encodeURIComponent(formData.inputValue) // 编码搜索关键字
      url = `http://localhost:3005/api/course/search/${encodedKeyword}`
    } else if (selectedTypeName && selectedTypeName !== '所有') {
      url = `http://localhost:3005/api/course/type/${selectedTypeName}`
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data)
        setCourseCount(data.length)
      })
      .catch((error) => console.error('Error fetching courses:', error))
  }, [selectedTypeName, formData]) // 添加 selectedTypeName 和 formData 到依赖数组中

  // 获取类型数据
  useEffect(() => {
    fetch('http://localhost:3005/api/course/type')
      .then((response) => response.json())
      .then((data) => {
        setTypes(data)
      })
      .catch((error) => console.error('Error fetching types:', error))
  }, [])

  const formatDescription = (description) => {
    return description.split('/<br>').join('<br>')
  }

  const handleTypeClick = (typeName) => {
    setSelectedTypeName(typeName)
    setCurrentPage(1)
  }

  // 计算总页数
  const totalPages = Math.ceil(courses.length / pageSize)

  // 根据当前页码和课程数量计算要显示的课程列表
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, courses.length)
  const visibleCourses = courses.slice(startIndex, endIndex)

  // 处理分页按钮点击事件
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  //日期選擇器
 
  return (
    <>
      <div className={`navber-img-sun ${styles.navberImgSun}`}>
        <img src="/images/course/滿版圖.jpg" alt="" />
      </div>
      <div className="container">
        <div className="main-1-sun d-flex justify-content-between align-items-center">
          <nav aria-label="breadcrumb mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">所有課程</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
          <div className={`search-sun ${styles.SearchSun}`}>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  name="inputName" // 添加 name 属性
                />
                <button
                  className={`search-btn-sun btn ${styles.SearchBtnSun}`}
                  type="submit"
                  id="button-addon2"
                >
                  搜尋
                </button>
              </div>
            </form>
            <div className="sort-sun d-flex align-items-center">
              <p className="me-5">共 {courseCount} 件商品 </p>
              <div className="input mb-3">
                <select className="form-select" id="inputGroupSelect01">
                  <option selected="">排序</option>
                  <option value={1}>價格:高-低</option>
                  <option value={2}>價格:低-高</option>
                  <option value={3}>編碼:高-低</option>
                  <option value={4}>編碼:低-高</option>
                  <option value={5}>更新日期:新-舊</option>
                  <option value={6}>更新日期:舊-新</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <hr className={`${styles.hr}`} />
        <div className={` d-flex main-2-sun ${styles.main2Sun}`}>
          <div className={`filter-sun ${styles.filterSun}`}>
          <form>
          <DateRangePicker />
          <div className={`d-flex justify-content-between ${styles.btnBox}`}>
          <button className='btn btn-secondary me-3' style={{width:'132.5px'}}>取消 </button>
          <button className='btn btn-primary' style={{width:'132.5px'}}>確定日期</button>
          </div>
          </form>
          </div>

          <div className="TypeAndCourse">
            <div className="TypeSelect d-flex">
              {types.map((type) => (
                <div
                  key={type.name}
                  className={`type-sun d-flex ${styles.TypeSun}`}
                  onClick={() => handleTypeClick(type.name)}
                  style={{
                    color:
                      selectedTypeName === type.name ? selectedColor : 'black',
                  }}
                >
                  <div className={`typeCardSun ${styles.TypeCardSun}`}>
                    <img src={`/images/course/${type.img}`} alt="" />
                    <h6 className="fw-bold mt-1">{type.name}</h6>
                  </div>
                </div>
              ))}
            </div>

            <div className={`course-card-sun ${styles.CourseCardSun}`}>
              {visibleCourses.map((course) => (
                <div
                  key={course.id}
                  className={`course-card-sun d-flex ${styles.CourseCardSun}`}
                >
                  <img src={`/images/course/${course.photo}`} alt="" />
                  <div
                    className={`courseCardTextSun ${styles.CourseCardTextSun}`}
                  >
                    <p className="fw-bold">{course.type}</p>
                    <h3 className={`teacherText ${styles.teacherText}`}>{course.name}</h3>
                    <p>教練:{course.teacher_name}</p>
                    <p>
                      時間:{new Date(course.course_start).toLocaleString()} ~{' '}
                      {new Date(course.course_end).toLocaleString()}
                    </p>
                    <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatDescription(course.description),
                        }}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 分页导航按钮 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`pagination-btn ${
                currentPage === page ? 'active' : ''
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </>
  )
}
