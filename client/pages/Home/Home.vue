<template>
    <div>
        <home-header></home-header>

        <div class="login navbar">
            <div class="container">
                <p class="login__alert">
                    Students cannot login here. Students should login using the link received from course faculty
                </p>
                <form class="form-inline">
                    <div class="login__field">
                        <input class="form-control" type="email" placeholder="Email" v-model="userName">
                    </div>
                    <div class="login__field">
                        <input class="form-control" type="password" placeholder="Password" v-model="password">
                        <a href="#" data-toggle="modal" data-target="#forgotPassModal">Forgot password?</a>
                    </div>
                    <div class="login__field">
                        <button class="btn btn-default" @click.prevent="onLogin">Login</button>
                    </div>
                </form>
            </div>
        </div>
    
        <div class="main-content">
            <div class="container">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel clearfix">
                        <h1 class="panel-caption mb-20">Sign Up</h1>
                        <!-- <p class="alert alert-info">All fields are required</p> -->
                        <form>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="">First Name</label>
                                    <input class="form-control" type="text" v-model="regFirstName" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">Last Name</label>
                                    <input class="form-control" type="text" v-model="regLastName" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="">Email ID</label>
                                    <input class="form-control" type="email" v-model="regEmail" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">Re-type Email ID</label>
                                    <input class="form-control" type="email" v-model="regConfirmEmail" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="">Password</label>
                                    <input class="form-control" type="password" v-model="regPassword" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">Re-type Password</label>
                                    <input class="form-control" type="password" v-model="regConfirmPassword" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <p>Role</p>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="radio-inline" for="instructor">
                                        <input type="radio" name="role" id="instructor" value="instructor" v-model="regRole" @click="onRoleChange">
                                        Instructor/Professor
                                    </label>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="radio-inline" for="student">
                                        <input type="radio" name="role" id="student" value="student" v-model="regRole" @click="onRoleChange" checked>
                                        Student
                                    </label>
                                </div>
                            </div>
                            <div class="row" id="student-form">
                                <div class="form-group col-md-6">
                                    <label for="">School / College / Institution</label>
                                    <input class="form-control" type="text" v-model="regCollegeID" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">Student ID</label>
                                    <input class="form-control" type="text" v-model="regStudentID" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div id="captcha_container"></div>
                                    <p class="vv-invalid" v-if="recaptchaError != ''">
                                        {{ recaptchaError }}
                                    </p>
                                </div>
                            </div>
                            <button class="mt-10 btn btn-lg btn-wide btn-default" @click.prevent="onRegister">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- forgot pass popup -->
        <div class="modal fade" id="forgotPassModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">Reset Password</h4>
                    </div>
                    <div class="modal-body">
                        <p>Please enter the Email ID that you have used during Sign Up</p>
                        <div class="form-group">
                            <label for="">Email ID</label>
                            <input class="form-control" type="text" v-model="resetEmail">
                        </div>
                        <button class="btn btn-primary" @click.prevent="onResetPassword">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /forgot pass popup -->
    </div>
</template>

<script>
    import HomeHeader from '../../components/Header/HomeHeader.vue'
    import router from '../../router'
    export default {
        components: {
            homeHeader: HomeHeader
        },
        data: function() {
            return {
                userName: '',
                password: '',
                regFirstName: '',
                regLastName: '',
                regEmail: '',
                regConfirmEmail: '',
                regPassword: '',
                regConfirmPassword: '',
                regRole: 'student',
                regCollegeID: '',
                regStudentID: '',
                isRobot: true,
                recaptchaError: '',
                resetEmail: ''
            }
        },
        mounted: function() {
            let addCaptcha = () => {
                if (window.grecaptcha === undefined) {
                    setTimeout(addCaptcha, 500)
                    return
                }
                window.grecaptcha.render('captcha_container', {
                    sitekey: this.sitekey,
                    callback: (response) => {
                        this.isRobot = false
                        this.recaptchaError = ''
                    }
                })
            }
            addCaptcha()
        },
        methods: {
            onRoleChange: function() {
                var $studentForm = $("#student-form");
                if (this.regRole == "instructor") {
                    $studentForm.stop().slideUp();
                    $studentForm.find("input").attr("required", false);
                } else {
                    $studentForm.stop().slideDown();
                    $studentForm.find("input").attr("required", true);
                }
            },
            onLogin: function() {
                let headers = {
                    'Content-Type': 'application/json'
                }
                let data = {
                    userName: this.userName,
                    password: this.password
                }
                let config = {
                    method: 'post',
                    baseURL: this.baseURL,
                    url: '/auth/login',
                    headers: headers,
                    data: JSON.stringify(data)
                }
                this.axios(config).then((response) => {
                    let res = response.data
                    let role = res.user.roles[0];
                    var expires = res.expiresIn / 1000 / 60 / 60 / 24;
                    this.$store.dispatch('setUser', response.data)
                    if(role == 'instructor') {
                        router.replace({path: '/teacher'})
                    } else if(role == 'ta') {
                        router.replace({path: '/analyst-assignment-list'})
                    } else if(role == 'student') {
                        alert('Students cannot login here. Students should login using the link received from course faculty');
                        router.replace({path: '/student'})
                    }
                }).catch(e => {
                    let status = e.response.status
                    if(status == 401)
                        alert('Incorrect username or password')
                })    
            },
            onRegister: function() {
                if(this.isRobot) {
                    this.recaptchaError = 'Please confirm that you are not robot.'
                    return
                }
                let url = `${this.baseURL}/auth/register`
                let data = {
                    firstName: this.regFirstName,
                    lastName: this.regLastName,
                    email: this.regEmail,
                    password: this.regPassword,
                    roles: [this.regRole],
                    collegeId: this.regCollegeID || 0,
                    studentId: this.regStudentID || null
                }
                let headers = {
                    'Content-Type': 'application/json'
                }
                let config = {
                    method: 'post',
                    baseURL: this.baseURL,
                    url: '/auth/register',
                    data: JSON.stringify(data),
                    headers: headers
                }
                this.axios(config).then((response) => {
                    alert('Signup is successful and a verification link is emailed to your registered email id. Please authenticate by clinking on the link.')
                }).catch(e => {
                    let status = e.response.status
                    if(status == 422)
                        alert('Already exisits!')
                })
            },
            onResetPassword: function() {
                let url = `${this.baseURL}/auth/reset_password_link`
                let data = {
                    email: this.resetEmail
                }
                let headers = {
                    'Content-Type': 'application/json'
                }
                let config = {
                    method: 'post',
                    baseURL: this.baseURL,
                    url: '/auth/reset_password_link',
                    data: JSON.stringify(data),
                    headers: headers
                }
                this.axios(config).then((response) => {
                    alert('Reset password link is emailed to your registered email id. Please reset password by clinking on the link.')
                    $('#forgotPassModal').modal('hide')
                }).catch(e => {
                    let status = e.response.status
                    if(status == 404)
                        alert('Unregistered email id.')
                    $('#forgotPassModal').modal('hide')
                })
            }
        }
    }
</script>
