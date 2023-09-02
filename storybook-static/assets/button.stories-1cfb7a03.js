import{j as P}from"./jsx-runtime-4ca860c5.js";import"./index-61bf1805.js";import"./_commonjsHelpers-de833af9.js";const V="_main_8uwoa_1",$="_primary_8uwoa_14",j="_secondary_8uwoa_27",E="_tertiary_8uwoa_40",A="_link_8uwoa_56",C="_fullWidth_8uwoa_76",i={main:V,primary:$,secondary:j,tertiary:E,link:A,fullWidth:C},o=l=>{const{variant:T="primary",fullWidth:x,className:d,as:q="button",...F}=l;return P.jsx(q,{className:`${i[T]} ${x?i.fullWidth:""} ${d||""} ${i.main}`,...F})};try{o.displayName="Button",o.__docgenInfo={description:"",displayName:"Button",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"link"'},{value:'"primary"'},{value:'"secondary"'},{value:'"tertiary"'}]}},fullWidth:{defaultValue:null,description:"",name:"fullWidth",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const z={title:"Components/Button",component:o,tags:["autodocs"],argTypes:{variant:{options:["primary","secondary","tertiary","link"],control:{type:"radio"}}}},a={args:{variant:"primary",children:"Primary Button",disabled:!1}},r={args:{variant:"secondary",children:"Secondary Button",disabled:!1}},e={args:{variant:"tertiary",children:"Tertiary Button",disabled:!1}},n={args:{variant:"link",children:"Link Button",disabled:!1}},t={args:{variant:"primary",children:"Full Width Button",disabled:!1,fullWidth:!0}},s={args:{variant:"primary",children:"Link that looks like a button",as:"a"}};var c,u,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false
  }
}`,...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var p,y,f;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false
  }
}`,...(f=(y=r.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var h,_,g;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: false
  }
}`,...(g=(_=e.parameters)==null?void 0:_.docs)==null?void 0:g.source}}};var v,k,b;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    children: 'Link Button',
    disabled: false
  }
}`,...(b=(k=n.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var B,W,S;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true
  }
}`,...(S=(W=t.parameters)==null?void 0:W.docs)==null?void 0:S.source}}};var L,w,N;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Link that looks like a button',
    as: 'a'
  }
}`,...(N=(w=s.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};const D=["Primary","Secondary","Tertiary","Link","FullWidth","AsLink"];export{s as AsLink,t as FullWidth,n as Link,a as Primary,r as Secondary,e as Tertiary,D as __namedExportsOrder,z as default};
//# sourceMappingURL=button.stories-1cfb7a03.js.map
