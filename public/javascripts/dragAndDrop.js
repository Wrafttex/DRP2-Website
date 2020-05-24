// Event is executed on the drag target, getting the information from the selected picture 
document.ondragstart = function(event) {
    event.dataTransfer.setData("Text", event.target.id);
};

// When dragging around with the picture, prevent default from happening.
// If you for example had preventDefault on a "submit" button, it would  
// prevent it from submitting the default action   
document.ondragover = function(event) {
    event.preventDefault();
};

// The executed events information from ondragstart is being submitted 
// on the drop destination. Hence the picture data is placed in the new 
// placement
document.ondrop = function(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
};