<template>
  <Row :class="{'list-item-container': true, 'top-border': exitUpperSibling }" >
    <Col :span="isRowPostfix ? 20 : 24" :style="{ height: `${height}px`}">
      <Row class="list-item-title">
        <Col :span="isTitlePostfix ? 20 : 24" class="-textOverflow"><em>{{title}}</em></Col>
        <Col v-if="isTitlePostfix" span="4"><slot name="titlePostfix"></slot></Col>
      </Row>
      <Row class="list-item-content">
        <Col :span="isTitlePostfix ? 20 : 24" class="-textOverflow"><span>{{content}}</span></Col>
        <Col v-if="isTitlePostfix" span="4"><slot name="contentPostfix"></slot></Col>
      </Row>
    </Col>
    <Col v-if="isRowPostfix" span="4" :style="{ height: `${height}px`}">
      <slot name="rowPostfix"></slot>
    </Col>
  </Row>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    name: 'ListItem',
    computed: {
      isTitlePostfix() {
        return Boolean(this.$slots.titlePostfix);
      },
      isContentPostfix() {
        return Boolean(this.$slots.contentPostfix);
      },
      isRowPostfix() {
        return Boolean(this.$slots.rowPostfix);
      },
    },
  })
export default class ListItem extends Vue {
  @Prop({
    type: String,
    required: true,
  })
  title!:string;
  
  @Prop({
    type: String,
    required: false,
    default: '',
  })
  content!:string;
  
  @Prop({
    type: [Number, String],
    required: false,
    default: 39,
  })
  height!:number | string;
  
  exitUpperSibling: boolean = false;
  
  checkExitUpperSibling(context:any) {
    const res:Array<Vue> = context.$parent.$children.filter((item:Vue) => item.$options.name === 'ListItem');
    const index = res.findIndex((item: any) => item._uid === context._uid);
    return index > 0;
  }
  
  mounted() {
    this.exitUpperSibling = this.checkExitUpperSibling(this);
  }
}
</script>

<style scoped lang="stylus">
.list-item-container

.list-item-title
  em
    color: $font-color-999;
    font-size: 14px;
  
.list-item-content
  span
    color: $font-color-999;
    font-size: 12px;
  
.top-border
  border-top: 1px solid $font-color-999;
  
</style>
