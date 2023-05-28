<template>
    <div>
        <b>用户列表</b>
        <el-table :data="items" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="250">
            </el-table-column>
            
            <el-table-column prop="name" label="用户名">
            </el-table-column>
            <el-table-column prop="describe" label="描述">
            </el-table-column>
            <el-table-column prop="role" label="角色">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
            </el-table-column>
            <el-table-column prop="updatedAt" label="最近编辑时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/users/edit/${scope.row._id}`)" type="primary" size="small">编辑
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
                    updatedAt: '2023/05/03 17:23:39',
                    name: '张三',
                    describe: '描述1',
                    role: '管理员'
                }, {
                    _id: '2',
                    updatedAt: '2023/05/03 18:46:16',
                    name: '李四',
                    describe: '描述2',
                    role: '管理员'
                }]
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/rest/users')
                this.items = res.data
            },
            remove(row) {
                this.$confirm(`确定要删除账号"${row.name}"吗?`, '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(async () => {
                        const res = await this.$http.delete(`/rest/users/${row._id}`)
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