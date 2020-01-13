<template>
  <div class="bubble">{{num}}</div>
</template>

<script>
export default {
  name: "bubble",
  components: {},
  props: ["num"],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
.bubble
  font-size: 9px
  border-radius: 16px
  font-weight: 700
  line-height: 16px
  color: rgb(255, 255, 255)
  padding: 0 6px
  background-color: rgb(240, 20, 20)
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
</style>