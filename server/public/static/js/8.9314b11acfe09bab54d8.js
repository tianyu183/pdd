webpackJsonp([8],{"n/G1":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"home"},[l("ly-tab",{staticClass:"fix",attrs:{items:e.items,options:e.options},on:{change:e.handleChange},model:{value:e.selectedId,callback:function(t){e.selectedId=t},expression:"selectedId"}}),e._v(" "),l("router-view")],1)},staticRenderFns:[]};var o=l("VU/8")({name:"Home",data:function(){return{selectedId:0,items:[{label:"热门"},{label:"服饰"},{label:"鞋包"},{label:"母婴"},{label:"百货"},{label:"食品"},{label:"内衣"},{label:"男装"},{label:"电器"}],options:{activeColor:"#e9232c"},subRouteUrl:["/home/hot","/home/dress","/home/box","/home/mbaby","/home/general","/home/food","/home/shirt","/home/man","/home/electric"]}},methods:{handleChange:function(e,t){this.$router.replace(this.subRouteUrl[t])}}},a,!1,function(e){l("q4y8")},"data-v-60193ca6",null);t.default=o.exports},q4y8:function(e,t){}});
//# sourceMappingURL=8.9314b11acfe09bab54d8.js.map