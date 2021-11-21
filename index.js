const dropZone=document.querySelector(".drop-zone");
const Browsebutton=document.querySelector(".Browsebutton");
const bgprogress=document.querySelector(".bg-progress");
const progresscontainer=document.querySelector(".progress-container");
const progressbar=document.querySelector(".progress-bar");
var ff=document.getElementById("fff");
const percentd=document.querySelector("#percent");
const host= "https://innshare.herokuapp.com/";
const uploadurl=host+"api/files";
//emailurl
const emailurl=`${host}api/files/send`;
const fileinput=document.querySelector("#fileinput");
dropZone.addEventListener("dragover",(e)=>
{
    e.preventDefault()
    if(!dropZone.classList.contains("dragged")){
    dropZone.classList.add("dragged");}
});

dropZone.addEventListener("dragleave",()=>
{
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop",(e)=>
{
    e.preventDefault()
    dropZone.classList.remove("dragged");
    const files=e.dataTransfer.files
    fileinput.files=files;
    if(files.length)
    {
        fileinput.files=files;

        uploadfile();
    }
});

Browsebutton.addEventListener("click",()=>
{
    fileinput.click();
})

fileinput.addEventListener("change",()=>
{
    uploadfile();
})

const uploadfile=()=>
{
    progresscontainer.style.display="block";
    
    const file=fileinput.files[0];
    ff.value=file.name;
    console.log(file.name);

    console.log("XV" + document.getElementById("fileinput").value);
    const formData=new FormData()
    formData.append("myfile",file)
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=()=>
    {
        if(xhr.readyState==XMLHttpRequest.DONE)
        {
            //console.log(xhr.response);
            showlink(JSON.parse(xhr.response));
        }
    };
    xhr.upload.onprogress=updateProgress;
    xhr.open("POST", uploadurl);
    xhr.send(formData);
};

const updateProgress=(e)=>
{
    const percent= (e.loaded / e.total ) * 100;
    console.log(percent);
    bgprogress.style.width= `${percent}%`
    percentd.innerText= Math.round(percent);
   /* progressbar.style.transform=`scaleX(${percent/100})`*/

};
const fileurl=document.querySelector("#fileURL");
const sharingcontainer=document.querySelector(".sharing-container");

const showlink=({file: url})=>
{
        //console.log(url);
        fileinput.value="";
        emailform[2].removeAttribute("disabled","true");
    
        progresscontainer.style.display="none";
        sharingcontainer.style.display="block";
        fileurl.value=url;
};
const copybtn=document.querySelector("#copybtn");
copybtn.addEventListener("click",()=>
{
    fileurl.select();
    document.execCommand("copy");
})


function showmefeed(){
    document.getElementById("feed").style.display="block";
    document.getElementById("showfeed").style.display="none";
    
}

function showmebutton(){
    document.getElementById("feed").style.display="none";
    document.getElementById("showfeed").style.display="block";
    
}

const emailform=document.querySelector("#emailform");
/*
emailform.addEventListener("submit",(e)=>
{
    e.preventDefault();
    console.log("submit form");
    const url=fileurl.value;
    const formdata={
        uuid:url.split("/").splice(-1,1)[0],
        emailTo:emailform.elements["to-email"].value,
        emailfrom:emailform.elements["from-email"].value
    };
    console.table(formdata);
    emailform[2].setAttribute("disabled","true");

    fetch(emailurl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formdata),
    })
    .then(res=> res.json())
    .then(({success}) => {
        if(success)
        {
            sharingcontainer.style.display="none";
        }
    });
});
*/