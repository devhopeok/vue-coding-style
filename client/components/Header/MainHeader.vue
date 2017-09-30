<template>
    <header class="main-header navbar navbar-inverse">
        <a class="main-logo" href="#" @click.prevent="onHome">
            College<span class="text-blue">desk</span>
        </a>
        <div class="main-header__content">
            <h1 class="main-header__caption">Assignment Grading & Feedback Platform</h1>
            <div class="dropdown main-header__name">
                <a data-target="settings" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <span>{{fullName}}</span>
                    <span class="caret"></span>
                </a>
                <ul id="settings" class="dropdown-menu">
                    <li>
                        <a href="#" @click.prevent="onSettings">
                            <i class="glyphicon glyphicon-cog"></i> Settings
                        </a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="onLogout">
                            <i class="glyphicon glyphicon-log-out"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
import router from '../../router'
export default {
    computed: {
        fullName() {
            const user = this.$store.getters.user.user
            return `${user.firstName} ${user.lastName}`
        },
        role() {
            const user = this.$store.getters.user.user
            return user.roles[0]
        }
    },
    methods: {
        onHome: function() {
            if(this.role == 'instructor')
                router.replace({path: '/teacher'})
            else if(this.role == 'student')
                router.replace({path: '/student/assignment'})
        },
        onSettings: function() {
            if(this.role == 'instructor')
                router.replace({path: '/teacher/settings'})
            else if(this.role == 'student')
                router.replace({path: '/student/settings'})
        },
        onLogout: function() {
            let config = {
                method: 'post',
                baseURL: this.baseURL,
                url: '/auth/logout',
                headers: this.requestHeaders
            }
            this.axios(config).then((response) => {
                this.$store.dispatch('setUser', null)
                router.replace({path: '/'})
            }).catch(e => {
                let status = e.response.status
            })
        }
    }
}
</script>
