<template>
<div class="modal" v-if="show">
    <div class="modal-content">
        <span @click="cancel" class="close">&times;</span>
        <form id="addForm">
            <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <h3>New Transaction</h3>
            <div class="form-group">
              <label for="type">Type</label>
              <select id="type" v-model="model.type">
                  <option v-for="type in types" :key="type">{{ type }}</option>
              </select>
           </div>
           <div class="form-group">
              <label for="amount">Amount</label>
              <input min="1" type="number" id="amount" v-model.number="model.amount">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea type="text" id="description" rows="5" v-model="model.description" style="height:80px"></textarea>
            </div>
            <div>
              <button class="button-cancel" type="cancel" @click="cancel"><i class="fa fa-window-close"></i>Cancel</button>
              <button class="button-submit" type="submit" @click="add"><i class="fa fa-floppy-o" aria-hidden="true"></i>
                Save</button>
            </div>
            <div class="clear"></div>
        </form>
    </div>
</div>    
</template>

<script>
import app from '../../firebase.js'

let db = app.database()
let textRef = db.ref('products')
export default {
    firebase: {
      products: textRef
    },
    props: {
        show: {
            type: Boolean,
            default: ''
        },
        balance: {
            // type: Number,
            default: 0
        }
    },
    data () {
    return {
      types: ['Debit', 'Credit'],
      model: {
        'type': '',
        'amount': '',
        'description': ''
      },
      data: {
        'date': '',
        'description': '',
        'credit': '',
        'debit': '',
      },
      runningBal: 0,
      errors: []    
    }
    },
    created() {
        this.bal = this.balance
    },
    methods: {
    getDate: function() {
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()

        today = mm + '/' + dd + '/' + yyyy
        return today
    },
    prepObj: function() {
        this.data.date = this.getDate()
        this.data.description = this.model.description
        if (this.model.type == 'Credit') {
            this.data.credit = this.model.amount
            this.data.debit = '-'
            if (typeof this.bal == 'number') {
                this.data.balance = this.bal + this.model.amount
            } else {
                this.data.balance = this.model.amount
            }
        } else {
            this.data.credit = '-'
            this.data.debit = this.model.amount
            if (typeof this.bal == 'number') {
                this.data.balance = this.bal - this.model.amount
            } else {
                this.data.balance = this.model.amount
            }
        }
    },
    add: function() {
        if (this.checkValidation()) {
            this.prepObj()
            textRef.push(this.data)
            this.reset()
            this.cancel()
            this.$toasted.show('Transaction Updated')
        } else {
            alert('please check the input values')
        }
        
    },
    reset: function() {
        this.model = {}
        this.data = {}
    },
    checkValidation (e) {
      this.errors = []

      if (!this.model.type) {
        this.errors.push("Type required.")
      }
      if (!this.model.amount) {
        this.errors.push('Amount required.')
      } else if (this.model.amount < 0) {
        this.errors.push('Amount should be more than zero.')
      }
      if (!this.model.description) {
        this.errors.push('Description required.')
      }
      if (!this.errors.length) {
        return true
      }
    //   e.preventDefault();
    },
    cancel(event) {
        this.$emit('close')
    }
  }
}

</script>

<style>


.button-submit {
    background: #005ddb;
    width: 70px;
    height: 35px;
    border: 0px;
    border-radius: 4px;
    color: white;
    outline: none;
    cursor: pointer;
    float: right;
    margin: 2px 2px 2px 2px;
}
.button-cancel {
    background: rgba(48, 39, 39, 0.1);
    width: 70px;
    height: 35px;
    border: 1px;
    border-radius: 4px;
    color: black;
    outline: none;
    cursor: pointer;
    float: right;
    margin: 2px 2px 2px 2px;
}
.clear{
    clear: both;
}
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-content {
  width: 56%;
  margin: 0px auto;
  padding: 20px 25px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  align-content: flex-end;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

input[type=number], select, textarea {
  width: 70%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 0px 12px 10px;
  display: inline-block;
  width: 25%;
}
.form-group {
  padding: 8px;
  border-radius: 5px;
}
</style>