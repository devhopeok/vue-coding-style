<template>
    <div>
        <main-header></main-header>

        <div class="main-content">
            <div class="container-fluid">
                <div class="col-md-12">
                    <div class="panel clearfix">
                        <div class="row">
                            <div class="col-md-6">
                                <router-link to="/teacher">
                                    <i class="glyphicon glyphicon-arrow-left"></i> Back to assignment folders
                                </router-link>
                            </div>
                            <div class="col-md-6 text-right">
                                <a href="#" @click.prevent="onModalAssignmentLink">
                                    <button class="btn btn-primary">
                                        Copy Assignment View Link
                                    </button>
                                </a>
                                <p class="hint">Click to copy Assignment View link for distributing Assignments by email</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-7">
                                <h1 class="panel-caption">
                                    <i class="glyphicon glyphicon-file"></i>
                                    <span>{{currentAssignmentTitle}}</span>
                                </h1>
                                <p>
                                    Due on: 
                                    <span>{{currentAssignmentDueDate}}</span>
                                </p>
                            </div>
                            <div class="col-sm-5 assignment-info">
                                <button class="mt-10 btn btn-primary" @click.prevent="onModalCreateQuestion">
                                    <i class="glyphicon glyphicon-plus"></i>
                                    Add New Question
                                </button>
                            </div>
                        </div>
                        <div class="questions-heading mt-10 clearfix">
                            <div class="questions-heading__question">Q#</div>
                            <div class="questions-heading__marks">Marks</div>
                            <div class="questions-heading__actions">Actions</div>
                        </div>
                        <ul class="questions-list sortable clearfix">
                            <li class="question-block draggable ui-widget-content clearfix" v-for="question in questionList">
                                <div class="question-block__question" v-html="question.questionText"></div>
                                <div class="question-block__marks">
                                    <span class="badge badge-marks">({{question.maxScore}})</span>
                                </div>
                                <div class="question-block__actions">
                                    <button class="btn btn-primary" @click.prevent="onModalEditQuestion(question)">         
                                        <i class="glyphicon glyphicon-pencil"></i>
                                    </button>
                                    <button class="btn btn-danger" @click.prevent="onModalDeleteQuestion(question)">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </button>
                                    <button class="btn btn-success">
                                        <i class="glyphicon glyphicon-edit"></i>Grade now
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- add question popup -->
        <div class="modal fade" id="addQuestionModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Add New Question</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <textarea name="newQuestionText" id="newQuestionText" rows="10" cols="80">
                        </textarea>
                        <div class="form-group col-xs-6">
                            <label>Marks</label>
                            <input class="form-control" type="text" v-model="newMaxScore">
                        </div>
                        <div class="col-xs-12">
                            <button class="btn btn-primary" @click.prevent="onCreateQuestion">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /add question popup -->
        
        <!-- edit question popup -->
        <div class="modal fade" id="editQuestionModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Edit Question</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <textarea name="selectedQuestionText" id="selectedQuestionText" rows="10" cols="80">
                        </textarea>
                        <div class="form-group col-xs-6">
                            <label>Marks</label>
                            <input class="form-control" type="number" v-model="selectedMaxScore">
                        </div>
                        <div class="col-xs-12">
                            <button class="btn btn-primary" @click.prevent="onEditQuestion">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /edit question popup -->
        
        <!-- delete question popup -->
        <div class="modal fade" id="deleteQuestionModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Confirm Deletion</h4>
                    </div>
                    <div class="modal-body text-center">
                        <h4>Are you sure to delete the question</h4>
                        <h3 class="js-delete-question-title" style="margin-bottom: 50px;"></h3>
                        <button class="btn btn-primary" @click.prevent="onDeleteQuestion">Yes</button>
                        <button class="btn" data-dismiss="modal" aria-label="Close">No</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /delete question popup -->
        
        <!-- copy link popup -->
        <div class="modal fade" id="copyLinkModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Copy Assignment View Link</h4>
                    </div>
                    <div class="modal-body text-center">
                        <h4>Distribute Assignment view link by copying the link below and then email students.</h4>
                        <input class="form-control" type="text" id="assignmentLink" v-model="assignmentLink">
                        <button class="btn btn-primary" data-clipboard-target="#assignmentLink" id="assignmentLinkCopy" style="margin: 20px 0;">
                            Copy Link
                        </button>
                        <p class="alert alert-info">By clicking on Copy, the assignment view link will get copied to the clipboard</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /copy link popup -->
    </div>
</template>

