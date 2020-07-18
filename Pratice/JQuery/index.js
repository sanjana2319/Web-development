//  $("h1").addClass("big-title margin-50");
// $("h1").text("Bye");
// $("button").text("Dont Click Me");
// $("button").html("<em>Hey</em>");

// console.log($("img").attr("src"));

// $("a").attr("href", "http://www.yahoo.com");

// $("h1").click(function(){
//     $("h1").css("color", "purple");
// });

// for(var i=0; i<5; i++){
//     document.querySelectorAll("button")[i].addEventListener("click", function(){
//         document.querySelector("h1").style.color = "purple";
//     });
// }

// $("button").click(function(){
//     $("h1").addClass("big-title margin-50");
// });

// $(document).keypress(function(event){
//     $("h1").text(event.key);
// });

// $("h1").on("mouseover", function(){
//     $("h1").css("color", "purple");
// });

$("button").on("click", function(){
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});

