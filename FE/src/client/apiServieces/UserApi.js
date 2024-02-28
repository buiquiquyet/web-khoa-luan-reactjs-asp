import  request from "../ultils/requests";

export const GetAll = async () =>  {
        try {
                return await request.get('/User' )      
        } catch (error) {
                throw Error
        }
}
export const CreateUser = async (option) => {
        try {
                const res = await request.post('/User', option, {
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
                return await request.delete('/User/delete-multiple' , {
                        data: option,
                      })      
        } catch (error) {
                throw Error
        } 
}
export const GetById = async (id) => {
        try {
                const res = await request.get(`/User/${id}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetUserIdCheckComment = async (id) => {
        try {
                const res = await request.get(`/User/getUserIdCheckComment/${id}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetByName = async (name) => {
        try {
                const res = await request.get(`/User/getByName/${name}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetOnlyByName = async (name) => {
        try {
                const res = await request.get(`/User/getOnlyByName/${name}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetByUserName = async (userName, pass) => {
        try {
                const res = await request.get(`/User/getByUsername/${userName} ${pass}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const Update = async (id, option) => {
        try {
                const res = await request.put(`/User/${id}`,option,{
                        headers: {
                                'Content-Type': 'multipart/form-data',
                        },
                })
                return res
       } catch (error) {
                console.log(error)
       }
}
export const UpdateCheckComment = async (id, option) => {
        try {
                const res = await request.put(`/User/checkComment/${id}`,option,{
                        headers: {
                                'Content-Type': 'application/json',
                        },
                })
                return res
       } catch (error) {
                console.log(error)
       }
}
