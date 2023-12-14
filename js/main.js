var productName= document.getElementById("productName");
var productPrice= document.getElementById("productPrice");
var productCategory= document.getElementById("productCategory");
var productDescription= document.getElementById("productDescription");
var myBody=document.getElementById("myBody");
var myBtn=document.getElementById("myBtn");
var searchInput=document.getElementById("searchInput");
var nameErorr=document.getElementById("nameErorr")
var priceErorr=document.getElementById("priceErorr")
var categoryErorr=document.getElementById("categoryErorr")
var descriptionErorr=document.getElementById("descriptionErorr")



var productList;
var updatedIndex;


if(localStorage.getItem("productList")){
   productList = JSON.parse(localStorage.getItem("productList"));
   displayproduct(productList);
}else{
   productList=[];
}
function addProduct(){
   if(myBtn.innerHTML ==="Add Product"){
      if(productNameValidation() && priceValidation()&& categoryValidation()&& descripthionValidation()){
         var procuct={
            name:productName.value,
            price:productPrice.value,
            cat:productCategory.value,
            desc:productDescription.value,
         }
        productList.push(procuct);
      }else{
         console.log("validation error");
      }
   }else if(myBtn.innerHTML ==="Update Product"){
      productList[updatedIndex].name=productName.value;
      productList[updatedIndex].price=productPrice.value;
      productList[updatedIndex].cat=productCategory.value;
      myBtn.innerHTML="Add Product";   productList[updatedIndex].desc=productDescription.value;
      
   }

   saveToLocalStorage();
   displayproduct(productList);
   clearInputs();

}
function displayproduct(pList, searchTerm){
   if(pList.length === 0){
      myBody.innerHTML =`<tr>
      <td colspan="7">
      <div class="alert alert-danger">No Match Founde</div></td>
      </tr>` ;

   }else{
 var cartoona="";
 for(var i=0; i < pList.length ;i++){
    cartoona += `
    <tr >
    <td >${i+1}</td>
    <td>${searchTerm? pList[i].name.toUpperCase().replace(searchTerm.toUpperCase(), `<span class="text-warning fw-bold" style="font-size:25px">${searchTerm}</span>`):pList[i].name}</td>
    <td>${pList[i].price}</td>
    <td>${pList[i].cat}</td>
    <td>${pList[i].desc}</td>
    <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
    <td><button  onclick="deletProduct(${i})" class="btn btn-danger">Delete</button></td>
  </tr> `
 }
 myBody.innerHTML = cartoona;
   }
}
function clearInputs(){
   productName.value="";
   productPrice.value="";
   productCategory.value="";
   productDescription.value="";
}
function deletProduct(index){
productList.splice(index ,1);
saveToLocalStorage();
displayproduct(productList);
}

function saveToLocalStorage(){
   localStorage.setItem("productList" ,JSON.stringify(productList));
}
function updateProduct(index){
   updatedIndex=index;

   productName.value=productList[index].name;
   productPrice.value=productList[index].price;
   productCategory.value=productList[index].cat;
   productDescription.value=productList[index].desc;
   myBtn.innerHTML="Update Product";
 
}



function searchProduct(){
   var term =searchInput.value;
   var searchList=[];
   for(var i =0;i<productList.length;i++){
if(productList[i].name.toLowerCase().includes(term.toLowerCase())){
   searchList.push(productList[i]);


   // here i wanna change the bg for tr when our user write any character ...
   // var back=document.querySelector("#searchInput");
   // back.addEventListener("contextmenu",function(){
   //    searchList.style.background ="#000";})

}
   }
   displayproduct(searchList,term)
}

function productNameValidation(){
   var regex=/^[A-Z][a-z]{3,8}$/;
   if(regex.test(productName.value)=== true){
      nameErorr.classList.replace("d-block", "d-none");
      productName.classList.add("is-valid");
      productName.classList.remove("is-invalid");
      return true;
   }else{
      nameErorr.classList.replace("d-none", "d-block");
      productName.classList.add("is-invalid");
      productName.classList.remove("is-valid");
      return false;
   }
}

function priceValidation(){
   var numberRegex=/^[1-4]\d{4}|50000$/;
   if(numberRegex.test(productPrice.value)=== true){
      priceErorr.classList.replace("d-block", "d-none");
      productPrice.classList.add("is-valid");
      productPrice.classList.remove("is-invalid");
      return true;
   }else{
      priceErorr.classList.replace("d-none", "d-block");
      productPrice.classList.add("is-invalid");
      productPrice.classList.remove("is-valid");
      return false;
   }
}






function categoryValidation(){
   var catRegex=/^(tv|phone|laptop)$/;
      if(catRegex.test(productCategory.value)=== true){
         categoryErorr.classList.replace("d-block", "d-none");
         productCategory.classList.add("is-valid");
         productCategory.classList.remove("is-invalid");
         return true;
      }else{
         categoryErorr.classList.replace("d-none", "d-block");
         productCategory.classList.add("is-invalid");
         productCategory.classList.remove("is-valid");
         return false;
      }
   }


   // desc 100 chracters

function descripthionValidation(){
   var descRegex=/^\w{5,100}$/;
      if(descRegex.test(productDescription.value)=== true){
         descriptionErorr.classList.replace("d-block", "d-none");
         productDescription.classList.add("is-valid");
         productDescription.classList.remove("is-invalid");
         return true;
      }else{
         descriptionErorr.classList.replace("d-none", "d-block");
         productDescription.classList.add("is-invalid");
         productDescription.classList.remove("is-valid");
         return false;
      }
   }
