<template>
    <div>
        <b>组件列表</b>
        <el-table :data="items" style="width: 100%">
            <el-table-column prop="_id" label="ID">
            </el-table-column>
            <el-table-column prop="name" label="组件名">
            </el-table-column>
            <el-table-column prop="key" label="key">
            </el-table-column>
            <el-table-column prop="preview" label="预览代码" width="250">
                <template slot-scope="scope">
                    {{scope.row.preview || '无' }}
                </template>
            </el-table-column>
            <el-table-column prop="render" label="渲染代码" width="250">
                <template slot-scope="scope">
                    {{scope.row.render || '无' }}
                </template>
            </el-table-column>
            <el-table-column prop="props" label="组件参数">
                <template slot-scope="scope">
                    {{scope.row.props || '无' }}
                </template>
            </el-table-column>
            <el-table-column prop="model" label="绑定字段">
                <template slot-scope="scope">
                    {{scope.row.model || '无' }}
                </template>
            </el-table-column>
            <el-table-column prop="resize" label="是否能够修改尺寸">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
            </el-table-column>
            <el-table-column prop="updatedAt" label="最近编辑时间">
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/components/edit/${scope.row._id}`)" type="primary" size="small">编辑
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
                        _id: 1,
                        updatedAt: '2023/5/1 19:33:50',
                        name: '范围选择器',
                        preview: '() => <Range placeholder="预览输入框"></Range>',
                        render: `({ model }) => {
                        return <Range {...{
                            start: model.start.modelValue, // @update:start
                            end: model.end.modelValue,
                            'onUpdate:start': model.start['onUpdate:modelValue'],
                            'onUpdate:end': model.end['onUpdate:modelValue']
                        }}></Range>
                    }`,
                        model: {
                            start: '开始范围字段',
                            end: '结束范围字段'
                        },
                        key: 'range'
                    },
                    {
                        _id: 2,
                        updatedAt: '2023/5/1 19:23:30',
                        name: '输入框',
                        resize: {
                            width: true, // 更改输入框的横向大小
                        },
                        preview: '() => <ElInput placeholder="预览输入框"></ElInput>',
                        render: `({ model, size }) => <ElInput placeholder="渲染输入框" {...model.default} style={{ width: size.width + 'px' }}></ElInput>`,
                        key: 'input',
                        model: { // {default:'username'}
                            default: '绑定字段'
                        }
                    },
                    {
                        _id: 3,
                        updatedAt: '2023/5/2 17:03:35',
                        name: '日历',
                        preview: '() => <text>日历</text>',
                        render: `({props}) => <div style={{ width: props.width, height: props.height }}><el-calendar></el-calendar></div>`,
                        key: 'calendar',
                        props: `{
                            width: createInputProp('宽'),
                            height: createInputProp('高'),
                        }`
                    }
                ]
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/rest/components')
                this.items = res.data
            },
            remove(row) {
                this.$confirm(`确定要删除组件"${row.name}"吗?`, '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`/rest/components/${row._id}`)
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