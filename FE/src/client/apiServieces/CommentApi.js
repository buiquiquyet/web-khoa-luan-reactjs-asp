import  request from "../ultils/requests";

export const GetAll = async () =>  {
        try {
                return await request.get('/Comment' )      
        } catch (error) {
                throw Error
        }
}
export const CreateComment = async (option) => {
        try {
                const res = await request.post('/Comment', option, {
                        headers: {
                                'Content-Type': 'application/json',
                        },
                })
                return res
       } catch (error) {
                console.log(error)
       }
}
export const DeleteByUserIdArr = async (option) =>  {
        try {
                return await request.delete('/Comment/delete-multiple' , {
                        data: option,
                      })      
        } catch (error) {
                throw Error
        } 
}
export const DeleteByPostTypeAndIdArr = async (option, type) =>  {
        try {
                return await request.delete('/Comment/delByPostTypeAndId/delete-multiple' , {
                        params: {
                                typePost: type
                            },
                            data: option
                      })      
        } catch (error) {
                throw Error
        } 
}
export const Delete = async (CommentId) =>  {
        try {
                return await request.delete(`/Comment/byCommentId/${CommentId}`)      
        } catch (error) {
                throw Error
        } 
}
export const DeleteByUserId = async (UserId) =>  {
        try {
                return await request.delete(`/Comment/byUserId/${UserId}`)      
        } catch (error) {
                throw Error
        } 
}
export const DeleteBybyCommentId = async (ByCommentIdId) =>  {
        try {
                return await request.delete(`/Comment/bybyCommentId/${ByCommentIdId}`)      
        } catch (error) {
                throw Error
        } 
}
export const GetById = async (id) => {
    try {
            const res = await request.get(`/Comment/${id} `)
            return res
   } catch (error) {
            console.log(error)
   }
}
export const GetByTypePost = async (CommentType, PostId) => {
        try {
                const res = await request.get(`/Comment/getByTypePost/${CommentType} ${PostId}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetByByCommentId = async (CommentId) => {
        try {
                const res = await request.get(`/Comment/getByByCommentId/${CommentId}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetByTypePostCommentId = async (CommentType, PostId, ByCommentId) => {
        try {
                const res = await request.get(`/Comment/getByTypePostCommentId/${CommentType} ${PostId} ${ByCommentId}`)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const GetByTypePostCommentIdotherNull = async (CommentType, PostId) => {
        try {
                const res = await request.get(`/Comment/getByTypePostCommentIdotherNull/${CommentType} ${PostId} `)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const Update = async (id, option) => {
        try {
            const res = await request.put(`/Comment/${id}`,option,{
                    headers: {
                            'Content-Type': 'application/json',
                    },
            })
            return res
       } catch (error) {
                console.log(error)
       }
}
export const UpdateEvaluate = async (id, evaluate) => {
        try {
            const res = await request.put(`/Comment/Evaluate/${id} ${evaluate}`)
            return res
       } catch (error) {
                console.log(error)
       }
}