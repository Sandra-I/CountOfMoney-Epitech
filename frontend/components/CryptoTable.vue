<template>
  <el-card>
      <!-- Utiliser attribut height dans el-table pour avoir un header fixe -->
    <el-table
    :data="tableData"
    :default-sort = "{prop: 'id', order: 'descending'}"
    stripe
    border
    align="center"
    style="width: 100%"
    >
      <el-table-column
      type="index"
      label="N°"
      width="65"
      > </el-table-column>

      <el-table-column
        label="Name"
        width="180"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Current Price" width="150" sortable> </el-table-column>
      <el-table-column prop="date" label="Opening Price" width="150" sortable> </el-table-column>
      <el-table-column prop="address" label="Lowest Price" width="150" sortable> </el-table-column>
      <el-table-column prop="highestPrice" label="Highest Price" width="150" sortable> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "CryptoTable",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "Bitcoins",
          address: "No. 189",
        },
        {
          date: "2016-05-04",
          name: "Ethereum",
          address: "No. 189",
        },
        {
          date: "2016-05-01",
          name: "XRP",
          address: "No. 189",
        },
        {
          date: "2016-05-01",
          name: "Litcoins",
          address: "No. 189",
        },
      ],
    };
  },
  // methods: {
  //   indexMethod(index) {
  //     return index * 2;
  //   }
  // }
};
</script>