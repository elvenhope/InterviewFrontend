<template>
  <div>
    <div class="Header">
      <div class="TitleDiv">
        <p>Product Add</p>
      </div>
      <div class="ButtonSection">
        <button class="Button" @click="submitForm" id="Save">
          <p>Save</p>
        </button>
        <nuxt-link to="/" class="text-decoration-none">
          <div class="Button ml-4" id="delete-product-btn">
            <p>cancel</p>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="formDiv">
      <ValidationObserver ref="form">
        <form id="product_form">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="InputDiv">
              <div class="LabelforInput">
                <p>SKU</p>
              </div>
              <input type="text" id="sku" name="sku" v-model="SKU" />
              <span class="err-txt">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="InputDiv">
              <div class="LabelforInput">
                <p>Name</p>
              </div>
              <input type="text" id="name" name="name" v-model="Name" />
              <span class="err-txt">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="InputDiv">
              <div class="LabelforInput">
                <p>Price ($)</p>
              </div>
              <input type="text" id="price" name="price" v-model="Price" />
              <span class="err-txt">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="SelectorDiv">
              <p>Type Switcher</p>
              <select v-model="CurrentType" id="productType">
                <option value="1" id="DVD" title="Please, provide size">
                  DVD
                </option>
                <option
                  value="2"
                  id="Furniture"
                  title="Please, provide dimensions"
                >
                  Furniture
                </option>
                <option value="3" id="Book" title="Please, provide weight">
                  Book
                </option>
              </select>
              <span class="err-txt">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            :rules="{ required: CurrentType == 1 }"
            v-slot="{ errors }"
          >
            <div v-if="CurrentType == 1">
              <div class="ItemBox">
                <div class="ItemBoxInput">
                  <p>Size (MB)</p>
                  <input type="text" v-model="Size" id="size" />
                </div>
              </div>
            </div>
            <span class="err-txt">{{ errors[0] }}</span>
          </ValidationProvider>
          <div v-if="CurrentType == 2">
            <div class="ItemBox">
              <ValidationProvider
                :rules="{ required: CurrentType == 2 }"
                v-slot="{ errors }"
                class="mb-4"
              >
                <div class="ItemBoxInput">
                  <p>Height (CM)</p>
                  <input type="text" v-model="Height" id="height" />
                </div>
                <span class="err-txt">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                :rules="{ required: CurrentType == 2 }"
                v-slot="{ errors }"
                class="mb-4"
              >
                <div class="ItemBoxInput">
                  <p>Width (CM)</p>
                  <input type="text" v-model="Width" id="width" />
                </div>
                <span class="err-txt">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                :rules="{ required: CurrentType == 2 }"
                v-slot="{ errors }"
                class="mb-4"
              >
                <div class="ItemBoxInput">
                  <p>Length (CM)</p>
                  <input type="length" v-model="Length" id="lenght" />
                </div>
                <span class="err-txt">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <ValidationProvider
            :rules="{ required: CurrentType == 3 }"
            v-slot="{ errors }"
          >
            <div v-if="CurrentType == 3">
              <div class="ItemBox">
                <div class="ItemBoxInput">
                  <p>Weight (KG)</p>
                  <input type="text" v-model="Weight" id="weight" />
                </div>
              </div>
            </div>
            <span class="err-txt">{{ errors[0] }}</span>
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  data() {
    return {
      SKU: '',
      Name: '',
      Price: null,
      CurrentType: null,
      Size: null,
      Height: null,
      Width: null,
      Length: null,
      Weight: null,
    }
  },
  computed: {
    getBookString() {
      return 'Weight: ' + this.Weight + 'KG'
    },
    getFurnitureString() {
      return 'Dimension: ' + this.Length + 'x' + this.Width + 'x' + this.Height
    },
    getDVDString() {
      return 'Size: ' + this.Size + ' MB'
    },
    getString() {
      let functionMap = [
        {
          makeAString: this.getDVDString,
        },
        {
          makeAString: this.getFurnitureString,
        },
        {
          makeAString: this.getBookString,
        },
      ]
      return functionMap[this.CurrentType - 1]['makeAString']
    },
  },
  methods: {
    async submitForm() {
      const isValid = await this.$refs.form.validate()

      if (isValid) {
        let data = {
          SKU: this.SKU,
          Name: this.Name,
          Price: this.Price,
        }
        data.Properties = this.getString
        let response = await this.$axios.post('api/addProducts.php', data)
        if (response.data == 'Succesfully Added') {
          this.$router.push({ path: '/' })
        }
      }
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
}
</script>
<style lang="scss" scoped>
.formDiv {
  margin-top: 20px;
}
.InputDiv {
  display: flex;
  p {
    width: 100px;
  }
  margin-bottom: 20px;
}
.SelectorDiv {
  display: flex;
  margin-bottom: 20px;
  p {
    width: 130px;
  }
}
.ItemBox {
  padding: 20px;
  border: 2px solid black;
  width: 30%;
  .ItemBoxInput {
    display: flex;
    p {
      width: 100px;
    }
  }
}
.err-txt {
  color: red;
  font-size: 12px;
  margin-left: 10px;
}
</style>