<template>
    <div class="container">
        <b>{{id?'编辑':'新建'}}组件</b>
        <el-form label-width='100px' @submit.native.prevent="save()">
            <el-form-item label='组件名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label='组件key标识'>
                <el-input v-model="model.key"></el-input>
            </el-form-item>
            <el-form-item label='组件展示代码'>
                <el-input type="textarea" :rows="5" v-model="model.preview"></el-input>
            </el-form-item>
            <el-form-item label='组件渲染代码'>
                <el-input type="textarea" :rows="5" v-model="model.render"></el-input>
            </el-form-item>
            <el-form-item label='组件参数'>
                <el-input type="textarea" :rows="5" v-model="model.props"></el-input>
            </el-form-item>
            <el-form-item label='绑定字段'>
                <el-input v-model="model.model"></el-input>
            </el-form-item>
            <el-form-item label='是否能够修改尺寸'>
                <el-input v-model="model.resize"></el-input>
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
                res = await this.$http.put(`/rest/components/${this.id}`,this.model)
            } else {
                res = await this.$http.post('/rest/components',this.model)
            }
            
            this.$router.push('/components/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async getInfo() {
            const res = await this.$http.get(`/rest/components/${this.id}`)
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