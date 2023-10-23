import{b as P,a as J,u as H,T as K,g as Q,d as R}from"./table.e8384294.js";import{d as B,k as h,N as z,_ as T,r as f,D as U,o as g,c as b,a as $,b as l,G,F as S,x as N,n as W,t as F,H as k,p as X,f as Y,L as Z,q as E,w as p,e as C,j as A,A as M,E as x,O as ee}from"./index.0b1ad4d3.js";import{P as ae}from"./Plus.ac9371e9.js";import{S as te}from"./Search.b192f559.js";import{D as le}from"./Delete.74bd072d.js";function q(e,a,n,u){var i,c=!1,o=0;function d(){i&&clearTimeout(i)}function r(){d(),c=!0}typeof a!="boolean"&&(u=n,n=a,a=void 0);function v(){for(var y=arguments.length,_=new Array(y),m=0;m<y;m++)_[m]=arguments[m];var s=this,t=Date.now()-o;if(c)return;function w(){o=Date.now(),n.apply(s,_)}function D(){i=void 0}u&&!i&&w(),d(),u===void 0&&t>e?w():a!==!0&&(i=setTimeout(u?D:w,u===void 0?e-t:e))}return v.cancel=r,v}function oe(e,a,n){return n===void 0?q(e,a,!1):q(e,n,a!==!1)}const ne=B({setup(){const e=h(null),a={index:1,size:30,total:0};let n=h(""),u=h([]),i=h(!0),c=h(!0),o=z("active"),d=h(!1);const r=_=>{if(c.value=!0,_||i.value)i.value=!1,a.index=1,e.value&&(e.value.scrollTop=0);else if(a.index*a.size>=a.total){c.value=!1,d.value=!0;return}let m={page:a.index,pageSize:a.size,keyword:n.value};P(m).then(s=>{a.index===1?(u.value=s.data.list,o.value=u.value[0]):u.value=u.value.concat(s.data.list),a.index+=1,a.total=s.data.pager.total}).catch(s=>{a.index=1,a.total=0,u.value=[]}).finally(()=>{c.value=!1})},v=oe(300,r),y=_=>{o.value=_};return r(!0),{listDom:e,loading:c,nomore:d,input:n,list:u,active:o,getCategoryData:r,searchData:v,changeActive:y}}}),se=e=>(X("data-v-3275f7a8"),e=e(),Y(),e),ue={class:"category"},re={class:"header-box"},ie=se(()=>$("h2",null,"\u5206\u7C7B\u5217\u8868",-1)),de={class:"list system-scrollbar",ref:"listDom","infinite-scroll-immediate":!1,style:{overflow:"auto"}},me=["onClick"],ce={key:0,class:"load-tip"},pe={key:1,class:"load-tip"};function fe(e,a,n,u,i,c){const o=f("el-input"),d=U("infinite-scroll");return g(),b("div",ue,[$("div",re,[ie,l(o,{modelValue:e.input,"onUpdate:modelValue":a[0]||(a[0]=r=>e.input=r),placeholder:"\u8BF7\u8F93\u5165\u5185\u5BB9",onInput:a[1]||(a[1]=r=>e.searchData(!0))},null,8,["modelValue"])]),G((g(),b("ul",de,[(g(!0),b(S,null,N(e.list,r=>(g(),b("li",{key:r.id,class:W({active:r.id===e.active.id}),onClick:v=>e.changeActive(r)},[$("span",null,F(r.name),1)],10,me))),128)),e.loading?(g(),b("p",ce,"\u52A0\u8F7D\u4E2D...")):k("",!0),e.nomore?(g(),b("p",pe,"\u6570\u636E\u52A0\u8F7D\u5B8C\u6210")):k("",!0)])),[[d,e.getCategoryData]])])}var ve=T(ne,[["render",fe],["__scopeId","data-v-3275f7a8"]]);const j=[{value:1,label:"\u8FD0\u52A8"},{value:2,label:"\u5065\u8EAB"},{value:3,label:"\u8DD1\u9177"},{value:4,label:"\u8857\u821E"}],O=[{value:1,label:"\u4ECA\u5929"},{value:2,label:"\u660E\u5929"},{value:3,label:"\u540E\u5929"}],ge=B({components:{Layer:Z},props:{layer:{type:Object,default:()=>({show:!1,title:"",showButton:!0})}},setup(e,a){const n=h(null),u=h(null);let i=h({name:""});const c={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u59D3\u540D",trigger:"blur"}],number:[{required:!0,message:"\u8BF7\u8F93\u5165\u6570\u5B57",trigger:"blur"}],choose:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:"blur"}],radio:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:"blur"}]};o();function o(){e.layer.row&&(i.value=JSON.parse(JSON.stringify(e.layer.row)))}return{form:i,rules:c,layerDom:u,ruleForm:n,selectData:j,radioData:O}},methods:{submit(){this.ruleForm&&this.ruleForm.validate(e=>{if(e){let a=this.form;this.layer.row?this.updateForm(a):this.addForm(a)}else return!1})},addForm(e){J(e).then(a=>{this.$message({type:"success",message:"\u65B0\u589E\u6210\u529F"}),this.$emit("getTableData",!0),this.layerDom&&this.layerDom.close()})},updateForm(e){H(e).then(a=>{this.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F"}),this.$emit("getTableData",!1),this.layerDom&&this.layerDom.close()})}}});function he(e,a,n,u,i,c){const o=f("el-input"),d=f("el-form-item"),r=f("el-option"),v=f("el-select"),y=f("el-radio"),_=f("el-radio-group"),m=f("el-form"),s=f("Layer",!0);return g(),E(s,{layer:e.layer,onConfirm:e.submit,ref:"layerDom"},{default:p(()=>[l(m,{model:e.form,rules:e.rules,ref:"ruleForm","label-width":"120px",style:{"margin-right":"30px"}},{default:p(()=>[l(d,{label:"\u540D\u79F0\uFF1A",prop:"name"},{default:p(()=>[l(o,{modelValue:e.form.name,"onUpdate:modelValue":a[0]||(a[0]=t=>e.form.name=t),placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue"])]),_:1}),l(d,{label:"\u6570\u5B57\uFF1A",prop:"number"},{default:p(()=>[l(o,{modelValue:e.form.number,"onUpdate:modelValue":a[1]||(a[1]=t=>e.form.number=t),oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"\u53EA\u80FD\u8F93\u5165\u6B63\u6574\u6570"},null,8,["modelValue"])]),_:1}),l(d,{label:"\u9009\u62E9\u5668\uFF1A",prop:"select"},{default:p(()=>[l(v,{modelValue:e.form.choose,"onUpdate:modelValue":a[2]||(a[2]=t=>e.form.choose=t),placeholder:"\u8BF7\u9009\u62E9",clearable:""},{default:p(()=>[(g(!0),b(S,null,N(e.selectData,t=>(g(),E(r,{key:t.value,label:t.label,value:t.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(d,{label:"\u5355\u9009\u6846\uFF1A",prop:"radio"},{default:p(()=>[l(_,{modelValue:e.form.radio,"onUpdate:modelValue":a[3]||(a[3]=t=>e.form.radio=t)},{default:p(()=>[(g(!0),b(S,null,N(e.radioData,t=>(g(),E(y,{key:t.value,label:t.value},{default:p(()=>[C(F(t.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["layer","onConfirm"])}var _e=T(ge,[["render",he]]);const ye=B({components:{Table:K,Layer:_e},setup(){const e=A({input:""}),a=A({show:!1,title:"\u65B0\u589E",showButton:!0}),n=A({index:1,size:20,total:0}),u=z("active"),i=h(!0),c=h([]),o=h([]),d=m=>{o.value=m},r=m=>{i.value=!0,m&&(n.index=1);let s={category:u.value.id,page:n.index,pageSize:n.size,...e};Q(s).then(t=>{let w=t.data.list;Array.isArray(w)&&w.forEach(D=>{const L=j.find(V=>V.value===D.choose);L?D.chooseName=L.label:D.chooseName=D.choose;const I=O.find(V=>V.value===D.radio);I?D.radioName=I.label:D.radio}),c.value=t.data.list,n.total=Number(t.data.pager.total)}).catch(t=>{c.value=[],n.index=1,n.total=0}).finally(()=>{i.value=!1})},v=m=>{let s={ids:m.map(t=>t.id).join(",")};R(s).then(t=>{x({type:"success",message:"\u5220\u9664\u6210\u529F"}),r(c.value.length===1)})},y=()=>{a.title="\u65B0\u589E\u6570\u636E",a.show=!0,delete a.row},_=m=>{a.title="\u7F16\u8F91\u6570\u636E",a.row=m,a.show=!0};return M(u,m=>{r(!0)}),{Plus:ae,Search:te,Delete:le,query:e,tableData:c,chooseData:o,loading:i,page:n,layer:a,handleSelectionChange:d,handleAdd:y,handleEdit:_,handleDel:v,getTableData:r}}}),be={class:"layout-container"},De={class:"layout-container-form flex space-between"},$e={class:"layout-container-form-handle"},Fe={class:"layout-container-form-search"},we={class:"layout-container-table"};function Ce(e,a,n,u,i,c){const o=f("el-button"),d=f("el-popconfirm"),r=f("el-input"),v=f("el-table-column"),y=f("Table"),_=f("Layer"),m=U("loading");return g(),b("div",be,[$("div",De,[$("div",$e,[l(o,{type:"primary",icon:e.Plus,onClick:e.handleAdd},{default:p(()=>[C(F(e.$t("message.common.add")),1)]),_:1},8,["icon","onClick"]),l(d,{title:e.$t("message.common.delTip"),onConfirm:a[0]||(a[0]=s=>e.handleDel(e.chooseData))},{reference:p(()=>[l(o,{type:"danger",icon:e.Delete,disabled:e.chooseData.length===0},{default:p(()=>[C(F(e.$t("message.common.delBat")),1)]),_:1},8,["icon","disabled"])]),_:1},8,["title"])]),$("div",Fe,[l(r,{modelValue:e.query.input,"onUpdate:modelValue":a[1]||(a[1]=s=>e.query.input=s),placeholder:e.$t("message.common.searchTip"),onChange:a[2]||(a[2]=s=>e.getTableData(!0))},null,8,["modelValue","placeholder"]),l(o,{type:"primary",icon:e.Search,class:"search-btn",onClick:a[3]||(a[3]=s=>e.getTableData(!0))},{default:p(()=>[C(F(e.$t("message.common.search")),1)]),_:1},8,["icon"])])]),$("div",we,[G((g(),E(y,{ref:"table",page:e.page,"onUpdate:page":a[4]||(a[4]=s=>e.page=s),showIndex:!0,showSelection:!0,data:e.tableData,onGetTableData:e.getTableData,onSelectionChange:e.handleSelectionChange},{default:p(()=>[l(v,{prop:"name",label:"\u540D\u79F0",align:"center"}),l(v,{prop:"number",label:"\u6570\u5B57",align:"center"}),l(v,{prop:"chooseName",label:"\u9009\u62E9\u5668",align:"center"}),l(v,{prop:"radioName",label:"\u5355\u9009\u6846",align:"center"}),l(v,{label:e.$t("message.common.handle"),align:"center",fixed:"right",width:"200"},{default:p(s=>[l(o,{onClick:t=>e.handleEdit(s.row)},{default:p(()=>[C(F(e.$t("message.common.update")),1)]),_:2},1032,["onClick"]),l(d,{title:e.$t("message.common.delTip"),onConfirm:t=>e.handleDel([s.row])},{reference:p(()=>[l(o,{type:"danger"},{default:p(()=>[C(F(e.$t("message.common.del")),1)]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1},8,["label"])]),_:1},8,["page","data","onGetTableData","onSelectionChange"])),[[m,e.loading]]),e.layer.show?(g(),E(_,{key:0,layer:e.layer,onGetTableData:e.getTableData},null,8,["layer","onGetTableData"])):k("",!0)])])}var Ee=T(ye,[["render",Ce],["__scopeId","data-v-27c5c183"]]);const Be=B({name:"categoryTable",components:{Category:ve,myTable:Ee},setup(){let e=h({});ee("active",e)}}),Te={class:"full"},Ve={class:"left"},Ae={class:"content"};function Se(e,a,n,u,i,c){const o=f("category"),d=f("my-table");return g(),b("div",Te,[$("div",Ve,[l(o)]),$("div",Ae,[l(d)])])}var ze=T(Be,[["render",Se],["__scopeId","data-v-1bfbe078"]]);export{ze as default};
