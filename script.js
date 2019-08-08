window.addEventListener("load",()=>{
    let long;
    let lat;
    let temsum=document.querySelector('.description');
    let temdegree=document.querySelector('.degree');
    let location=document.querySelector('.location-timezone');
    let tempSec=document.querySelector('.degree-section');
    let tempSecSpan=document.querySelector('.degree-section-span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy='https://cors-anywhere.herokuapp.com/';
            const api=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            fetch(api).then(response=>{
                return response.json();
            }).then(data=>{
                console.log(data);
                const {temperature, summary, icon}=data.currently;
                temdegree.textContent=temperature;
                temsum.textContent=summary;
                location.textContent=data.timezone;
                let celsius=(temperature-32)*(5 / 9);
                setIcon(icon,document.querySelector('.icon'));
                //change temp to celsius
                tempSec.addEventListener('click',()=>{
                    if(tempSecSpan.textContent=="F"){
                        tempSecSpan.textContent="C";
                        temdegree.textContent=Math.floor(celsius);
                    }else{
                        tempSecSpan.textContent="F";
                        temdegree.textContent=temperature;
                    }
                });
            });
        });
        
    }else{
        
    }
    function setIcon(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon=icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);

    }
});