<script>
import MainHeader from '../../components/Header/MainHeader.vue'
export default {
    components: {
        mainHeader: MainHeader
    },
    data: function() {
        return {
            questionList: [],
            assignmentLink: '',
            newMaxScore: '',
            selectedQuestionId: 0,
            selectedMaxScore: ''
        }
    },
    computed: {
        currentCourseId() {
            return this.$store.getters.assignment.courseId
        },
        currentAssignmentId() {
            return this.$store.getters.assignment.assignmentId
        },
        currentAssignmentTitle() {
            return this.$store.getters.assignment.title
        },
        currentAssignmentDueDate() {
            let dueDateAndTime = this.$store.getters.assignment.dueDateAndTime
            return `${dueDateAndTime.slice(0, 10)} | ${dueDateAndTime.slice(11, 16)}`
        }
    },
    mounted: function() {
        CKEDITOR.replace('newQuestionText')
        CKEDITOR.replace('selectedQuestionText')
        $('.sortable').sortable({
            revert: true
        })
        $('.draggable').draggable({
            containment: '.questions-list',
            axis: 'y',
            connectToSortable: '.sortable',
            revert: 'invalid',
        })
        $('ul, li').disableSelection()
        this.getQuestions()
    },
    methods: {
        onModalCreateQuestion: function() {
            CKEDITOR.instances.newQuestionText.setData('')
            this.newMaxScore = ''
            $('#addQuestionModal').modal('show')
        },
        onModalEditQuestion: function(question) {
            this.selectedQuestionId = question.questionId
            CKEDITOR.instances.selectedQuestionText.setData(question.questionText)
            this.selectedMaxScore = question.maxScore
            $('#editQuestionModal').modal('show')
        },
        onModalDeleteQuestion: function(question) {
            this.selectedQuestionId = question.questionId
            $('.js-delete-question-title').html(question.questionText)
            $('#deleteQuestionModal').modal('show')
        },
        onModalAssignmentLink: function() {
            this.assignmentLink = ''
            this.getAssignmentLink()
            new Clipboard('#assignmentLinkCopy')
        },
        onCreateQuestion: function() {
            this.createQuestion()
            $('#addQuestionModal').modal('hide')
        },
        onEditQuestion: function() {
            this.editQuestion()
            $("#editQuestionModal").modal("hide")
        },
        onDeleteQuestion: function() {
            this.deleteQuestion()
            $("#deleteQuestionModal").modal("hide")
        },
        getQuestions: function() {
            let config = {
                method: 'get',
                baseURL: this.baseURL,
                url: `/courses/${this.currentCourseId}/assignments/${this.currentAssignmentId}/questions`,
                headers: this.requestHeaders
            }
            this.axios(config).then((response) => {
                this.questionList.splice(0)
                this.questionList = response.data
            }).catch(e => {
                let status = e.response.status
            })
        },
        createQuestion: function() {
            var data = {
                maxScore: this.newMaxScore,
                questionSequence: this.questionList.length + 1,
                questionText: CKEDITOR.instances.newQuestionText.getData(),
                questionType: 'SHORT_ANSWER'
            }
            let config = {
                method: 'post',
                baseURL: this.baseURL,
                url: `/courses/${this.currentCourseId}/assignments/${this.currentAssignmentId}/questions`,
                headers: this.requestHeaders,
                data: data
            }
            this.axios(config).then((response) => {
                this.getQuestions()
            }).catch(e => {
                let status = e.response.status
            })
        },
        editQuestion: function() {
            let data = {
                maxScore: this.selectedMaxScore,
                questionText: CKEDITOR.instances.selectedQuestionText.getData()
            }
            let config = {
                method: 'patch',
                baseURL: this.baseURL,
                url: `/courses/${this.currentCourseId}/assignments/${this.currentAssignmentId}/questions/${this.selectedQuestionId}`,
                headers: this.requestHeaders,
                data: JSON.stringify(data)
            }
            this.axios(config).then((response) => {
                this.getQuestions()
            }).catch(e => {
                let status = e.response.status
            })
        },
        deleteQuestion: function() {
            let config = {
                method: 'delete',
                baseURL: this.baseURL,
                url: `/courses/${this.currentCourseId}/assignments/${this.currentAssignmentId}/questions/${this.selectedQuestionId}`,
                headers: this.requestHeaders
            }
            this.axios(config).then((response) => {
                this.getQuestions()
            }).catch(e => {
                let status = e.response.status
            })
        },
        getAssignmentLink: function() {
            let config = {
                method: 'get',
                baseURL: this.baseURL,
                url: `/courses/${this.currentCourseId}`,
                headers: this.requestHeaders
            }
            this.axios(config).then((response) => {
                this.assignmentLink = response.data.courseLink
                $('#copyLinkModal').modal('show')
            }).catch(e => {
                let status = e.response.status
            })
        }
    }
}
</script>
