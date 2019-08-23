<template>
    <div class="main-w">
        <a-card :bordered="false" class="Card">
            <div class="input-box">
                <span class="spanButton">项目</span>
                <a-select defaultValue="请选择项目" class="input-style" style="width: 200px">
                    <a-select-option value="Zhejiang">项目1</a-select-option>
                    <a-select-option value="Jiangsu">项目2</a-select-option>
                </a-select>
                <span class="spanButton">标题</span>
                <a-input placeholder="请输入标题" class="input-style inputWidth200" />
                <span class="spanButton">需求ID</span>
                <a-input placeholder="请输入需求ID" class="input-style inputWidth200" />
                <span class="spanButton">需求状态</span>
                <a-select defaultValue="请选择状态" class="input-style" style="width: 200px">
                    <a-select-option value="Zhejiang">状态1</a-select-option>
                    <a-select-option value="Jiangsu">状态2</a-select-option>
                </a-select>
            </div>
            <div class="input-box">
                <span class="spanButton">需求负责人</span>
                <a-select showSearch placeholder="请输入负责人" optionFilterProp="children" style="width: 200px">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="tom">Tom</a-select-option>
                </a-select>
                <span class="spanButton" style="margin-left: 20px;">需求创建人</span>
                <a-select showSearch placeholder="请输入创建人" optionFilterProp="children"
                    style="width: 200px; margin-right: 20px;">
                    <a-select-option value="jack">Tom</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="tom">Jack</a-select-option>
                </a-select>

                <a-checkbox>只看我提交的需求 </a-checkbox>
                <a-button type="primary" size='small'>搜索</a-button>
                <a-button type="primary" size='small' class="demandButton" @click="showModal">添加需求</a-button>
                <a-button size='small' style="margin-left: 15px;">调整优先级</a-button>
            <Editor id="tinymce" v-model="value" class="EditorIndex"></Editor>

            </div>
        </a-card>




        <a-modal title="添加需求" v-model="visible" @ok="handleOk" width='870px'>
            <h3>基本信息</h3>
            <div>
                <span class="spanButton">项目</span>
                <a-select defaultValue="请选择项目" class="input-style" style="width: 200px">
                    <a-select-option value="Zhejiang">销售系统</a-select-option>
                    <a-select-option value="Jiangsu">仓库系统</a-select-option>
                </a-select>
                <span class="spanButton">标题</span>
                <a-input placeholder="请输入标题" class="input-style inputWidth200" />
            </div>
            <h3>内容信息</h3>
        </a-modal>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/themes/silver'
    export default {
        components: {
            Editor
        },
        props: {
            //传入一个value，使组件支持v-model绑定
            value: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            plugins: {
                type: [String, Array],
                default: 'lists image media table textcolor wordcount contextmenu'
            },
            toolbar: {
                type: [String, Array],
                default: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
            }
        },
        data() {
            return {
                visible: false,
            };
        },
        watch: {},
        computed: {},
        methods: {
            stopButton(e) {
                e.stopPropagation()
            },
            showModal() {
                this.visible = true
            },
            handleOk(e) {
                console.log(e);
                this.visible = false
            },
        },
        created() { },
        mounted() { }
    };
</script>
<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    input {
        height: 32px;
    }

    .main-w {
        width: 1300px;
        margin: 0 auto;
        background-color: pink;
    }

    .Card {
        width: 100%;
        margin-top: 30px;
    }

    .input-box {
        margin-top: 20px;
    }

    .inputWidth200 {
        width: 200px;
    }

    .input-style {
        margin-right: 15px;
        border-radius: 0 5px 5px 0 !important;
        height: 32px !important;
    }

    .spanButton {
        height: 32px;
        display: inline-block;
        background-color: #eee;
        padding: 5px 10px;
        border-radius: 5px 0 0 5px;
        border: 1px solid #ddd;
        margin-top: 2px;
    }

    .demandButton {
        background-color: green;
        margin-left: 15px;
    }

    .modalBox {
        width: 870px;
    }
    .EditorIndex {
        z-index: 999;
    }
</style>