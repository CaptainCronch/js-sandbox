
function onDeath() {
    $("*").toggleClass("death")
}

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

    let offset = new Date(date.setDate(1))
    offset = offset.getDay() - 1

    let last_of_month = new Date()
    last_of_month.setMonth(last_of_month.getMonth() + 1)
    last_of_month.setDate(0)
    last_of_month = last_of_month.getDate()


    $("td").each(function(index) {
        if (index - offset >= 1 && index - offset <= last_of_month){
            $(this).text(index - offset)
            if (index - offset == today) {
                $(this).css({"color": "red", "background-color": "white",})
                $(this).on("click", function() {
                    //window.alert("thats today! :D")
                    $("body").prepend(`<div id='walmart' style='display:flex;flex-flow:row wrap'></div>`)
                    $("8").attr("href", "https://www.walmart.com")
                    let i = 99
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


function onGenerate() {
    let values = []
    $(".stock-input").each((index) => {
        let value = Number.parseInt($(".stock-input").eq(index).val())
        values[index] = value
        $(".bar").eq(index).css("height", value + 10 + "px")
    })

    let min_value = Math.max(...values)
    let max_value = Math.min(...values)

    if (checkDuplicates(values, min_value)) {
        $(".chart-label").eq(values.indexOf(min_value)).css("color", "red")
    }

    if (checkDuplicates(values, max_value)) {
        $(".chart-label").eq(values.indexOf(max_value)).css("color", "blue")
    }

    return false
}


// if it finds a value matching the max/min
// that has a higher index than the first one found, then don't apply color
function checkDuplicates(array, clamp) {
    let broke = false
    array.some((value, index) => {
        if (value == clamp) {
            if (index > array.indexOf(clamp)) {
                broke = true
            }
        }
    })

    if (broke) {
        return false
    }
    return true
}

function onPrime() {
    let prime_inquiry = Math.abs($("#prime").val())
    let range = [...Array(prime_inquiry).keys()]
    range.shift()
    range.shift() // removes 0 and 1 from the beginning

    for (number in range) {
        if (prime_inquiry % range[number] == 0){
            $("#prime-result").text("this looks like a not prime to me")
            return false
        }
    }
    $("#prime-result").text("this looks like a prime to me")
    return false
}

let comment_number = 0
function onComment() {
    let handle = $("#username").val()
    let body = $("#comment-body").val()
    let time = new Date()
    let comment_time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "." + time.getMilliseconds()

    $(".comment-section").prepend(`
    <div class="comment" id="comment-${comment_number}">
        <button class="options-button">cog icon
            <div class="dropdown">
                <div class="option delete">delete</div>
                <div class="option move-up">move up</div>
                <div class="option move-down">move down</div>
                <div class="time">${comment_time}</div>
            </div>
        </button>
        <img src="person-circle.svg" alt="user-profile">
        <h3>@${handle}</h3>
        <p>${body}</p>
    </div>`)

    $(`#comment-${comment_number}`).children().find(".delete").on("click", function() {
        $(this).parents(".comment").remove()
    });

    $(`#comment-${comment_number}`).children().find(".move-up").on("click", function() {
        let stored_comment = $(this).parents(".comment").html() //only gets contents, fix this to return the entire element
        let top_sibling = $(this).siblings(`#comment-${comment_number + 1}`)
        $(this).parents(".comment").remove()
        $(top_sibling).prepend(stored_comment)

    });

    $(`#comment-${comment_number}`).children().find(".move-down").on("click", function() {
        
    });

    comment_number++
}

const API_key = "907b60d0367cd5b6747a6726e1b03ccb"
const web_api_url = "https://www.api.openweathermap.org/data/2.5/weather?lat=40.39162&lon=-111.85077&appid=" + API_key + "&units=imperial"
let api_result

fetch(web_api_url, {mode: 'no-cors'})
.then((x) => x.json())
.then((y) => $("#temperature").text(toString(y.main.temp)))
