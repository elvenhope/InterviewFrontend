<template>
    <div class="d-flex flex-column minHeight">
        <nuxt/>
        <Footer/>
    </div>
</template>
<script>
import Footer from "@/components/Footer.vue";

export default {
    components: {
        Footer
    }
}
</script>
<style lang="scss">
    body {
        padding: 0 2rem;
    }
    .minHeight {
        min-height: 100vh;
    }
    p {
        margin-bottom: 0;
    }
    .Header {
        width: 100%;
        border-bottom: 1px solid black;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        .TitleDiv {
            p {
                font-size: 30px;
                font-weight: bold;
            }
        }
        .ButtonSection {
            display: flex;
            .Button {
                padding: 10px;
                border: 1px solid black;
                text-align: center;
                cursor: pointer;
                color: black;
            }
            .Button:hover {
                background-color: rgb(205, 205, 205);
            }
        }
    }
</style>