<template>
    <div class="container">
        <b>{{id?'编辑':'新建'}}组件</b>
        <el-form label-width='100px' @submit.native.prevent="save()">
            <el-form-item label='配置名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label='配置描述'>
                <el-input type="textarea" :rows="5" v-model="model.describe"></el-input>
            </el-form-item>
            <el-form-item label='配置json'>
                <el-input type="textarea" :rows="5" v-model="model.json"></el-input>
            </el-form-item>
            <el-table-column prop="createdAt" label="创建时间">
            </el-table-column>
            <el-table-column prop="updatedAt" label="最近编辑时间">
            </el-table-column>
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
            if(this.id) {
                console.log(this.id);
                res = await this.$http.put(`/rest/configurations/${this.id}`,this.model)
            } else {
                res = await this.$http.post('/rest/configurations',this.model)
            }
            
            this.$router.push('/config/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async getInfo() {
            const res = await this.$http.get(`/rest/configurations/${this.id}`)
            this.model = res.data
        }
    },
    created() {
        if(this.id) {
            this.getInfo()
        }
    }
}
</script>