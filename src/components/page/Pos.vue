<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table border style="width:100%" :data="tableData">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金钱" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delSingleGood(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addList(scope.row)">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">
              <small>数量：</small>
              {{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <small>金额：</small>
              {{totalMoney}}元
            </div>
            <div class="div-btn">
              <el-button type="warning" >挂单</el-button>
              <el-button type="danger" @click="delAllGoods">删除</el-button>
              <el-button type="success" @click ="checkout">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div>
          <div class="often-goods">常用产品</div>
          <div>
            <ul class="often-list">
              <li v-for="goods in oftenGoods" @click="addList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="blue">￥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type0Goods" @click="addList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type1Goods" @click="addList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type2Goods" @click="addList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type3Goods" @click="addList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "pos",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalMoney: 0,
      totalCount: 0
    };
  },
  created: function() {
    axios
      .get(
        "https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods"
      )
      .then(Response => {
        // console.log(Response);
        this.oftenGoods = Response.data;
      })
      .catch(error => {
        // console.log(error);
        alert("网络错误，不能访问");
      });
    axios
      .get(
        "https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods"
      )
      .then(Response => {
        console.log(Response);
        this.type0Goods = Response.data[0];
        this.type1Goods = Response.data[1];
        this.type2Goods = Response.data[2];
        this.type3Goods = Response.data[3];
      })
      .catch(error => {
        console.log(error);
        alert("网络错误，不能访问");
      });
  },
  mounted: function() {
    var orderHeight = document.body.clientHeight;
    console.log(orderHeight);
    document.getElementById("order-list").style.height = orderHeight + "px";
  },
  methods: {
    addList(goods) {
      this.totalMoney = 0;
      this.totalCount = 0;
      //判断商品是否已存在在订单列表中
      let isHave = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId == goods.goodsId) {
          isHave = true;
        }
      }

      //根据判断的值编写业务逻辑
      if (isHave) {
        //改变列表中商品的数量
        let arr = this.tableData.filter(a => a.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.tableData.push(newGoods);
      }
       this.getAllMoney()
    },
    //删除所有商品
    delAllGoods(){
        this.tableData = [];
        this.totalMoney = 0;
        this.totalCount = 0;
    },
    //删除单个商品
    delSingleGood(goods) {
      this.tableData = this.tableData.filter(a => a.goodsId != goods.goodsId);
      this.getAllMoney()
    },
    //汇总数量和金额
    getAllMoney() {
      this.totalMoney = 0;
      this.totalCount = 0;
      if (this.tableData) {
        //计算汇总金额和数量
        this.tableData.forEach(el => {
          this.totalCount += el.count;
          this.totalMoney = this.totalMoney + el.price * el.count;
        });
      }
    },
    //模拟结账
    checkout(){
        if(this.totalCount !=0){
            this.tableData = [];
            this.totalMoney = 0;
            this.totalCount = 0;
            this.$message({
                message:'结账成功！！！！',
                type:'success'
            })
        }else{
            this.$message.error('不能空结账')
        }

    }
  }
};
</script>
<style>
.pos-order {
  background-color: aquamarine;
  border-right: 1px solid #999;
  height: 100%;
}
.div-btn {
  margin-top: 10px;
}
.often-goods {
  padding: 10px;
  text-align: left;
  font-size: 18px;
  background-color: #eee;
  border-bottom: 1px solid #000;
}
.often-list li {
  list-style: none;
  padding: 10px;
  margin: 10px;
  background-color: #333;
  color: #fff;
  float: left;
  cursor: pointer;
}
.often-list li .blue {
  color: aquamarine;
}
.goods-type {
  clear: both;
}
.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
.totalDiv {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #666;
}
</style>


