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
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
$switchOnColor:#26a2ff;
$switchOffColor:rgba(0,0,0,0); //#fdfdfd
$switchColor:rgba(0,0,0,0); // #d9d9d9
$switchBorderColor: #49B6C3;
.switch{
  display: flex;
  * {
    pointer-events: none;
  }
  display:flex;
  input{
    display: none;
    &:checked+span{
      background: $switchOnColor;
      border-color: $switchBorderColor;
      &::before{
        transform:scale(0);
      }
      &::after{
        transform: translateX(0.9rem);
      }
    }
    &+span{
      display: inline-block;
      position: relative;
      width: 2rem;
      height: 1.2rem;
      border: 1px solid $switchBorderColor;
      border-radius: 1rem;
      box-sizing: border-box;
      background: $switchColor;
      &::before,&::after{
      box-sizing:border-box;
      content: " ";
        top: 0;
        left: 0;
        position: absolute;
        transition: transform .3s;
        border-radius: 1rem;
      }
      &::before{
        width: 1.9rem;
        height: 1.14rem;
        background-color: $switchOffColor;
      }
      &::after{
        width: 1.14rem;
        height: 1.14rem;
        background-color: rgba(255,255,255,.8);
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
      }
    }
  }
}

</style>
