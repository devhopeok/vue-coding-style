
<template>
    <div>
        <main-header></main-header>

        <div class="main-content">
            <div class="container-fluid">
                <div class="col-md-12">
                    <div class="panel clearfix">
                        <div class="row">
                            <div class="col-sm-7">
                                <h1 class="panel-caption">
                                    My Assignment Folders
                                </h1>
                            </div>
                            <div class="col-sm-5 assignment-info">
                                <button class="btn btn-primary" data-toggle="modal" @click.prevent="onModalCreateFolder">
                                    <i class="glyphicon glyphicon-plus"></i>
                                    Add New Assignment Folder
                                </button>
                            </div>
                        </div>
                        <table class="cd-table table table-striped">
                            <thead>
                                <tr>
                                    <th>Assignment Folder Title</th>
                                    <th>Due on</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="assignment in assignmentList">
                                    <td>
                                        <a href="#" @click.prevent="onOpenFolder(assignment)">
                                            <i class="glyphicon glyphicon-folder-open">
                                            </i>
                                            {{assignment.title}}
                                        </a>
                                    </td>
                                    <td>
                                        {{assignment.dueDateAndTime.slice(0, 10)}}
                                    </td>
                                    <td>
                                        <span class="label label-success">
                                            {{assignment.state}}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary" @click.prevent="onModalEditFolder(assignment)">
                                            <i class="glyphicon glyphicon-pencil">
                                            </i>
                                        </button>
                                        <button class="btn btn-primary" @click.prevent="onModalRemoveFolder(assignment)">
                                            <i class="glyphicon glyphicon-trash">
                                            </i>
                                        </button> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- add folder popup -->
        <div class="modal fade" id="addFolderModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">Add New Assignment Folder</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group col-xs-12">
                            <label>Assignment Folder Title</label>
                            <input class="form-control" type="text" v-model="newFolderTitle">
                        </div>
                        <div class="form-group col-xs-6">
                            <label>Due date</label>
                            <input class="form-control" type="date" v-model="newFolderDate">
                        </div>
                        <div class="form-group col-xs-6">
                            <label>Time</label>
                            <input class="form-control" type="time" v-model="newFolderTime">
                        </div>
                        <button class="btn btn-primary" @click.prevent="onCreateFolder">Add</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /add folder popup -->
        
        <!-- edit folder popup -->
        <div class="modal fade" id="editFolderModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">Edit Assignment Folder</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group col-xs-12">
                            <label>Assignment Folder Title</label>
                            <input class="form-control" type="text" value="Introduction to HTML" v-model="selectedAssignmentTitle">
                        </div>
                        <div class="form-group col-xs-6">
                            <label>Due date</label>
                            <input class="form-control" type="date" v-model="selectedAssignmentDate">
                        </div>
                        <div class="form-group col-xs-6">
                            <label>Time</label>
                            <input class="form-control" type="time" v-model="selectedAssignmentTime">
                        </div>
                        <button class="btn btn-primary" @click.prevent="onEditFolder">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /edit folder popup -->
        
        <!-- delete folder popup -->
        <div class="modal fade" id="deleteFolderModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Confirm Deletion</h4>
                    </div>
                    <div class="modal-body text-center">
                        <h4>Are you sure to delete the assignment folder</h4>
                        <h3 style="margin-bottom: 50px;">{{selectedAssignmentTitle}}</h3>
                        <button class="btn btn-primary" @click.prevent="onRemoveFolder">Yes</button>
                        <button class="btn" data-dismiss="modal" aria-label="Close">No</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /delete folder popup -->
    </div>
</template>

