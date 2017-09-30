<template>
    <div>
        <main-header></main-header>

        <div class="main-content">
            <div class="container">
                <div class="col-md-6 col-md-offset-3">
                    <div class="panel clearfix">
                        <form action="">
                            <div class="form-group">
                                <label for="">First Name</label>
                                <input class="form-control" type="text" v-model="firstName">
                            </div>
                            <div class="form-group">
                                <label for="">Last Name</label>
                                <input class="form-control" type="text" v-model="lastName">
                            </div>
                            <div class="form-group">
                                <label for="">School / College / Institution</label>
                                <input class="form-control" type="text" v-model="college">
                            </div>
                            <div class="form-group">
                                <a href="#" @click.prevent="onModalResetPassword">
                                    <i class="glyphicon glyphicon-cog"></i> Reset password?
                                </a>
                            </div>
                            <button class="btn btn-lg btn-wide btn-default" @click.prevent="onSaveSettings">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- reset password popup -->
        <div class="modal fade" id="resetPassword" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Reset Password</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">Old Password</label>
                            <input type="password" class="form-control" v-model="oldPassword">
                        </div>
                        <div class="form-group">
                            <label for="">New Password</label>
                            <input type="password" class="form-control" v-model="newPassword">
                        </div>
                        <div class="form-group">
                            <label for="">Re-Type Password</label>
                            <input type="password" class="form-control" v-model="confirmPassword">
                        </div>
                        <button class="btn btn-primary" @click.prevent="onResetPassword">Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /reset password popup -->
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
            firstName: '',
            lastName: '',
            college: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    },
    mounted: function() {
        const user = this.$store.getters.user.user
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.college = user.college
    },
    methods: {
        onModalResetPassword: function() {
            this.oldPassword = ''
            this.newPassword = ''
            this.confirmPassword = ''
            $('#resetPassword').modal('show')
        },
        onResetPassword: function() {
            
        },
        onSaveSettings: function() {
            let user = this.$store.getters.user
            let currentUserId = user.user.userId;
            let data = {
                firstName: this.firstName,
                lastName: this.lastName,
                college: this.college
            }
            let config = {
                method: 'patch',
                baseURL: this.baseURL,
                url: `/users/${currentUserId}`,
                headers: this.requestHeaders,
                data: JSON.stringify(data)
            }
            this.axios(config).then((response) => {
                user.user = response.data
                this.$store.dispatch('setUser', user)
                alert('Saved Successfuly!')
            }).catch(e => {
                let status = e.response.status
            })
        }
    }
}
</script>
