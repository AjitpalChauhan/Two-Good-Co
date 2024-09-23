function locomotiveScrollAnimation(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotiveScrollAnimation()


function navbarAnimation(){
  gsap.to(".nav1 svg", {
    y: "-130%", 
    scrollTrigger: {
      trigger: ".page1",
      scroller: ".main",
      start: "top 0",
      end: "top -5%", 
      scrub: true
    }
  });
  
  gsap.to(".nav2 .links", {
    y: "-100%", 
    opacity: 0,
    scrollTrigger: {
      trigger: ".page1",
      scroller: ".main",
      start: "top 0",
      end: "top -5%", 
      scrub: true
    }
  });
}
navbarAnimation()


function cursorAnimation(){
  var videocon = document.querySelector(".video-Container")
var cursor = document.querySelector(".cursor")

videocon.addEventListener("mousemove", function(dets){
  gsap.to(cursor,{
    scale:1,
    opacity:1,
    x:dets.x,
    y: dets.y
  })
})

videocon.addEventListener("mouseleave", function(dets){
  gsap.to(cursor,{
    scale:0,
    opacity:0
  })
})

videocon.addEventListener("mouseenter", function(dets){
  gsap.to(cursor,{
    scale:1,
    opacity:1
  })
})
}
cursorAnimation();


function loadingAnimation(){
  gsap.from(".page1 h1", {
    y:100,
    opacity: 0,
    delay: 0.5,
    duration: 0.8,
    stagger:0.2
  })
  gsap.from(".page1 .video-Container", {
    scale:0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.8
  })
}
loadingAnimation();


function mainCursorAnimation(){
  
document.addEventListener("mousemove", function(dets){
  gsap.to(".mainCursor", {
    x: dets.x,
    y: dets.y
  })
})

document.querySelectorAll(".child1").forEach((elem)=> {
  elem.addEventListener("mouseenter", function(){
    gsap.to(".mainCursor",{
      transform: 'translate(-50%, -50%) scale(1)'
      
    })
  })
})

document.querySelectorAll(".child1").forEach((elem)=> {
  elem.addEventListener("mouseleave", function(){
    gsap.to(".mainCursor",{
      transform: 'translate(-50%, -50%) scale(0)'
    })
  })
})

document.querySelectorAll(".child2").forEach((elem) => {
  elem.addEventListener("mouseenter", function() {
    gsap.to(".mainCursor", {
      transform: 'translate(-50%, -50%) scale(1)'
    });
  });
});


document.querySelectorAll(".child2").forEach((elem)=> {
  elem.addEventListener("mouseleave", function(){
    gsap.to(".mainCursor",{
      transform: 'translate(-50%, -50%) scale(0)'
    })
  })
})
}
mainCursorAnimation()