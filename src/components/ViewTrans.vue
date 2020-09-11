<template>
    <div>
        <table id="details">
            <thead>
                <tr>
                    <th>Office Transactions</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th class="link"><b @click="showModal = true">+Add Transactions</b></th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>                    
                </tr>
                <tr id="header">
                    <th v-for="key in columns" :key="key">{{key}}</th>
                </tr>
            </thead>
             <tbody v-if="filteredList.length > 0">
                <tr v-for="(l,idx) in filteredList" :key="idx">
                    <td> {{ l.date }}</td>
                    <td>{{ l.description }}</td>
                    <td>{{ l.credit }}</td>
                    <td>{{ l.debit }}</td>
                    <td>{{ l.balance }}</td>
                </tr>
            </tbody>
            <tbody v-if="!filteredList.length && !moreRecords">
                <tr><td colspan="7" style="text-align:center">No Transaction Records Found</td></tr>
            </tbody>
            <tbody v-if="moreRecords">
                <tr><td colspan="7" style="text-align:center">Too many results returned.</td></tr>
            </tbody>
        </table>
        <transition>
            <AddTrans v-if="showModal" @close="showModal = false" :show = "showModal" :balance="balance"/>
        </transition>
    </div>
</template>
<script> 
import AddTrans from './AddTrans.vue'
import app from '../../firebase.js'

export default {
  name: 'App',
  components: {
    AddTrans
  },
  data () {
      return {
          columns: ["Date", "Description", "Credit", "Debit", "Running Balance"],
          moreRecords: false,
          showModal: false,
          filteredList: []
      }
  },
  created() {
    var usersRef = app.database().ref('products')
    // Callback methods
    usersRef.on('value', this.gotData, this.errData)
  },
  methods: {
      // testing purpose(static data)
      doSearch() {
        this.staticData = [
            { Date: '-', Description: '-', Credit: '-', Debit: '-', "RunningBalance": '-' },
            { Date: '02/02/2020', Description: 'Misc Expenses', Credit: '0', Debit: '200', "RunningBalance": '1215' },
            { Date: '02/02/2020', Description: 'Misc Expenses', Credit: '0', Debit: '200', "RunningBalance": '1215' },
            { Date: '02/02/2020', Description: 'Misc Expenses', Credit: '0', Debit: '200', "RunningBalance": '1215' }
        ]
      },
      gotData(data) {
        var obj = {}
        this.filteredList = []
        var products = data.val()
        var keys = Object.keys(products)
        for(var i = 0;i < keys.length;i ++) {
            var k = keys[i]
            obj = products[k]
            this.filteredList.push(obj)
            this.balance = this.filteredList[this.filteredList.length-1].balance
      }
      },
      errData(err) {
        console.log("Error!", err)
      }
  },
  mounted() {
    this.$toasted.show('Loading Transactions')
  }
}
</script>

<style>
    #details {
        border-collapse: collapse;
        margin-left: auto;
        margin-right: auto;
    }
    #details td, #details th {
        border: 1px solid #ddd;
        padding: 15px;
    }
    /* #details tr:hover {background-color: #ddd;} */

    #header {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: rgb(103, 150, 165);
        color: white;
    }
    .link {background-color: #ddd;}

</style>