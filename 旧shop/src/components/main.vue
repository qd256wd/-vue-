<template>
  <div class="main-w">
    <!-- 主体内容区域 -->
    <a-card :bordered="false" class="Card">
      <h3>亚马逊产品管理</h3>
      <!-- 搜索板块  start-->
      <div class="input-box">
        <span class="input-span">SKU</span>
        <a-input placeholder="请输入" style="width: 200px" class="input-style" />
        <span class="input-span">账号</span>
        <a-select defaultValue="请选择" class="input-style">
          <a-select-option value="Zhejiang">xyz</a-select-option>
          <a-select-option value="Jiangsu">cba</a-select-option>
          <a-select-option value="Jiangsu">abc</a-select-option>
        </a-select>
        <span class="input-span">认领时间</span>
        <a-range-picker class="input-style" />
        <span class="input-span">FBA入库时间</span>
        <a-range-picker />
      </div>
      <div class="input-box">
        <span class="input-span">站点</span>
        <a-select defaultValue="请选择" class="input-style width-200">
          <a-select-option value="美国">美国</a-select-option>
          <a-select-option value="加拿大">加拿大</a-select-option>
          <a-select-option value="澳大利亚">澳大利亚</a-select-option>
        </a-select>
        <span class="input-span">运营人员</span>
        <a-select defaultValue="请选择" class="input-style width-120">
          <a-select-option value="唐**">唐**</a-select-option>
          <a-select-option value="运营人员">运营人员</a-select-option>
          <a-select-option value="运营人员">运营人员</a-select-option>
        </a-select>
        <span class="input-span">市场人员</span>
        <a-select defaultValue="请选择" class="input-style width-120">
          <a-select-option value="张**">张**</a-select-option>
          <a-select-option value="运营人员">市场人员</a-select-option>
          <a-select-option value="运营人员">市场人员</a-select-option>
        </a-select>
        <span class="input-span">采购人员</span>
        <a-select defaultValue="请选择" class="input-style width-120">
          <a-select-option value="张**">张**</a-select-option>
          <a-select-option value="采购人员">采购人员</a-select-option>
          <a-select-option value="采购人员">采购人员</a-select-option>
        </a-select>
        <a-button type="primary" @click="showModal">自定义信息展示</a-button>

        <a-button type="primary" style="margin-left: 20px;">查询</a-button>
      </div>
      <div class="input-box magin-bottom">
        <div class="sort-box">
          <a-icon type="caret-up" class="pos-top" />
          <a-icon type="caret-down" class="pos-bottom" />
          <p class="pos-p">认领时间</p>
        </div>
        <div class="sort-box">
          <a-icon type="caret-up" class="pos-top" />
          <a-icon type="caret-down" class="pos-bottom" />
          <p class="pos-p">新品审核时间</p>
        </div>
        <div class="sort-box">
          <a-icon type="caret-up" class="pos-top" />
          <a-icon type="caret-down" class="pos-bottom" />
          <p class="pos-p">首次到仓时间</p>
        </div>
        <div class="sort-box">
          <a-icon type="caret-up" class="pos-top" />
          <a-icon type="caret-down" class="pos-bottom" />
          <p class="pos-p">图片需求提交时间</p>
        </div>
        <div class="sort-box">
          <a-icon type="caret-up" class="pos-top" />
          <a-icon type="caret-down" class="pos-bottom" />
          <p class="pos-p">产品列表完成时间</p>
        </div>
        <div class="sort-box">
          <a-icon type="caret-up" class="pos-top" />
          <a-icon type="caret-down" class="pos-bottom" />
          <p class="pos-p">FBA入库时间</p>
        </div>
      </div>
      <!-- 搜索板块  end-->
      <!-- 表格板块 start -->
      <div class="table-box">
        <a-table bordered :dataSource="dataSource" :columns="columns">
          <template slot="name" slot-scope="text, record">
            <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
          </template>
          <template slot="operation" slot-scope="text, record">
            <p>{{text}}</p>
            <a href="javascript:;" @click="showHistory(text, record)">历史记录</a>
          </template>
          <template slot="edit" slot-scope="text, record">
            <p>{{text}}</p>
            <a-button type="primary" size="small" @click="showEdit">编辑</a-button>
          </template>
          <template slot="query" slot-scope="text, record">
            <p>{{text}}</p>
            <a-button type="primary" size="small">查询</a-button>
          </template>
        </a-table>
      </div>
      <!-- 表格板块 end -->
    </a-card>
    <!-- 主体内容区域结束--------------- -->

    <!-- 自定义信息展示模态框 start -->
    <a-modal title="选择需要添加的搜索框" v-model="visible" @ok="handleOk" style="width:800px; ">
      <div>
        <div :style="{ borderBottom: '1px solid #E9E9E9' }">
          <a-checkbox
            :indeterminate="indeterminate"
            @change="onCheckAllChange"
            :checked="checkAll"
          >全选/取消全选</a-checkbox>
        </div>
        <br />
        <a-checkbox-group :options="plainOptions" v-model="columnsData" @change="onChangelist" />
      </div>
      <!-- <ul class="ul-style">
        <template v-for="(item,i) in columns">
          <li>
            <a-checkbox :key="i"  @change="onChange">{{item.title}}</a-checkbox>
          </li>
        </template>
      </ul>-->
    </a-modal>
    <!-- 自定义信息展示模态框 end -->
    <!-- 历史记录模态框 -->
    <a-modal title="历史记录" v-model="visible2" @ok="handleOk2">
      <template v-for="(item,index) in showHistorydata">
        <p :key="index">{{item}}</p>
      </template>
    </a-modal>
    <!-- 编辑模态框 -->
    <a-modal title="关键词搜索" v-model="visible3" @ok="handleOk3">
      <div class="magin-bottom">
        <span class="input-span">添加数量</span>
        <a-input placeholder="请输入" style="width: 200px" class="input-style" />
        <a-button type="primary">添加关键词</a-button>
      </div>
      <a-table bordered :dataSource="dataSource1" :columns="columns1">
        <template slot="name" slot-scope="text, record">
          <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
        </template>
        <template slot="operation1" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a-button type="primary">删除</a-button>
          </a-popconfirm>
        </template>
        <template slot="operation2" slot-scope="text, record">
          <a-input placeholder="请输入" style="border: none;" />
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      visible: false,
      visible2: false,
      visible3: false,
      elementListTitle:[],
      plainOptions: [],
      columnsData: [],
      showHistorydata: {},
      dataSource1: [
        {
          name: "Edward King 0",
          age: "32"
        },
        {
          name: "Edward King 0",
          age: "32"
        }
      ],
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          age: "32",
          address: "London, Park Lane no. 0",
          operation: "dadsa",
          ASIN: "ASIN"
        },
        {
          key: "1",
          name: "Edward King 1",
          age: "32",
          address: "London, Park Lane no. 1",
          operation: "dadsa",
          ASIN: "ASIN"
        }
      ],
      count: 2,
      columns1: [
        {
          title: "关键词",
          dataIndex: "name",
          scopedSlots: { customRender: "operation2" }
        },
        {
          title: "操作",
          dataIndex: "age",
          scopedSlots: { customRender: "operation1" }
        }
      ],
      columnsTable:[],
      columns: [
        {
          title: "sku",
          dataIndex: "name"
        },
        {
          title: "账号",
          dataIndex: "age"
        },
        {
          title: "站点",
          dataIndex: "age"
        },
        {
          title: "人员",
          dataIndex: "address"
        },
        {
          title: "ASIN",
          dataIndex: "ASIN"
        },
        {
          title: "时间信息",
          dataIndex: "operation"
        },
        {
          title: "推广测评",
          dataIndex: "operation"
        },
        {
          title: "线下导入测评",
          dataIndex: "operation"
        },
        {
          title: "总测评",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        },
        {
          title: "评论情况",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        },
        {
          title: "广告费用",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        },
        {
          title: "产品表现",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        },
        {
          title: "销售情况",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        },
        {
          title: "关键词搜索",
          dataIndex: "operation",
          scopedSlots: { customRender: "edit" }
        },
        {
          title: "产品状态",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        },
        {
          title: "库存",
          dataIndex: "operation",
          scopedSlots: { customRender: "query" }
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.visible = false;
    },
    handleOk2() {
      this.visible2 = false;
    },
    handleOk3() {
      this.visible3 = false;
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
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    },
    showHistory(text, record) {
      console.log(text, 111111);
      console.log(record, 111111);
      this.visible2 = true;
      this.showHistorydata = record;
      console.log(this.showHistorydata, 333333333333);
    },
    showEdit() {
      this.visible3 = true;
    },
    onChange(e) {
      e.target.checked = !e.target.checked;
      console.log(e.target.checked);
    },
    columnsDatas() {
      this.columns.forEach(element => {
        console.log(element);
        this.columnsData.push(element.title);
      });
      console.log(this.columnsData);
      this.plainOptions = this.columnsData;
      console.log(this.plainOptions);
    },
    onChangelist(columnsData) {
      this.indeterminate =
        !!columnsData.length && columnsData.length < this.plainOptions.length;
      this.checkAll = columnsData.length === this.plainOptions.length;
      console.log(this.columnsData,1111111111111);
    //   this.ChangelistTable()
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        columnsData: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      });
      console.log(this.columnsData,1111111111111);
    //   this.ChangelistTable()
    },
    // ChangelistTable(){
    //     this.elementListTitle=[]
    //     this.columns.forEach(element => {
    //         if(this.columnsData.indexOf(element.title) != -1) {
    //             this.columnsTable.forEach(elementList => {
    //                 this.elementListTitle.push(elementList.title)
    //             })
    //             console.log(this.elementListTitle,2222222222);
                
    //             if(this.elementListTitle.indexOf(element.title) == -1){
    //                 this.columnsTable.push(element)
    //             }
    //         }
    //     })
    //     console.log(this.columnsTable);
    //     console.log(this.columns);
    //     this.columns = this.columnsTable

    // }
  },
  created() {},
  mounted() {
    this.columnsDatas();
  }
};
</script>
<style lang="less">
.main-w {
  width: 1300px;
  margin: 0 auto;
}

.Card {
  width: 100%;
  margin-top: 30px;
}

.input-span {
  font-weight: 900;
  margin-right: 10px;
}

.input-style {
  margin-right: 15px !important;
}

.width-120 {
  width: 120px;
}

.width-200 {
  width: 200px;
}

.input-box {
  margin-top: 20px;
}

.magin-bottom {
  margin-bottom: 20px;
  overflow: hidden;
}

.ul-style {
  list-style: none;
}

.sort-box {
  position: relative;
  width: 181px;
  height: 38px;
  border: 1px solid #ccc;
  text-align: center;
  float: left;
  margin-right: 10px;
}

.pos-top {
  position: absolute;
  right: 10px;
  top: 5px;
}

.pos-bottom {
  position: absolute;
  right: 10px;
  bottom: 5px;
}

.pos-p {
  line-height: 38px;
}

.table-box tr th{
  padding: 5px !important; 
  text-align: center !important;
}
</style>