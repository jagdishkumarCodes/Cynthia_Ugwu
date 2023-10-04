
const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

function firstPageAnimation() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        ease: Expo,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
        .to(".upper", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            stagger: .2,
            delay: -1,

        })
        .from("#herofooter", {
            y: "-10",
            ease: Expo.easeInOut,
            duration: 1.5,
            delay: -1,
            opacity: 0,
            stagger: .2,
        })

}

var timeout;
function sequezecircle() {
    //define default scale value
    var xscale = 1
    var yscale = 1
    var xprevious = 0
    var yprevious = 0
    window.addEventListener("mousemove", (dets) => {
        clearTimeout(timeout);
        var xdifference = dets.clientX - xprevious; // strrting me ye kuch nhi krega pr jb ye function chl jayega then ye bhi work krega kuk t isme kuch value hogi
        var ydifference = dets.clientY - yprevious;


        // gsap.utils.clamp(.8, 1.2, xdifference);
        // gsap.utils.clamp(.8, 1.2, ydifference);
        // the range of value always between 0.8 to 1.2 if the value lowest than .8 than it will convert into .8 and if above 1.2 then convert into 1.2
        // console.log(gsap.utils.clamp(.8,1.2,xdifference)
        // ,gsap.utils.clamp(.8,1.2,ydifference)
        // )
        xscale = gsap.utils.clamp(.8, 1.2, xdifference);
        yscale = gsap.utils.clamp(.8, 1.2, ydifference);

        xprevious = dets.clientX;
        yprevious = dets.clientY;

        circleMouseFollower(xscale, yscale)
        timeout = setTimeout(() => {
            document.querySelector(".mini-circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
        }, 100)

    });
}

// passing xscale and yscale value to circlemousefollower
function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", (details) => {
        document.querySelector(".mini-circle").style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(${xscale},${yscale})`
        // for moving slowly i gives (cubic-bezier tansition) property  in mini-circle section 
    })

}
circleMouseFollower();
sequezecircle();
firstPageAnimation();


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
            zIndex: 0,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        // Check if the image's position exceeds the boundaries


        gsap.to(elem.querySelector("img"), {
            zIndex: 99,
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
            duration: 0.5,
        });
    });
});



//   for reading start
// elem.addEventListener("mousemove", function (dets) {
//     // console.log(elem.getBoundingClientRect())
//     // gives object and in object info about the elem positions
//     var diff = dets.clientY - elem.getBoundingClientRect().top;
//     // just taking difference of total position of mouse in y between total distance of element top from page so that i can take the mouse position on thet element
//     diffro = dets.clientX - rotate;
//     rotate = dets.clientX;
//     gsap.to(elem.querySelector("img"), {
//         opacity: 1,
//         ease: Power3,
//         top: diff,
//         left: dets.clientX,
//         rotate: gsap.utils.clamp(-20, 20, diffro * 0.5)
//     });
//     // console.log(details.clientX, details.clientY);
// });
// for reading end



