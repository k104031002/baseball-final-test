let startDate, setStartDate
let endDate, setEndDate
let bookingList, setBookingList


  ;[startDate, setStartDate] = useState('')
  ;[endDate, setEndDate] = useState('')
  ;[bookingList, setBookingList] = useState([
    '2023-9-13',
    ['2023-9-15', '2023-9-22'],
    ['2023-10-2', '2023-10-6'],
    ['2023-10-22', '2023-10-26'],
    ['2023-11-15', '2023-11-17'],
  ])

  useEffect(() => {
    const btnMonthPrev = document.querySelector('.ctrl .btnMonthPrev')
    const btnMonthNext = document.querySelector('.ctrl .btnMonthNext')
    let dateNow = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    let maxDays = 8
    let canSelect = true

    setCalendar()

    btnMonthNext.addEventListener('click', handleMonthNextClick)
    btnMonthPrev.addEventListener('click', handleMonthPrevClick)

    function handleMonthNextClick(evt) {
      let newMonth = dateNow.getMonth() + 1
      dateNow = new Date(dateNow.getFullYear(), newMonth, 1)
      setCalendar()
    }

    function handleMonthPrevClick(evt) {
      let newMonth = dateNow.getMonth() - 1
      dateNow = new Date(dateNow.getFullYear(), newMonth, 1)
      setCalendar()
    }

    function setCalendar() {
      let totalDays = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth() + 1,
        0
      ).getDate()
      let firstDay = dateNow.getDay()

      const mainLine1 = document.querySelector('.mLeft .mainLine')
      const info1 = document.querySelector('.mLeft .info')
      info1.innerHTML =
        dateNow.getFullYear() +
        '-' +
        (dateNow.getMonth() + 1).toString().padStart(2, '0')
      let dayHtml1 = ''
      for (let i = 1; i <= totalDays; i++) {
        let date = new Date(dateNow.getFullYear(), dateNow.getMonth(), i)
        let day = date.getDay()
        let template = `<div class="day date date${i} day${day}" date="${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}">${i}</div>`
        dayHtml1 += template
      }
      mainLine1.innerHTML = dayHtml1
      const date1 = document.querySelector('.date1')
      if (firstDay === 0) {
        firstDay = 7
      }
      date1.style.marginLeft = (firstDay - 1) * 40 + 'px'

      let dates = document.querySelectorAll('.calendar .date')
      dates.forEach((dateBtn) => {
        let thisDate = dateBtn.getAttribute('date')
        if (bookingList.includes(thisDate)) {
          dateBtn.classList.add('disabled')
        }
        if (startDate !== '' && endDate === '') {
          if (startDate === thisDate) {
            dateBtn.classList.add('started')
          }
        }
        if (startDate !== '' && endDate !== '') {
          colorSelected()
        }
        if (canSelect === true) {
          dateBtn.addEventListener('click', function (event) {
            let date = event.currentTarget.getAttribute('date')
            if (startDate !== '' && endDate !== '') {
              startDate = ''
              endDate = ''
              resetSelected()
            }
            if (startDate === '') {
              startDate = date
              setStartDate(startDate)
              this.classList.add('started')
            } else if (endDate === '') {
              endDateCheck(date, this)
            }
          })
        }
      })
    }

    function endDateCheck(date, target) {
      let canSet = true
      let alertInfo = ''
      if (new Date(date) < new Date(startDate)) {
        canSet = false
        alertInfo = '不能夠往起始日期的前面選取'
      } else {
        let startDateTime = new Date(startDate).getTime()
        let endDateTime = new Date(date).getTime()
        let dayRange = Math.floor(
          (endDateTime - startDateTime) / (1000 * 60 * 60 * 24)
        )
        if (dayRange > maxDays) {
          canSet = false
          alertInfo = '選取的天數超過設定'
        }
        let thisDate = new Date(date)
        for (let i = 0; i <= dayRange; i++) {
          thisDate = new Date(date)
          thisDate.setDate(thisDate.getDate() + i)
          if (
            bookingList.includes(
              thisDate.getFullYear() +
                '-' +
                (thisDate.getMonth() + 1) +
                '-' +
                thisDate.getDate()
            )
          ) {
            canSet = false
            alertInfo = '您選取的日期中已經有其他預約'
          }
        }
      }
      if (canSet === false) {
        alert(alertInfo)
      } else {
        endDate = date
        setEndDate(endDate)
        colorSelected()
        target.classList.add('ended')
      }
    }

    function resetSelected() {
      let dates = document.querySelectorAll('.calendar .date')
      dates.forEach((dateBtn) => {
        dateBtn.classList.remove('started')
        dateBtn.classList.remove('ended')
        dateBtn.classList.remove('inRange')
      })
    }

    function colorSelected() {
      let startDateTime = new Date(startDate).getTime()
      let endDateTime = new Date(endDate).getTime()
      let dayRange = Math.floor(
        (endDateTime - startDateTime) / (1000 * 60 * 60 * 24)
      )
      let dates = document.querySelectorAll('.calendar .date')
      dates.forEach((dateBtn) => {
        let thisDate = dateBtn.getAttribute('date')
        let thisDateTime = new Date(thisDate).getTime()
        if (thisDateTime > startDateTime && thisDateTime < endDateTime) {
          dateBtn.classList.add('inRange')
        }
      })
    }
  }, [])