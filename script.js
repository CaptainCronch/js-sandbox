
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

const web_api_url = "https://api.open-meteo.com/v1/forecast?latitude=40.39&longitude=-111.85&hourly=temperature_2m&temperature_unit=fahrenheit&forecast_days=1&timezone=auto"
let api_result

fetch(web_api_url)
.then((x) => x.json())
.then((y) => $("#temperature").text(Math.floor(y.hourly.temperature_2m[0] + 459.67)))

let timer = 0
let timing = false
let words = 0
$(".counter textarea").on("keydown", function(event) {
    if (event.key != " ") {return}
    if (!timing) {
        timing = true
        setTimeout(function() {
            $("#wpm").text(words*4)
            timing = false
        }, 15000)
    }
    words++
})

$("body").on("keyup", function(key) {
    if (key.key == "Escape") {
        $(".color-box").each(function() {
            $(this).remove()
        })
        clearInterval(hold_id)
        z_index = 0
    }
    if (key.key == "q") {
        velocity[1] *= 1.2
    }
    if (key.key == "e") {
        velocity[1] *= 0.8
    }
})

let hold_id
function onSolitaire() {
    translation = [0, 0]
    velocity = [0, 0]

    if (isNaN(parseFloat($("#solitaire-speed").val()))) {
        push_force = 15
    } else {push_force = parseFloat($("#solitaire-speed").val())}

    if (isNaN(parseFloat($("#solitaire-gravity").val()))) {
        gravity = 5
    } else {gravity = parseFloat($("#solitaire-gravity").val())}

    hold_id = setInterval(hold_mouse, 10)
}

let z_index = 0
let translation = [0, 0]
let velocity = [0, 0]
let gravity = 10
let push_force = 15
function hold_mouse(){
    let color = "red"
    switch (getRandomInt(0, 10)) {
        case 0: color = "blue"; break;
        case 1: color = "green"; break;
        case 2: color = "yellow"; break;
        case 3: color = "orange"; break;
        case 4: color = "red"; break;
        case 5: color = "purple"; break;
        case 6: color = "indigo"; break;
        case 7: color = "cyan"; break;
        case 8: color = "magenta"; break;
        case 9: color = "aquamarine"; break;
        default: color = "chucknorris";
    }
    //let random_height = getRandomInt(0, window.innerHeight - 50)
    //let random_width = getRandomInt(0, window.innerWidth - 50)

    velocity[1] += gravity
    velocity[0] = push_force
    
    translation[0] += velocity[0]
    translation[1] += velocity[1]

    if (translation[1] >= window.innerHeight - 50){
        velocity[1] *= -1.05
    }

    if (translation[0] >= window.innerWidth - 50 || translation[0] <= 0){
        push_force *= -1
    }

    $("#calendar").after(`<div class="color-box" style="height:50px;width:50px;background-color:${color};position:fixed;z-index:${z_index};top:${translation[1]}px;left:${translation[0]}px;"></div>`)
    z_index ++

    $("#position-x").text(Math.round(translation[0]))
    $("#position-y").text(Math.round(translation[1]))
    $("#velocity-x").text(Math.round(velocity[0]))
    $("#velocity-y").text(Math.round(velocity[1]))
    $("#squares").text(z_index)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
} // The maximum is exclusive and the minimum is inclusive


