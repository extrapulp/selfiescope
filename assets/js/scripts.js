var camimage;
var images = [
  "assets/img/jake.jpg",
];

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function take_snapshot() {
  // turn on camera flash
  $('body').addClass('flash-on');
  Webcam.snap( function(data_uri) {
    // assign webcam snap to camimage
    var camimage = data_uri;
    // add image to images array
    images.unshift(camimage);
    // turn off camera flash
    delay(function(){
    $('body').removeClass('flash-on');
  }, 200 ); // end delay
  } );
}

$(window).keypress(function(e) {
    if (e.which === 32) {
      take_snapshot();
    }
});

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
  scope.zoomTarget  = 1.0 + 0.5 * factory;
});

var resizeHandler = function() {
  container.height( $(window).height() );
  container.width( $(window).width() );
};

$(window).resize(resizeHandler);
$(window).resize();

container.click(changePicture);
