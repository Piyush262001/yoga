
let capture;
let posenet;
let noseX,noseY;
let singlePose,skeleton;
let yogaimg;
let brain;
let state = 'waiting';
let targetLabel;

function keypressed(){
    targetLabel = key;
    console.log(targetLabel);
    setTimeout(function(){
        console.log('collecting');
        state='collecting';
    },10000);
   
}
function setup() {
  createCanvas(640, 480);
 capture= createVideo(VIDEO);

  capture.hide();
   
  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on('pose',recievedPoses);
  let options = {
      inputs : 34,
      outputs : 4,
      task : 'classification',
      debug : true
  }

  brain=ml5.neuralNetwork(options);
}

function recievedPoses(poses){
    console.log(poses);
    if(poses.length>0)
    {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
    
}
function modelLoaded(){
    console.log('Model has loaded');
}

function draw() {
  translate(capture.width,0);
  scale(-1,1);
  image(capture, 0, 0,capture.width,capture.height);
  fill(255,0,0);
  if(singlePose){
    for(let i=0; i<singlePose.keypoints.length; i++){
        if(singlePose.keypoints[i].score>=0.5)
        {ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,20);
        }
    }
    stroke(255,255,255);
        strokeWeight(5);
        for(let j=0; j<skeleton.length; j++){
            if(skeleton[j][0].score>=0.1 && skeleton[j][1].score>=0.1)
            {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);

            }

        }
      
}
}
