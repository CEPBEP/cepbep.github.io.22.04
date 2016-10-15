// Inspiration
// https://dribbble.com/shots/2255100-Ableton-Live-Redesign-Concept

// I only have Live Lite so the manu items will be sparse. 
// Dont judge me, I'll buy Live Suite evenually >___>
// There are also a lot of issues with this because this is hard man.
// I'll try to fix them all.

$(document).ready(function() {
    
    // Session - Arrangement buttons function
    $('.s-a-button').click(function(){
        $('.s-a-button').removeClass('active');
        $(this).addClass('active');
    });
    
    // Right-bar Option buttons funtion
    $('.option-button').click(function(){$(this).toggleClass('active');});
    
    // Side-bar Option buttons funtion
    $('.folder-item').click(function(){
        $('.folder-item').removeClass('active');
        $(this).addClass('active');
    });
    
    // Side Navigation function
    $('.folder-link').click(function(){
        $('.result-list').removeClass('displayed');
        $('.drop-item').removeClass('dropped'); 
        $(this.hash).addClass('displayed');
    });
    
    $('.drop-item').click(function(){
       $(this).toggleClass('dropped'); 
    });
    
    // Side-bar collapse funtion
    $('.side-bar-arrow').click(function(){
        $(this).toggleClass('collapsed');
        $('.middle-side-nav').toggleClass('collapsed');
        $('.middle-main-section').toggleClass('extended');
    });
    
    //Session control buttons functions
    $('.sess-butt').click(function(){
        $(this).toggleClass('clicked');
    });
    
    $('.session-play-button').click(function(){
        $(this).addClass('clicked');
        $('.effect-level-bar').addClass('on');
    });
    
    $('.session-stop-button').click(function(){
        $('.session-play-button').removeClass('clicked');
        $('.effect-level-bar').removeClass('on');
    });
    
    // Meter function
    $('.meter-divide').click(function(){
        $('.meter-divide').removeClass('has-cursor');
        $(this).addClass('has-cursor');
    });
    
    // Track clip function shenanigans
    $('.track-clip').click(function(){
        $(this).parent().children().removeClass('playing');
        $(this).addClass('playing');
    });
    
    $('.master-track-clip').click(function(){
        $('.track-clip').removeClass('playing');
        if ($(this).hasClass('clip-1')) {
            $('.clip-1').addClass('playing');
        }
        else if ($(this).hasClass('clip-2')) {
            $('.clip-2').addClass('playing');
        }
        else if ($(this).hasClass('clip-3')) {
            $('.clip-3').addClass('playing');
        }
        else if ($(this).hasClass('clip-4')) {
            $('.clip-4').addClass('playing');
        }
        else if ($(this).hasClass('clip-5')) {
            $('.clip-5').addClass('playing');
        }
        else if ($(this).hasClass('clip-6')) {
            $('.clip-6').addClass('playing');
        }
        else if ($(this).hasClass('clip-7')) {
            $('.clip-7').addClass('playing');
        }
        else if ($(this).hasClass('clip-8')) {
            $('.clip-8').addClass('playing');
        };
    });
    
});