<template> 
  <div class="app-container">
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="照片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column label="简历名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.rsumeName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="简历所有人" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="电话" width="120" align="center">
          <template slot-scope="scope">
            <p>{{phoneNumFilter(scope.row.phone)}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)">编辑
              </el-button>
            </p>
            <p>
              <el-button
                size="mini"
                @click="handleShowLog(scope.$index, scope.row)">日志
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>



import {findResume} from '@/api/resume'
  // import {
  //   fetchList,
  //   updateDeleteStatus,
  //   updateNewStatus,
  //   updateRecommendStatus,
  //   updatePublishStatus
  // } from '@/api/product'
  // import {fetchList as fetchSkuStockList,update as updateSkuStockList} from '@/api/skuStock'
  // import {fetchList as fetchProductAttrList} from '@/api/productAttr'
  // import {fetchList as fetchBrandList} from '@/api/brand'
  // import {fetchListWithChildren} from '@/api/productCate'

  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null
  };
  export default {
    name: "productList",
    data() {
      return {
        editSkuInfo:{
          dialogVisible:false,
          productId:null,
          productSn:'',
          productAttributeCategoryId:null,
          stockList:[],
          productAttr:[],
          keyword:null
        },
        operates: [
          {
            label: "商品上架",
            value: "publishOn"
          },
          {
            label: "商品下架",
            value: "publishOff"
          },
          {
            label: "设为推荐",
            value: "recommendOn"
          },
          {
            label: "取消推荐",
            value: "recommendOff"
          },
          {
            label: "设为新品",
            value: "newOn"
          },
          {
            label: "取消新品",
            value: "newOff"
          },
          {
            label: "转移到分类",
            value: "transferCategory"
          },
          {
            label: "移入回收站",
            value: "recycle"
          }
        ],
        operateType: null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [],
        
        publishStatusOptions: [{
          value: 1,
          label: '上架'
        }, {
          value: 0,
          label: '下架'
        }],
        verifyStatusOptions: [{
          value: 1,
          label: '审核通过'
        }, {
          value: 0,
          label: '未审核'
        }]
      }
    },
    created() {
      this.getList();
      // this.getBrandList();
      // this.getProductCateList();
    },
    watch: {
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length == 2) {
          this.listQuery.productCategoryId = newValue[1];
        } else {
          this.listQuery.productCategoryId = null;
        }

      }
    },
    filters: {
      verifyStatusFilter(value) {
        if (value === 1) {
          return '审核通过';
        } else {
          return '未审核';
        }
      }
    },
    methods: {
      phoneNumFilter (phone) {
        if(phone!="undefined"){
          let phoneArr = [...phone];
          // 2.将数组中的4-7位变成*
          phoneArr.map((res, index) => {
            if (index > 2 && index < 7) {
              this.str += '*';
              // return '*';
            } else {
              this.str += res;
              // return res;
            }
      });
      return this.str;
        }return "";
      // 1字符串转化成数组
      
    },
      getProductSkuSp(row, index) {
        if (index === 0) {
          return row.sp1;
        } else if (index === 1) {
          return row.sp2;
        } else {
          return row.sp3;
        }
      },
      getList() {
        this.listLoading = true;
        findResume(this.listQuery).then(response => {
          if(response.code==200){
            this.listLoading = false;
            this.list = response.data.list;
            this.total = response.data.total;
          }
          
        }).catch(function (error){
          console.info(error)
        });
      },
      // getBrandList() {
      //   fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
      //     this.brandOptions = [];
      //     let brandList = response.data.list;
      //     for (let i = 0; i < brandList.length; i++) {
      //       this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
      //     }
      //   });
      // },
      // getProductCateList() {
      //   fetchListWithChildren().then(response => {
      //     let list = response.data;
      //     this.productCateOptions = [];
      //     for (let i = 0; i < list.length; i++) {
      //       let children = [];
      //       if (list[i].children != null && list[i].children.length > 0) {
      //         for (let j = 0; j < list[i].children.length; j++) {
      //           children.push({label: list[i].children[j].name, value: list[i].children[j].id});
      //         }
      //       }
      //       this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
      //     }
      //   });
      // },
      // handleShowSkuEditDialog(index,row){
      //   this.editSkuInfo.dialogVisible=true;
      //   this.editSkuInfo.productId=row.id;
      //   this.editSkuInfo.productSn=row.productSn;
      //   this.editSkuInfo.productAttributeCategoryId = row.productAttributeCategoryId;
      //   this.editSkuInfo.keyword=null;
      //   fetchSkuStockList(row.id,{keyword:this.editSkuInfo.keyword}).then(response=>{
      //     this.editSkuInfo.stockList=response.data;
      //   });
      //   if(row.productAttributeCategoryId!=null){
      //     fetchProductAttrList(row.productAttributeCategoryId,{type:0}).then(response=>{
      //       this.editSkuInfo.productAttr=response.data.list;
      //     });
      //   }
      // },
      // handleSearchEditSku(){
      //   fetchSkuStockList(this.editSkuInfo.productId,{keyword:this.editSkuInfo.keyword}).then(response=>{
      //     this.editSkuInfo.stockList=response.data;
      //   });
      // },
      // handleEditSkuConfirm(){
      //   if(this.editSkuInfo.stockList==null||this.editSkuInfo.stockList.length<=0){
      //     this.$message({
      //       message: '暂无sku信息',
      //       type: 'warning',
      //       duration: 1000
      //     });
      //     return
      //   }
      //   this.$confirm('是否要进行修改', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(()=>{
      //     updateSkuStockList(this.editSkuInfo.productId,this.editSkuInfo.stockList).then(response=>{
      //       this.$message({
      //         message: '修改成功',
      //         type: 'success',
      //         duration: 1000
      //       });
      //       this.editSkuInfo.dialogVisible=false;
      //     });
      //   });
      // },
      // handleSearchList() {
      //   this.listQuery.pageNum = 1;
      //   this.getList();
      // },
      // handleAddProduct() {
      //   this.$router.push({path:'/pms/addProduct'});
      // },
      // handleBatchOperate() {
      //   if(this.operateType==null){
      //     this.$message({
      //       message: '请选择操作类型',
      //       type: 'warning',
      //       duration: 1000
      //     });
      //     return;
      //   }
      //   if(this.multipleSelection==null||this.multipleSelection.length<1){
      //     this.$message({
      //       message: '请选择要操作的商品',
      //       type: 'warning',
      //       duration: 1000
      //     });
      //     return;
      //   }
      //   this.$confirm('是否要进行该批量操作?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     let ids=[];
      //     for(let i=0;i<this.multipleSelection.length;i++){
      //       ids.push(this.multipleSelection[i].id);
      //     }
      //     switch (this.operateType) {
      //       case this.operates[0].value:
      //         this.updatePublishStatus(1,ids);
      //         break;
      //       case this.operates[1].value:
      //         this.updatePublishStatus(0,ids);
      //         break;
      //       case this.operates[2].value:
      //         this.updateRecommendStatus(1,ids);
      //         break;
      //       case this.operates[3].value:
      //         this.updateRecommendStatus(0,ids);
      //         break;
      //       case this.operates[4].value:
      //         this.updateNewStatus(1,ids);
      //         break;
      //       case this.operates[5].value:
      //         this.updateNewStatus(0,ids);
      //         break;
      //       case this.operates[6].value:
      //         break;
      //       case this.operates[7].value:
      //         this.updateDeleteStatus(1,ids);
      //         break;
      //       default:
      //         break;
      //     }
      //     this.getList();
      //   });
      // },
      // handleSizeChange(val) {
      //   this.listQuery.pageNum = 1;
      //   this.listQuery.pageSize = val;
      //   this.getList();
      // },
      // handleCurrentChange(val) {
      //   this.listQuery.pageNum = val;
      //   this.getList();
      // },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // handlePublishStatusChange(index, row) {
      //   let ids = [];
      //   ids.push(row.id);
      //   this.updatePublishStatus(row.publishStatus, ids);
      // },
      // handleNewStatusChange(index, row) {
      //   let ids = [];
      //   ids.push(row.id);
      //   this.updateNewStatus(row.newStatus, ids);
      // },
      // handleRecommendStatusChange(index, row) {
      //   let ids = [];
      //   ids.push(row.id);
      //   this.updateRecommendStatus(row.recommandStatus, ids);
      // },
      // handleResetSearch() {
      //   this.selectProductCateValue = [];
      //   this.listQuery = Object.assign({}, defaultListQuery);
      // },
      // handleDelete(index, row){
      //   this.$confirm('是否要进行删除操作?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     let ids = [];
      //     ids.push(row.id);
      //     this.updateDeleteStatus(1,ids);
      //   });
      // },
      handleUpdateProduct(index,row){
        this.$router.push({path:'/resume/updateResume',query:{id:row.id}});
      },
      // handleShowProduct(index,row){
      //   console.log("handleShowProduct",row);
      // },
      // handleShowVerifyDetail(index,row){
      //   console.log("handleShowVerifyDetail",row);
      // },
      // handleShowLog(index,row){
      //   console.log("handleShowLog",row);
      // },
      // updatePublishStatus(publishStatus, ids) {
      //   let params = new URLSearchParams();
      //   params.append('ids', ids);
      //   params.append('publishStatus', publishStatus);
      //   updatePublishStatus(params).then(response => {
      //     this.$message({
      //       message: '修改成功',
      //       type: 'success',
      //       duration: 1000
      //     });
      //   });
      // },
      // updateNewStatus(newStatus, ids) {
      //   let params = new URLSearchParams();
      //   params.append('ids', ids);
      //   params.append('newStatus', newStatus);
      //   updateNewStatus(params).then(response => {
      //     this.$message({
      //       message: '修改成功',
      //       type: 'success',
      //       duration: 1000
      //     });
      //   });
      // },
      // updateRecommendStatus(recommendStatus, ids) {
      //   let params = new URLSearchParams();
      //   params.append('ids', ids);
      //   params.append('recommendStatus', recommendStatus);
      //   updateRecommendStatus(params).then(response => {
      //     this.$message({
      //       message: '修改成功',
      //       type: 'success',
      //       duration: 1000
      //     });
      //   });
      // },
      // updateDeleteStatus(deleteStatus, ids) {
      //   let params = new URLSearchParams();
      //   params.append('ids', ids);
      //   params.append('deleteStatus', deleteStatus);
      //   updateDeleteStatus(params).then(response => {
      //     this.$message({
      //       message: '删除成功',
      //       type: 'success',
      //       duration: 1000
      //     });
      //   });
      //   this.getList();
      // }
    }
  }
</script>
<style></style>


