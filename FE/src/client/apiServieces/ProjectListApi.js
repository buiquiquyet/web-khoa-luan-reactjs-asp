import  request from "../ultils/requests";

export const GetAll = async () =>  {
        try {
                return await request.get('/ProjectList' )      
        } catch (error) {
                throw Error
        }
}
export const GetAllAdmin = async () =>  {
        try {
                return await request.get('/ProjectList/getAllAdmin' )      
        } catch (error) {
                throw Error
        }
}
export const CreateProjectList = async (option) => {
        try {
                const res = await request.post('/ProjectList', option, {
                        headers: {
                                'Content-Type': 'multipart/form-data',
                        },
                })
                return res
       } catch (error) {
                console.log(error)
       }
}
export const Delete = async (option) =>  {
        try {
                return await request.delete('/ProjectList/delete-multiple' , {
                        data: option,
                      })      
        } catch (error) {
                throw Error
        } 
}
export const GetByUserId = async (id) => {
        try {
                const res = await request.get(`/ProjectList/getByUserId/${id}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetByName = async (name) => {
        try {
                const res = await request.get(`/ProjectList/getByName/${name}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetByUserIdAndName = async (useId,name) => {
        try {
                const res = await request.get(`/ProjectList/getByUserIdAndName/${useId} ${name}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetById = async (id) => {
        try {
                const res = await request.get(`/ProjectList/${id}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetThreeDataBig = async () => {
        try {
                const res = await request.get(`/ProjectList/getThreeDataBig`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetThreeDataBigDownload = async () => {
        try {
                const res = await request.get(`/ProjectList/getThreeDataBigDownload`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetDataByNameAndKhoaId = async (name, deparmentId) => {
        try {
                const res = await request.get(`/ProjectList/getDataByNameAndKhoaId/${name} ${deparmentId}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetByDepartmentId = async (deparmentId) => {
        try {
                const res = await request.get(`/ProjectList/getByKhoa/ ${deparmentId}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const Update = async (id, option) => {
        try {
                const res = await request.put(`/ProjectList/${id}`,option,{
                        headers: {
                                'Content-Type': 'multipart/form-data',
                        },
                })
                return res
       } catch (error) {
                console.log(error)
       }
}
export const UpdateCheckAdmin = async ( option) => {
        try {
                const res = await request.put(`/ProjectList/checkAdmin`,
                        option,
                        {
                        headers: {
                                'Content-Type': 'application/json',
                        },
                })
                return res
       } catch (error) {
                console.log(error)
       }
}
