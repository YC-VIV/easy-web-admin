<template>
    <div>
        <b>配置列表</b>
        <el-table :data="items" style="width: 100%">
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="updatedAt" label="最近编辑时间">
            </el-table-column>
            <el-table-column prop="name" label="配置名">
            </el-table-column>
            <el-table-column prop="describe" label="配置描述">
            </el-table-column>
            <el-table-column prop="json" label="配置json">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
            </el-table-column>
            <el-table-column prop="updatedAt" label="最近编辑时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/config/edit/${scope.row._id}`)" type="primary" size="small">编辑
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
                        updatedAt: '2023/05/03 18:23:29',
                        name: '日历小工具',
                        describe: '简单的日历小工具web应用',
                        json: '{"container":{"width":390,"height":844},"blocks":[{"top":78,"left":50,"zIndex":1,"key":"calendar","alignCenter":false,"props":{"width":"300px","height":"450px"},"model":{},"width":765,"height":662,"focus":false},{"top":34.5,"left":50,"zIndex":1,"key":"text","alignCenter":false,"props":{"text":"每日日历","size":"24px"},"model":{},"width":64,"height":21,"focus":false}]}'
                    },
                    {
                        _id: '2',
                        updatedAt: '2023/05/03 19:30:21',
                        name: '你好，世界',
                        describe: '程序员说了句“helloWorld，然后世界诞生了”',
                        json: '{"container":{"width":1000,"height":2000},"blocks":[{"top":436.5,"left":421,"zIndex":1,"key":"text","alignCenter":false,"props":{"text":"你好，世界！！！","color":"#0A0A0A","size":"24px"},"model":{},"width":64,"height":21,"focus":false}]}'
                    }
                ]
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/rest/configurations')
                this.items = res.data
            },
            remove(row) {
                this.$confirm(`确定要删除配置"${row.name}"吗?`, '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`/rest/configurations/${row._id}`)
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