img="";
object= [];
Status="";
alarm="";
function preload(){
img=loadImage("dog_cat.jpg");
alarm=loadSound("mixkit-classic-alarm-995.wav");

}

function setup(){
canvas=createCanvas(380,380)
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector=ml5.objectDetector("cocoSSD",modelLoaded)
document.getElementById("status").innerHTML="Status:detecting object";

}

function draw(){

image(video,0,0,380,380);
if( Status!=""){
objectDetector.detect(video,getResults);
r=random(255);
g=random(255);
b=random(255);
for(var i=0; i<object.length;i++){
    document.getElementById("number_of_objects").innerHTML="Number of objects detected is: "+object.length;
    fill(r,g,b);
    stroke(r,g,b);
    accuracy=floor(object[i].confidence*100);
    text(object[i].label+" "+accuracy+"%",object[i].x,object[i].y);
    noFill();
    rect(object[i].x, object[i].y, object[i].width, object[i].height);
    document.getElementById("status").innerHTML="object detected"; 
    if(object[i].label=="person"){
        document.getElementById("number_of_objects").innerHTML="baby found";
        alarm.stop();

    }
    else{
        document.getElementById("number_of_objects").innerHTML="baby not found";
        alarm.play();
    }
    if(object.length==0){
        document.getElementById("number_of_objects").innerHTML="baby not found";
        alarm.play();


    }



    
}
}



}

function modelLoaded(){
    console.log("model is loaded");
    Status=true;
   
}

function getResults(error,results){
    if(error){
        console.log(error);

        
    }
    else{
        console.log(results);
        object=results;
    }
}