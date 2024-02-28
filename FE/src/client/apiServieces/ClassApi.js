import  request from "../ultils/requests";

export const GetAll = async () =>  {
  
        try {
                return await request.get('/Class' ) 
        } catch (error) {
                
        }
}
export const getSpecializedId = async (id) =>  {
  
        try {
                return await request.get(`/Class/getSpecializedId/${id}` )
        } catch (error) {
                throw Error
        }  
}
export const getById = async (id) =>  {
  
        try {
                return await request.get(`/Class/getId/${id}` )
        } catch (error) {
                throw Error
        }
         
     
}