video = "";
status = "";
alarm = "";
objects = [];

function preload(){
        alarm = loadSound("alarm.mp3");
}
function setup(){
    canvas = createCanvas(500,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("detection").innerHTML = " : Detecting Object";
}
function draw(){
    image(video,0,0,500,350);
    if(status != ""){
        objectDetector.detect(video,got_results);
        document.getElementById("detection").innerHTML = " : Object Detected";
        document.getElementById("found").innerHTML = "<h3 class='button' >Baby Found</h3>";
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0 ; i < objects.length ; i++ ){
            fill(r,g,b);
            stroke(r,g,b);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%",objects[i].x,objects[i].y - 10);
            textSize(20)
            noFill();
            rect(objects[i].x - 50,objects[i].y - 10,objects[i].width - 200,objects[i].height - 150);
        }
    }
    if(status == ""){
        if(objects[i].label != "person")
        document.getElementById("found").innerHTML = "<h3 class='button' >Baby Not Found</h3>";
        alarm.play();
    }
}
function model_loaded(){
    console.log("Model is loaded!");
    status = true;
}
function got_results(error,results){
    if(error){
        console.error("Error");
    }
    else if(results){
        objects = results;
    }
}
