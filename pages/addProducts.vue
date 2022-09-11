<template>
    <div>
        <div class="Header">
            <div class="TitleDiv">
            <p>Product Add</p>
            </div>
            <div class="ButtonSection">        
                <div class="Button" @click="submitForm">
                    <p>Save</p>
                </div>
                <nuxt-link to="/" class="text-decoration-none">
                    <div class="Button ml-4" id="delete-product-btn">
                        <p>cancel</p>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <div class="formDiv">
            <form id="product_form">
                <div class="InputDiv">
                    <div class="LabelforInput">
                        <p>SKU</p>
                    </div>
                    <input type="text" id="sku" name="sku" v-model="SKU">
                </div>
                <div class="InputDiv">
                    <div class="LabelforInput">
                        <p>Name</p>
                    </div>
                    <input type="text" id="name" name="name" v-model="Name">
                </div>
                <div class="InputDiv">
                    <div class="LabelforInput">
                        <p>Price ($)</p>
                    </div>
                    <input type="text" id="price" name="price" v-model="Price">
                </div>
                <div class="SelectorDiv">
                    <p>Type Switcher</p>
                    <select v-model="CurrentType" id="productType">
                        <option value="1" id="DVD">DVD</option>
                        <option value="2" id="Furniture">Furniture</option>
                        <option value="3" id="Book">Book</option>
                    </select>
                </div>
                <div v-if="CurrentType == 1">
                    <div class="ItemBox">
                        <div class="ItemBoxInput">
                            <p>Size (MB)</p>
                            <input type="text" v-model="Size" id="size">
                        </div>
                    </div>
                </div>
                <div v-if="CurrentType == 2">
                    <div class="ItemBox">
                        <div class="ItemBoxInput">
                            <p>Height (CM)</p>
                            <input type="text" v-model="Height" id="height">
                        </div>
                        <div class="ItemBoxInput">
                            <p>Width (CM)</p>
                            <input type="text" v-model="Width" id="width">
                        </div>
                        <div class="ItemBoxInput">
                            <p>Length (CM)</p>
                            <input type="length" v-model="Length" id="lenght">
                        </div>
                    </div>
                </div>
                <div v-if="CurrentType == 3">
                    <div class="ItemBox">
                        <div class="ItemBoxInput">
                            <p>Weight (KG)</p>
                            <input type="text" v-model="Weight" id="weight">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
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
            return "Weight: " + this.Weight + "KG";
        },
        getFurnitureString() {
            return "Dimension: " + this.Length + "x" + this.Width + "x" + this.Height;
        },
        getDVDString() {
            return "Size: " + this.Size + " MB";
        },
        getString() {
            let functionMap = [
                {
                    'makeAString': this.getDVDString
                },
                {
                    'makeAString': this.getFurnitureString
                },
                {
                    'makeAString': this.getBookString
                }
            ]
            return functionMap[this.CurrentType-1]['makeAString'];
        }
    },
    methods: {
        async submitForm() {
            if(this.CurrentType != null) {
                let data =  {
                    SKU : this.SKU,
                    Name : this.Name,
                    Price : this.Price,
                }
                data.Properties = this.getString;

                let response = await this.$axios.post("api/addProducts.php", data);
                if(response.data == "Succesfully Added") {
                    this.$router.push({ path: "/"});
                }
            }
        },
    }
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
            margin-bottom: 20px;
            p {
                width: 100px;
            }
        }
    }
</style>