loadText = document.querySelector('.apple')
var apple = document.getElementById('appl')
button=document.querySelector('.btn')
title_text = document.querySelector('.container h1')
back = document.querySelector('.docimg')
red = document.querySelector('.red')
overlay = document.querySelector('.container')
body = document.querySelector('body')
links = document.querySelector('a')
nav = document.querySelector('.nav')
open = document.getElementById('open')
modal=document.getElementById('modal')
close = document.getElementById('close')
ani=document.querySelector('.ani')
help=document.querySelector('.cta-btn')
spon=document.querySelector('.sponsor')


open.addEventListener('click', () =>{
    modal.classList.add('show-modal')
})

close.addEventListener('click', ()=>{
    modal.classList.remove('show-modal')
})

window.addEventListener('click', (e) =>{
    if(e.target == modal){
        modal.classList.remove('show-modal')
    }
})



load = 0
smaller = 0;
sizex = 0
sizey = 0

