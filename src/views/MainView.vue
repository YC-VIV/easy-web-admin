<template>
    <div class="container">
        <el-container style="height: 100vh;">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router unique-opened :default-active="$router.path">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-suitcase"></i>组件管理</template>
                        <el-menu-item-group>
                            <template slot="title">组件</template>
                            <el-menu-item index="/components/create">新建组件</el-menu-item>
                            <el-menu-item index="/components/list">组件列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-wallet"></i>配置管理</template>
                        <el-menu-item-group>
                            <template slot="title">配置</template>
                            <el-menu-item index="/config/create">添加配置</el-menu-item>
                            <el-menu-item index="/config/list">配置列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>模板管理</template>
                        <el-menu-item-group>
                            <template slot="title">模板</template>
                            <el-menu-item index="/template/create">新建模板</el-menu-item>
                            <el-menu-item index="/template/list">模板列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-user"></i>账号管理</template>
                        <el-menu-item-group>
                            <template slot="title">账号</template>
                            <el-menu-item index="/users/create">新建账号</el-menu-item>
                            <el-menu-item index="/users/list">账号列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <span>超级管理员</span>
                    <el-button class="exist-btn" type="primary" size="small" @click="exist">登出</el-button>
                </el-header>

                <el-main>
                    <router-view :key="$route.path"></router-view>
                    <el-divider content-position="center">低代码网站搭建平台-后台管理系统 v1.0</el-divider>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name : 'MainView',
        data() {
            return {
                name: ''
            }
        },
        methods: {
            exist() {
                this.$confirm(`确定要登出账号"超级管理员"吗?`, '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=> {
                    this.$message.warning('账号已登出！')
                    window.localStorage.clear();
                    this.$router.push('/login');
                })
            },
            getName() {
                
            }
        }
    };
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .exist-btn {
        margin-left: 15px;
    }
</style>
