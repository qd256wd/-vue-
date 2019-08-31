<template>
  <div class="main-w">
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
      <a-select
        showSearch
        placeholder="请输入创建人"
        optionFilterProp="children"
        style="width: 200px; margin-right: 20px;"
      >
        <a-select-option value="jack">Tom</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Jack</a-select-option>
      </a-select>

      <a-checkbox>只看我提交的需求</a-checkbox>
      <a-button type="primary" size="small">搜索</a-button>
      <a-button type="primary" size="small" class="demandButton" @click="showModal">添加需求</a-button>
      <a-button size="small" style="margin-left: 15px;">调整优先级</a-button>
    </div>
    <div class="table-box">
      <a-table bordered :dataSource="dataSource" :columns="columns">
        <template slot="rate" slot-scope="text, record">
          <span @click="change(text, record)">
            <a-rate v-model="text" />
            <span class="ant-rate-text">{{text}} 星好评</span>
          </span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a-button type="primary" size="small">关闭需求</a-button>
          </a-popconfirm>
        </template>
        <template slot="RFIs" slot-scope="text, record">
          {{typeof text == 'object'? text.project+text.headline:text}}
          <br />
          <a-button type="primary" size="small" @click="showNeedMsg(record)">详细信息</a-button>
        </template>
      </a-table>
    </div>
    <!-- 添加需求模态框 -->
    <a-modal
      title="添加需求"
      v-model="visible"
      @ok="handleOk"
      width="870px"
      class="addNeed"
      okText="确认"
      cancelText="取消"
      ok="addNeedafterClose"
    >
      <a-form layout="inline" :form="form" @submit="handleOk">
        <h3>基本信息</h3>
        <div>
          <a-form-item label="项目" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select class="input-style" style="width: 200px" v-decorator="['project']">
              <a-select-option value="销售系统">销售系统</a-select-option>
              <a-select-option value="仓库系统">仓库系统</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input
              placeholder="请输入标题"
              class="input-style inputWidth200"
              v-decorator="['headline']"
            />
          </a-form-item>
        </div>
        <h3>内容信息</h3>
        <quill-editor v-model="goods_introduce"></quill-editor>
        <div class="needClass">
          <a-form-item label="目的" :label-col="{ span: 5 }" :wrapper-col="{ span: 12}">
            <a-input
              placeholder="请输入目的"
              class="input-style inputWidth200"
              v-decorator="['purpose']"
            />
          </a-form-item>
          <a-form-item label="需求价值:" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input
              placeholder="请输入价值"
              class="input-style inputWidth200"
              v-decorator="['demandValue']"
            />
          </a-form-item>
          <a-form-item label="跨部门" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select class="input-style" style="width: 215px" v-decorator="['transDepartment']">
              <a-select-option value="是">是</a-select-option>
              <a-select-option value="否">否</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="紧急程度" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select class="input-style" style="width: 200px" v-decorator="['urgency']">
              <a-select-option value="Zhejiang">紧急</a-select-option>
              <a-select-option value="Jiangsu">非紧急</a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </a-form>
      <h3>预期结果</h3>
      <quill-editor v-model="goods_introduce2">
        <button>提交</button>
      </quill-editor>
      <p>附件： (支持的文件类型： png jpg gif doc docx xls xlsx pdf ppt zip ,单个文件最大支持50MB)</p>
    </a-modal>

    <!-- 需求信息展示模态框 -->
    <a-modal
      title="需求信息详情"
      v-model="visible2"
      @ok="handleOk2"
      okText="确认"
      cancelText="取消"
      width="870px"
    >
      <a-divider orientation="left">需求项目</a-divider>
      <a-tag color="green">{{ showNeedMsgText.age ? showNeedMsgText.age.project:'' }}</a-tag>
      <a-divider orientation="left">需求标题</a-divider>
      <a-tag color="blue">{{ showNeedMsgText.age ? showNeedMsgText.age.headline:'' }}</a-tag>
      <a-divider orientation="left">内容信息</a-divider>
      <div v-html="showNeedMsgText.goods_introduce_vlaues" class="showNeedMsgText ql-editor"></div>
    </a-modal>
  </div>
</template>

<script>
// import "../static/js/image-paste.min.js";
export default {
  components: {},

  data() {
    return {
      //   editorOption3: {
      //    placeholder: '',
      //    theme: 'snow',  // or 'bubble'
      //    modules: {
      //      ImagePaste: {}
      //    }
      //  },
      showNeedMsgText: {},
      form: this.$form.createForm(this),
      formvalue: {},
      visible: false,
      visible2: false,
      rateValue: null,
      goods_introduce: "",
      goods_introduce2: "",
      dataSource: [
        {
          key: "0",
          age: "32",
          address: "很好",
          principal: "张**",
          creator: "易景",
          addData: "2019-8-24",
          rateValue: 3
        },
        {
          key: "1",
          age: "32",
          address: "很好",
          principal: "张**",
          creator: "易景",
          addData: "2019-8-24",
          rateValue: 5
        }
      ],
      count: 2,
      columns: [
        {
          title: "ID",
          dataIndex: "key"
        },
        {
          title: "需求信息",
          dataIndex: "age",
          width: "30%",
          scopedSlots: { customRender: "RFIs" }
        },
        {
          title: "服务评价",
          dataIndex: "rateValue",
          scopedSlots: { customRender: "rate" }
        },
        {
          title: "负责人",
          dataIndex: "principal"
        },
        {
          title: "创建人",
          dataIndex: "creator"
        },
        {
          title: "创建时间",
          dataIndex: "addData"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    stopButton(e) {
      e.stopPropagation();
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
      e.preventDefault();
      console.log(this.goods_introduce, 111111);
      console.log(this.goods_introduce2, 22222);
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.formvalue = values;
        }
      });
      this.handleAdd();
    },
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      console.log(this.formvalue, 99999);

      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: this.formvalue,
        address: `London, Park Lane no. ${count}`,
        principal: "张**",
        creator: "易景",
        addData: "2019-8-24",
        rateValue: 5,
        goods_introduce_vlaues: this.goods_introduce + this.goods_introduce2
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    },
    change(text, record) {
      console.log(text, 11111);
      console.log(record, 2222);
    },
    showNeedMsg(text) {
      this.visible2 = true;
      this.showNeedMsgText = text;
      console.log(this.showNeedMsgText, 123456789);
    },
    handleOk2() {
      this.visible2 = false;
    }
  },
  created() {},
  mounted() {},
  updated() {}
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
.addNeed h3 {
  margin: 15px 0;
}
.needClass {
  margin-top: 15px;
}
.table-box {
  margin-top: 15px;
}
</style>