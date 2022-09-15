<template>
    <div>
        <div class="Header">
            <div class="TitleDiv">
                <p>Product List</p>
            </div>
             <div class="ButtonSection">
                <nuxt-link to="addProducts" class="text-decoration-none">
                    <div class="Button">
                        <p>Add</p>
                    </div>
                </nuxt-link>
                <div class="Button ml-4" id="delete-product-btn" @click="MassDelete">
                    <p>Mass Delete</p>
                </div>
            </div>
        </div>
        <div class="Items">
            <div v-for="item in Items" :key="item.id" class="Item">
                <div class="checkboxDiv">
                    <input type="checkbox" v-model="checkedItems" :value="item.id">
                </div>
                <div class="InformationDiv">
                    <p>{{item.SKU}}</p>
                    <p>{{item.Name}}</p>
                    <p>{{item.Price}}</p>
                    <p>{{item.Properties}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            Items: [],
            checkedItems: [],
        }
    },
    methods: {
        async getItems() {
           let response = await this.$axios.get("api/getProducts.php");
           if(response.data != "0 results") {
            this.Items = response.data;
           } else {
            this.Items = [];
           }
           console.log(response)
        },
        async MassDelete() {
            let response = await this.$axios.post("api/deleteProducts.php", this.checkedItems);
            if(response.data == "Succesfully Deleted") {
                this.getItems();
            }
        }
    },
    mounted() {
        this.getItems();
    }
}
</script>
<style lang="scss" scoped>
    .Items {
        display: grid;
        grid-template-columns: repeat(4, 22%);
        grid-column-gap: 4%;
        grid-row-gap: 5%;
        margin-top: 20px;
        .Item {
            width: 100%;
            padding: 20px;
            border: 2px solid black;
            .InformationDiv {
                text-align: center;
            }
        }
    }
</style>