<template>
    <div class="container">
        <b>{{id?'编辑':'新建'}}账号</b>
        <el-form label-width='100px' @submit.native.prevent="save()">
            <el-form-item label='账号名'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label='密码'>
                <el-input v-model="model.password" :disabled="id?true:false"></el-input>
            </el-form-item>
            <el-form-item label='确认密码'>
                <el-input v-model="model.password2" :disabled="id?true:false"></el-input>
            </el-form-item>
            <el-form-item label='角色'>
                <el-select v-model="model.role" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='描述'>
                <el-input type="textarea" :rows="5" v-model="model.describe"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {},
                options: [{
                    value: 'admin',
                    label: '管理员'
                }, {
                    value: 'superAdmin',
                    label: '超级管理员'
                }],
                value: ''
            }
        },
        methods: {
            async save() {
                let res
                if (this.id) {
                    console.log(this.id);
                    res = await this.$http.put(`/rest/users/${this.id}`, this.model)
                } else {
                    if (this.model.password !== this.model.password2) {
                        this.$message.error('请前后两次输入的密码一致！')
                    } else {
                        delete this.model.password2;
                    }
                    res = await this.$http.post('/rest/users', this.model)
                    this.$router.push('/users/list')
                    this.$message({
                        type: 'success',
                        message: '保存成功！'
                    })
                }
            },
            async getInfo() {
                const res = await this.$http.get(`/rest/users/${this.id}`)
                this.model = res.data
                this.model.password = '******'
            }
        },
        created() {
            if (this.id) {
                this.getInfo()
            }
        }
    }
</script>