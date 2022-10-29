let myCategories=document.getElementById('myCategories');
let myCategory=[];

async function getAPI() {
    let result= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    myCategory= await result.json();
    console.log(myCategory.categories.length);
    displayData();
}
getAPI();
function displayData(){
    let temp=``;
    // console.log(myCategory.categories[0].strCategoryThumb)
    for (let i = 0; i <myCategory.categories.length; i++) {
        temp+=`<div class="col-lg-3 col-md-6" >
        <div class="bg-white position-relative meal rounded-3 ">
          <img src=${myCategory.categories[i].strCategoryThumb} alt="" class="w-100 bg-black ">
          <div class="imgOverlay w-100 h-100 d-flex justify-content-center align-items-center flex-column" >
            <h2 class="lead fs-1 p-2">${myCategory.categories[i].strCategory}</h2>
            <p class="p-2">${myCategory.categories[i].strCategoryDescription.substring(0,100)}</p>

          </div>
        </div>
    
</div> `
        
    }
    myCategories.innerHTML=temp;
}

function displayCtiDes(){
    document.addEventListener('click',async function(e) {
        let categoryinfo=[];
        let temp='';
        let CategoryName=e.target.innerText;
        let result= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategoryName}`)
        categoryinfo= await result.json();
        for (let i = 0; i <categoryinfo.meals.length; i++) {
            temp+=`<div class="col-lg-3 col-md-6" >
            <div class="bg-white position-relative meal rounded-3 ">
              <img src=${categoryinfo.meals[i].strMealThumb} alt="" class="w-100 bg-black ">
              <div class="imgOverlay w-100 h-100 d-flex justify-content-center align-items-center ">
                <h2 class="lead fs-1">${categoryinfo.meals[i].strMeal}</h2>

              </div>
            </div>
            </div> `
        }
        myCategories.innerHTML=temp;
        $('.meal').click(function (e) { 
            showMealDesc();
            
        });
        
    })
}
displayCtiDes();


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
        let myHome=window.open('Categories.html','_self');
        myHome.document.write(`<head>
        <title>${currentMeal.meals[0].strMeal}</title>
        <link rel="stylesheet" href="css/all.min.css" type="text/css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css">
      </head>
      <body class="d-flex">
      <nav class="d-flex">
      <div class=" text-white d-flex flex-column position-fixed bg-black h-100"
        id="options">
        <ul>
          <li>Search</li>
          <li> Categories</li>
          <li> Area</li>
          <li>Ingredients</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div class="bg-white d-flex flex-column justify-content-between
        align-items-center position-fixed" id="navBar">
        <img src="img/logo.png" alt="logo">
        <i class="fa-solid fa-bars "></i>
        <div class="d-flex flex-column ">
          <i class="fa-solid fa-globe"></i>
          <i class="fa-solid fa-share-nodes"></i>
        </div>
      </div>
    </nav>

        <section class="p-5 m-5 container mx-auto text-white">
            <div class="row px-md-5 m-auto gy-5" id="posts" >
             <div class="col-md-4">
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
             </div>
            </div>
          </section>
    <script src="js/jquery-3.6.1.min.js"></script>
          <script src="js/navDisplay.js"></script>
      </body>`)
    }
});
}
// showMealDesc();


