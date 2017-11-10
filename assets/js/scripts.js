var camimage;
var images = [
  "http://media-cache-ak0.pinimg.com/736x/5d/d8/41/5dd8416cbae27edeac61aa525a5df99d.jpg",
];

function take_snapshot() {
  // take snapshot and get image data
  Webcam.snap( function(data_uri) {
    // assign webcam snap to camimage
    var camimage = data_uri;
    images.unshift(camimage);
  } );
}

// Let's create graphemescope object inside the container
var container = $("#container");
var scope = new Graphemescope( container[0] );

var index = 0;
function changePicture() {
    scope.setImage(images[index]);
    index = (index + 1) % images.length;
};

setInterval(changePicture, 5000);
changePicture();

$(window).mousemove(function(event) {
  var factorx = event.pageX / $(window).width();
  var factory = event.pageY / $(window).height()

  // This will move kaleidoscope
  scope.angleTarget = factorx;
  scope.zoomTarget  = 1.0 + 0.5 * factory;
});


var resizeHandler = function() {
  container.height( $(window).height() );
  container.width( $(window).width() );
};

$(window).resize(resizeHandler);
$(window).resize();

container.click(changePicture);
