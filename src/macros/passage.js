$(document).ready(function() {
    // Get the initial position of the container when the page renders
    const artContainer = $(`#art`);
    let containerOffset = artContainer.offset().top;
    let scrollTop = $(window).scrollTop();
    let adjustedPosition = containerOffset + scrollTop;

    // Update the background position based on scroll
    artContainer.css('background-position', `center ${adjustedPosition}px`);

    $(window).on('scroll', function() {
        let containerOffset = artContainer.offset().top;
        let scrollTop = $(window).scrollTop();
        let adjustedPosition = containerOffset + scrollTop;
        
        // Update the background position based on scroll
        artContainer.css('background-position', `center ${adjustedPosition}px`);
    });
});

// <<art "url">> macro to set the background image of the #art element
Macro.add("art", {
    handler() {
        let artURL = this.args[0];
        let artContainer = $(`#art`);
        artContainer.css("background-image", `url(${artURL})`);
    }
});