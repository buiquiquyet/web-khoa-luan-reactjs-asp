import  request from "../ultils/requests";

export const GetAll = async () =>  {
        try {
                return await request.get('/Evaluate' )      
        } catch (error) {
                throw Error
        }
}
export const CreateEvaluate = async (option) => {
        try {
                const res = await request.post('/Evaluate', option, {
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
                return await request.delete('/Evaluate/byUserIdArr/delete-multiple' , {
                        data: option,
                      })      
        } catch (error) {
                throw Error
        } 
}
export const DeleteByCommentIdArr = async (option) =>  {
        try {
                return await request.delete('/Evaluate/byCommentIdArr/delete-multiple' , {
                        data: option,
                      })      
        } catch (error) {
                throw Error
        } 
}
export const Delete = async (CommentId, UserId) =>  {
        try {
                return await request.delete(`/Evaluate/${CommentId} ${UserId}`)      
        } catch (error) {
                throw Error
        } 
}
export const DeleteByCommentId = async (CommentId) =>  {
        try {
                return await request.delete(`/Evaluate/byCommentId/${CommentId}`)      
        } catch (error) {
                throw Error
        } 
}
export const DeleteByUserId = async (UserId) =>  {
        try {
                return await request.delete(`/Evaluate/byUserId/${UserId}`)      
        } catch (error) {
                throw Error
        } 
}
export const GetByCommentIdToUserName = async (CommentID) => {
    try {
            const res = await request.get(`/Evaluate/${CommentID} `)
            return res
   } catch (error) {
            console.log(error)
   }
}
export const GetByCommentId = async (CommentType) => {
        try {
                const res = await request.get(`/Evaluate/getByCommentId/${CommentType} `)
                return res
       } catch (error) {
                console.log(error)
       }
}
export const Update = async (CommentId, UserId, option) => {
        try {
            const res = await request.put(`/Evaluate/${CommentId} ${UserId}`,option,{
                    headers: {
                            'Content-Type': 'application/json',
                    },
            })
            return res
       } catch (error) {
                console.log(error)
       }
}
