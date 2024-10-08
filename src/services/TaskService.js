import axios from './axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import handleError from './handleError';


export async function getTasks(page, isPending, root){
    isPending.value  = true;
    try {
        const response = await axios.get('/tasks',{
            params: {
                'page' : page,
                'project_id': root.$route.query.project_id,
                'search': root.$route.query.search,
                'status': root.$route.query.status,
                'priority': root.$route.query.priority,
            }
        });
        
        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log(error);
        if (error.response) {
            const response = error.response;
            if (response.status === 401 || response.data.message) {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else if (response.status === 422) {
                for (let i in response.data.errors) {
                    toast.warning(response.data.errors[i][0], {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
            } else {
                toast.error("Something went wrong! Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } else if (error.request) {
            toast.error("No response from the server. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    } 
    finally{
        isPending.value  = false;
    }
    
}

export async function storeTask(taskData, isPending, root){
    isPending.value  = true;
    try {
        const formData = new FormData();
        for (const key in taskData) {
          if (key === 'files' && taskData[key]) {
            for (let i = 0; i < taskData[key].length; i++) {
              formData.append('files[]', taskData[key][i]);
            }
          } else {
            formData.append(key, taskData[key]);
          }
        }
        
        const response = await axios.post('/tasks', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        
        if (response.status === 200 && response.data.status == true) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            /*setTimeout(() => {
                const redirect = root.$route.query.redirect || '/user/home';
                root.$router.push(redirect);
            }, 2000);*/
        }

    } catch (error) {
        handleError(error);
    } 
    finally{
        isPending.value  = false;
    }
    
    
    
}

export async function getTask(id, isPending){
    isPending.value = true;
    try {
        const response = await axios.get('/tasks/'+id);
        
        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        handleError(error); 
    } 
    finally{
        isPending.value  = false;
    }
}

export async function updateStatus(task_id, new_status, estimated_time, isPending){
    isPending.value  = true;
    try {
       
        const response = await axios.post('/tasks/update-status/'+task_id,{
            'new_status': new_status,
            'estimated_time': estimated_time
        });
        
        if (response.status === 200 && response.data.status == true) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            return response.data.new_status
        }

    } catch (error) {
        handleError(error); 
    } 
    finally{
        isPending.value  = false;
    }
    
    
}


export async function assignTaskTo(task_id, employee_id, isPending){
    isPending.value  = true;
    try {
       
        const response = await axios.post('/tasks/assignTo/'+task_id,{
            'employee_id': employee_id
        });
        
        if (response.status === 200 && response.data.status == true) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            return response.data.assign_employee_id
        }

    } catch (error) {
        handleError(error); 
    } 
    finally{
        isPending.value  = false;
    }
}

export async function deleteTask(id){
    try {
        const response = await axios.delete('/tasks/'+id);

        if (response.status === 200) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });
        }

    } catch (error) {
        handleError(error);
    } 
}


export async function  update(id, taskData, isPending, root) {
    isPending.value  = true;
    try {
        
        const response = await axios.put('/tasks/'+id, taskData);
        
        if (response.status === 200 && response.data.status == true) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
            });

            /*setTimeout(() => {
                const redirect = root.$route.query.redirect || '/user/tasks/show/'+id;
                root.$router.push(redirect);
            }, 2000);*/
        }

    } catch (error) {
        handleError(error);
    } 
    finally{
        isPending.value  = false;
    }
    
}


