var camimage;
var images = [
  "assets/img/face.jpg",
];

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();


Webcam.set({
 width: 320,
 height: 240,
 image_format: 'jpeg',
 jpeg_quality: 90
});
Webcam.attach( '#my_camera' );

<!-- Code to handle taking the snapshot and displaying it locally -->
function take_snapshot() {

// take snapshot and get image data
Webcam.snap( function(data_uri) {
 // display results in page
 document.getElementById('results').innerHTML =
 '<img src="'+data_uri+'"/>';
 } );
}


// Let's create graphemescope object inside the container
var container = $("#container");
var scope = new Graphemescope( container[0] );

var index = 0;
function changePicture() {
    scope.setImage(images[index]);
    index = (index) % images.length;
};

setInterval(changePicture, 1);
changePicture();

$(window).mousemove(function(event) {
  var factorx = event.pageX / $(window).width();
  var factory = event.pageY / $(window).height()

  // This will move kaleidoscope
  scope.angleTarget = factorx;
  scope.zoomTarget  = 0.8 + 1.4 * factory;
});

var resizeHandler = function() {
  container.height( $(window).height() );
  container.width( $(window).width() );
};

$(window).resize(resizeHandler);
$(window).resize();

container.click(changePicture);
