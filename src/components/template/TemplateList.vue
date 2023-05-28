<template>
    <div>
        <b>模板列表</b>
        <el-table :data="items" style="width: 100%">
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="name" label="模板名称">
            </el-table-column>
            <el-table-column prop="width" label="模板宽度">
            </el-table-column>
            <el-table-column prop="height" label="模板高度">
            </el-table-column>
            <el-table-column prop="describe" label="模板描述">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
            </el-table-column>
            <el-table-column prop="updatedAt" label="最近编辑时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/template/edit/${scope.row._id}`)" type="primary" size="small">编辑
                    </el-button>
                    <el-button @click="remove(scope.row)" type="danger" size="small">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                items: [{
                        _id: '1',
                        updatedAt: '2023/05/03 17:20:51',
                        name: '苹果12 Pro',
                        width: '390px',
                        height: '844px',
                        describe: '苹果手机12pro设备模板'
                    },
                    {
                        _id: '2',
                        updatedAt: '2023/05/03 17:23:29',
                        name: 'iPad Air',
                        width: '820px',
                        height: '1180px',
                        describe: 'iPad Air设备模板'
                    },
                    {
                        _id: '3',
                        updatedAt: '2023/05/03 17:26:32',
                        name: '三星Galaxy S20 Ultra',
                        width: '412px',
                        height: '915px',
                        describe: '三星Galaxy S20 Ultra设备模板'
                    }
                ]
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/rest/templates')
                this.items = res.data
            },
            remove(row) {
                this.$confirm(`确定要删除模板"${row.name}"吗?`, '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`/rest/templates/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 重新获取数据
                    this.fetch()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
        },
        created() {
            this.fetch()
        }
    }
</script>
<style scoped>

</style>