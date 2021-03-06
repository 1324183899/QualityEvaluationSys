
import { param2Obj } from '@/utils'
import storage from '@/utils/storage'

let List = []

// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     tno: '@increment',
//     tname: '@cname',
//     ttime: '@datetime',
//     tintroduce: '@cparagraph',
//     'tsex|1': ['男', '女'],
//     'twage|4000-5000': 1000
//   }))
// }

export default {
  getList: config => {
    List = storage.get('teacherlist', [])
    const { page = 1, limit = 20, sort, tname, tsex } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (tname && item.tname.indexOf(tname) < 0) return false
      if (tsex && item.tsex !== tsex) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  createTeacher: (data) => {
    List.push(JSON.parse(data.body))
    storage.set('teacherlist', List)
    return {
      data: 'success'
    }
  },
  updateTeacher: (data) => {
    const temp = JSON.parse(data.body)
    for (const v of List) {
      if (v.id === temp.id) {
        const index = List.indexOf(v)
        console.log(temp)
        List.splice(index, 1, temp)
        break
      }
    }
    storage.set('teacherlist', List)
    return {
      data: 'success'
    }
  }
}
