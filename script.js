

let time = document.querySelector("input[name='time']").value;
let submit = document.querySelector("input[type='submit']");

function onClick() {
    time = document.querySelector("input[name='time']").value;
    
    time = Number.parseInt(time.slice(0, 2))
  
    if (time <= 12) {time = "Good Morning"}
    else if (time <= 16) {time = "Good Afternoon"}
    else if (time <= 19) {time = "Good Evening"}
    else {time = "Good Night"}

    $("#result").text("hello mr " + time)

    return false
}

$(document).ready(onPageLoad)

function onPageLoad() {
    let date = new Date()
    let today = date.getDate()
    const options = { month: "long" };
    let date_format = new Intl.DateTimeFormat("en-US", options)

    $("#current").text(date.getFullYear())
    
    $("#calendar-title").text(date_format.format(date))

    console.log(date)
    let offset = new Date(date.setDate(1))
    offset = offset.getDay() - 1

    let last_of_month = new Date()
    console.log(last_of_month)
    last_of_month.setMonth(last_of_month.getMonth() + 1)
    console.log(last_of_month)
    last_of_month.setDate(0)
    console.log(last_of_month)
    last_of_month = last_of_month.getDate()
    console.log(last_of_month)


    $("td").each(function(index) {
        if (index - offset >= 1 && index - offset <= last_of_month){
            $(this).text(index - offset)
            if (index - offset == today) {
                $(this).css({"color": "red", "background-color": "white",})
                $(this).on("click", function() {
                    //window.alert("thats today! :D")
                    $("body").prepend(`<div id='walmart' style='display:flex;flex-flow:row wrap'></div>`)
                    var i = 99
                    while(true){
                        i *= i
                        console.log(i)
                        $("#walmart").append("<a href='https://www.walmart.com'>:</a>")
                    }
                })
            }
        }
    })
}
