import  request from "../ultils/requests";

export const GetAll = async () =>  {
        try {
                return await request.get('/Forum' )      
        } catch (error) {
                throw Error
        }
}
export const CreateForum = async (option) => {
        try {
                const res = await request.post('/Forum', option, {
                        headers: {
                                'Content-Type': 'application/json',
                        },
                })
                return res
       } catch (error) {
                console.log(error)
       }
}
export const Delete = async (option) =>  {
        try {
                return await request.delete('/Forum/delete-multiple' , {
                        data: option,
                      })      
        } catch (error) {
                throw Error
        } 
}
export const GetByName = async (name) => {
        try {
                const res = await request.get(`/Forum/getByName/${name}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetById = async (id) => {
        try {
                const res = await request.get(`/Forum/${id}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const Update = async (id, option) => {
        try {
            const res = await request.put(`/Forum/${id}`,option,{
                    headers: {
                            'Content-Type': 'application/json',
                    },
            })
            return res
       } catch (error) {
                console.log(error)
       }
}
