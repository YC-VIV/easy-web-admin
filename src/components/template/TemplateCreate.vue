<template>
    <div class="container">
        <b>{{id?'编辑':'新建'}}模板</b>
        <el-form label-width='100px' @submit.native.prevent="save()">
            <el-form-item label='模板名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label='模板描述'>
                <el-input type="textarea" v-model="model.describe"></el-input>
            </el-form-item>
            <el-form-item label='模板宽度'>
                <el-input v-model="model.width"></el-input>
            </el-form-item>
            <el-form-item label='模板高度'>
                <el-input v-model="model.height"></el-input>
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
                model: {}
            }
        },
        methods: {
            async save() {
                let res
                if (this.id) {
                    console.log(this.id);
                    res = await this.$http.put(`/rest/templates/${this.id}`, this.model)
                } else {
                    res = await this.$http.post('/rest/templates', this.model)
                }
                this.$router.push('/template/list')
                this.$message({
                    type: 'success',
                    message: '保存成功！'
                })
            },
            async getInfo() {
                const res = await this.$http.get(`/rest/templates/${this.id}`)
                this.model = res.data
            }
        },
        created() {
            if (this.id) {
                this.getInfo()
            }
        }
    }
</script>