import{h as p,r as i,j as t}from"./index-BUHiSks5.js";import{W as c}from"./WidgetsDropdown-wCyKc_-I.js";import l from"./Transactions-DyLl-u_M.js";import n from"./DepositWithdrawals-BMGUIUQm.js";import{C as u}from"./CAlert-CTbIAuDy.js";import"./index.esm-C7kpwd8H.js";import"./index.es-DVYW0ST3.js";import"./CRow-DljQZU6U.js";import"./CCol-DO85enid.js";import"./CCard-D9EUxED2.js";import"./CCardBody-DKvYyKEB.js";import"./DefaultLayout-LU-WCHrn.js";import"./CButton-DDz5axwT.js";import"./cil-user-Ddrdy7PS.js";import"./cil-options-sHCm5Gxk.js";import"./CCardHeader-9vWztb1B.js";import"./CForm-BUmRgtEy.js";import"./CFormLabel-DjItT4Mr.js";import"./CFormInput-B5A_xWaM.js";import"./CFormControlWrapper-DXQjwkcC.js";import"./CFormControlValidation-D1flXl5Q.js";const q=()=>{var r;const o=p(),[m,s]=i.useState(((r=o.state)==null?void 0:r.loginSuccess)||!1);return i.useEffect(()=>{var e;if((e=o.state)!=null&&e.loginSuccess){s(!0),window.history.replaceState({},document.title);const a=setTimeout(()=>{s(!1)},3e3);return()=>clearTimeout(a)}},[o]),t.jsxs(t.Fragment,{children:[m&&t.jsx(u,{color:"success",dismissible:!0,onClose:()=>s(!1),children:"Logged in successfully!"}),t.jsx(n,{}),t.jsx(c,{className:"mb-4"}),t.jsx(l,{})]})};export{q as default};