<script>
import MainHeader from '../../components/Header/MainHeader.vue'
import router from '../../router'
export default {
    components: {
        mainHeader: MainHeader
    },
    data: function() {
        return {
            assignmentList: [],
            newFolderTitle: '',
            newFolderDate: '',
            newFolderTime: '',
            selectedAssignmentTitle: '',
            selectedAssignmentDate: '',
            selectedAssignmentTime: '',
            selectedCourseId: '',
            selectedAssigmentId: ''
        }
    },
    mounted: function() {
        this.getCourses(0, 10);
    },
    methods: {
        onModalCreateFolder: function() {
            this.newFolderTitle = ''
            this.newFolderDate = this.getCurrentDate()
            this.newFolderTime = this.getCurrentTime()
            $('#addFolderModal').modal('show');
        },
        onModalEditFolder: function(assignment) {
            this.selectedAssignmentTitle = assignment.title
            this.selectedAssignmentDate = assignment.dueDateAndTime.slice(0, 10)
            this.selectedAssignmentTime = assignment.dueDateAndTime.slice(11, 16)
            this.selectedCourseId = assignment.courseId
            this.selectedAssignmentId = assignment.assignmentId
            $('#editFolderModal').modal('show')
        },
        onModalRemoveFolder: function(assignment) {
            this.selectedCourseId = assignment.courseId
            this.selectedAssignmentId = assignment.assignmentId
            $('#deleteFolderModal').modal('show')
        },
        onOpenFolder: function(assignment) {
            this.$store.dispatch('setAssignment', assignment)
            router.replace({path: '/teacher/question'})
        },
        onCreateFolder: function() {
            let dueDateAndTime = this.newFolderDate + "T" + this.newFolderTime + ":00.000Z";
            let data = {
                "department": "Test"
            }
            let config = {
                method: 'post',
                baseURL: this.baseURL,
                url: '/courses',
                headers: this.requestHeaders,
                data: JSON.stringify(data)
            }
            this.axios(config).then((response) => {
                this.createAssignment(response.data.courseId, dueDateAndTime)
            }).catch(e => {
                let status = e.response.status
            })
        },
        onEditFolder: function() {
            this.editAssigment()
            $("#editFolderModal").modal("hide");
        },
        onRemoveFolder: function(assignment) {
            this.removeAssignment()
            $("#deleteFolderModal").modal("hide");
        },
        getCourses: function(page, size) {
            let data = {
                page: page,
                size: size
            }
            let config = {
                method: 'get',
                baseURL: this.baseURL,
                url: '/courses',
                headers: this.requestHeaders,
                data: JSON.stringify(data)
            }
            this.axios(config).then((response) => {
                this.getAssignments(response.data.content)
            }).catch(e => {
                let status = e.response.status
            })
        },
        getAssignments: function(coursesList) {
            let config = {
                method: 'get',
                baseURL: this.baseURL,
                url: '',
                headers: this.requestHeaders
            }
            this.assignmentList.splice(0)
            coursesList.forEach((course) => {
                config.url = `/courses/${course.courseId}/assignments`
                this.axios(config).then((response) => {
                    if(response.data.length > 0)
                        this.assignmentList.push(response.data[0])
                }).catch(e => {
                    let status = e.response.status
                })
            });
        },
        createAssignment: function(courseId, dueDateAndTime) {
            var data = {
                dueDateAndTime: dueDateAndTime,
                startDateAndTime: this.getCurrentDate() + 'T' + this.getCurrentTime() + ':00.000Z',
                state: 'CREATED',
                title: this.newFolderTitle
            }
            let config = {
                method: 'post',
                baseURL: this.baseURL,
                url: `/courses/${courseId}/assignments`,
                headers: this.requestHeaders,
                data: JSON.stringify(data)
            }
            this.axios(config).then((response) => {
                this.getCourses(0, 10)
                $("#addFolderModal").modal("hide")
            }).catch(e => {
                let status = e.response.status
            })
        },
        editAssigment: function() {
            var data = {
                //dueDateAndTime: this.selectedAssignmentDate + ' ' + this.selectedAssignmentTime,
                dueDateAndTime: this.selectedAssignmentDate + 'T' + this.selectedAssignmentTime + ':00.000Z',
                title: this.selectedAssignmentTitle
            };
            let config = {
                method: 'patch',
                baseURL: this.baseURL,
                url: `/courses/${this.selectedCourseId}/assignments/${this.selectedAssignmentId}`,
                headers: this.requestHeaders,
                data: JSON.stringify(data)
            }
            this.axios(config).then((response) => {
                this.getCourses(0, 10)
            }).catch(e => {
                let status = e.response.status
            })
        },
        removeAssignment: function() {
            let config = {
                method: 'delete',
                baseURL: this.baseURL,
                url: `/courses/${this.selectedCourseId}/assignments/${this.selectedAssignmentId}`,
                headers: this.requestHeaders
            }
            this.axios(config).then((response) => {
                this.getCourses(0, 10)
            }).catch(e => {
                let status = e.response.status
            })
        }
    }
} 
</script>
