import $ from 'jquery';
import { setTimeout } from 'timers';
let currentIndex = 0;
let currentPercentage = 0;
let lastIndex = 3;
let allVideoCount = 0
//Prevent scrolling too fast

//Set the index to a hidden input so 
//that is accessible from landingVideos page

const hideElements = (currentIndex) => {
    const currentHeight = $(`.video-${currentIndex} > .scroll-target`).css('top')
    $(`.video-${currentIndex} > .scroll-target`)
        .animate({'opacity': '0', top: '100px'}, 1400, function () {
        $(this).css({'opacity': 0,  'top': currentHeight})
    })
}
const showElements = (currentIndex) => {
    $(`.video-${currentIndex} > .scroll-target`)
        .animate({'opacity': '1'}, 1700, function () {
        $(this).css({'opacity': 1})
    })
}
const hideVideoDiv = (currentIndex) => {
    $(`.video-${currentIndex}`)
    .animate({ 'z-index': '-1', 'opacity': '0'} , 1400  , function () {
    $(this).css({'z-index': -1, 'opacity': 0})                    
    })
}
const showVideoDiv = (currentIndex) => {
    $(`.video-${currentIndex}`)
    .animate({ 'z-index': '1', 'opacity': 1}, 1400 , function () {
    $(this).css({'z-index': 1, 'opacity': 1})                    
})
}
const setSVG = (val, lastIndex, animate, ) => {
    const $circle = $(`.circle-${lastIndex}`);
    const $allCircles = $('#svg #bar');
    let pct = 0
    if (isNaN(val)) {
     val = 100; 
    }
    else{
      const r = $circle.attr('r');
      const c = Math.PI*(r*2);
      if (val < 0) { val = 0;}
      if (val > 100) { val = 100;}
      
      if (val === 100 || val === '100') {
          pct = 0;
      }else {
         pct = ((100-val)/100)*c;
      }
    if (animate) {
        $circle.animate({ strokeDashoffset: pct}, 400, function () {
            if (pct === 0) {
             pct = 1700
            }
            $allCircles.css({strokeDashoffset:pct})
        });
    } else {
        $circle.css({strokeDashoffset: 99})
        $circle.animate({ strokeDashoffset: pct}, 400, function () {
            if (pct === 0) {
             pct = 1700
            }
            $allCircles.css({strokeDashoffset:pct})
        });
    }

    }
}
const scrollDown = (event) => {
    console.log('event')
    //Hide previous div
    lastIndex = currentIndex
    hideVideoDiv(currentIndex)
    hideElements(currentIndex)
    //Increment Index
    if (currentIndex < allVideoCount -1) {
        currentIndex++;
        currentPercentage = (currentIndex / allVideoCount) * 100
    }else {
        currentIndex = 0;
        currentPercentage = 100;
    }
    //Show next div
    setSVG(currentPercentage, lastIndex, true)        
    showVideoDiv(currentIndex)
    showElements(currentIndex)
    // Delay any more scolling
    event.preventDefault()        
    $( 'body' ).off( 'wheel',  scrollDown );            
    setTimeout(() => {
        $( 'body' ).on( 'wheel',  scrollDown );        
    }, 2000)
}
const scrollUp = (event) => {
    //Hide previous div
    lastIndex = currentIndex
    hideVideoDiv(currentIndex)
    hideElements(currentIndex)
    //Decrement Index
    if (currentIndex > 0) {
        currentIndex--;
        currentPercentage = (currentIndex / allVideoCount) * 100
        setSVG(currentPercentage, lastIndex, true)        
    }else {
        currentIndex = allVideoCount-1;
        currentPercentage = (currentIndex / allVideoCount) * 100
        setSVG(currentPercentage, lastIndex, false)        

    }
    //Show next div
    showVideoDiv(currentIndex)
    showElements(currentIndex)
    // Delay any more scolling
    $( 'body' ).off( 'wheel',  scrollDown );            
    setTimeout(() => {
        $( 'body' ).on( 'wheel',  scrollDown );        
    }, 2000)
}
$(document).ready(function () {
    const allVideos = $('.video-wrapper')
    allVideoCount = allVideos.length
    $( 'body' ).on( 'wheel', scrollDown );
    $('.svg-up').click(scrollDown)
    $('.svg-down').click(scrollUp)
})

export  {scrollUp}