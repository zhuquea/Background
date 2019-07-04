<template>
    <div>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center >
            <div class="export__dialog">
                <div class="export__dialog__dv"> 名称:</div> <el-input v-model="input1" ></el-input>
            </div>
            <div class="export__dialog">
                <div class="export__dialog__dv">原价:</div> <el-input v-model="input2" ></el-input>
            </div>
            <div class="export__dialog">
                <div class="export__dialog__dv">现价:</div> <el-input v-model="input3" ></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
    
</template>

<script>
    export default {
        name: "Dialog",
        components: {},
        props: {},
        data() {
            return {
                input1: "",
                input2: "",
                input3: "",
                centerDialogVisible: false
            }
        },
        methods: {},
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">

</style>