import{r as t,R as F,j as e,F as r,v as n,C as W}from"./index-BUHiSks5.js";import{C as k}from"./CCard-D9EUxED2.js";import{C as M}from"./CCardHeader-9vWztb1B.js";var B={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"]},V=B,p={prefix:"fas",iconName:"arrow-right",icon:[448,512,[8594],"f061","M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},G={prefix:"fas",iconName:"arrow-left",icon:[448,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},_={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},O={prefix:"fas",iconName:"arrow-up",icon:[384,512,[8593],"f062","M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"]};const i=c=>{const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1,timeZoneName:"short"};return c.toLocaleString("en-US",o).replace(",","")},J=()=>{const[c,o]=t.useState([]),[U,f]=t.useState(i(new Date)),[g,l]=t.useState(!1),d=async()=>{l(!0);const s=localStorage.getItem("token");try{const a=await fetch("https://api.staging.k8s.isypay.net/api/user-transfers?page=0&size=20&sort=createdDate%2Cdesc",{method:"GET",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"}});if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);const m=await a.json();o(m),console.log("Data fetched successfully:",m)}catch(a){console.error("Fetching data error:",a)}finally{l(!1)}};t.useEffect(()=>{d();const s=setInterval(()=>{f(i(new Date))},1e3);return()=>clearInterval(s)},[]);const u=()=>{console.log("Refreshing data..."),d()},h=F.useMemo(()=>[{Header:"Users",columns:[{Header:"First Name",accessor:"user.firstName"},{Header:"Last Name",accessor:"user.lastName"},{Header:"Phone Number",accessor:"user.phoneNumber"}]},{Header:"Amount",accessor:"amount"},{Header:"Fee",accessor:"fee"},{Header:"Transfer Type",accessor:"transferType",Cell:({value:s})=>e.jsxs("span",{className:`status ${b(s)}`,children:[s," ",j(s)]})},{Header:"Created Date",accessor:"createdDate",Cell:({value:s})=>i(new Date(s))}],[]),x={WITHDRAW:p,ACCEPT_WITHDRAW:O,ACCEPT_DEPOSIT:_},j=s=>{const a=x[s];return a&&e.jsx(r,{icon:a,className:"ml-1"})},b=s=>{switch(s){case"WITHDRAW":return"text-danger";case"ACCEPT_WITHDRAW":return"text-success";case"ACCEPT_DEPOSIT":return"text-primary";default:return""}},{getTableProps:C,getTableBodyProps:N,headerGroups:T,prepareRow:y,page:v,nextPage:w,previousPage:P,canNextPage:H,canPreviousPage:D,pageOptions:L,state:S,setGlobalFilter:A,setPageSize:I}=n.useTable({columns:h,data:c,initialState:{pageIndex:0}},n.useGlobalFilter,n.useSortBy,n.usePagination),{globalFilter:R,pageIndex:E,pageSize:z}=S;return e.jsx(e.Fragment,{children:e.jsxs(k,{className:"mb-4",children:[e.jsxs(M,{className:"d-flex justify-content-between align-items-center",children:[e.jsx("h5",{children:"Transactions"}),e.jsx("button",{onClick:u,className:"btn btn-info",children:e.jsx(r,{icon:V})})]}),g?e.jsx("div",{className:"text-center mt-5",children:e.jsx(W,{color:"primary"})}):e.jsxs("div",{className:"table-responsive",style:{marginTop:"10px"},children:[e.jsx("input",{value:R||"",onChange:s=>A(s.target.value),placeholder:"Search transactions...",className:"form-control mb-2"}),e.jsxs("table",{...C(),className:"table table-bordered table-striped",children:[e.jsx("thead",{children:T.map(s=>e.jsx("tr",{...s.getHeaderGroupProps(),children:s.headers.map(a=>e.jsx("th",{...a.getHeaderProps(a.getSortByToggleProps()),className:a.isSorted?a.isSortedDesc?"sort-desc":"sort-asc":"",children:a.render("Header")}))}))}),e.jsx("tbody",{...N(),children:v.map(s=>(y(s),e.jsx("tr",{...s.getRowProps(),children:s.cells.map(a=>e.jsx("td",{...a.getCellProps(),className:"align-middle",children:a.render("Cell")}))})))})]})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[e.jsxs("div",{children:[e.jsx("button",{onClick:()=>P(),disabled:!D,className:"btn btn-info mr-2",style:{marginLeft:"10px"},children:e.jsx(r,{icon:G})}),e.jsx("button",{onClick:()=>w(),disabled:!H,className:"btn btn-info",style:{marginLeft:"15px"},children:e.jsx(r,{icon:p})})]}),e.jsxs("div",{style:{marginRight:"10px",marginBottom:"10px"},children:[e.jsxs("span",{className:"mr-2",children:["Page ",E+1," of ",L.length]}),e.jsx("select",{value:z,onChange:s=>{console.log("Selected page size:",s.target.value),I(Number(s.target.value))},className:"form-control",children:[10,20,30,40,50].map(s=>e.jsx("option",{value:s,children:s},s))})]})]})]})})};export{J as default};