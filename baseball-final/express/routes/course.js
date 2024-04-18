import express from 'express'
const router = express.Router()
import db from '##/configs/mysql.js'

router.get('/', async (req, res) => {
  const sql = `SELECT course.*, teacher.name AS teacher_name,
  REPLACE(course.description, '\\n', '<br>') AS formatted_description
  FROM course
  JOIN teacher ON course.teacher_id = teacher.id`

  const result = await db.query(sql)
  // console.log(result)
  res.send(result[0])
})

router.get('/type', async (req, res) => {
  const sql = `SELECT * FROM type`

  const result = await db.query(sql)
  // console.log(result)
  res.send(result[0])
})

router.get('/type/:name', async (req, res) => {
  const typeName = req.params.name
  let sql = `SELECT * FROM course`

  if (typeName.toLowerCase() === '所有') {
    // 如果路由参数为 "所有"，则查询所有数据
    try {
      const result = await db.query(sql)
      res.send(result[0]) // 发送所有数据给客户端
    } catch (error) {
      console.error('Error querying database:', error)
      res.status(500).send('Error querying database')
    }
  } else {
    // 否则按照提供的 typeName 进行查询
    sql = `SELECT * FROM course WHERE type LIKE '%${typeName}%'`
    try {
      const result = await db.query(sql)
      res.send(result[0])
    } catch (error) {
      console.error('Error querying database:', error)
      res.status(500).send('Error querying database')
    }
  }
});
  router.get('/search/:name', async (req, res) => {
    const searchName = req.params.name
    let sql = `SELECT * FROM course WHERE name LIKE '%${searchName}%'`
  
    try {
      const result = await db.query(sql)
      res.send(result[0])
    } catch (error) {
      console.error('Error querying database:', error)
      res.status(500).send('Error querying database')
    }

})

// router.get('/:id', (req, res) => {
//   const courseId = req.params.id
//   db.query('SELECT * FROM course WHERE id = ?', [courseId], (error, results) => {
//     if (error) {
//       console.error('Error querying database: ' + error.stack);
//       res.status(500).send('Error querying database');
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).send('Course not found');
//       return;
//     }
//     res.json(results[0]);
//   });
// });

export default router
