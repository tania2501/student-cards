import{j as s}from"./jsx-runtime-4ca860c5.js";import{r as v}from"./index-61bf1805.js";import{T as _}from"./typography-e5e022ca.js";import"./_commonjsHelpers-de833af9.js";function A(a){var r,n,e="";if(typeof a=="string"||typeof a=="number")e+=a;else if(typeof a=="object")if(Array.isArray(a))for(r=0;r<a.length;r++)a[r]&&(n=A(a[r]))&&(e&&(e+=" "),e+=n);else for(r in a)a[r]&&(e&&(e+=" "),e+=r);return e}function i(){for(var a,r,n=0,e="";n<arguments.length;)(a=arguments[n++])&&(r=A(a))&&(e&&(e+=" "),e+=r);return e}const G=()=>s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:20,height:20,fill:"none",children:s.jsx("path",{fill:"#fff",d:"m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095ZM5 11a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"})}),J=()=>s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",children:[s.jsx("path",{fill:"#fff",d:"M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1ZM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5Z"}),s.jsx("path",{fill:"#fff",d:"M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"})]}),K=()=>s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",children:[s.jsx("path",{fill:"#fff",d:"M4.71 3.29a1.004 1.004 0 1 0-1.42 1.42l5.63 5.63a3.5 3.5 0 0 0 4.74 4.74l5.63 5.63a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095l-16-16ZM12 13.5a1.5 1.5 0 0 1-1.5-1.5v-.07l1.56 1.56-.06.01Z"}),s.jsx("path",{fill:"#fff",d:"M12.22 17c-4.3.1-7.12-3.59-8-5 .626-1 1.38-1.914 2.24-2.72L5 7.87a15.89 15.89 0 0 0-2.87 3.63 1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.48 9.48 0 0 0 3.23-.67l-1.58-1.58a7.739 7.739 0 0 1-1.7.25ZM21.87 11.5c-.64-1.11-4.17-6.68-10.14-6.5a9.48 9.48 0 0 0-3.23.67l1.58 1.58a7.74 7.74 0 0 1 1.7-.25c4.29-.11 7.11 3.59 8 5a13.699 13.699 0 0 1-2.29 2.72L19 16.13a15.89 15.89 0 0 0 2.91-3.63 1 1 0 0 0-.04-1Z"})]}),Q="_input_1sxh4_1",W="_error_1sxh4_19",X="_label_1sxh4_24",Y="_main_1sxh4_29",$="_visible_1sxh4_34",C="_inputIcon_1sxh4_42",ee="_search_1sxh4_46",se="_svgSearch_1sxh4_52",t={input:Q,error:W,label:X,main:Y,visible:$,inputIcon:C,search:ee,svgSearch:se},b=v.forwardRef(({className:a,errorMessage:r,placeholder:n,type:e,containerProps:ae,labelProps:re,label:g,onChange:h,onValueChange:f,...V},F)=>{const[x,R]=v.useState(!1),k=e==="password",O=e==="search",U=((l,B)=>l==="password"&&B?"text":l)(e,x),o={input:i(t.input,!!O&&t.svgSearch,!!r&&t.error),label:i(t.label),container:i(t.main),visible:i(t.visible)},z=l=>{h==null||h(l),f==null||f(l.target.value)};return s.jsxs("div",{className:o.container,children:[g&&s.jsx(_,{as:"label",variant:"body2",className:o.label,children:g}),s.jsxs("div",{className:t.inputIcon,children:[s.jsx("div",{className:t.search,children:e==="search"&&s.jsx(G,{})}),s.jsx("input",{className:o.input,type:U,placeholder:n,onChange:z,ref:F,...V}),k&&s.jsx("button",{className:o.visible,onClick:()=>R(l=>!l),children:x?s.jsx(K,{}):s.jsx(J,{})})]}),r&&s.jsx(_,{variant:"error",className:t.error,children:r})]})});try{b.displayName="Input",b.__docgenInfo={description:"",displayName:"Input",props:{onValueChange:{defaultValue:null,description:"",name:"onValueChange",required:!1,type:{name:"((value: string) => void)"}},containerProps:{defaultValue:null,description:"",name:"containerProps",required:!1,type:{name:"DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>"}},labelProps:{defaultValue:null,description:"",name:"labelProps",required:!1,type:{name:"DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>"}},errorMessage:{defaultValue:null,description:"",name:"errorMessage",required:!1,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}}}}}catch{}const pe={title:"Components/Input",component:b,tags:["autodocs"],argTypes:{type:{options:["text","search","password","email"],control:{type:"radio"}}}},p={args:{type:"text",label:"Input",placeholder:"input",disabled:!1}},c={args:{type:"search",label:"Input",placeholder:"input",disabled:!1}},d={args:{type:"text",label:"Input",placeholder:"input",disabled:!0}},u={args:{type:"text",errorMessage:"Error",label:"Input",placeholder:"input",disabled:!1}},m={args:{type:"password",label:"Input",placeholder:"input",disabled:!1}};var y,I,w;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: 'text',
    label: 'Input',
    placeholder: 'input',
    disabled: false
  }
}`,...(w=(I=p.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var j,M,S;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    type: 'search',
    label: 'Input',
    placeholder: 'input',
    disabled: false
  }
}`,...(S=(M=c.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};var T,L,P;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    type: 'text',
    label: 'Input',
    placeholder: 'input',
    disabled: true
  }
}`,...(P=(L=d.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var E,N,Z;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    type: 'text',
    errorMessage: 'Error',
    label: 'Input',
    placeholder: 'input',
    disabled: false
  }
}`,...(Z=(N=u.parameters)==null?void 0:N.docs)==null?void 0:Z.source}}};var H,D,q;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    type: 'password',
    label: 'Input',
    placeholder: 'input',
    disabled: false
  }
}`,...(q=(D=m.parameters)==null?void 0:D.docs)==null?void 0:q.source}}};const ce=["PrimaryInput","SearchInput","DisabledInput","ErrorInput","PasswordInput"];export{d as DisabledInput,u as ErrorInput,m as PasswordInput,p as PrimaryInput,c as SearchInput,ce as __namedExportsOrder,pe as default};
//# sourceMappingURL=input.stories-25dc746c.js.map
