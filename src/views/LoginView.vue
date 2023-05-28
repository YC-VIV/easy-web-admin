<template>
    <div id="container">
        <div id="form-box">
            <el-tabs type="border-card">
                <el-tab-pane label="登录">
                    <el-form v-model="userform" label-width="4.5rem" style="margin-top: 30px" @submit.native.prevent="login">
                        <el-form-item label="账号" prop="name">
                            <el-input type="text" v-model="userform.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="userform.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" native-type="submit" style="transform: translateX(8rem)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- <el-tab-pane label="注册">
                    <el-form v-model="userform" label-width="4.5rem" style="margin-top: 30px" @submit.native.prevent="register">
                        <el-form-item label="账号" prop="name">
                            <el-input type="text" v-model="userform.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="userform.password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="password">
                            <el-input type="password" v-model="userform.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" native-type="submit" style="transform: translateX(8rem)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userform: {}
        } 
    },
    methods: {
        async login() {
            const res = await this.$http.post('/login',this.userform)
            // 保存token到本地储存
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message.success('登录成功！')
            setTimeout(()=>{
                this.$message.success('欢迎你，超级管理员！')
            },1000)
            this.$router.push('/about')
        },
        async register() {
            console.log(this.userform);
        }
    }
}
</script>
<style scoped>
#container{
    width: 100vw;
    height: 100vh;
    display: flex;
    background: url(./../assets/bc.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}

#form-box {
    height: 20rem;
    width: 30rem;
    margin: auto;
    border-color: yellow;
}
</style>