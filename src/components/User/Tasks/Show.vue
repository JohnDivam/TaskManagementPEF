<template>
    <DashLayout page-title="Create task">
    
<div class="container">
    <div v-if="isPending">
        <v-skeleton-loader type="article,text, button" :loading="isPending"></v-skeleton-loader>
    </div>
    <div v-else class="card">
      <div class="card-header d-flex"> 
        <h4>{{ task.name }} <small>({{task.project_name}})</small> </h4> 
        <div  v-if="user.type === 'admin' || user.type === 'superadmin'" class="ml-auto d-flex align-items-center">
            <select class="form-control mr-3" :disabled="isPending" @change="handleStatusChange($event)">
                <option v-for="status in task.available_statuses" :key="status" :value="status"  :selected="status === task.status">{{status}}</option>
            </select>
            <select class="form-control mr-3" :disabled="isPending" @change="handleAssignToChange($event)">
                <option value="" selected disabled>Assign to: </option>
                <option v-for="employee in employees" :key="employee.id" :value="employee.id" :selected="employee.id === task.assign_employee_id"  >{{employee.name}}</option>
            </select>
            <router-link  to="/user/home" class="btn btn-sm btn-secondary text-white float-right">Back</router-link>

              <router-link :to="'/user/tasks/edit/'+task.id"  class="btn btn-sm btn-info mx-1 text-white"> Edit </router-link>
        </div>
      </div>
      <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <p>{{task.description}}</p>
                    <hr>
                    <div v-if="task.files && task.files.length">
                        <h5>Files: </h5>
                        <ul class="list-unstyled">
                            <li v-for="(file, index) in task.files" :key="index">
                            <a :href="file" target="_blank">{{ getFileName(file) }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4">
                    <ul  v-if="user.type === 'admin' || user.type === 'superadmin'">
                        <li>Created at: {{task.created_at}}</li>
                        <li>Estimated time: {{task.estimated_time}}</li>
                        <li>Start at: {{task.start_at}}</li>
                        <li>End at: {{task.end_at}}</li>       
                    </ul>
                    <div v-else>
                         <v-text-field
                                v-model="task.estimated_time"
                                label="Estimated time"
                                type="time"
                                outlined
                                :disabled="task.status != 'Backlog'"
                            ></v-text-field>
                           <v-btn  v-if="task.status == 'Backlog'" @click="handleStatusBtn('Progress')" type="button" :disabled="isPending" :loading="isPending" color="success" >
                                Start progress!
                            </v-btn>

                            <h5 v-if="task.start_at" >Start at: {{task.start_at}}</h5>
                            <h5 v-if="task.end_at" >End at: {{task.end_at}}</h5>
                            <v-btn  v-if="task.status == 'Progress'" @click="handleStatusBtn('ReadyForTesting')" type="button" :disabled="isPending" :loading="isPending" color="warning" >
                                Finish!
                            </v-btn>

                    </div>
                </div>
            </div>
      </div>
      <div class="card-footer text-left">
          <span class="badge badge-info">Priority: {{task.priority}}</span> &nbsp;
          <span class="badge badge-secondary">Type: {{task.type}}</span>
      </div>
      
    </div>
</div>


    </DashLayout>
</template>

<script>
import DashLayout from '../../layouts/DashLayout.vue';
import { computed, ref, getCurrentInstance, onMounted, watch  } from "vue";
import { useStore } from "vuex";
import { useRoute } from 'vue-router';
import { getTask, updateStatus, assignTaskTo } from "../../../services/TaskService";

export default {
    components:{
        DashLayout
    },
    setup() {
        const root = getCurrentInstance().proxy;
        const store = useStore();
        const isPending = ref(false);
        const task = ref({});
        const route = useRoute();
        const employees = ref([]);
 

        const findTask = async() => {
            const taskData = await getTask(route.params.id, isPending);
            task.value = taskData.task;
            employees.value = taskData.employees;
        }

       
        const getFileName = (fileUrl) => {
            return fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
        };

        const handleStatusChange = async(event) => {
            task.value.status = await updateStatus(route.params.id, event.target.value, isPending);
        };

        const handleStatusBtn = async(new_status) => {
            task.value.status = await updateStatus(route.params.id, new_status, task.value.estimated_time, isPending);
        };
        
        const handleAssignToChange = async(event) => {
            task.value.assign_employee_id = await assignTaskTo(route.params.id, event.target.value, isPending);
        };


        onMounted(async () => {
            await findTask();
        });

        const user = computed(() => store.getters['userModule/getUser']);


        return {
            user,
            isPending,
            task,
            findTask,
            getFileName,
            handleStatusChange,
            employees,
            handleAssignToChange,
            handleStatusBtn,
        };
    }
}
</script>