<template>
    <DashLayout page-title="Home">
     <div class="topAnalyses">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h2 class="mb-3">Dashboard  </h2>
                </div>
            </div>
            <div class="row analyseRow" >
                <div class="col-md-4">
                    <div class="analyseItem">
                        <h5 class="d-block">11</h5>
                        <span class="text-muted">Tasks In Waiting</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="analyseItem">
                        <h5 class="d-block"> 3 </h5>
                        <span class="text-muted">Tasks Disapproved</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="analyseItem">
                        <h5 class="d-block">25</h5>
                        <span class="text-muted">Tasks Completed</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="homePanel">
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <SideBar  v-if="user.name" :statuses="statuses" :currentStatus="currentStatus" :user="user" />
            </div>
            <div class="col-md-9">
                <TasksTable />
            </div>
        </div>
    </div>
</div>


    </DashLayout>
</template>


<script>

import DashLayout from '../layouts/DashLayout.vue';
import SideBar from './SideBar.vue';
import { getCurrentInstance, computed } from "vue"
import { useStore } from "vuex";
import TasksTable from   './Tasks/TasksTable.vue';
import { useRouter, useRoute } from 'vue-router';

export default {
    components:{
        DashLayout,
        TasksTable,
        SideBar
    },
    setup() {
        const root = getCurrentInstance().proxy;
        const store = useStore();

        const statuses = [
            'Backlog',
            'Progress',
            'ReadyForTesting',
            'Testing',
            'Disapproved',
            'Approved'
        ];
        
        const currentStatus = computed(() => root.$route.query.status || "");
        const user = computed(() => store.getters['userModule/getUser']);

        return {
            user,
            statuses,
            currentStatus,
        }
    },
}
</script>
