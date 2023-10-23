import{c as U,a as G,u as j,T as O,g as z,d as J}from"./table.e8384294.js";import{d as T,k as g,N as q,_ as E,P as H,r,o as f,c as w,a as h,b as l,p as K,f as M,L as Q,q as C,w as n,F as A,x as L,e as y,t as D,j as V,A as R,E as W,D as X,G as Y,H as Z,O as x}from"./index.0b1ad4d3.js";import{P as ee}from"./Plus.ac9371e9.js";import{S as ae}from"./Search.b192f559.js";import{D as te}from"./Delete.74bd072d.js";const le=T({setup(){let e=g([]);const a=g(null),s={children:"children",label:"label"},d=q("active"),m=()=>{U({}).then(i=>{e.value=i.data,d.value=i.data[0],H(()=>{a.value&&a.value.setCurrentKey(d.value.id)})})},c=o=>{d.value=o};return m(),{data:e,tree:a,defaultProps:s,handleNodeClick:c}}}),oe=e=>(K("data-v-4732aea1"),e=e(),M(),e),ne={class:"category"},re=oe(()=>h("div",{class:"header-box"},[h("h2",null,"\u7EC4\u7EC7\u7BA1\u7406")],-1)),se={class:"list system-scrollbar"};function ue(e,a,s,d,m,c){const o=r("el-tree");return f(),w("div",ne,[re,h("div",se,[l(o,{ref:"tree",class:"my-tree",data:e.data,props:e.defaultProps,"expand-on-click-node":!1,"node-key":"id","highlight-current":"","default-expand-all":"",onNodeClick:e.handleNodeClick},null,8,["data","props","onNodeClick"])])])}var ie=E(le,[["render",ue],["__scopeId","data-v-4732aea1"]]);const I=[{value:1,label:"\u8FD0\u52A8"},{value:2,label:"\u5065\u8EAB"},{value:3,label:"\u8DD1\u9177"},{value:4,label:"\u8857\u821E"}],P=[{value:1,label:"\u4ECA\u5929"},{value:2,label:"\u660E\u5929"},{value:3,label:"\u540E\u5929"}],de=T({components:{Layer:Q},props:{layer:{type:Object,default:()=>({show:!1,title:"",showButton:!0})}},setup(e,a){const s=g(null),d=g(null);let m=g({name:""});const c={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u59D3\u540D",trigger:"blur"}],number:[{required:!0,message:"\u8BF7\u8F93\u5165\u6570\u5B57",trigger:"blur"}],choose:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:"blur"}],radio:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:"blur"}]};o();function o(){e.layer.row&&(m.value=JSON.parse(JSON.stringify(e.layer.row)))}return{form:m,rules:c,layerDom:d,ruleForm:s,selectData:I,radioData:P}},methods:{submit(){this.ruleForm&&this.ruleForm.validate(e=>{if(e){let a=this.form;this.layer.row?this.updateForm(a):this.addForm(a)}else return!1})},addForm(e){G(e).then(a=>{this.$message({type:"success",message:"\u65B0\u589E\u6210\u529F"}),this.$emit("getTableData",!0),this.layerDom&&this.layerDom.close()})},updateForm(e){j(e).then(a=>{this.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F"}),this.$emit("getTableData",!1),this.layerDom&&this.layerDom.close()})}}});function me(e,a,s,d,m,c){const o=r("el-input"),i=r("el-form-item"),v=r("el-option"),_=r("el-select"),$=r("el-radio"),F=r("el-radio-group"),p=r("el-form"),u=r("Layer",!0);return f(),C(u,{layer:e.layer,onConfirm:e.submit,ref:"layerDom"},{default:n(()=>[l(p,{model:e.form,rules:e.rules,ref:"ruleForm","label-width":"120px",style:{"margin-right":"30px"}},{default:n(()=>[l(i,{label:"\u540D\u79F0\uFF1A",prop:"name"},{default:n(()=>[l(o,{modelValue:e.form.name,"onUpdate:modelValue":a[0]||(a[0]=t=>e.form.name=t),placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue"])]),_:1}),l(i,{label:"\u6570\u5B57\uFF1A",prop:"number"},{default:n(()=>[l(o,{modelValue:e.form.number,"onUpdate:modelValue":a[1]||(a[1]=t=>e.form.number=t),oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"\u53EA\u80FD\u8F93\u5165\u6B63\u6574\u6570"},null,8,["modelValue"])]),_:1}),l(i,{label:"\u9009\u62E9\u5668\uFF1A",prop:"select"},{default:n(()=>[l(_,{modelValue:e.form.choose,"onUpdate:modelValue":a[2]||(a[2]=t=>e.form.choose=t),placeholder:"\u8BF7\u9009\u62E9",clearable:""},{default:n(()=>[(f(!0),w(A,null,L(e.selectData,t=>(f(),C(v,{key:t.value,label:t.label,value:t.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(i,{label:"\u5355\u9009\u6846\uFF1A",prop:"radio"},{default:n(()=>[l(F,{modelValue:e.form.radio,"onUpdate:modelValue":a[3]||(a[3]=t=>e.form.radio=t)},{default:n(()=>[(f(!0),w(A,null,L(e.radioData,t=>(f(),C($,{key:t.value,label:t.value},{default:n(()=>[y(D(t.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["layer","onConfirm"])}var ce=E(de,[["render",me]]);const pe=T({components:{Table:O,Layer:ce},setup(){const e=V({input:""}),a=V({show:!1,title:"\u65B0\u589E",showButton:!0}),s=V({index:1,size:20,total:0}),d=q("active"),m=g(!0),c=g([]),o=g([]),i=p=>{o.value=p},v=p=>{m.value=!0,p&&(s.index=1);let u={category:d.value.id,page:s.index,pageSize:s.size,...e};z(u).then(t=>{let k=t.data.list;Array.isArray(k)&&k.forEach(b=>{const N=I.find(B=>B.value===b.choose);N?b.chooseName=N.label:b.chooseName=b.choose;const S=P.find(B=>B.value===b.radio);S?b.radioName=S.label:b.radio}),c.value=t.data.list,s.total=Number(t.data.pager.total)}).catch(t=>{c.value=[],s.index=1,s.total=0}).finally(()=>{m.value=!1})},_=p=>{let u={ids:p.map(t=>t.id).join(",")};J(u).then(t=>{W({type:"success",message:"\u5220\u9664\u6210\u529F"}),v(c.value.length===1)})},$=()=>{a.title="\u65B0\u589E\u6570\u636E",a.show=!0,delete a.row},F=p=>{a.title="\u7F16\u8F91\u6570\u636E",a.row=p,a.show=!0};return R(d,p=>{v(!0)}),{Plus:ee,Search:ae,Delete:te,query:e,tableData:c,chooseData:o,loading:m,page:s,layer:a,handleSelectionChange:i,handleAdd:$,handleEdit:F,handleDel:_,getTableData:v}}}),fe={class:"layout-container"},_e={class:"layout-container-form flex space-between"},he={class:"layout-container-form-handle"},ge={class:"layout-container-form-search"},ve={class:"layout-container-table"};function be(e,a,s,d,m,c){const o=r("el-button"),i=r("el-popconfirm"),v=r("el-input"),_=r("el-table-column"),$=r("Table"),F=r("Layer"),p=X("loading");return f(),w("div",fe,[h("div",_e,[h("div",he,[l(o,{type:"primary",icon:e.Plus,onClick:e.handleAdd},{default:n(()=>[y(D(e.$t("message.common.add")),1)]),_:1},8,["icon","onClick"]),l(i,{title:e.$t("message.common.delTip"),onConfirm:a[0]||(a[0]=u=>e.handleDel(e.chooseData))},{reference:n(()=>[l(o,{type:"danger",icon:e.Delete,disabled:e.chooseData.length===0},{default:n(()=>[y(D(e.$t("message.common.delBat")),1)]),_:1},8,["icon","disabled"])]),_:1},8,["title"])]),h("div",ge,[l(v,{modelValue:e.query.input,"onUpdate:modelValue":a[1]||(a[1]=u=>e.query.input=u),placeholder:e.$t("message.common.searchTip"),onChange:a[2]||(a[2]=u=>e.getTableData(!0))},null,8,["modelValue","placeholder"]),l(o,{type:"primary",icon:e.Search,class:"search-btn",onClick:a[3]||(a[3]=u=>e.getTableData(!0))},{default:n(()=>[y(D(e.$t("message.common.search")),1)]),_:1},8,["icon"])])]),h("div",ve,[Y((f(),C($,{ref:"table",page:e.page,"onUpdate:page":a[4]||(a[4]=u=>e.page=u),showIndex:!0,showSelection:!0,data:e.tableData,onGetTableData:e.getTableData,onSelectionChange:e.handleSelectionChange},{default:n(()=>[l(_,{prop:"name",label:"\u540D\u79F0",align:"center"}),l(_,{prop:"number",label:"\u6570\u5B57",align:"center"}),l(_,{prop:"chooseName",label:"\u9009\u62E9\u5668",align:"center"}),l(_,{prop:"radioName",label:"\u5355\u9009\u6846",align:"center"}),l(_,{label:e.$t("message.common.handle"),align:"center",fixed:"right",width:"200"},{default:n(u=>[l(o,{onClick:t=>e.handleEdit(u.row)},{default:n(()=>[y(D(e.$t("message.common.update")),1)]),_:2},1032,["onClick"]),l(i,{title:e.$t("message.common.delTip"),onConfirm:t=>e.handleDel([u.row])},{reference:n(()=>[l(o,{type:"danger"},{default:n(()=>[y(D(e.$t("message.common.del")),1)]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1},8,["label"])]),_:1},8,["page","data","onGetTableData","onSelectionChange"])),[[p,e.loading]]),e.layer.show?(f(),C(F,{key:0,layer:e.layer,onGetTableData:e.getTableData},null,8,["layer","onGetTableData"])):Z("",!0)])])}var ye=E(pe,[["render",be],["__scopeId","data-v-4a0eeccf"]]);const De=T({name:"treeTable",components:{Category:ie,myTable:ye},setup(){let e=g({});x("active",e)}}),$e={class:"full"},Fe={class:"left"},Ce={class:"content"};function we(e,a,s,d,m,c){const o=r("category"),i=r("my-table");return f(),w("div",$e,[h("div",Fe,[l(o)]),h("div",Ce,[l(i)])])}var Ne=E(De,[["render",we],["__scopeId","data-v-50dd3ccb"]]);export{Ne as default};
