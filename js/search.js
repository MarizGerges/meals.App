$('#SName , #LName').on('keyup', function() { 
    let SName=document.getElementById('SName').value;
    let LName=document.getElementById('LName').value;
    if(SName!=""){
    getAPI(SName);

    }
    if(LName!=""){
        getAPIfirstLatter(LName);
    
        }
    
});

let posts=document.getElementById('posts')
let singlMeal=document.getElementById('singlMeal');

var meal = [];
async function getAPI(searchName) {
    let result= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`);
    meal= await result.json();
    displayData();

}
async function getAPIfirstLatter(firstLatter) {
    let result= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLatter}`);
    meal= await result.json();
    displayData();

}

function displayData(){
    let temp=``;
    for (let i = 0; i <meal.meals.length; i++) {
        temp+=`<div class="col-lg-3 col-md-6" >
        <div class="bg-white position-relative meal rounded-3 ">
          <img src=${meal.meals[i].strMealThumb} alt="" class="w-100 ">
          <div class="imgOverlay w-100 h-100 d-flex justify-content-center align-items-center ">
            <h2 class="lead fs-1">${meal.meals[i].strMeal}</h2>
          </div>
        </div>
    
</div> `
        
    }
    posts.innerHTML=temp;
}
async function getMeal(mealName) {

    let mealDesc=[];
    let result= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
     mealDesc= await result.json();
      return mealDesc;
}
function showMealDesc(){
    let recipeList=[];
    let temp4=``;
document.addEventListener('click',async function(e) {
    if((e.target).classList.contains('imgOverlay')||(e.target).classList.contains('lead')) {
        let mealName=e.target.innerText;
        let currentMeal=await getMeal(mealName);
        for (let i = 1; i <= 20; i++) {
           let temp1=`currentMeal.meals[0].strIngredient`+i
           let temp2=`currentMeal.meals[0].strMeasure`+i
           if(eval(temp1)!='' && eval(temp2)!='')
           {
            let temp3=eval(temp2) + ' '+eval(temp1);
            recipeList.push(temp3);
           } 
        }
        for (let i = 0; i < recipeList.length; i++) {
             temp4+=`<span class=" p-2 rounded-2 my-3 mx-2 recipeSpan">${recipeList[i]}</span>`;
        }
        $("#posts").html(`<div class="col-md-4">
        <div>
            <img src=${currentMeal.meals[0].strMealThumb} alt="" class="w-100">
            <h2>${currentMeal.meals[0].strMeal}</h2>
        </div>
     </div>
     <div class="col-md-8">
        <div>
            <h2>Instructions</h2>
            <p>${currentMeal.meals[0].strInstructions}</p>
            <p>Area :<span>${currentMeal.meals[0].strArea}</span></p>
            <p>Category :<span>${currentMeal.meals[0].strCategory}</span></p>
            <h2>Recipes :</h2>
            <div class="d-flex flex-wrap " id="recipes">${temp4}
            </div>
            <h2>Tags :</h2>
            <div class="d-flex flex-wrap tags">
              <span class=" p-2 rounded-2 my-3 mx-2">${currentMeal.meals[0].strTags}</span>
            </div>
            <div class="d-flex flex-wrap">
            <button type="button" class="btn btn-success  my-3 mx-2"><a href=${currentMeal.meals[0].strSource} target="blank">Source</a></button>
            <button type="button" class="btn btn-danger  my-3 mx-2"><a href=${currentMeal.meals[0].strYoutube} target="blank">YouTube</a></button>
            </div>
          </div>
     </div>`);
    }
})
}
showMealDesc();