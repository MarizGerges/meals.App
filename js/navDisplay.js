function displaynavBar() {
let w=$('#options').innerWidth();
$('#navBar').css({'left':`0px`});
$('#options').css({'left':`-${w}px`});

$('.fa-bars').click(function () { 

    if($('#options').css('left')=='0px'){
        $('#options').animate({'left':`-${w}px`},500);
        $('#navBar').animate({'left':`0px`},500);
    }
    else{
        $('#options').animate({'left':`0px`},500);
        $('#navBar').animate({'left':`${w}px`},500);
    } 
    
    if($('#navOptions').attr('class')=='fa-solid fa-x'){

        $('#navOptions').attr('class', 'fa-solid fa-bars');
    }
    else{
        $('#navOptions').attr('class', 'fa-solid fa-x');

    }
});
}

displaynavBar();

$('nav li').click(function (e) { 
    if(e.target.innerText=='Search'){
        window.open('searchPage.html','_self');
    }
    if(e.target.innerText=='Categories'){
        window.open('Categories.html','_self');
    }
    if(e.target.innerText=='Area'){
        window.open('area.html','_self');
    }
    if(e.target.innerText=='Ingredients'){
        window.open('Ingredients.html','_self');
    }
    if(e.target.innerText=='Contact Us'){
        window.open('contact.html','_self');
    }
    
});

$(document).ready(function () {
    $('#loading').fadeOut(1300);
});