import{h as p,r as i,j as t}from"./index-CuX69uBB.js";import{W as c}from"./WidgetsDropdown-DZQjHqRL.js";import l from"./Transactions-Du9cvC1q.js";import n from"./DepositWithdrawals-Dq0KbcTT.js";import{C as u}from"./CAlert-nFn_1Wko.js";import"./index.esm-BCXG8y5N.js";import"./index.es-BaniHJel.js";import"./CRow-BW3UvCaF.js";import"./CCol-CG101rVw.js";import"./CCard-Dt_b82-W.js";import"./CCardBody-D_GPOYkj.js";import"./CCardHeader-BZPlW0Pq.js";import"./CForm-CBJLGoFJ.js";import"./CFormLabel-DItsnq5A.js";import"./CFormInput-BWHshRgG.js";import"./CFormControlWrapper-D-BoKUmY.js";import"./CFormControlValidation-abl2WPUS.js";import"./CButton-C40ngy0r.js";import"./DefaultLayout-lkGapq6I.js";import"./cil-user-Ddrdy7PS.js";const k=()=>{var r;const o=p(),[m,s]=i.useState(((r=o.state)==null?void 0:r.loginSuccess)||!1);return i.useEffect(()=>{var e;if((e=o.state)!=null&&e.loginSuccess){s(!0),window.history.replaceState({},document.title);const a=setTimeout(()=>{s(!1)},3e3);return()=>clearTimeout(a)}},[o]),t.jsxs(t.Fragment,{children:[m&&t.jsx(u,{color:"success",dismissible:!0,onClose:()=>s(!1),children:"Logged in successfully!"}),t.jsx(n,{}),t.jsx(c,{className:"mb-4"}),t.jsx(l,{})]})};export{k as default};
