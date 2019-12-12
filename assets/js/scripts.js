// Prints media devices to console.
navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
  });
})


.catch(function(err) {
  console.log(err.name + ": " + err.message);
});

var deviceID = MediaDeviceInfo.deviceId
var camimage;
var images = [
  "assets/img/face4.jpg",
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
    document.getElementById('img-results').innerHTML =
    '<img id="captured-image" src="'+camimage+'"/>';
    images.unshift(camimage);
    // turn off camera flash
    delay(function(){
    $('body').removeClass('flash-on');
  }, 200 ); // end delay
  } );
}



function saveSnap(){
 // Get base64 value from <img id='captured-image'> source
 var base64image = document.getElementById("captured-image").src;
   Webcam.upload( base64image, '/upload.php', function(code, text) {
    console.log('Save successfully');
    //console.log(text);
   });
  }
$(window).keypress(function(e) {
    if (e.which === 32) {
      take_snapshot();
    }
});

  $("#fieldNext").click(function() {
      if($('#videoSource option:selected').next().length>0)
      $('#videoSource option:selected').next().attr('selected', 'selected').trigger('change');
      else $('#videoSource option').first().attr('selected', 'selected').trigger('change');
  });

  $(window).keypress(function(e) {
      if (e.which === 51) {
        if($('#videoSource option:selected').next().length>0)
        $('#videoSource option:selected').next().attr('selected', 'selected').trigger('change');
        else $('#videoSource option').first().attr('selected', 'selected').trigger('change');
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
  scope.zoomTarget  = 0.8 + 1.4 * factory;
});

var resizeHandler = function() {
  container.height( $(window).height() );
  container.width( $(window).width() );
};

$(window).resize(resizeHandler);
$(window).resize();

container.click(changePicture);
