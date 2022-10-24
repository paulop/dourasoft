import {api} from 'boot/axios'

export default function useApi (url, id) {

    // Create
    const create = async (url, id) => {
        try {
            //const body = {cod_prod, prod_name, description, price};
            //console.log(typeof(body));
            //console.log(body)
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            };
            const {response} = await api.post(url,form)
            return response
        } catch (error) {
            console.log('API Create method error')            
        }

    }

    // Read
    const read = async (url) => {
        try {
            
            const {response} = await api.get(url)
            //return response.data
            return response
        } catch (error) {
            console.log('API Read method error')  
        }

    }

    // Update
    const update= async (form) => {
        try {
            //const body = {cod_prod, prod_name, description, price};
            //const options = {
            //    method: 'PUT',
            //    headers: {"Content-Type":"application/json"},
            //    body: JSON.stringify(body)
            //};
            // url --> http://localhost:3001/api/v1/regs/
            const {response} = await api.put(`${url}/${form.id}`, options)
            console.log(response);
            return response
        } catch (error) {
            console.log('API Update method error')   
        }
    }
    
    // Delete
    const del = async (id) => {
        try {
            const response = await api.del(`http://localhost:3001/api/v1/regs/${id}`)
            return response.data
        } catch (error) {
            console.log('API Delete method error')  
        }
    } 
     

    return {
        // CRUD
        create,
        read,
        update,
        del
    }    
}