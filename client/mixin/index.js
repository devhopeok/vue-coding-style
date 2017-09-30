export default {
    data: function() {
        return {
            baseURL: 'http://139.162.17.230/api',
            sitekey: '6Le9HSoUAAAAAE27zBFHbXFQdHqBtJrZzLS1v-YJ'
        }
    },
    computed: {
        requestHeaders() {
            if(!this.$store || !this.$store.getters.user)
                return {}
            const user = this.$store.getters.user
            let headers = {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.accessToken}`
            }
            return headers
        }
    },
    methods: {
        getCurrentTime: function() {
            let time = new Date(new Date().getTime()).toLocaleTimeString()
            let timeParts = time.split(' ')
            let hms = timeParts[0].split(':')
            if(timeParts[1] == 'PM')
                hms[0] = parseInt(hms[0]) + 12
            else
                hms[0] = `0${hms[0]}`
            return `${hms[0]}:${hms[1]}`
        },
        getCurrentDate: function() {
            return $.datepicker.formatDate('yy-mm-dd', new Date())
        }
    }
}
