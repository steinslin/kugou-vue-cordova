<!-- 
  usage:<switch v-model='switchValue' @change='change'></switch>
  v-model必须有
-->
<template>
  <label class="switch">
    <input type="checkbox" v-model='currentValue' @change="$emit('change')">
    <span></span>
  </label>
</template>

<script>
export default{
  props: {
    value: Boolean
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      }

    }
  }
}
</script>

<style scoped lang='scss'>
$switchOnColor:#26a2ff;
$switchOffColor:#fdfdfd;
$switchColor:#d9d9d9;
.switch{
  display:flex;
  input{
    display: none;
    &:checked+span{
      background: $switchOnColor;
      border-color: $switchOnColor;
      &::before{
        transform:scale(0);
      }
      &::after{
        transform: translateX(20px);
      }
    }
    &+span{
      display: inline-block;
        position: relative;
        width: 52px;
        height: 32px;
        border: 1px solid $switchColor;
        border-radius: 16px;
        box-sizing: border-box;
        background: $switchColor;
        &::before,&::after{
        box-sizing:border-box;
        content: " ";
          top: 0;
          left: 0;
          position: absolute;
          transition: transform .3s;
          border-radius: 15px;
        }
        &::before{
          width: 50px;
        height: 30px;
        background-color: $switchOffColor;
        }
        &::after{
          width: 30px;
          height: 30px;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
        }
    }
  }
}

</style>
